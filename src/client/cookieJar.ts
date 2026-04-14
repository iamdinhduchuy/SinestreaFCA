import ContextInstance from "@/context";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export const jar = new CookieJar();

export const httpClient = wrapper(
  axios.create({
    jar,
    withCredentials: true,
    maxRedirects: 5,
    validateStatus: (status) => status < 500,
    headers: {
      "User-Agent": ContextInstance.userAgent,
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
      "Cache-Control": "max-age=0",
      "sec-ch-ua":
        '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
  }),
);

/**
 * Hàm nạp Cookie
 */
export async function injectCookies(rawCookie: string): Promise<boolean> {
  const cookieParts = rawCookie.split(";");
  for (const part of cookieParts) {
    const trimmed = part.trim();
    if (trimmed) {
      await jar.setCookie(
        `${trimmed}; Domain=.facebook.com; Path=/`,
        "https://www.facebook.com",
      );
    }
  }

  return true;
}

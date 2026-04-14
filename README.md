# SinestreaFCA

> **Facebook Chat API** không chính thức viết bằng TypeScript — đăng nhập bằng cookie/appState, trích xuất token bảo mật và kết nối MQTT real-time.

---

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Yêu cầu](#yêu-cầu)
- [Cài đặt](#cài-đặt)
- [Cách sử dụng](#cách-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [API](#api)
- [Giấy phép](#giấy-phép)

---

## Giới thiệu

**SinestreaFCA** là thư viện TypeScript giúp tự động hóa tương tác với Facebook Messenger thông qua cookie phiên đăng nhập. Thư viện trích xuất các tham số bảo mật (`fb_dtsg`, `lsd`, `jazoest`) và `Sequence ID` từ giao diện web Facebook, đồng thời hỗ trợ kết nối MQTT để lắng nghe sự kiện tin nhắn real-time.

---

## Tính năng

- 🔐 **Đăng nhập linh hoạt**: hỗ trợ cookie string, AppState (JSON) hoặc email/mật khẩu.
- 🔑 **Trích xuất token bảo mật**: tự động lấy `fb_dtsg`, `lsd`, `jazoest` từ nhiều nguồn (trang chủ, mobile, Business).
- 📨 **Lấy Sequence ID**: qua HTML hoặc GraphQL khi cần.
- 🌐 **Cấu hình MQTT**: tự phát hiện endpoint và region cho kết nối real-time.
- 🎨 **Logger tùy biến**: hiển thị log màu sắc gradient dễ đọc.
- 🍪 **Cookie Jar tự động**: quản lý cookie giữa các request bằng `tough-cookie`.

---

## Yêu cầu

| Công cụ | Phiên bản tối thiểu |
|---------|-------------------|
| Node.js | 18+ |
| npm     | 8+  |

---

## Cài đặt

```bash
# Clone repository
git clone https://github.com/iamdinhduchuy/SinestreaFCA.git
cd SinestreaFCA

# Cài đặt dependencies
npm install
```

---

## Cách sử dụng

### Chạy development

```bash
npm run dev
```

### Đăng nhập bằng Cookie String

```typescript
import Login from "./src/index";

await Login("cookie1=value1; cookie2=value2; ...");
```

### Đăng nhập bằng AppState

```typescript
import Login from "./src/index";

const appState = [
  {
    key: "c_user",
    value: "100000000000000",
    domain: ".facebook.com",
    path: "/",
    hostOnly: false,
    creation: "2024-01-01T00:00:00.000Z",
    lastAccessed: "2024-01-01T00:00:00.000Z",
  },
  // ... các cookie khác
];

await Login(appState);
```

### Đăng nhập bằng Email / Mật khẩu

> ⚠️ Tính năng này đang trong quá trình phát triển.

```typescript
import Login from "./src/index";

await Login("email@example.com", "password123");
```

---

## Cấu trúc dự án

```
SinestreaFCA/
├── src/
│   ├── index.ts            # Entry point — hàm Login
│   ├── context.ts          # Singleton Context (userID, token, MQTT, ...)
│   ├── @types/             # Khai báo TypeScript
│   │   ├── api.d.ts        # Interface API routes
│   │   ├── global.d.ts     # Khai báo global
│   │   ├── index-entry.d.ts# LoginArgs & LoginInterface
│   │   └── types.d.ts      # AppState type
│   ├── client/
│   │   └── cookieJar.ts    # Axios HTTP client + Cookie Jar
│   ├── cores/
│   │   └── Facebook.ts     # Logic cốt lõi: trích xuất token, MQTT, GraphQL
│   └── utils/
│       ├── index.ts        # Tiện ích chuyển đổi (AppState ↔ Cookie string)
│       └── log.ts          # Logger màu sắc gradient
├── package.json
├── tsconfig.json
└── LICENSE
```

---

## API

### `Login(...args)`

Hàm khởi động chính. Nhận vào một trong ba dạng tham số:

| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `appState` | `AppState` | Mảng object cookie |
| `cookieString` | `string` | Chuỗi cookie dạng `key=value; ...` |
| `email, password` | `string, string` | Email và mật khẩu Facebook |

Sau khi đăng nhập thành công, `ContextInstance` sẽ được cập nhật với:

| Thuộc tính | Mô tả |
|-----------|-------|
| `userID` | ID người dùng Facebook |
| `fb_dtsg` | Token bảo mật DTSG |
| `lsd` | Token LSD |
| `jazoest` | Giá trị jazoest |
| `mqttEndpoint` | Endpoint kết nối MQTT |
| `region` | Region MQTT (mặc định: `PRN`) |

---

### `FacebookCore`

Class singleton cung cấp các phương thức:

| Phương thức | Mô tả |
|------------|-------|
| `getFullContext()` | Lấy toàn bộ context từ Facebook |
| `getDtsg()` | Lấy `fb_dtsg` và `lsd` |
| `getSequenceId(userID, fb_dtsg)` | Lấy Sequence ID qua GraphQL |
| `getMqttConfig(html, userID)` | Trích xuất cấu hình MQTT |
| `extractSecurityParams(html)` | Phân tích tham số bảo mật từ HTML |
| `generateJazoest(fb_dtsg)` | Tính `jazoest` từ `fb_dtsg` |
| `checkHealthAccount(uid, token)` | Kiểm tra trạng thái tài khoản |

---

## Giấy phép

Dự án được phân phối dưới giấy phép **ISC**. Xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

---

> **Lưu ý**: Dự án này chỉ dành cho mục đích học tập và nghiên cứu. Việc sử dụng tự động hoá trên Facebook có thể vi phạm [Điều khoản Dịch vụ của Facebook](https://www.facebook.com/terms.php). Hãy sử dụng có trách nhiệm.

import chalk from "chalk";
import gradient from "gradient-string";

type LogType = "success" | "warn" | "error" | "info" | string;

const typeStyles: Record<string, (text: string) => string> = {
  success: (text) => chalk.bgGreen.white.bold(` ${text.toUpperCase()} `),
  warn: (text) => chalk.bgYellow.black.bold(` ${text.toUpperCase()} `),
  error: (text) => chalk.bgRed.white.bold(` ${text.toUpperCase()} `),
  info: (text) => chalk.bgBlue.white.bold(` ${text.toUpperCase()} `),
  default: (text) => chalk.bgWhite.black.bold(` ${text.toUpperCase()} `),
};

const gradientStyles: Record<string, (text: string) => string> = {
  success: (text) => gradient("cyan", "green")(text),
  warn: (text) => gradient("yellow", "orange")(text),
  error: (text) => gradient("red", "pink")(text),
  info: (text) => gradient("blue", "cyan")(text),
  default: (text) => gradient("white", "gray")(text),
};

/**
 * Hàm logger tùy biến
 * @param type Loại thông báo (success, warn, error, info, hoặc bất kỳ string nào)
 * @param message Nội dung cần log
 */
export const logger = (type: LogType, message: string): void => {
  const time = chalk.gray.bold(
    `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}]`,
  );

  const upperType = type.toUpperCase();
  const styleKey = type.toLowerCase();

  // Chọn style
  const typeStyle = typeStyles[styleKey] || typeStyles.default;
  const gradientStyle = gradientStyles[styleKey] || gradientStyles.default;

  // Tạo phần tag có màu nền
  const coloredTag = typeStyle(upperType);

  /**
   * XỬ LÝ PAD KHÔNG KÉO MÀU NỀN:
   * Chúng ta tính toán số khoảng trắng cần thiết dựa trên độ dài chữ (upperType).
   * Tổng độ dài muốn có là 10. Thêm 2 vì trong typeStyle đã có 2 khoảng trắng đệm (trước và sau).
   */
  const paddingSize = Math.max(0, 10 - upperType.length);
  const padding = " ".repeat(paddingSize);

  // Render: Tag có màu + Khoảng trắng không màu + dấu gạch đứng
  console.log(`${time} ${coloredTag}${padding} | ${gradientStyle(message)}`);
};

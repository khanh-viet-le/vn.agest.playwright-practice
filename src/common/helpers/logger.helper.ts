import * as fs from "fs";
import * as path from "path";

export class Logger {
  private static logDir = path.join(process.cwd(), "logs");
  private static logFile = path.join(
    this.logDir,
    `log_${new Date().toISOString().replace(/[:.]/g, "-")}.log`,
  );

  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level[0].toUpperCase()}]\t${message}`;
  }

  private static write(level: string, message: string, colorCode: string) {
    const formattedMessage = this.formatMessage(level, message);

    // Print to console with colors if enabled
    if (process.env.ENABLE_CONSOLE_LOGS === "true") {
      console.log(`${colorCode}${formattedMessage}\x1b[0m`);
    }

    // Save to file if enabled
    if (process.env.ENABLE_FILE_LOGS === "true") {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }
      fs.appendFileSync(this.logFile, formattedMessage + "\n");
    }
  }

  public static info(message: string) {
    this.write("INFO", message, "\x1b[32m"); // Green
  }

  public static log(message: string) {
    this.write("LOG", message, "\x1b[0m"); // White (default)
  }

  public static warn(message: string) {
    this.write("WARN", message, "\x1b[33m"); // Yellow
  }

  public static error(message: string) {
    this.write("ERROR", message, "\x1b[31m"); // Red
  }

  public static debug(message: string) {
    this.write("DEBUG", message, "\x1b[36m"); // Cyan
  }
}

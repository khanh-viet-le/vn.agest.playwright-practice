import { Timeout } from "@common/timeout";
import { Page } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  public async waitDefault(timeout: number = Timeout.PAGE_DEFAULT) {
    await this.page.waitForTimeout(timeout);

    return this;
  }

  public async waitForPageLoad(timeout: number = Timeout.PAGE_LOAD) {
    await this.page.waitForLoadState("load", { timeout });

    return this;
  }

  public async reload(timeout: number = Timeout.PAGE_RELOAD) {
    await this.page.reload({
      waitUntil: "commit",
      timeout,
    });

    return this;
  }
}

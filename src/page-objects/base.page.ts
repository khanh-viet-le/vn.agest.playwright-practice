import { LocatorHelper } from "@helpers/locator";
import { Timeout } from "@common/timeout";
import { Page } from "@playwright/test";

export abstract class BasePage {
  protected locatorHelper: LocatorHelper;
  public locators!: Record<string, any>;

  constructor(protected readonly page: Page) {
    this.locatorHelper = new LocatorHelper();
  }

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

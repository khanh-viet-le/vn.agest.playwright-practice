import { Timeout } from "@common/timeout";
import { Locator, Page } from "@playwright/test";

type Type =
  | "xpath"
  | "css"
  | "role"
  | "alt-text"
  | "text"
  | "label"
  | "placeholder"
  | "title"
  | "testId";

export class Element {
  //#region Properties
  private readonly type: Type;
  private rawLocator: string;
  private _locator?: Locator;
  //#endregion

  constructor(
    private readonly page: Page,
    locator: string = "",
  ) {
    const [_type, _locator] = locator.split(":");
    this.type = _type as Type;
    this.rawLocator = _locator;
  }

  //#region  Setup function
  private get locator(): Locator {
    if (!this._locator) {
      this._locator = this.buildLocator().first();
    }

    return this._locator;
  }

  public setDynamic(...args: any) {
    args.forEach((arg: any, idx: number) => {
      this.rawLocator = this.rawLocator.replace(`{${idx}}`, arg);
    });

    return this;
  }

  public setByLocator(locator: Locator) {
    this._locator = locator;
    return this;
  }

  public async toElements() {
    const locators = await this.buildLocator().all();

    return locators.map((locator) =>
      new Element(this.page).setByLocator(locator),
    );
  }

  private buildLocator(): Locator {
    switch (this.type) {
      case "css":
      case "xpath":
        return this.page.locator(this.rawLocator);

      case "role":
        return this.page.getByRole(this.type as any, {
          name: this.rawLocator,
        });

      case "alt-text":
        return this.page.getByAltText(this.rawLocator);

      case "text":
        return this.page.getByText(this.rawLocator);

      case "label":
        return this.page.getByLabel(this.rawLocator);

      case "placeholder":
        return this.page.getByPlaceholder(this.rawLocator);

      case "title":
        return this.page.getByTitle(this.rawLocator);

      case "testId":
        return this.page.getByTestId(this.rawLocator);

      default:
        throw new Error("Invalid locator type");
    }
  }
  //#endregion

  //#region  form actions
  async click() {
    await this.waitForAttached();
    await this.locator.click();

    return this;
  }

  async doubleClick() {
    await this.waitForAttached();
    await this.locator.dblclick();

    return this;
  }

  async rightClick() {
    await this.waitForAttached();
    await this.locator.click({ button: "right" });

    return this;
  }

  async focus() {
    await this.waitForAttached();
    await this.locator.focus();

    return this;
  }

  async blur() {
    await this.waitForAttached();
    await this.locator.blur();

    return this;
  }

  async hover() {
    await this.waitForVisible();
    await this.locator.hover();

    return this;
  }

  async fill(value: string) {
    await this.waitForAttached();
    await this.locator.fill(value);

    return this;
  }

  async clear() {
    await this.waitForAttached();
    await this.locator.clear();

    return this;
  }

  async select(value?: string, label?: string, index?: number) {
    await this.waitForAttached();
    await this.locator.selectOption({
      value,
      label,
      index,
    });

    return this;
  }

  async check() {
    await this.waitForAttached();
    await this.locator.check();

    return this;
  }

  async uncheck() {
    await this.waitForAttached();
    await this.locator.uncheck();

    return this;
  }

  async getText() {
    await this.waitForAttached();
    return await this.locator.textContent();
  }

  async getAttribute(attribute: string) {
    await this.waitForAttached();
    return await this.locator.getAttribute(attribute);
  }

  async getCssValue(property: string) {
    await this.waitForAttached();

    return await this.locator.evaluate((e, property) => {
      const view = e.ownerDocument?.defaultView || window;
      return view.getComputedStyle(e).getPropertyValue(property);
    }, property);
  }
  //#endregion

  //#region Waiting
  async waitForAttached(timeout: number = Timeout.ELEMENT_ATTACHED) {
    await this.locator.waitFor({
      state: "attached",
      timeout,
    });

    return this;
  }

  async waitForDetached(timeout: number = Timeout.ELEMENT_DETACHED) {
    await this.locator.waitFor({
      state: "detached",
      timeout,
    });

    return this;
  }

  async waitForHidden(timeout: number = Timeout.ELEMENT_HIDDEN) {
    await this.locator.waitFor({
      state: "hidden",
      timeout,
    });

    return this;
  }

  async waitForVisible(timeout: number = Timeout.ELEMENT_VISIABLE) {
    await this.locator.waitFor({
      state: "visible",
      timeout,
    });

    return this;
  }

  async waitDefault(timeout: number = Timeout.ELEMENT_DEFAULT) {
    await this.locator.waitFor({ timeout });

    return this;
  }
  //#endregion
}

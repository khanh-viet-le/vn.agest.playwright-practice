import { Element } from "@components/element";
import { BasePage } from "@pages/base";
import { expect, Page } from "@playwright/test";

export class Assert {
  //#region Private Methods
  private static getLocator = (page: Page, key: string) => {
    const element = new Element(page, key);
    return (element as any).locator;
  };

  private static expectElementBase = <P extends BasePage>(
    page: P,
    key: keyof P["locators"],
    message?: string,
  ) => {
    const { page: p, locators } = page as any;
    const locator = Assert.getLocator(p, locators[key]);
    return expect(locator, message);
  };

  private static expectElementSoft = <P extends BasePage>(
    page: P,
    key: keyof P["locators"],
    message?: string,
  ) => {
    const { page: p, locators } = page as any;
    const locator = Assert.getLocator(p, locators[key]);
    return expect.soft(locator, message);
  };
  //#endregion

  //#region Inherited Methods
  /**
   * Inherited from Playwright's expect function.
   * It can be used for assertions on any locator or value.
   * @returns expect from "@playwright/test";
   */
  public static expect = expect;
  //#endregion

  //#region Custom Methods
  /**
   * Custom assertion method for elements defined in page objects.
   */
  public static expectElement = Object.assign(this.expectElementBase, {
    soft: this.expectElementSoft,
  });
  //#endregion
}

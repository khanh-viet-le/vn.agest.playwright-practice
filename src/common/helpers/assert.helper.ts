import { Element } from "@components/element";
import { BasePage } from "@pages/base";
import { expect } from "@playwright/test";

export class Assert {
  //#region Private Methods
  private static getLocator = (page: any, key: string) => {
    const element = new Element(page.page, page[key]);
    return (element as any).locator;
  };

  private static expectElementBase = <P extends BasePage>(
    page: P,
    key: string,
    message?: string,
  ) => {
    return expect(this.getLocator(page, key), message);
  };

  private static expectElementSoft = <P extends BasePage>(
    page: P,
    key: string,
    message?: string,
  ) => {
    return expect.soft(this.getLocator(page, key), message);
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

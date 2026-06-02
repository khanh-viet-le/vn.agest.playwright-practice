import { Element } from "@components/element";
import { BasePage } from "@pages/base";
import { expect } from "@playwright/test";

const getLocator = (page: any, key: string) => {
  const element = new Element(page.page, page[key]);
  return (element as any).locator;
};

const expectElementBase = <P extends BasePage>(
  page: P,
  key: string,
  message?: string,
) => {
  return expect(getLocator(page, key), message);
};

const expectElementSoft = <P extends BasePage>(
  page: P,
  key: string,
  message?: string,
) => {
  return expect.soft(getLocator(page, key), message);
};

export class Assert {
  /**
   * Default expect assertion from Playwright Test.
   */
  public static expect = expect;

  public static expectElement = Object.assign(expectElementBase, {
    soft: expectElementSoft,
  });
}

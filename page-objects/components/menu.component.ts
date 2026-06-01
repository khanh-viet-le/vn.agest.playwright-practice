import { Page } from "@playwright/test";
import { Element } from "@components/element";

export class Menu {
  private items: Map<string, Element>;

  constructor(
    private readonly page: Page,
    private locator: string,
    items: string[],
  ) {
    this.items = new Map();
    items.forEach((item) => {
      this.items.set(
        item,
        new Element(this.page, this.locator).setDynamic(item),
      );
    });
  }

  async selectItem(item: string) {
    const element = this.items.get(item);

    if (!element) {
      throw new Error("Item not found in menu");
    }

    await element.click();
    await element.waitDefault();
  }
}

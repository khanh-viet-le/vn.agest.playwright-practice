import { Page } from "@playwright/test";
import { Menu } from "@components/menu";
import { BasePage } from "@pages/base";
import { menuItems } from "@common/menu-items";

export abstract class GeneralPage extends BasePage {
  //#region Locators & Elements
  public readonly menu: Menu;
  private readonly _menu =
    "xpath://nav/ul/li//a[*[contains(text(),'{0}')] or contains(text(),'{0}')]";
  //#endregion

  constructor(page: Page) {
    super(page);
    this.menu = new Menu(page, this._menu, menuItems);
  }
}

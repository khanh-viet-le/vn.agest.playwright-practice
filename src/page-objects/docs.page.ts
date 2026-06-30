import { Element } from "@components/element";
import { GeneralPage } from "@pages/general";
import docPageLocators from "@locators/doc-page";

export class DocsPage extends GeneralPage {
  locators = this.locatorHelper.addLocators(docPageLocators).get();

  async getTitle() {
    return await new Element(this.page, this.locators.title).getText();
  }

  async setSiteColor(color: string) {
    const colorSelect = new Element(this.page, this.locators.siteColor);
    await colorSelect.select(undefined, color);
    await colorSelect.waitDefault();
    await this.waitForPageLoad();
  }

  async getSiteColor() {
    return await new Element(this.page, this.locators.content).getCssValue(
      "background-color",
    );
  }
}

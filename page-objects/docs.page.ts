import { Element } from "@components/element";
import { GeneralPage } from "@pages/general";

export class DocsPage extends GeneralPage {
  private readonly _title = "css:h1";
  private readonly _siteColor = "css:select[name=colours]";
  private readonly _content = "css:main div";

  async getTitle() {
    return await new Element(this.page, this._title).getText();
  }

  async setSiteColor(color: string) {
    const colorSelect = new Element(this.page, this._siteColor);
    await colorSelect.select(undefined, color);
    await colorSelect.waitDefault();
    await this.waitForPageLoad();
  }

  async getSiteColor() {
    return await new Element(this.page, this._content).getCssValue(
      "background-color",
    );
  }
}

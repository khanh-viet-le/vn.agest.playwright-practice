import { AppConfig } from "@common/app-config";
import { GeneralPage } from "@pages/general";

export class HomePage extends GeneralPage {
  //#region Methods
  async open() {
    await this.page.goto(AppConfig.BASE_URL);
    await this.waitForPageLoad();
    return this;
  }
  //#endregion
}

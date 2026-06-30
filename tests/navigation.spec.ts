import { test } from "@fixtures/base";
import { Assert } from "@helpers/assert";
import { Logger } from "@helpers/logger";

test("Navigation Test", async ({ homePage, docsPage }) => {
  await test.step("Open Website", async () => await homePage.open());

  await test.step('Select "Docs" In Menu', async () => {
    await homePage.menu.selectItem("Docs");
    await docsPage.waitDefault();

    Logger.debug(await docsPage.getTitle());

    await Assert.expectElement
      .soft(
        docsPage,
        "title",
        "Docs title should still match after color change",
      )
      .toContainText("TypeScript Documentation");
  });

  await test.step("Change Site Color", async () => {
    await docsPage.setSiteColor("Always Dark");

    Assert.expect
      .soft(await docsPage.getSiteColor(), "Site color should be updated")
      .toEqual("rgba(0, 0, 0, 0)");
  });
});

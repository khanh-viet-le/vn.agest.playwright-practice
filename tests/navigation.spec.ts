import { DocsPage } from "@pages/docs";
import { HomePage } from "@pages/home";
import test, { expect } from "@playwright/test";

test("Navigation Test", async ({ page }) => {
  let homePage = new HomePage(page);
  let docsPage = new DocsPage(page);

  await test.step("Open Website", async () => {
    await page.goto("https://www.typescriptlang.org/");
    await homePage.waitForPageLoad();
  });

  await test.step('Select "Docs" In Menu', async () => {
    await homePage.menu.selectItem("Docs");
    await docsPage.waitDefault();

    expect
      .soft(await docsPage.getTitle(), "Docs title should match")
      .toEqual("TypeScript Documentation");
  });

  await test.step("Change Site Color", async () => {
    await docsPage.setSiteColor("Always Dark");

    expect
      .soft(await docsPage.getSiteColor(), "Site color should be updated")
      .toEqual("rgba(0, 0, 0, 0)");
  });
});

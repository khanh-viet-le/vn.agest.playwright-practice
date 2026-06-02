import { test as base, expect } from "@playwright/test";
import { DocsPage } from "@pages/docs";
import { HomePage } from "@pages/home";

type BaseFixtures = {
  homePage: HomePage;
  docsPage: DocsPage;
};

export const test = base.extend<BaseFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  docsPage: async ({ page }, use) => {
    await use(new DocsPage(page));
  },
});

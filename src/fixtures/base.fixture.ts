import { test as base } from "@playwright/test";
import { DocsPage } from "@pages/docs";
import { HomePage } from "@pages/home";
import { Logger } from "@helpers/logger";

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

/**
 * Wrap test.step to automatically log the step title using Logger.info
 */
const originalStep = test.step;
(test as any).step = async (
  title: string,
  body: () => Promise<any>,
  options?: any,
) => {
  Logger.log(`Step: ${title}`);
  return await originalStep.call(test, title, body, options);
};

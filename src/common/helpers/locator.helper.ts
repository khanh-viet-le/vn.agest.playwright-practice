export class LocatorHelper<L extends Record<string, any> = {}> {
  private locators: L;

  constructor(locators: L = {} as L) {
    this.locators = locators;
  }

  /**
   * Add more objects into locator list.
   * The last object will overwrite the existing fields
   * @returns LocatorHelper
   */
  addLocators<T extends Record<string, any>>(
    newLocators: T,
  ): LocatorHelper<L & T> {
    const combinedLocators = { ...this.locators, ...newLocators };
    return new LocatorHelper(combinedLocators);
  }

  /**
   * Return the locator list after adding locator objects
   * @returns L - locator list
   */
  get() {
    return this.locators;
  }

  clear() {
    return new LocatorHelper();
  }
}

import { Element } from "@components/element";
import { Page } from "@playwright/test";

export type TableOption<T> = {
  cellLocators: Record<keyof T, string>;
  titleLocator?: string;
  rowLocator?: string;
};

export class Table<T> extends Element {
  protected cellLocators: Record<keyof T, string>;

  constructor(
    protected page: Page,
    locator: string = "//table",
    cellLocators: Record<keyof T, string>,
  ) {
    super(page, locator);
    this.cellLocators = cellLocators;
  }

  private buildCells(rowIndex: number): Record<keyof T, Element> {
    const cells: Record<keyof T, Element> = {} as Record<keyof T, Element>;

    for (const key in this.cellLocators) {
      const cellLocator = `//tr[${rowIndex}]${this.cellLocators[key as keyof T]}`;
      cells[key as keyof T] = new Element(this.page, cellLocator);
    }

    return cells;
  }

  async getHeaders() {
    const headers = await new Element(
      this.page,
      `${this.locator}//th`,
    ).toElements();

    return await Promise.all<String>(
      headers.map(async (header) => await header.getText()),
    );
  }

  async getRowData(rowIndex: number): Promise<T> {
    const row: T = {} as T;

    return row;
  }
}

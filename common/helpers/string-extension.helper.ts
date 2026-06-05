interface String {
  /**
   * Formats the string by replacing placeholders like {0}, {1}, etc. with provided arguments.
   * @param args The values to replace the placeholders.
   * @returns The formatted string.
   */
  format(...args: any[]): string;

  /**
   * Extracts the first number found in the string and returns it as a number type.
   * If no number is found, it returns NaN.
   * @returns The extracted number or NaN if no number is found.
   */
  extractNumber(): number;

  /**
   * Extracts all numbers found in the string and returns them as an array of numbers.
   * If no numbers are found, it returns an empty array.
   * @returns An array of extracted numbers or an empty array if no numbers are found.
   */
  extractNumbers(): number[];

  /**
   * Extracts the first match of the provided regex pattern and returns it as a string.
   * If no match is found, it returns null.
   * @param regex The regex pattern to search for.
   * @returns The first match or null if no match is found.
   */
  extractMatch(regex: RegExp): string | null;

  /**
   * Extracts all matches of the provided regex pattern and returns them as an array of strings.
   * If no matches are found, it returns null.
   * @param regex
   */
  extractMatches(regex: RegExp): string[] | null;

  /**
   * Keeps only the parts of the string that match the provided regex pattern and removes everything else.
   * @param regex The regex pattern to keep.
   * @returns The string containing only the parts that match the regex pattern.
   */
  keep(regex: RegExp): string;

  /**
   * Removes the parts of the string that match the provided regex pattern and keeps everything else.
   * @param regex The regex pattern to remove.
   * @returns The string with the parts that match the regex pattern removed.
   */
  remove(regex: RegExp): string;

  /**
   * Checks if the string is a valid email address.
   * @returns True if the string is a valid email address, false otherwise.
   */
  isEmail(): boolean;

  /**
   * Converts the string to a regular expression. The string is treated as a literal pattern, so special regex characters are escaped.
   * @returns A RegExp object created from the string.
   */
  toRegex(): RegExp;
}

String.prototype.format = function (...args: any[]): string {
  return this.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== "undefined" ? args[number] : match;
  });
};

String.prototype.extractNumber = function (): number {
  const match = this.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : NaN;
};

String.prototype.extractNumbers = function (): number[] {
  const matches = this.match(/-?\d+(\.\d+)?/g);
  return matches ? matches.map((num) => parseFloat(num)) : [];
};

String.prototype.extractMatch = function (regex: RegExp): string | null {
  const match = this.match(regex);
  return match ? match[0] : null;
};

String.prototype.extractMatches = function (regex: RegExp): string[] | null {
  const matches = this.match(regex);
  return matches ? matches : null;
};

String.prototype.keep = function (regex: RegExp): string {
  const matches = this.match(regex);
  return matches ? matches.join("") : "";
};

String.prototype.remove = function (regex: RegExp): string {
  const matches = this.match(regex);
  return matches
    ? this.replace(new RegExp(matches.join("|"), "g"), "")
    : this.toString();
};

String.prototype.isEmail = function (): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(this.toString());
};

String.prototype.toRegex = function (): RegExp {
  return new RegExp(this.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
};

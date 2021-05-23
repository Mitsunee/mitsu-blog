/* eslint-env jest */
const path = require("path");

const testee = require("../src/utils/joinPath");
const { default: joinPath } = testee;

const cwd = process.cwd();

describe("test joinPath", () => {
  it("join simple path", () => {
    const testPath = "assets";
    expect(joinPath(testPath)).toEqual(path.join(cwd, testPath));
  });
  it("join complex path", () => {
    const testPath = ["assets", "blog", "posts"];
    expect(joinPath(...testPath)).toEqual(path.join(cwd, ...testPath));
  });
});

"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-knex-express:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(["project-name"]);
  });

  it("creates files", () => {
    assert.file([
      "listen.js",
      "knexfile.js",
      "app.js",
      "README.md",
      "spec/app.spec.js",
      "routes/api.js",
      "errors/index.js",
      "db/connection.js",
      "db/setup.sql",
      "db/data/index.js",
      "db/data/dev-data/index.js",
      "db/data/test-data/index.js",
      "db/seeds/seed.js"
    ]);
  });

  it("creates a .gitignore", () => {
    assert.file(".gitignore");

    assert.fileContent(".gitignore", "node_modules\nknexfile.js\n.DS_Store");
  });

  it("initialises npm", () => {
    assert.file("package.json");
  });
});

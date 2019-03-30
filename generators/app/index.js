"use strict";
const Generator = require("yeoman-generator");
const { bold } = require("chalk");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", { type: String, required: false });
  }

  async prompting() {
    const prompts = this.options.name
      ? []
      : [
          {
            type: "input",
            name: "name",
            message: "What would you like to name this project?",
            required: true
          }
        ];

    const props = await this.prompt(prompts);
    this.props = props;
  }

  paths() {
    this.name = this.options.name || this.props.name;
    this.destinationRoot(this.name);
    this.startTime = Date.now();
  }

  writing() {
    const projectFolder = bold.green(`${process.cwd()}`);
    this.log(`Creating a new project in ${projectFolder}.`);
    this.fs.copyTpl(this.templatePath(""), this.destinationPath(""), {
      name: this.name
    });

    const gitignore = "node_modules\nknexfile.js\n.DS_Store";
    this.fs.write(".gitignore", gitignore);
  }

  install() {
    const deps = ["express", "knex", "pg"];
    const devDeps = ["mocha", "chai", "supertest", "nodemon"];

    this.log("Installing dependencies...");
    this.npmInstall(deps);
    this.log("Installing dev dependencies...");
    this.npmInstall(devDeps, { "save-dev": true });
  }

  _git() {
    this.log("Initialized a git repository.");
    this.spawnCommandSync("git", ["init", "--quiet"]);
    this.spawnCommandSync("git", ["add", "--all"]);
    this.spawnCommandSync("git", ["commit", "-m", "initial commit", "--quiet"]);
  }

  end() {
    this._git();
    const timeTaken = (Date.now() - this.startTime) / 1000;
    this.log(`✨ ${bold.green("Done")} in ${timeTaken}s`);
  }
};

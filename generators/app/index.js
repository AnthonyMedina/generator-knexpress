"use strict";
const Generator = require("yeoman-generator");
const { green } = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", { type: String, required: false });
  }

  async prompting() {
    this.log(yosay(`Welcome to the ${green("knex + express")} generator!`));

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
  }

  writing() {
    this.fs.copyTpl(this.templatePath(""), this.destinationPath(""), {
      name: this.name
    });

    const gitignore = "node_modules\nknexfile.js\n.DS_Store";
    this.fs.write(".gitignore", gitignore);
  }

  install() {
    this.npmInstall(["express", "knex", "pg", "body-parser"], {
      "save-dev": false
    });
    this.npmInstall(["mocha", "chai", "supertest", "nodemon"], {
      "save-dev": true
    });
  }
};

"use strict";
const Generator = require("yeoman-generator");
const { green } = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", { type: String, required: false });
  }

  prompting() {
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

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  paths() {
    const name = this.options.name || this.props.name;
    this.destinationRoot(name);
  }

  writing() {
    const name = this.options.name || this.props.name;
    this.fs.copyTpl(this.templatePath(""), this.destinationPath(""), { name });
  }

  install() {
    this.npmInstall(["express", "knex", "pg", "body-parser"], {
      "save-dev": false
    });
    this.npmInstall(["mocha", "chai", "supertest"], { "save-dev": true });
  }
};

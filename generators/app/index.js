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
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );
  }

  install() {
    this.npmInstall();
  }
};

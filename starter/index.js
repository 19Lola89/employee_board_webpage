const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const questions = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name? ",
        validate: (input) => {
          if (!input) {
            return "Please enter correct name";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "Employee ID",
        message: "What is your employee ID?",
        validate: (input) => {
          if (!input) {
            return "Please enter your employee ID";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "Email",
        message: "What is your email address?",
        validate: (input) => {
          if (!input) {
            return "Please enter your email address? ";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "office",
        message: "What is your office number?",
        validate: (input) => {
          if (!input) {
            return "Please fill in N/A if there is nothing to add to usage";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "credits",
        message:
          "list your collaborators,if any, with links to their github profiles",
        validate: (input) => {
          if (!input) {
            return "Please fill in N/A if there is nothing to add to credits";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "license",
        message: "Please choose your license",
        choices: ["MIT License", "Apache license", "GPL license", "None"],
        validate: (input) => {
          if (!input) {
            return "Please choose at least one option";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "features",
        message: "please list the features of your project",
      },
      {
        type: "input",
        name: "test",
        message: "What are the test instructions?",
      },
      {
        type: "input",
        name: "contribution",
        message: "please add contributions, if any.",
      },
      {
        type: "input",
        name: "gitHub",
        message: "Please add your github url",
      },
    ])

    // passing the answers from the input to generateMarkdown.js
    .then((answers) => {
      writeToFile("index.html", generateMarkdown(answers));
    });
};

// dynamically writing README file
function writeToFile(filename, data) {
  fs.writeFile(filename, data, (err) =>
    err ? console.log(err) : console.log("Success!")
  );
}

// function call to initialize program
questions();

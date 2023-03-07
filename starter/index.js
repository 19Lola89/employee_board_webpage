const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];
let managerQuestionsAsked = false;

const managerQuestions = () => {
  return inquirer
    .prompt([
      //team manager questions
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
        name: "employeeID",
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
        name: "email",
        message: "What is your email address?",
        validate: function (input) {
          // Regular expression to match email address format
          const emailRegex = /\S+@\S+\.\S+/;

          if (emailRegex.test(input)) {
            return true;
          } else {
            return "Please enter a valid email address";
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
        validate: (input) => {
          if (!input) {
            return "Please provide an office number";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.employeeID,
        answers.email,
        answers.officeNumber
      );
      team.push(manager);
      askQuestions();
    });
};

// engineer questions

const engineerQuestions = () => {
  return inquirer
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
        name: "employeeID",
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
        name: "email",
        message: "What is your email address?",
        validate: function (input) {
          // Regular expression to match email address format
          const emailRegex = /\S+@\S+\.\S+/;

          if (emailRegex.test(input)) {
            return true;
          } else {
            return "Please enter a valid email address";
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "Please add your github username",
        validate: (input) => {
          if (!input) {
            return "Please enter correct username";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.employeeID,
        answers.email,
        answers.gitHub
      );
      team.push(engineer);
      askQuestions();
    });
};

// intern questions

const internQuestions = () => {
  return inquirer
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
        name: "employeeID",
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
        name: "email",
        message: "What is your email address?",
        validate: function (input) {
          // Regular expression to match email address format
          const emailRegex = /\S+@\S+\.\S+/;

          if (emailRegex.test(input)) {
            return true;
          } else {
            return "Please enter a valid email address";
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Please add your school name",
        validate: (input) => {
          if (!input) {
            return "Please enter correct school";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.employeeID,
        answers.email,
        answers.school
      );
      team.push(intern);
      askQuestions();
    });
};
// prompt for choosing which set of questions to answer

const askQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "questionSet",
        message: "Please choose your position",
        choices: ["manager", "intern", "engineer", "done"],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.questionSet) {
        case "engineer":
          engineerQuestions();
          break;

        case "intern":
          internQuestions();
          break;

        case "manager":
          if (!managerQuestionsAsked) {
            managerQuestions();
            managerQuestionsAsked = true;
          } else {
            console.log("Manager position has been added already");
            askQuestions();
          }
          break;

        default:
          buildTeam();
      }
    });
};
askQuestions();

// team builder
const buildTeam = () => {
  console.log("The team has been built");
};

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}
fs.writeFileSync(outputPath, render(team), "utf-8");
//------------------------------------------------------------------

// const addManager = async () => {
//   const answers = await inquirer.prompt(managerQuestions);
//   const manager = new Manager(
//     answers.name,
//     answers.id,
//     answers.email,
//     answers.officeNumber
//   );
//   team.push(manager);
//   addEmployee();
// };

// const addEngineer = async () => {
//   const answers = await inquirer.prompt(engineerQuestions);
//   const engineer = new Engineer(
//     answers.name,
//     answers.id,
//     answers.email,
//     answers.github
//   );
//   team.push(engineer);
//   addEmployee();
// };

// const addIntern = async () => {
//   const answers = await inquirer.prompt(internQuestions);
//   const intern = new Intern(
//     answers.name,
//     answers.id,
//     answers.email,
//     answers.school
//   );
//   team.push(intern);
//   addEmployee();
// };

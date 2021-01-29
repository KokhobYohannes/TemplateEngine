const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");
const { type } = require("os");

const teamMembers = [];
const idArray = [];

function createManager() {
    console.log("Create your team.");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the name of the team manger?",
            validate: answer => {
                if (answer != "") {
                    return true;
                }
                return "Please enter a name to proceed."
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the team manager's office ID?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a positive number greater than zero."
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is the team manager's email address?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address to proceed."
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a positive number greater than zero."
            }
        },
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
    })
};

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "which team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I do not want to add any more team members."
            ]
        }
    ]).then(userChoice => {
        switch (userChoice.memberChoice) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                buildTeam();
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the name of the engineer?",
            validate: answer => {
                if (answer != "") {
                    return true;
                }
                return "Please enter a name to proceed."
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the engineer office ID?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a positive number greater than zero."
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email address?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+|.\S./
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address to proceed."
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's github page?",
            validate: answer => {
                if (answer != "") {
                    return true;
                }
                return "Please enter an account name to proceed."
            }
        },
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.managerGithub);
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
    });
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the name of the intern?",
            validate: answer => {
                if (answer != "") {
                    return true;
                }
                return "Please enter a name to proceed."
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is the intern office ID?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a positive number greater than zero."
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email address?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+|.\S./
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address to proceed."
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the name of the school that the intern attends?",
            validate: answer => {
                if (answer != "") {
                    return true;
                }
                return "Please enter a school name to proceed."
            }
        },
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
    });
}

function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}


createManager();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```




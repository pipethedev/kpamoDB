#!/usr/bin/env node

const args = process.argv
const rl = require('readline');
const path = require('path');
const fs = require('fs');
const low = require('lowdb')
const chalk = require('chalk');
const figlet = require('figlet');
const FileSync = require('lowdb/adapters/FileSync')
const commands = ['create', 'get', 'delete', 'help'];

const Usage  = require('../actions/usage');

let get = new Usage();



// usage represents the help guide
const usage = function() {
    const usageText = `
  ${chalk.yellow(
        figlet.textSync('Kpamo', { horizontalLayout: 'full' })
    )}
  Kpamo is a simple document based database.

  usage:
    kpamo <command>

    commands can be:

    create:  used to create a new database
    get:     used to retrieve your database
    delete:  used to delete a database
    help:    used to print the usage guide
  `;
    console.log(usageText)
}

// used to log errors to the console in red color
function errorLog(error) {
    const eLog = chalk.red(error)
    console.log(eLog)
}

// we make sure the length of the arguments is exactly three
if (args.length > 3) {
    errorLog(`only one argument can be accepted`)
    usage()
}

if (commands.indexOf(args[2]) === -1) {
    usage()
}

switch(args[2]) {
    case 'help':
        //usage()
        get.readFile('users');
        break
    case 'create':
        newDatabase().then(r => {});
        break
    case 'get':
        listDB().then(r => {});
        break
    case 'delete':
        deleteDB().then(r => {

        })
        break
    default:
        usage()
}


function prompt(question) {
    const r = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    return new Promise((resolve, error) => {
        r.question(question, answer => {
            r.close()
            resolve(answer)
        });
    })
}

async function newDatabase() {
    const question = chalk.blue('Type in your database name : ')
    let create = await prompt(question);
    await createFile(create);
}

async function listDB(){
    const directoryPath = path.join(__dirname, 'db');
    fs.readdir(directoryPath,  (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            console.log(file + '✔');
        });
    });
}

async function createFile(name){
    const adapter = new FileSync(`db/${name}.json`)
    const db = low(adapter);
    db.defaults({ todos: []}).write()
    console.log(`${name} created successfully`);
    process.exit(1);
}

async function deleteDB(){
    const question = chalk.blue('Type in your database name you would like to delete : ')
    let create = await prompt(question);
    await deleteFile(create);
}

async function deleteFile(name){
    let pathToFile =  path.join(__dirname, `db/${name}.json`);
    fs.unlink(pathToFile, function(err) {
        if (err) {
            console.log(chalk.red(err))
            process.exit(1);
        } else {
            console.log(chalk.green('Database successfully deleted'))
            process.exit(1);
        }
    })
}
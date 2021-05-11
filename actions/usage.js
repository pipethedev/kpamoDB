"use strict";

const chalk =  require("chalk");
const fs = require('fs');
const path = require('path');
const csvwriter = require('csv-writer');
const homeDir = require('os').homedir();

class Model {
    //convert file to csv
    async toCsv(name){
        let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
        if (fs.existsSync(pathToFile)) {
            let file = fs.readFileSync(pathToFile, 'utf8');
            let jsonData = JSON.parse(file);
            await jsonToCSV(name, jsonData);
        }else{
            console.log(chalk.red(`The db document ${name} does not exist`))
        }
    }

    //fetches all objects in document
    find(name){
            let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
            if (fs.existsSync(pathToFile)) {
                let file = fs.readFileSync(pathToFile, 'utf8');
                console.log(JSON.parse(file));
            }else{
                console.log(chalk.red(`The db document ${name} does not exist`))
            }
    }

    //fetch data in a document by id
    idFinder(name, id){
        let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
        if (fs.existsSync(pathToFile)) {
            let json = fs.readFileSync(pathToFile, 'utf8');
            let newFile = JSON.parse(json);
            let data = newFile.find(data => data.id === id);
            console.log(data);
        }else{
            console.log(chalk.red(`The db document ${name} does not exist`))
        }
    }

    //adds new object to document file
    make(name, data){
        let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
        if (fs.existsSync(pathToFile)) {
            if(typeof data !== 'object'){
                console.log(chalk.red(`Invalid data type passed`))
            }
            let json = fs.readFileSync(pathToFile, 'utf8');
            let newFile = JSON.parse(json);
            let file = fs.readFileSync(pathToFile, 'utf8');
            let gotten = JSON.parse(file);
            let lastItem = gotten[gotten.length - 1]
            if(lastItem){
                data.id = lastItem.id + 1;
            }else{
                data.id = 1;
            }
            newFile.push(data)
            fs.writeFile(`tmp/${name}.json`, JSON.stringify(newFile), (err) => {
                if (err) console.log(chalk.red(err));
                console.log(`${JSON.stringify(newFile)}`);
            });
        }else{
            console.log(chalk.red(`The db document ${name} does not exist`))
        }
    }

    //remove an object from a document file
    remove(name, id){
        let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
        if (fs.existsSync(pathToFile)) {
            let json = fs.readFileSync(pathToFile, 'utf8');
            let info = JSON.parse(json);
            const filterArray = info.filter((item) => item.id !== id);
            fs.writeFile(`tmp/${name}.json`, JSON.stringify(filterArray), (err) => {
                if (err) console.log(err);
                console.log(`${JSON.stringify(filterArray)}`);
            });
        }else{
            console.log(chalk.red(`The db document ${name} does not exist`))
        }
    }

    update(name, id, data){
        let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
        if (fs.existsSync(pathToFile)) {
            //pointers
            let objects = Object.getOwnPropertyNames(data);
            let json = fs.readFileSync(pathToFile, 'utf8');
            //original data
            let info = JSON.parse(json);
            //grabs the data using the specific id
            let get = info.filter(x => x.id === id);
            //remove found data
            let index = info.findIndex((o) => {
                return o.id === id;
            });
            if (index !== -1) info.splice(index, 1);
            //remaining data
            objects.forEach(g => {
                get[0][g] = data[g];
            });
            let updated = get[0];
            info.push(updated);
            fs.writeFile(`tmp/${name}.json`, JSON.stringify(sortArray(info)), (err) => {
                if (err) console.log(chalk.red(err));
                console.log(chalk.green(`${JSON.stringify(sortArray(info))}`));
            });
        }else{
            console.log(chalk.red(`The db document ${name} does not exist`))
        }
    }
}

function sortArray(array){
    array.sort((a, b) => {
        return a.id - b.id;
    });
    return array;
}

async function jsonToCSV (name, data) {
    let path = `${homeDir}/Downloads/${name}.csv`;
    const csvWriter = await csvwriter.createObjectCsvWriter({
        // Output csv file name is geek_data
        path,
        header: [
            // Title of the columns (column_names)
            {id: 'col1', title: 'COL1'},
            {id: 'col2', title: 'COL2'},
            {id: 'col3', title: 'COL3'},
        ]
    });
    await csvWriter
        .writeRecords(data)
        .then(()=> console.log(chalk.green(`Success, check downloads to get your ${name}.csv file`)));
}

module.exports = Model;
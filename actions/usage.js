const fs = require('fs');
const path = require('path');

module.exports =  class Usage {

    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    //fetches all objects in document
    find(name){
        try {
            let pathToFile =  path.join(process.cwd(), `db/${name}.json`);
            let file = fs.readFileSync(pathToFile, 'utf8');
            console.log(file);
        } catch (err) {
            console.error(err)
        }
    }

    //fetch data in a document by id
    idFinder(name, id){
        try {
            let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
            let json = fs.readFileSync(pathToFile, 'utf8');
            let newFile = JSON.parse(json);
            let data = newFile.find(data => data.id === id);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    //adds new object to document file
    make(name){
        try {
            let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
            let json = fs.readFileSync(pathToFile, 'utf8');
            let newFile = JSON.parse(json);
            newFile.push({
                name : 'Muritala David',
                age: 17
            })
            fs.writeFile(`tmp/${name}.json`, JSON.stringify(newFile), (err) => {
                if (err) console.log(err);
                console.log(`${JSON.stringify(newFile)}`);
            });
        } catch (e) {
            console.log(e);
        }
    }

    //remove an object from a document file
    remove(name, id){
        let pathToFile =  path.join(process.cwd(), `tmp/${name}.json`);
        let json = fs.readFileSync(pathToFile, 'utf8');
        let info = JSON.parse(json);
        const filterArray = info.filter((item) => item.id !== id);
        fs.writeFile(`tmp/${name}.json`, JSON.stringify(filterArray), (err) => {
            if (err) console.log(err);
            console.log(`${JSON.stringify(filterArray)}`);
        });
    }

    update(){}
}
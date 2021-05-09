const fs = require('fs');
const path = require('path');

module.exports =  class Usage {

    constructor(name) {
        this.name = name;
    }

    readFile(name){
        try {
            let pathToFile =  path.join(process.cwd(), `db/${name}.json`);
            const data = fs.readFileSync(pathToFile, 'utf8')
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }
}
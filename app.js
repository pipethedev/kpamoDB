const Model = require('./index');

let app = new Model();

return app.make('users', {
    name : 'bad mos',
    age: 27
})


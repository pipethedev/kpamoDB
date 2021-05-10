const Model  = require('./index');

let app = new Model();

return app.make('users', {
    name : 'James',
    amount: 100
});


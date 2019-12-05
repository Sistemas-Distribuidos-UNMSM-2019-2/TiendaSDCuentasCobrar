const app = require('./config/server');

require('./app/routes/cuentas') (app);
require('./app/routes/consumer') (app);

app.listen(app.get('port'), () =>{
    console.log('server on port ', app.get('port'));
});
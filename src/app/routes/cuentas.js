const dbConnection = require('../../config/dbConnection');

module.exports = app => {
    const connection = dbConnection();

    app.get('/', (req, res) => {

        let sql = 'CALL listarFacturas()';

        connection.query(sql, (error, result) => {
            if (error) {
                return console.error(error.message);
            }

            console.log(result[0]);

            res.render('cuentas/cuentas', {
                cuentas: result[0]
            });

        });

        //res.render('cuentas/cuentas');
        //res.send('hello world');
    });

    app.post('/pago', (req, res) => {
        const { idOrden } = req.body;

        let sql = 'CALL registrarPago(?)';

        connection.query(sql, [idOrden], (error, result) => {
            if(error){
                return console.error(error.message);
            }
            //res.redirect('/');
            res.json({ success: true });
        });
        
    });
}
const kafka = require('kafka-node');
const config = require('../../config/kafkaConfiguration');
const dbConnection = require('../../config/dbConnection');
var factura = "";

console.log('consumer');

try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({ 'kafkaHost': config.kafka_server });
    let consumer = new Consumer(
        client,
        [{ topic: config.kafka_topic, partition: 0}],
        {
            groupId: "cuent2N",
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: false
        }
    );
    consumer.on('message', async function (message) {
        //alert(typeof (message.value));
        console.log('here');
        console.log(
            'kafka-> ',
            message.value
        );
        factura = message.value;
        console.log("Factura : " + typeof (factura));

    })
    consumer.on('error', function (err) {
        console.log('error', err);
    });
}
catch (e) {
    console.log(e);
}

module.exports = app => {
    const connection = dbConnection();

    app.post('/factura', (req, res) => {
        if (factura == "") {
            //onsole.log("Facturas : " + factura);
            res.json({ success: false });
        }
        else {
            
            var fact = JSON.parse(factura);

            console.log("Facturas 2 : " + new Date(fact.fechaFactura));

            let sql = 'CALL registrarFactura(?,?,?)';

            console.log("codigoOrden : " + fact.nCodigoOrden);
            connection.query(sql, [fact.nCodigoOrden, new Date(fact.fechaFactura), "Pendiente"], (error, result) => {
                if (error) {
                    return console.error(error.message);
                }
                factura = "";
                res.json({ success: true });
                //res.redirect('/');
            });
        }

        //res.render('cuentas/cuentas');
        //res.send('hello world');
    });
}
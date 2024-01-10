const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
        origin: ['http://localhost:8000', 'http://127.0.0.1:8000']

    };
app.use(cors(corsOptions));
const {sequelize, Proizvod, Gorivo, Usluga, Narudzbina} = require('./models');


const prooizvodRoutes = require('./routes/proizvod.js');
const gorivoRoutes = require('./routes/gorivo.js');
const uslugaRoutes = require('./routes/usluga.js');
const narudzbinaRoutes = require('./routes/narudzbina.js');
const narudzbinaproizvodRoutes = require('./routes/narudzbinaproizvod.js');
const narudzbinagorivoRoutes = require('./routes/narudzbinagorivo.js');



app.get('/',(req, res) => {
    res.send('Hello from REST API');
});

/*

 */
app.use("/proizvod", prooizvodRoutes);
app.use("/gorivo", gorivoRoutes);
app.use("/usluga", uslugaRoutes);
app.use("/narudzbina", narudzbinaRoutes);
app.use("/narudzbinaproizvod", narudzbinaproizvodRoutes);
app.use("/narudzbinagorivo", narudzbinagorivoRoutes);


app.get('/test', (req, res) => {
    res.send('CORS enabled test route is working!');
});



app.listen({port: 9001}, async () => {
    console.log('Server up on http://localhost:9001');
    await sequelize.sync({force: true});
    console.log('Database synced');
});

const path = require('path');

const Persona = require('./models/persona')

const express = require('express');
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const tiendaRoutes = require('./routes/tienda')
const errorController = require('./controllers/error')

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(tiendaRoutes);

app.use((req, res, next) => {
    console.log('Viendo que URL el usuario inhresa pero no existe')
    console.log(req.url);
    next();
});

app.use(errorController.get404)

app.listen(3000, () => {
    console.log('Mi aplicacion permite el uso de los siguientes tipos de doc: ', Persona.tiposDeDocumento())
});
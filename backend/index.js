const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const createError = require('http-errors');

//conexion con la BD
mongoose.connect('mongodb+srv://pabor:objp0174@cluster0.u65t8p4.mongodb.net/')   //mongodb://username:password@host:port/database?options...'
    .then((x) => {
        // console.log(`${x.connections[0]}`)
        console.log(x.connections[0].name);
    }).catch((error) => {
        console.log(error.reason);
    })

//servidor web
const empleadoRouter = require('./routes/empleado.routes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', empleadoRouter)

//habilitar el puerto
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ', port);
})

//manejador de error 404 (not found)
app.use((req, res, next) => {
    next(createError(404))
})

//manejador de errores
app.use(function (err, req, res, next) {
    console.log(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})
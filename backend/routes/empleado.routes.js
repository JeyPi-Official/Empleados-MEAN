const express = require('express');
const empleadoRouter = express.Router();

//declaramos un objeto de nuestro modelo
let empleado = require('../models/Empleado');

//agregar un nuevo empleado
empleadoRouter.route('/agregar').post((req, res) => {
    empleado.create(req.body).then((data) => {
        console.log('Se insertó un documento');
        res.send(data);
    }).catch((err) => {
        console.log(err);
    })
});

//obtener todos los empleados
empleadoRouter.route('/empleados').get((req, res) => {
    empleado.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

//buscar un empleado por su Id
empleadoRouter.route('/empleado/:id').get((req, res) => {
    empleado.findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        })
});

//actualizar un empleado
empleadoRouter.route('/actualizar/:id').put((req, res) => {
    empleado.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
        .then((data) => {
            console.log('Se actualizó el documento');
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        })
});

//eliminar un empleado
empleadoRouter.route('/eliminar/:id').delete((req, res) => {
    empleado.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log('Se eliminó correctamente!');
            res.send(data)
        })
        .catch((err) => {
            console.error(err);
        })
});

module.exports = empleadoRouter
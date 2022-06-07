const express = require('express');
const router = express.Router();
const { Users, Products, Orders } = require('../models');
const passport = require('passport');

// Se crea el usuario y se verifica que no tiene ningun otro igual

router.post('/register', async (req, res, next) => {
  try {
    const { email } = req.body;
    const dataUser = await Users.findOrCreate({
      where: { email },
      defaults: req.body,
    });
    console.log('estoy aquii', dataUser[1]);

    if (dataUser[1]) {
      console.log('Usuario creado!');
    } else {
      console.log('Usuario existente, porfavor pruebe con otros datos  ');
    }
    res.send(dataUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Podemos acceder a localhost:8080/api/users y ver los usuarios

router.get('/', (req, res) => {
  Users.findAll()
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Login de un usuario

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

// Editar tu usuario

router.put('/edit', async (req, res) => {
  try {
    const updateUser = await Users.update(req.body, {
      where: { dni: req.body.dni },
    });
    console.log(req.body);
    res.status(201).send(updateUser);
  } catch (error) {
    console.log(error);
  }
});

//Mostrar al usuario Logeado

router.get('/me', (req, res) => {
  res.send(req.user);
});

module.exports = router;

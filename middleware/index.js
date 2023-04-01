
//Route for Auth(registration)

const express = require('express');
var auth = require('./auth');
const verifikasi = require('./verif');
const connection = require('../database');
const mysql = require('mysql');
const router = express.Router();

//Added registration into public
router.post('/register', auth.register);

//Added Login into public
router.post('/login', auth.login);

/*const getrole = (req, res) => {
    let email = req.params.email;
    connection.query(`SELECT 'role' FROM user WHERE ?`, [email],
     res.get(req.body.role)
    )
};*/

//Authorize addres
router.get('/verif', verifikasi(2), auth.admin);

module.exports = router;
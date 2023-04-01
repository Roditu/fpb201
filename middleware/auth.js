//Controller Autentifikasi
'use strict'

const express = require('express');
const app = express();
var connection = require('../database');
var mysql = require('mysql');
var md5 = require('md5'); //hashing token
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/token');
var ip = require('ip');
const token = require('../config/token');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


//For Register
exports.register = (req,res) => {
    var post = {
        username : req.body.username,
        password : md5(req.body.password),
        email    : req.body.email,
        role     : req.body.role,
        date_created : new Date()
    };

    //check used email
    var query = 'SELECT email FROM ?? WHERE ??=?';
    var table = ['user', 'email', post.email];

    query = mysql.format(query,table);


    connection.query(query, (error, rows) => {
            if(error){
                console.log('Error !!!');
                    res.json({
                        message: error
                     });
            }else{
                if(rows.length == 0){  //Email table is empty or hasnt been used
                    var query = "INSERT INTO ?? SET ?";  //goin to registration
                    var table = ['user'];
                    query = mysql.format(query, table);
                    connection.query(query, post, function(error, rows){
                        if(error){
                            console.log('Error !!!');
                                res.json({
                                  message: error
                                 });
                        }else{
                            response.ok('New User Succesfully Created', res)
                        }
                    });
                }else{
                    response.ok('Email Has Been Registered, Please Use Another', res);
                }
            }
        })
};


//For Login
exports.login = async (req,res) => {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
    var table = ['user', 'password', md5(post.password), 'email', post.email];

    query = mysql.format(query,table);
    connection.query(query, function(error, rows){
        if(error){
            console.log('Error !!!');
            res.json({
                message: error
            });
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 21600
                });
                var id_user = rows[0].id; 

                var data={
                    id_user: id_user,
                    token: token,
                    ip_address: ip.address()
                
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ['token_access'];

                query = mysql.format(query,table);
                connection.query(query, data, function(error, rows){
                   
                    if(error){
                        console.log('Error !!!');
                            res.json({
                                message: error
                            });
                    }else{

                        res.cookie("access", data.token, {
                            maxAge: 21600
                        });         

                        res.json({
                            success: true,
                            message: 'Generate JWT token',
                            token: token,
                            user: data.id_user
                        });
                    }
                });
            }else{
                console.log('wrong email or password');
                    res.json({
                        warning: "Email or Password is Incorrect, Please check again",
                        message: error
                    });
            }
        }
    });

};


exports.admin = function(req,res){
    response.ok('Token Verified', res);
}
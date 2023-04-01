
const jwt = require('jsonwebtoken');
const config = require('../config/token');


function verifikasi(role) {
    return function (req,res,next){

        var tokenbearer = req.header('authorization')
        if(tokenbearer){
            var token = tokenbearer.split(' ')[1];
            
            //verify
            jwt.verify(token, config.secret, function(error, decoded){
                if(error){
                    return res.status(401).send({
                        auth:false,
                        warning: 'error',
                    });
                }else{
                    if(role == 2){
                        req.auth = decoded;
                        next();
                    }else{
                        return res.status(401).send({
                            auth:false,
                            warning: 'Cant authorized client',
                        });
                    }
                }
            });
        }else{
            return res.status(401).send({
                auth:false,
                warning: 'Token Doesnt Exist',

            });
        }
    }
};

module.exports = verifikasi;


//[3]
var response = require('./res');
var connection = require('./database');
var model = require('./middleware/models')
const jwt = require('jsonwebtoken');
const {generatetoken} = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const verifikasi = require('./middleware/verif');

//action dari user 

exports.index = function(req,res){
    response.ok('REST API LAUNCHED !', res)
};



//to show all the data [GET]
exports.showAll = function(req,res){
    connection.query('SELECT * FROM `digidb_digimonlist`',
    function(error, rows, fields){
        if(error){
            console.log('Error !!!');
            res.json({
                message: error
            });
        }else{
            response.ok(rows, res);

        }
    });
};

exports.showpage = function(req,res){
    var perPage = 10;
    var curPage = req.query.page || 1;
    var offset = (perPage - 1)* perPage;
   
    connection.query('SELECT * FROM `digidb_digimonlist` PERPAGE ${perPage} OFFSET ${offset}', 
    function(error, rows, fields){
        if(error){
            console.log('Error !!!');
            res.json({
                message: error
            });
        }else{
            response.ok(rows, res);
        }
        })
    }



//to show base on number [GET]
exports.shownumber = function(req,res){
    let number = req.params.number;
    connection.query('SELECT * FROM digidb_digimonlist WHERE Number = ?', [number],
    function(error, rows, fields){
        if(error){
            console.log('Error !!!');
            res.json({
                message: error
            });res.json({
                message: error
            });
        }else{
            response.ok(rows, res);
        }
    });
};

//to add digimon [POST] 
exports.add_digi = async (req,res) => {
    const {body} = req;
    try {
        await model.createNewDigi(body);
         res.json({
            message: 'Create New Digi Success',
            data: body
         });
    } catch (error) {
        console.log('Error !!!');
            res.status(500).json({
                message: error,
            });
    }
   
    /*
    var Digimon = req.body.Digimon;
    var Stage = req.body.Stage;
    var Type = req.body.Type;
    var Attribute =  req.body.Attribute;
    var Memory = req.body.Memory;

    connection.query('INSERT INTO digidb_digimonlist (Digimon,Stage,Type,Attribute,Memory) Values([value-2],[value-3],[value-4],[value-5],[value-6])',
        [Digimon,Stage,Type,Attribute,Memory],
        function(error, rows, fields){
            if(error){
                console.log('Error !!!');
            }else{
                response.ok('Digimon added on Digilist', res);
            }
        });*/
};


//change digi base on number [PATCH]
exports.update_digi = async(req,res) => {
    var {Number} = req.params;
    const {body} = req;
    try {
        await model.updateDigi(body, Number);
        console.log('Digimon', Number);
        
        res.json({
            message: 'Updated Digi Success',
            data: {
                Number: Number,    
                ...body
            }
   });
    } catch (error) {
        console.log('Error !!!');
            res.status(500).json({
                message: error,
            });
    }

    /* 
    var Number = req.body.Number;
    var Digimon = req.body.Digimon;
    var Stage = req.body.Stage;
    var Type = req.body.Type;
    var Attribute =  req.body.Attribute;
    var Memory = req.body.Memory;

    connection.query('UPDATE digidb_digimonlist SET Digimon=?, Stage=?, Type=?, Attribute=?, Memory=? WHERE Number=?',
    function(error, rows, fields){
        if(error){
            console.log('Error !!!');
        }else{
            response.ok('Digimon has been Changed', res);
        }
    });*/
};

//delete digi base on number
exports.delete_digi = async(req,res) => {
    var {Number} = req.params;

    try {
        await model.deleteDigi(Number);
        console.log("Digimon", Number);
             res.json({
                 message : "Digimon Deleted"
    });

    } catch (error) {
        console.log('Error !!!');
            res.status(500).json({
                message: error,
            });
    }
    
    /*
    var Number = req.body.Number ;
    connection.query('DELETE FROM digidb_digimonlist WHERE Number=?',
    [Number],
    function(error, rows, fields){
        if(error){
            console.log('Error !!!');
        }else{
            response.ok('Digimon has been Deleted', res);
        }
    });*/
};
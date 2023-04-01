//[1]
'use strict';
var control = require('./controller');
var verifikasi = require('./middleware/verif');
var auth = require('./middleware/auth');

//pemanggilan fungsi controller

module.exports = function(app){

    //[homepage]
    app.route('/')
        .get(control.index); 

    //[GET]
    app.get('/show', control.showAll);

    app.get('/show/:number', control.shownumber);

    //app.get('/showpage?page=1', control.showpage);

    //[POST]
    app.post('/create', verifikasi(2), control.add_digi);

    //[PATCH]
    app.patch('/patch/:Number', verifikasi (2), control.update_digi);

    //[DELETE]
    app.delete('/delete/:Number', verifikasi(2), control.delete_digi);

};
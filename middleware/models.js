const pool = require('../database');

const createNewDigi = (body) => {
    const SQLquery = `  INSERT INTO digidb_digimonlist (Digimon, Stage, Type, Attribute, Memory, SigMove) 
                        VALUES ('${body.Digimon}',
                        '${body.Stage}',
                        '${body.Type}',
                        '${body.Attribute}',
                        '${body.Memory}',
                        '${body.SigMove}')  `

    return pool.execute(SQLquery);
}

const updateDigi = (body, Number) => {
    const SQLquery = `  UPDATE digidb_digimonlist 
                        SET Digimon='${body.Digimon}', Stage='${body.Stage}', Type='${body.Type}', Attribute='${body.Attribute}', Memory='${body.Memory}', SigMove='${body.SigMove}'
                        WHERE Number=${Number} `
    
    return pool.execute(SQLquery);
}

const deleteDigi = (Number) => {
    const SQLquery =`   DELETE FROM digidb_digimonlist
                        WHERE Number= ${Number}`;
            
    return pool.execute(SQLquery);
}


module.exports = {
    createNewDigi,
    updateDigi,
    deleteDigi,

}
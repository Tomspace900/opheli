const suppClient = (db,idMutuelle,idPatient) => {
    const user = "DELETE FROM `opheli`.`souscrire` WHERE (`IdMutuelle` = ?) and (`IdPatient` = ?);";
    db.query(user, [idMutuelle,idPatient], (err, add)=> {
        console.log(err)

    });
}

module.exports = {suppClient}
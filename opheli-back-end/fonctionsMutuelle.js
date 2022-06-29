const suppClient = (db,idMutuelle,idPatient) => {
    const user = "DELETE FROM `opheli`.`souscrire` WHERE (`IdMutuelle` = ?) and (`IdPatient` = ?);";
    db.query(user, [this.idMutuelle,this.idPatient], (err, add)=> {
        console.log(err)

    });
}

module.exports = {suppClient}
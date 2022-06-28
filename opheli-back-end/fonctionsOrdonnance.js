class Ordonnance {
    constructor(type, dateCreation, notes, idPrescripteur, idPatient){
        this.type = type;
        this.dateCreation = dateCreation;
        this.notes = notes;
        this.idPrescripteur = idPrescripteur;
        this.idPatient = idPatient;
        this.categorie = [];
    }

    addCategorie(categorie){
        this.categorie.push(categorie);
    }

    addToDatabase(db){
        const addOrdo = "INSERT INTO ordonnance(Type, DateCreation, Notes, IdPrescripteur, IdPatient) VALUES (?, ?, ?, ?, ?);";
        db.query(addOrdo, [this.type, this.dateCreation, this.notes, this.idPrescripteur, this.idPatient]);
        const idQuery = "SELECT idOrdonnance FROM ordonnance WHERE idOrdonnance = (SELECT MAX(idOrdonnance) FROM ordonnance WHERE idPatient = ?);";
        db.query(idQuery, [this.idPatient], (err, result) => {
            this.idOrdonnance = result;
        })
        this.categorie.forEach((categorie) => {
            categorie.addToDatabase(db, this.idOrdonnance);
        })
    }
}

class Categorie {
    constructor(type, nbRenouvTotal){
        this.type = type;
        this.nbRenouvTotal = nbRenouvTotal;
        this.soins = [];
    }

    addSoin(soin){
        this.soins.push(soin);
    }

    addToDatabase(db, idOrdonnance){
        this.idOrdonnance = idOrdonnance;
        const addCategorie = "INSERT INTO categorie(Type, NbRenouvTotal, IdOrdonnance) VALUES (?, ?, ?);";
        db.query(addCategorie, [this.type, this.nbRenouvTotal, this.idOrdonnance]);
        const idQuery = "SELECT idCategorie FROM categorie WHERE idCategorie = (SELECT MAX(idCategorie) FROM categorie WHERE idOrdonnance = ?);"
        db.query(idQuery, [this.idOrdonnance], (err, result) => {
            this.idCategorie = result;
        })
        this.soins.forEach((soin) => {
            soin.addToDatabase(db, this.idCategorie);
        })
    }
}

class Soin {
    constructor(nom, description, nbRenouvRestant){
        this.nom = nom;
        this.description = description;
        this.nbRenouvRestant = nbRenouvRestant;
    }

    addToDatabase(db, idCategorie){
        this.idCategorie = idCategorie;
        const addSoin = "INSERT INTO soin(Nom, Description, IdCategorie) VALUES (?, ?, ?);";
        db.query(addSoin, [this.nom, this.description, this.idCategorie]);
    }
}

function createOrdo(ordonnance){

}

module.exports = {createOrdo}
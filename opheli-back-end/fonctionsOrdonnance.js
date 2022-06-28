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
        this.categorie.forEach((categorie) => {
            categorie.addToDatabase(db);
        })
    }
}

class Categorie {
    constructor(type, nbRenouvTotal, idOrdonnance){
        this.type = type;
        this.nbRenouvTotal = nbRenouvTotal;
        this.idOrdonnance = idOrdonnance;
        this.soins = [];
    }

    addSoin(soin){
        this.soins.push(soin);
    }

    addToDatabase(db){
        const addCategorie = "INSERT INTO categorie(Type, NbRenouvTotal, IdOrdonnance) VALUES (?, ?, ?);";
        db.query(addCategorie, [this.type, this.nbRenouvTotal, this.idOrdonnance]);
        this.soins.forEach((soin) => {
            soin.addToDatabase(db);
        })
    }
}

class Soin {
    constructor(nom, description, nbRenouvRestant, idCategorie){
        this.nom = nom;
        this.description = description;
        this.nbRenouvRestant = nbRenouvRestant;
        this.idCategorie = idCategorie;
    }

    addToDatabase(db){
        const addSoin = "INSERT INTO soin(Nom, Description, IdCategorie) VALUES (?, ?, ?);";
        db.query(addSoin, [this.nom, this.description, this.idCategorie]);
    }
}

function createOrdo(){

}
module.exports = {Ordonnance, Categorie, Soin, createOrdo}
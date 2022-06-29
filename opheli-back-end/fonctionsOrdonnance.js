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
        db.query(addOrdo, [this.type, this.dateCreation, this.notes, this.idPrescripteur, this.idPatient], (error, resultat) => {
            const idQuery = "SELECT idOrdonnance FROM ordonnance WHERE idOrdonnance = (SELECT MAX(idOrdonnance) FROM ordonnance WHERE idPatient = ?);";
            db.query(idQuery, [this.idPatient], (err, result) => {
                this.idOrdonnance = result;
            })
            this.categorie.forEach((categorie) => {
                categorie.addToDatabase(db, this.idOrdonnance);
            })
        });
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
        db.query(addCategorie, [this.type, this.nbRenouvTotal, this.idOrdonnance], (error, resultat) => {
            const idQuery = "SELECT idCategorie FROM categorie WHERE idCategorie = (SELECT MAX(idCategorie) FROM categorie WHERE idOrdonnance = ?);"
            db.query(idQuery, [this.idOrdonnance], (err, result) => {
                this.idCategorie = result;
            })
            this.soins.forEach((soin) => {
                soin.addToDatabase(db, this.idCategorie);
            })
        });
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

function createOrdo(ordonnance){ //TODO à fini j'attends le front, à mettre nbRenouvRestants de Soin comme nbRenouvTotal à la création
    const ordo = new Ordonnance(ordonnance.type, ordonnance.dateCreation, ordonnance.notes, ordonnance.idPrescripteur, ordonnance.idPatient);
    if(ordonnance.type == 'simple'){
        const categorie = new Categorie('simple', ordonnance.nbRenouvTotal);
        ordonnance.soinsSimples.forEach((soin) => {

        })
    }
}

//return la query pour select l'ordonnance selon le rôle
function selectOrdo(db, role){
    let select = "";
    switch(role){
        case 'client':
            select = "SELECT * FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse WHERE o.IdOrdonnance = ?;";
            break;
        case 'medecin':
            select = "SELECT c.*, o.*, p.*, pr.*, s.nom, s.description, s.IdSoin FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse WHERE o.IdOrdonnance = ?;";
            break;
        case 'pharma':
                select = "SELECT c.*, o.IdOrdonnance, o.Type, o.DateCreation, o.DateExpiration, o.IdPatient, o.IdPrescripteur, p.*, pr.*, s.nom, s.description, s.IdSoin FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse WHERE o.IdOrdonnance = ?;";
            break;
        case 'mutuelle':
            select = "SELECT c.*, o.IdOrdonnance, o.Type, o.DateCreation, o.DateExpiration, o.IdPatient, o.IdPrescripteur, p.*, pr.*, s.nom, s.description, s.IdSoin, s.Prix FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse WHERE o.IdOrdonnance = 2;";
            break;
        default:
            return "error";
            break;
    }
    return select;
}

//prolonge l'ordonnance idOrdo de nbMonthsToAdd
function updateDate(db, idOrdo, nbMonthsToAdd){
    const selectDate = "SELECT DateExpiration FROM ordonnance WHERE IdOrdonnance = ?";
    db.query(selectDate, [idOrdo], (err, date) => {
        const updateDate = "UPDATE ordonnance SET DateExpiration = (DATE_ADD(?, interval ? month)) WHERE IdOrdonnance =  ?;";
        db.query(updateDate, [date[0].DateExpiration, nbMonthsToAdd, idOrdo], (error, result) => {
            if(error){
                console.log("erreur lors de la mise à jour de la date");
                console.log(error);
            }
        })
    })
}

module.exports = {createOrdo, selectOrdo, updateDate}
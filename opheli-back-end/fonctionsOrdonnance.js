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
        const addSoin = "INSERT INTO soin(Nom, Description, IdCategorie, NbRestants) VALUES (?, ?, ?, ?);";
        db.query(addSoin, [this.nom, this.description, this.idCategorie, this.nbRenouvRestant]);
    }
}

function createOrdo(ordonnance){ //TODO à fini j'attends le front, à mettre nbRenouvRestants de Soin comme nbRenouvTotal à la création, valable 3 mois par défaut
    const ordo = new Ordonnance(ordonnance.type, ordonnance.dateCreation, ordonnance.notes, ordonnance.idPrescripteur, ordonnance.idPatient);
    if(ordonnance.type == 'simple'){
        const categorie = new Categorie('simple', ordonnance.nbRenouvTotal);
        ordonnance.soinsSimples.forEach((soin) => {

        })
    }
}

//return la query pour select l'ordonnance selon le rôle
function selectOrdo(role){
    let select = "";
    //select général que j'ai adapté aux rôles
    //select = "SELECT o.IdOrdonnance, o.TypeOrdonnance, o.DateCreation, o.Notes, c.TypeCategorie, c.NbRenouvTotal, s.NomSoin, s.Description, s.Prix, s.Alternative, s.NbRestants, a.Rue, a.CodePostal, a.Ville, u.NomUtilisateur, u.PrenomUtilisateur, sp.NomSpecialite FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse INNER JOIN utilisateur u on u.IdUtilisateur = p.IdUtilisateur or u.IdUtilisateur = pr.IdUtilisateur INNER JOIN specialite sp on pr.IdSpecialite = sp.IdSpecialite WHERE o.IdOrdonnance = ?;";
    switch(role){
        case 'client':
            select = "SELECT o.IdOrdonnance, o.TypeOrdonnance, o.DateCreation, o.Notes, c.TypeCategorie, c.NbRenouvTotal, s.NomSoin, s.Description, s.Prix, s.Alternative, s.NbRestants, a.Rue, a.CodePostal, a.Ville, u.NomUtilisateur, u.PrenomUtilisateur, sp.NomSpecialite FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse INNER JOIN utilisateur u on u.IdUtilisateur = p.IdUtilisateur or u.IdUtilisateur = pr.IdUtilisateur INNER JOIN specialite sp on pr.IdSpecialite = sp.IdSpecialite WHERE o.IdOrdonnance = ?;";
            break;
        case 'medecin':
            select = "SELECT o.IdOrdonnance, o.TypeOrdonnance, o.DateCreation, o.Notes, c.TypeCategorie, s.NomSoin, s.Description, a.Rue, a.CodePostal, a.Ville, u.NomUtilisateur, u.PrenomUtilisateur, sp.NomSpecialite FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse INNER JOIN utilisateur u on u.IdUtilisateur = p.IdUtilisateur or u.IdUtilisateur = pr.IdUtilisateur INNER JOIN specialite sp on pr.IdSpecialite = sp.IdSpecialite WHERE o.IdOrdonnance = ?;";
            break;
        case 'pharma':
            select = "SELECT o.IdOrdonnance, o.TypeOrdonnance, o.DateCreation, c.TypeCategorie, c.NbRenouvTotal, s.NomSoin, s.Prix, s.Alternative, s.NbRestants, a.Rue, a.CodePostal, a.Ville, u.NomUtilisateur, u.PrenomUtilisateur, sp.NomSpecialite FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse INNER JOIN utilisateur u on u.IdUtilisateur = p.IdUtilisateur or u.IdUtilisateur = pr.IdUtilisateur INNER JOIN specialite sp on pr.IdSpecialite = sp.IdSpecialite WHERE o.IdOrdonnance = ?;";
            break;
        case 'mutuelle':
            select = "SELECT o.IdOrdonnance, o.TypeOrdonnance, o.DateCreation, c.TypeCategorie, c.NbRenouvTotal, s.NomSoin, s.Prix, s.Alternative, s.NbRestants, a.Rue, a.CodePostal, a.Ville, u.NomUtilisateur, u.PrenomUtilisateur, sp.NomSpecialite FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie INNER JOIN patient p on o.IdPatient = p.IdPatient INNER JOIN prescripteur pr on o.IdPrescripteur = pr.IdPrescripteur INNER JOIN adresse a on pr.IdAdresse = a.IdAdresse INNER JOIN utilisateur u on u.IdUtilisateur = p.IdUtilisateur or u.IdUtilisateur = pr.IdUtilisateur INNER JOIN specialite sp on pr.IdSpecialite = sp.IdSpecialite WHERE o.IdOrdonnance = ?;";
            break;
        default:
            return "error";
            break;
    }
    return select;
}

//return la query pour select la liste des ordos selon le rôle
function selectListOrdo(role){
    let select = "";
    switch (role){
        case 'client':
                select = "SELECT o.IDOrdonnance, o.DateCreation, o.TypeOrdonnance, u.NomUtilisateur, u.PrenomUtilisateur, pr.IdPrescripteur FROM ordonnance o INNER JOIN prescripteur pr on pr.IdPrescripteur = o.IdPrescripteur INNER JOIN utilisateur u on pr.IdUtilisateur = u.IdUtilisateur WHERE IdPatient = ?;";
            break;
        case 'medecin':
                select = "SELECT o.IDOrdonnance, o.DateCreation, o.TypeOrdonnance, u.NomUtilisateur, u.PrenomUtilisateur, p.IdPatient FROM ordonnance o INNER JOIN patient p on p.IdPatient = o.IdPatient INNER JOIN utilisateur u on p.IdUtilisateur = u.IdUtilisateur WHERE IdPrescripteur = ?;";
            break;
        case 'mutuelle':
                select = "SELECT o.IDOrdonnance, o.DateCreation, o.TypeOrdonnance, u.NomUtilisateur, u.PrenomUtilisateur, p.IdPatient FROM ordonnance o INNER JOIN souscrire s on s.IdPatient = o.IdPatient INNER JOIN patient p on p.IdPatient = o.IdPatient INNER JOIN utilisateur u on u.IdUtilisateur = p.IdUtilisateur WHERE IdMutuelle = ?;";
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

//retire une utilisation au soin donné
function useSoin(db, idSoin){
    const selectNbRenouv = "SELECT NbRestants FROM soin WHERE IdSoin = ?;";
    db.query(selectNbRenouv, [idSoin], (err, nb) => {
        if(nb[0].NbRestants > 0){
            const updateRenouv = "UPDATE soin SET NbRestants = ? - 1 WHERE IdSoin = ?;";
            db.query(updateRenouv, [nb[0].NbRestants, idSoin], (error, result) => {
                if(error){
                    console.log("erreur lors de la réduction de nbRestants d'un soin");
                    console.log(error);
                }
            })
        }
    })
}

//set le générique du soin
function addGenerique(db, idSoin, generique){
    if(generique !== null && generique !== ""){
        const setGenerique = "UPDATE soin SET alternative = ? WHERE IdSoin = ?;";
        db.query(setGenerique, [generique, idSoin], (err, res) => {
            if(err){
                console.log("erreur lors de l'attribution d'un générique");
                console.log(err);
            }
        })
    }
}

module.exports = {createOrdo, selectOrdo, updateDate, useSoin, addGenerique, selectListOrdo}
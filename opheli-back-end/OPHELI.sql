DROP TABLE IF EXISTS Code;
CREATE TABLE IF NOT EXISTS Code(
   IdCode VARCHAR(50) NOT NULL,
   Code INT NOT NULL,
   PRIMARY KEY(IdCode)
)ENGINE=InnoDB;


DROP TABLE IF EXISTS Utilisateur;
CREATE TABLE IF NOT EXISTS Utilisateur(
   IdUtilisateur INT AUTO_INCREMENT NOT NULL,
   Nom VARCHAR(50) NOT NULL,
   Prenom VARCHAR(50),
   Mail VARCHAR(50) NOT NULL,
   MotDePasse VARCHAR(200) NOT NULL,
   IdCode VARCHAR(50) NOT NULL,
   PRIMARY KEY(IdUtilisateur),
   UNIQUE(IdCode),
   FOREIGN KEY(IdCode) REFERENCES Code(IdCode)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Patient;
CREATE TABLE IF NOT EXISTS Patient(
   IdPatient CHAR(13) NOT NULL,
   DateNaissance DATE NOT NULL,
   Sexe BOOL NOT NULL,
   Taille INT NOT NULL,
   Poids DECIMAL(4,1) NOT NULL,
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdPatient, IdUtilisateur),
   UNIQUE(IdUtilisateur),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Pharmacien;
CREATE TABLE IF NOT EXISTS Pharmacien(
   IdPharmacien CHAR(11) NOT NULL,
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdPharmacien, IdUtilisateur),
   UNIQUE(IdUtilisateur),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Specialite;
CREATE TABLE IF NOT EXISTS Specialite(
   IdSpecialite INT AUTO_INCREMENT NOT NULL,
   NomSpecialite VARCHAR(50) NOT NULL,
   PRIMARY KEY(IdSpecialite)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Categorie;
CREATE TABLE IF NOT EXISTS Categorie(
   IdCategorie INT AUTO_INCREMENT NOT NULL,
   Type VARCHAR(50) NOT NULL,
   NbRenouvTotal INT NOT NULL,
   NbRenouvRestants INT NOT NULL,
   PRIMARY KEY(IdCategorie)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Adresse;
CREATE TABLE IF NOT EXISTS Adresse(
   IdAdresse INT AUTO_INCREMENT NOT NULL,
   Rue VARCHAR(50) NOT NULL,
   CodePostal VARCHAR(5) NOT NULL,
   Ville VARCHAR(50) NOT NULL,
   PRIMARY KEY(IdAdresse)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Pharmacie;
CREATE TABLE IF NOT EXISTS Pharmacie(
   IdPharmacie INT AUTO_INCREMENT NOT NULL,
   NomPharmacie VARCHAR(50) NOT NULL,
   IdAdresse INT NOT NULL,
   PRIMARY KEY(IdPharmacie),
   UNIQUE(IdAdresse),
   FOREIGN KEY(IdAdresse) REFERENCES Adresse(IdAdresse)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Mutuelle;
CREATE TABLE IF NOT EXISTS Mutuelle(
   IdMutuelle CHAR(11) NOT NULL,
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdUtilisateur,IdMutuelle),
   UNIQUE(IdUtilisateur),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Admin;
CREATE TABLE IF NOT EXISTS Admin(
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdUtilisateur),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Prescripteur;
CREATE TABLE IF NOT EXISTS Prescripteur(
   IdPrescripteur CHAR(11) NOT NULL,
   IdAdresse INT NOT NULL,
   IdSpecialite INT NOT NULL,
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdPrescripteur),
   UNIQUE(IdUtilisateur),
   FOREIGN KEY(IdAdresse) REFERENCES Adresse(IdAdresse),
   FOREIGN KEY(IdSpecialite) REFERENCES Spécialité(IdSpecialite),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Ordonnance;
CREATE TABLE IF NOT EXISTS Ordonnance(
   IdOrdonnance INT AUTO_INCREMENT NOT NULL,
   Type VARCHAR(50) NOT NULL,
   DateCreation DATE NOT NULL,
   DateExpiration DATE NOT NULL,
   Notes TEXT,
   IdPrescripteur CHAR(11) NOT NULL,
   IdPatient CHAR(13) NOT NULL,
   PRIMARY KEY(IdOrdonnance),
   FOREIGN KEY(IdPrescripteur) REFERENCES Prescripteur(IdPrescripteur),
   FOREIGN KEY(IdPatient) REFERENCES Patient(IdPatient)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Soin;
CREATE TABLE IF NOT EXISTS Soin(
   IdSoin INT AUTO_INCREMENT NOT NULL,
   Nom VARCHAR(50) NOT NULL,
   Description TEXT NOT NULL,
   Prix DECIMAL(5,2),
   Alternative VARCHAR(50),
   IdCategorie INT NOT NULL,
   IdOrdonnance INT NOT NULL,
   PRIMARY KEY(IdSoin),
   FOREIGN KEY(IdCategorie) REFERENCES Categorie(IdCategorie),
   FOREIGN KEY(IdOrdonnance) REFERENCES Ordonnance(IdOrdonnance)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS Travaille;
CREATE TABLE IF NOT EXISTS Travaille(
   IdPharmacien CHAR(11) NOT NULL,
   IdPharmacie INT NOT NULL,
   PRIMARY KEY(IdPharmacien, IdPharmacie),
   FOREIGN KEY(IdPharmacien) REFERENCES Pharmacien(IdPharmacien),
   FOREIGN KEY(IdPharmacie) REFERENCES Pharmacie(IdPharmacie)
)ENGINE=InnoDB;

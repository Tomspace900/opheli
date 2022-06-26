CREATE TABLE Utilisateur(
   IdUtilisateur INT AUTO_INCREMENT NOT NULL,
   Nom VARCHAR(50) NOT NULL,
   Prénom VARCHAR(50),
   Mail VARCHAR(50) NOT NULL,
   MotDePasse VARCHAR(200) NOT NULL,
   PRIMARY KEY(IdUtilisateur)
)ENGINE=InnoDB;

CREATE TABLE Patient(
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

CREATE TABLE Pharmacien(
   IdPharmacien CHAR(11) NOT NULL,
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdPharmacien, IdUtilisateur),
   UNIQUE(IdUtilisateur),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

CREATE TABLE Spécialité(
   IdSpécialité INT AUTO_INCREMENT NOT NULL,
   NomSpécialité VARCHAR(50) NOT NULL,
   PRIMARY KEY(IdSpécialité)
)ENGINE=InnoDB;

CREATE TABLE Catégorie(
   IdCatégorie INT AUTO_INCREMENT NOT NULL,
   Type VARCHAR(50) NOT NULL,
   NbRenouvTotal INT NOT NULL,
   NbRenouvRestants INT NOT NULL,
   PRIMARY KEY(IdCatégorie)
)ENGINE=InnoDB;

CREATE TABLE Adresse(
   IdAdresse INT AUTO_INCREMENT NOT NULL,
   Rue VARCHAR(50) NOT NULL,
   CodePostal VARCHAR(5) NOT NULL,
   Ville VARCHAR(50) NOT NULL,
   PRIMARY KEY(IdAdresse)
)ENGINE=InnoDB;

CREATE TABLE Pharmacie(
   IdPharmacie INT AUTO_INCREMENT NOT NULL,
   NomPharmacie VARCHAR(50) NOT NULL,
   IdAdresse INT NOT NULL,
   PRIMARY KEY(IdPharmacie),
   UNIQUE(IdAdresse),
   FOREIGN KEY(IdAdresse) REFERENCES Adresse(IdAdresse)
)ENGINE=InnoDB;

CREATE TABLE Mutuelle(
   IdMutuelle CHAR(11) NOT NULL,
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdUtilisateur,IdMutuelle),
   UNIQUE(IdUtilisateur),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

CREATE TABLE Admin(
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdUtilisateur),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

CREATE TABLE Prescripteur(
   IdPrescripteur CHAR(11) NOT NULL,
   IdAdresse INT NOT NULL,
   IdSpécialité INT NOT NULL,
   IdUtilisateur INT NOT NULL,
   PRIMARY KEY(IdPrescripteur),
   UNIQUE(IdUtilisateur),
   FOREIGN KEY(IdAdresse) REFERENCES Adresse(IdAdresse),
   FOREIGN KEY(IdSpécialité) REFERENCES Spécialité(IdSpécialité),
   FOREIGN KEY(IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
)ENGINE=InnoDB;

CREATE TABLE Ordonnance(
   IdOrdonnance INT AUTO_INCREMENT NOT NULL,
   Type VARCHAR(50) NOT NULL,
   DateCréation DATE NOT NULL,
   DateExpiration DATE NOT NULL,
   Notes TEXT NOT NULL,
   IdPrescripteur CHAR(11) NOT NULL,
   IdPatient CHAR(13) NOT NULL,
   PRIMARY KEY(IdOrdonnance),
   FOREIGN KEY(IdPrescripteur) REFERENCES Prescripteur(IdPrescripteur),
   FOREIGN KEY(IdPatient) REFERENCES Patient(IdPatient)
)ENGINE=InnoDB;

CREATE TABLE Soin(
   IdSoin INT AUTO_INCREMENT NOT NULL,
   Nom VARCHAR(50) NOT NULL,
   Description TEXT NOT NULL,
   Prix DECIMAL(5,2) NOT NULL,
   Alternative VARCHAR(50) NOT NULL,
   IdCatégorie INT NOT NULL,
   IdOrdonnance INT NOT NULL,
   PRIMARY KEY(IdSoin),
   FOREIGN KEY(IdCatégorie) REFERENCES Catégorie(IdCatégorie),
   FOREIGN KEY(IdOrdonnance) REFERENCES Ordonnance(IdOrdonnance)
)ENGINE=InnoDB;

CREATE TABLE Travaille(
   IdPharmacien CHAR(11) NOT NULL,
   IdPharmacie INT NOT NULL,
   PRIMARY KEY(IdPharmacien, IdPharmacie),
   FOREIGN KEY(IdPharmacien) REFERENCES Pharmacien(IdPharmacien),
   FOREIGN KEY(IdPharmacie) REFERENCES Pharmacie(IdPharmacie)
)ENGINE=InnoDB;

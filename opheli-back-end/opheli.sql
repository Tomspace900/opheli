-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : mer. 29 juin 2022 à 08:59
-- Version du serveur :  10.4.13-MariaDB
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `opheli`
--
CREATE DATABASE IF NOT EXISTS `opheli` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `opheli`;

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `IdUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`IdUtilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`IdUtilisateur`) VALUES
(1);

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `IdAdresse` int(11) NOT NULL AUTO_INCREMENT,
  `Rue` varchar(50) NOT NULL,
  `CodePostal` varchar(5) NOT NULL,
  `Ville` varchar(50) NOT NULL,
  PRIMARY KEY (`IdAdresse`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `adresse`
--

INSERT INTO `adresse` (`IdAdresse`, `Rue`, `CodePostal`, `Ville`) VALUES
('5', '10 rue de la Convention', '75015', 'PARIS'),
('6', '82 boulevard Jacques Tête', '95300', 'Pontoise');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `IdCategorie` int(11) NOT NULL AUTO_INCREMENT,
  `TypeCategorie` varchar(50) NOT NULL,
  `NbRenouvTotal` int(11) NOT NULL,
  `IdOrdonnance` int(11) NOT NULL,
  PRIMARY KEY (`IdCategorie`),
  KEY `IdOrdonnance` (`IdOrdonnance`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`IdCategorie`, `TypeCategorie`, `NbRenouvTotal`, `IdOrdonnance`) VALUES
('4', 'simple', '1', '3'),
('5', 'simple', '4', '4'),
('6', 'simple', '1', '5');

-- --------------------------------------------------------

--
-- Structure de la table `code`
--

DROP TABLE IF EXISTS `code`;
CREATE TABLE IF NOT EXISTS `code` (
  `Code` varchar(10) NOT NULL,
  `DateCreation` date NOT NULL,
  `Utilisation` varchar(11) NOT NULL,
  PRIMARY KEY (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

INSERT INTO `code` (`Code`, `DateCreation`, `Utilisation`) VALUES
('28286c6cc2', '2022-07-08', '1'),
('587e326632', '2022-07-08', '1'),
('5c3a1d1c6d', '2022-07-08', '1'),
('a08bc6c1d2', '2022-07-08', '0');

--
-- Structure de la table `mutuelle`
--

DROP TABLE IF EXISTS `mutuelle`;
CREATE TABLE IF NOT EXISTS `mutuelle` (
  `IdMutuelle` varchar(50) NOT NULL,
  `Mail` varchar(50) NOT NULL,
  `NomMutuelle` varchar(50) NOT NULL,
  `MotDePasse` varchar(200) NOT NULL,
  PRIMARY KEY (`IdMutuelle`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `mutuelle`
--

INSERT INTO `mutuelle` (`IdMutuelle`, `Mail`, `NomMutuelle`, `MotDePasse`) VALUES
('harmoniesante', 'harmonie.sante@test.com', 'Harmonie Santé', '$2b$08$bJT8lwoOE92ugKNDT/LwO.RN7GZUKvr9lk2g/MLWOA7EIqm0e2Lgy');

-- --------------------------------------------------------

--
-- Structure de la table `ordonnance`
--

DROP TABLE IF EXISTS `ordonnance`;
CREATE TABLE IF NOT EXISTS `ordonnance` (
  `IdOrdonnance` int(11) NOT NULL AUTO_INCREMENT,
  `TypeOrdonnance` varchar(50) NOT NULL,
  `DateCreation` date NOT NULL,
  `DateExpiration` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `IdPrescripteur` char(11) NOT NULL,
  `IdPatient` char(13) NOT NULL,
  PRIMARY KEY (`IdOrdonnance`),
  KEY `IdPrescripteur` (`IdPrescripteur`),
  KEY `IdPatient` (`IdPatient`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ordonnance`
--

INSERT INTO `ordonnance` (`IdOrdonnance`, `TypeOrdonnance`, `DateCreation`, `DateExpiration`, `Notes`, `IdPrescripteur`, `IdPatient`) VALUES
('3', 'simple', '2022-07-08', '2022-10-08', 'Rappels des vaccins de 2017', '12345678901', '1234567890000'),
('4', 'simple', '2022-07-08', '2022-10-08', 'A renouveler en cas de voyage prolongé', '12345678901', '1234567891111'),
('5', 'simple', '2022-07-08', '2022-10-08', 'Hygiène dentaire quotidienne, à renouveler si besoin', '12345678901', '1234567891111');

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `IdPatient` char(13) NOT NULL,
  `DateNaissance` date DEFAULT NULL,
  `Sexe` tinyint(1) DEFAULT NULL,
  `Taille` int(11) DEFAULT NULL,
  `Poids` decimal(4,1) DEFAULT NULL,
  `IdUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`IdPatient`,`IdUtilisateur`),
  UNIQUE KEY `IdUtilisateur` (`IdUtilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `patient`
--

INSERT INTO `patient` (`IdPatient`, `DateNaissance`, `Sexe`, `Taille`, `Poids`, `IdUtilisateur`) VALUES
('1234567890000', '2002-08-11', '0', '173', NULL, '10'),
('1234567891111', '2001-07-04', '0', '178', NULL, '11');

-- --------------------------------------------------------

--
-- Structure de la table `pharmacie`
--

DROP TABLE IF EXISTS `pharmacie`;
CREATE TABLE IF NOT EXISTS `pharmacie` (
  `IdPharmacie` int(11) NOT NULL AUTO_INCREMENT,
  `NomPharmacie` varchar(50) NOT NULL,
  `IdAdresse` int(11) NOT NULL,
  PRIMARY KEY (`IdPharmacie`),
  UNIQUE KEY `IdAdresse` (`IdAdresse`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pharmacie`
--

INSERT INTO `pharmacie` (`IdPharmacie`, `NomPharmacie`, `IdAdresse`) VALUES
('3', 'Pharmacie des Plantes', '6');

-- --------------------------------------------------------

--
-- Structure de la table `pharmacien`
--

DROP TABLE IF EXISTS `pharmacien`;
CREATE TABLE IF NOT EXISTS `pharmacien` (
  `IdPharmacien` char(11) NOT NULL,
  `IdUtilisateur` int(11) NOT NULL,
  `IdPharmacie` int(11) NOT NULL,
  PRIMARY KEY (`IdPharmacien`,`IdUtilisateur`),
  UNIQUE KEY `IdUtilisateur` (`IdUtilisateur`),
  KEY `IdPharmacie` (`IdPharmacie`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pharmacien`
--

INSERT INTO `pharmacien` (`IdPharmacien`, `IdUtilisateur`, `IdPharmacie`) VALUES
('12345678902', '9', '3');

-- --------------------------------------------------------

--
-- Structure de la table `prescripteur`
--

DROP TABLE IF EXISTS `prescripteur`;
CREATE TABLE IF NOT EXISTS `prescripteur` (
  `IdPrescripteur` char(11) NOT NULL,
  `IdAdresse` int(11) NOT NULL,
  `IdSpecialite` int(11) NOT NULL,
  `IdUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`IdPrescripteur`),
  UNIQUE KEY `IdUtilisateur` (`IdUtilisateur`),
  KEY `IdAdresse` (`IdAdresse`),
  KEY `IdSpecialite` (`IdSpecialite`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `prescripteur`
--

INSERT INTO `prescripteur` (`IdPrescripteur`, `IdAdresse`, `IdSpecialite`, `IdUtilisateur`) VALUES
('12345678901', '5', '2', '8');

-- --------------------------------------------------------

--
-- Structure de la table `soin`
--

DROP TABLE IF EXISTS `soin`;
CREATE TABLE IF NOT EXISTS `soin` (
  `IdSoin` int(11) NOT NULL AUTO_INCREMENT,
  `NomSoin` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  `Prix` decimal(5,2) DEFAULT NULL,
  `Alternative` varchar(50) DEFAULT NULL,
  `NbRestants` int(11) NOT NULL,
  `IdCategorie` int(11) NOT NULL,
  PRIMARY KEY (`IdSoin`),
  KEY `IdCategorie` (`IdCategorie`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `soin` (`IdSoin`, `NomSoin`, `Description`, `Prix`, `Alternative`, `NbRestants`, `IdCategorie`) VALUES
('9', 'Vaccin grippe', 'Conserver au froid', NULL, NULL, '1', '4'),
('10', 'Vaccin rougeole', 'Rappel à faire avant 2024', NULL, NULL, '1', '4'),
('11', 'Doliprane', '3 boites, gélules de 500mg', NULL, NULL, '4', '5'),
('12', 'Fil dentaire', 'Matin et soir chaque jour', NULL, NULL, '1', '6'),
('13', 'Bain de bouche', '1 fois par jour le soir', NULL, NULL, '1', '6'),
('14', 'Gratte langue', 'Max. 3 fois par semaine', NULL, NULL, '1', '6');

-- --------------------------------------------------------

--
-- Structure de la table `souscrire`
--

DROP TABLE IF EXISTS `souscrire`;
CREATE TABLE IF NOT EXISTS `souscrire` (
  `IdMutuelle` varchar(50) NOT NULL,
  `IdPatient` varchar(13) NOT NULL,
  PRIMARY KEY (`IdMutuelle`,`IdPatient`),
  KEY `IdPatient` (`IdPatient`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `souscrire`
--

INSERT INTO `souscrire` (`IdMutuelle`, `IdPatient`) VALUES
('harmoniesante', '1234567891111'),
('harmoniesante', '1234567890000');

-- --------------------------------------------------------

--
-- Structure de la table `specialite`
--

DROP TABLE IF EXISTS `specialite`;
CREATE TABLE IF NOT EXISTS `specialite` (
  `IdSpecialite` int(11) NOT NULL AUTO_INCREMENT,
  `NomSpecialite` varchar(50) NOT NULL,
  PRIMARY KEY (`IdSpecialite`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `specialite`
--

INSERT INTO `specialite` (`IdSpecialite`, `NomSpecialite`) VALUES
(1, 'Médecin'),
(2, 'Chirurgien-dentiste'),
(3, 'Sage femme'),
(4, 'Infirmier'),
(5, 'Podologue'),
(6, 'Masseur-kinésithérapeute');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `IdUtilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `NomUtilisateur` varchar(50) NOT NULL,
  `PrenomUtilisateur` varchar(50) NOT NULL,
  `Mail` varchar(50) NOT NULL,
  `MotDePasse` varchar(200) NOT NULL,
  PRIMARY KEY (`IdUtilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`IdUtilisateur`, `NomUtilisateur`, `PrenomUtilisateur`, `Mail`, `MotDePasse`) VALUES
('1', 'DEMILE', 'Mehdi', 'noreply.opheli@gmail.com', '$2b$08$SYOUFV.UHBdS4MDgymB.KOuSQKUtGOhfMDAvtEmAt0fku8LcLrGim'),
('8', 'LAHAYE', 'Stéphanie', 'stephanie.lahaye@test.com', '$2b$08$Y9S9foAQ90bJ0TUqddVVJuGZ3qaLKIt2OnwtffuWVF.j9y2YaMCKC'),
('9', 'VILLERS', 'Eric', 'eric.villers@test.com', '$2b$08$ZdH.FI1Pa2a4JVntR1NqBuBdsUJ.22FHWDhuSvR6uf3x15CpRNk3O'),
('10', 'BILDSTEIN', 'Maximilien', 'maximilien.bildstein@efrei.net', '$2b$08$pO7Kd3ZC3L5LZTmxWFu1KOuHBvX53qLCBqFSTbpt98ECMnm1d0fie'),
('11', 'THOUVENOT OUDART', 'Clovis', 'clovis.thouvenot-oudart@efrei.net', '$2b$08$AspBsTsOvpo7PbLQJ01XVOwuf1ThwpGtsS4FI1bx1iAH9MI1fh2t.');


--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`IdUtilisateur`) REFERENCES `utilisateur` (`IdUtilisateur`);

--
-- Contraintes pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD CONSTRAINT `categorie_ibfk_1` FOREIGN KEY (`IdOrdonnance`) REFERENCES `ordonnance` (`IdOrdonnance`);

--
-- Contraintes pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  ADD CONSTRAINT `ordonnance_ibfk_1` FOREIGN KEY (`IdPrescripteur`) REFERENCES `prescripteur` (`IdPrescripteur`),
  ADD CONSTRAINT `ordonnance_ibfk_2` FOREIGN KEY (`IdPatient`) REFERENCES `patient` (`IdPatient`);

--
-- Contraintes pour la table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`IdUtilisateur`) REFERENCES `utilisateur` (`IdUtilisateur`);

--
-- Contraintes pour la table `pharmacie`
--
ALTER TABLE `pharmacie`
  ADD CONSTRAINT `pharmacie_ibfk_1` FOREIGN KEY (`IdAdresse`) REFERENCES `adresse` (`IdAdresse`);

--
-- Contraintes pour la table `pharmacien`
--
ALTER TABLE `pharmacien`
  ADD CONSTRAINT `pharmacien_ibfk_1` FOREIGN KEY (`IdUtilisateur`) REFERENCES `utilisateur` (`IdUtilisateur`),
  ADD CONSTRAINT `pharmacien_ibfk_2` FOREIGN KEY (`IdPharmacie`) REFERENCES `pharmacie` (`IdPharmacie`);

--
-- Contraintes pour la table `prescripteur`
--
ALTER TABLE `prescripteur`
  ADD CONSTRAINT `prescripteur_ibfk_1` FOREIGN KEY (`IdAdresse`) REFERENCES `adresse` (`IdAdresse`),
  ADD CONSTRAINT `prescripteur_ibfk_2` FOREIGN KEY (`IdSpecialite`) REFERENCES `specialite` (`IdSpecialite`),
  ADD CONSTRAINT `prescripteur_ibfk_3` FOREIGN KEY (`IdUtilisateur`) REFERENCES `utilisateur` (`IdUtilisateur`);

--
-- Contraintes pour la table `soin`
--
ALTER TABLE `soin`
  ADD CONSTRAINT `soin_ibfk_1` FOREIGN KEY (`IdCategorie`) REFERENCES `categorie` (`IdCategorie`);

--
-- Contraintes pour la table `souscrire`
--
ALTER TABLE `souscrire`
  ADD CONSTRAINT `souscrire_ibfk_1` FOREIGN KEY (`IdMutuelle`) REFERENCES `mutuelle` (`IdMutuelle`),
  ADD CONSTRAINT `souscrire_ibfk_2` FOREIGN KEY (`IdPatient`) REFERENCES `patient` (`IdPatient`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

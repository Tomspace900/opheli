-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : mar. 28 juin 2022 à 11:37
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
(7);

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
(1, '34 rue du four', '94360', 'Bry-sur-Marne'),
(2, '11 rue des Nations Unies', '97470', 'Saint Benoit'),
(3, '99 rue de Groussay', '17300', 'Rochefort'),
(4, '59 boulevard Aristide Briand', '71200', 'LE CREUSOT');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `IdCategorie` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(50) NOT NULL,
  `NbRenouvTotal` int(11) NOT NULL,
  `NbRenouvRestants` int(11) NOT NULL,
  `IdOrdonnance` int(11) NOT NULL,
  PRIMARY KEY (`IdCategorie`),
  KEY `IdOrdonnance` (`IdOrdonnance`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

--
-- Structure de la table `mutuelle`
--

DROP TABLE IF EXISTS `mutuelle`;
CREATE TABLE IF NOT EXISTS `mutuelle` (
  `IdMutuelle` varchar(50) NOT NULL,
  `Mail` varchar(50) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Mdp` varchar(200) NOT NULL,
  PRIMARY KEY (`IdMutuelle`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `mutuelle`
--

INSERT INTO `mutuelle` (`IdMutuelle`, `Mail`, `Nom`, `Mdp`) VALUES
('mutuelletest', 'mutuelle@hotmail.com', 'Mutuelle des oiseaux', '$2y$10$4gjgKSvH5dfofs3K1JR1YOB.DvcPiOsgZ/BHOImOSPX1JOn5g3V.q');

-- --------------------------------------------------------

--
-- Structure de la table `ordonnance`
--

DROP TABLE IF EXISTS `ordonnance`;
CREATE TABLE IF NOT EXISTS `ordonnance` (
  `IdOrdonnance` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(50) NOT NULL,
  `DateCreation` date NOT NULL,
  `DateExpiration` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `IdPrescripteur` char(11) NOT NULL,
  `IdPatient` char(13) NOT NULL,
  PRIMARY KEY (`IdOrdonnance`),
  KEY `IdPrescripteur` (`IdPrescripteur`),
  KEY `IdPatient` (`IdPatient`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('1111111111111', '2000-06-16', 1, 182, '64.9', 3);

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
(1, 'Pharmacie des beaux jours', 2),
(2, 'Pharmacie de la gare', 4);

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
('33333333333', 5, 1),
('56481354658', 6, 2);

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
('12354698351', 3, 4, 2),
('22222222222', 1, 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `soin`
--

DROP TABLE IF EXISTS `soin`;
CREATE TABLE IF NOT EXISTS `soin` (
  `IdSoin` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  `Prix` decimal(5,2) DEFAULT NULL,
  `Alternative` varchar(50) DEFAULT NULL,
  `IdCategorie` int(11) NOT NULL,
  PRIMARY KEY (`IdSoin`),
  KEY `IdCategorie` (`IdCategorie`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `souscrir`
--

DROP TABLE IF EXISTS `souscrir`;
CREATE TABLE IF NOT EXISTS `souscrir` (
  `IdMutuelle` varchar(50) NOT NULL,
  `IdPatient` varchar(13) NOT NULL,
  PRIMARY KEY (`IdMutuelle`,`IdPatient`),
  KEY `IdPatient` (`IdPatient`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `souscrir`
--

INSERT INTO `souscrir` (`IdMutuelle`, `IdPatient`) VALUES
('mutuelletest', '1111111111111');

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
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `Mail` varchar(50) NOT NULL,
  `MotDePasse` varchar(200) NOT NULL,
  PRIMARY KEY (`IdUtilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES
(1, 'Paysant', 'Mathilde', 'mathilde@hotmail.com', '$2y$10$BjmzK.gph1lRRGyvmLVznulTkg/CN8Hqrzrw7qthJwl0xvCRoN50W'),
(2, 'Gregoire', 'Ila', 'IlaGregoire@jourrapide.com', '$2y$10$Co6zqtNh2TQFNTkchWJFf.WCdNeihcqq2FfFiZJliefmxugnkdb4G'),
(3, 'Patient', 'Test', 'test@hotmail.com', '$2y$10$Zkxu6U0HsY8sadZBrB4TbeizMaiaUvSOiAKCbYPPClXH98BFsKXou'),
(4, 'Prescripteur', 'Test', 'prescripteu@hotmail.com', '$2y$10$/MtyqkE1YSUXRFWaQGxBmekDeh2MbSthJa1rKyqfquwP.unuLGe8G'),
(5, 'Pharmacien', 'Test', 'pharmacien@hotmail.com', '$2y$10$0JiyBFGjx8jZTYwull8xweVR.1C199q.Dqqr8YPspIeA5HZLfrT4C'),
(6, 'Jeoffroi', 'Franchet', 'JeoffroiFranchet@armyspy.com', '$2y$10$O0JI1/bXPSEMx7lp0KEoyOoBcM5TYya.aEReNBid08NP/Vjpn6Pki'),
(7, 'Admin', 'Test', 'admin@hotmail.com', '$2y$10$j4xbvYohhSQNmGZ3JazRpOvhjqpATFjWVGCRVXHcQsadS1h6VNALK');

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
-- Contraintes pour la table `souscrir`
--
ALTER TABLE `souscrir`
  ADD CONSTRAINT `souscrir_ibfk_1` FOREIGN KEY (`IdMutuelle`) REFERENCES `mutuelle` (`IdMutuelle`),
  ADD CONSTRAINT `souscrir_ibfk_2` FOREIGN KEY (`IdPatient`) REFERENCES `patient` (`IdPatient`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : mar. 14 juin 2022 à 08:37
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
-- Base de données : `ordonnance`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `IdAdresse` int(11) NOT NULL AUTO_INCREMENT,
  `Rue` varchar(50) DEFAULT NULL,
  `Code` varchar(50) DEFAULT NULL,
  `Ville` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdAdresse`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `IdCategorie` int(11) NOT NULL,
  `ALD` tinyint(4) NOT NULL,
  `NbRenouvellement` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdCategorie`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `categoriser`
--

DROP TABLE IF EXISTS `categoriser`;
CREATE TABLE IF NOT EXISTS `categoriser` (
  `IdOrdonnance` int(11) NOT NULL,
  `IdCategorie` int(11) NOT NULL,
  PRIMARY KEY (`IdOrdonnance`,`IdCategorie`),
  KEY `IdCategorie` (`IdCategorie`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ordonnance`
--

DROP TABLE IF EXISTS `ordonnance`;
CREATE TABLE IF NOT EXISTS `ordonnance` (
  `IdOrdonnance` int(11) NOT NULL,
  `DatePrescription` date DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `SecuriteSociale` int(11) NOT NULL,
  `IdPrescripteur` varchar(50) NOT NULL,
  PRIMARY KEY (`IdOrdonnance`),
  KEY `SecuriteSociale` (`SecuriteSociale`),
  KEY `IdPrescripteur` (`IdPrescripteur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `SecuriteSociale` int(11) NOT NULL,
  `Date_de_naissance` date DEFAULT NULL,
  `Sexe` varchar(50) DEFAULT NULL,
  `Taille` varchar(50) DEFAULT NULL,
  `Poids` varchar(50) DEFAULT NULL,
  `IdUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`SecuriteSociale`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pharmacie`
--

DROP TABLE IF EXISTS `pharmacie`;
CREATE TABLE IF NOT EXISTS `pharmacie` (
  `IdPharmacie` int(11) NOT NULL,
  `Nom` varchar(50) DEFAULT NULL,
  `IdAdresse` int(11) NOT NULL,
  PRIMARY KEY (`IdPharmacie`),
  KEY `pharmacie_ibfk_1` (`IdAdresse`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pharmacien`
--

DROP TABLE IF EXISTS `pharmacien`;
CREATE TABLE IF NOT EXISTS `pharmacien` (
  `IdPharmacien` int(11) NOT NULL,
  `IdPharmacie` int(11) NOT NULL,
  `IdUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`IdPharmacien`),
  KEY `IdPharmacie` (`IdPharmacie`),
  KEY `IdUtilisateur` (`IdUtilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `prescripteur`
--

DROP TABLE IF EXISTS `prescripteur`;
CREATE TABLE IF NOT EXISTS `prescripteur` (
  `IdPrescripteur` varchar(50) NOT NULL,
  `Signature` varchar(50) DEFAULT NULL,
  `IdAdresse` int(11) NOT NULL,
  `IdSpecialite` int(11) NOT NULL,
  `IdUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`IdPrescripteur`),
  KEY `IdUtilisateur` (`IdUtilisateur`),
  KEY `IdSpecialite` (`IdSpecialite`),
  KEY `IdAdresse` (`IdAdresse`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `soin`
--

DROP TABLE IF EXISTS `soin`;
CREATE TABLE IF NOT EXISTS `soin` (
  `IdSoin` int(11) NOT NULL,
  `Nom` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `IdCategorie` int(11) NOT NULL,
  PRIMARY KEY (`IdSoin`),
  KEY `IdCategorie` (`IdCategorie`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `specialite`
--

DROP TABLE IF EXISTS `specialite`;
CREATE TABLE IF NOT EXISTS `specialite` (
  `IdSpecialite` int(11) NOT NULL AUTO_INCREMENT,
  `NomSpecialite` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdSpecialite`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `specialite`
--

INSERT INTO `specialite` (`IdSpecialite`, `NomSpecialite`) VALUES
(1, 'Chirurgien-dentiste'),
(2, 'Masseur-kinésithérapeute'),
(3, 'Médecin'),
(4, 'Pharmacien'),
(5, 'Sage-femme'),
(6, 'Pédicures-podologues');

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `IdType` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  PRIMARY KEY (`IdType`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`IdType`, `Nom`) VALUES
(1, 'Ordonnance simple'),
(2, 'Ordonnance bi-zone'),
(3, 'Ordonnance sécurisée');

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
  `MotDePasse` varchar(20) NOT NULL,
  CONSTRAINT PasswordLength CHECK (char_length(MotDePasse)>=5),
  PRIMARY KEY (`IdUtilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `pharmacie`
--
ALTER TABLE `pharmacie`
  ADD CONSTRAINT `pharmacie_ibfk_1` FOREIGN KEY (`IdAdresse`) REFERENCES `adresse` (`IdAdresse`);

--
-- Contraintes pour la table `pharmacien`
--
ALTER TABLE `pharmacien`
  ADD CONSTRAINT `pharmacien_ibfk_1` FOREIGN KEY (`IdUtilisateur`) REFERENCES `utilisateur` (`IdUtilisateur`);

--
-- Contraintes pour la table `prescripteur`
--
ALTER TABLE `prescripteur`
  ADD CONSTRAINT `prescripteur_ibfk_1` FOREIGN KEY (`IdUtilisateur`) REFERENCES `utilisateur` (`IdUtilisateur`),
  ADD CONSTRAINT `prescripteur_ibfk_2` FOREIGN KEY (`IdSpecialite`) REFERENCES `specialite` (`IdSpecialite`),
  ADD CONSTRAINT `prescripteur_ibfk_3` FOREIGN KEY (`IdAdresse`) REFERENCES `adresse` (`IdAdresse`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

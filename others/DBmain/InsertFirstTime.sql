-- Programme
INSERT INTO `programme` (`IDProgramme`, `Nom`, `Description`, `IDCompte`) VALUES ('1', 'Salle de sport', 'Remise en forme', '1');
INSERT INTO `programme` (`IDProgramme`, `Nom`, `Description`, `IDCompte`) VALUES ('2', 'Home', 'Exercices simples chez soi', '1');
-- Séance
INSERT INTO `seance` (`IDSeance`, `Ordre`, `Nom`, `IDProgramme`) VALUES ('1', '1', 'Lundi', '1');
INSERT INTO `seance` (`IDSeance`, `Ordre`, `Nom`, `IDProgramme`) VALUES ('2', '2', 'Mercredi', '1');
INSERT INTO `seance` (`IDSeance`, `Ordre`, `Nom`, `IDProgramme`) VALUES ('3', '3', 'Vendredi', '1');
-- Mensuration
INSERT INTO mensuration SET Nom="Poids";
INSERT INTO mensuration SET Nom="Quadriceps";
INSERT INTO mensuration SET Nom="Tour de taille";
INSERT INTO mensuration SET Nom="Biceps";
INSERT INTO mensuration SET Nom="Mollet";
INSERT INTO mensuration SET Nom="Torse";
INSERT INTO mensuration SET Nom="Epaule";

-- Exercice
INSERT INTO `exercice` (`IDExercice`, `Nom`, `Description`, `Cardio`) VALUES ('1', 'Pompe', 'Pompe basique', '0');
-- Matériel

-- Muscle
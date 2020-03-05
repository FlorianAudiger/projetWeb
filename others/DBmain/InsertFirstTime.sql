-- Programme
INSERT INTO `programme` (`IDProgramme`, `Nom`, `Description`, `IDCompte`) VALUES ('1', 'Salle de sport', 'Remise en forme', '1');
INSERT INTO `programme` (`IDProgramme`, `Nom`, `Description`, `IDCompte`) VALUES ('2', 'Home', 'Exercices simples chez soi', '1');

-- Mensuration
INSERT INTO mensuration SET Nom="Poids";
INSERT INTO mensuration SET Nom="Quadriceps";
INSERT INTO mensuration SET Nom="Tour de taille";
INSERT INTO mensuration SET Nom="Biceps";
INSERT INTO mensuration SET Nom="Mollet";
INSERT INTO mensuration SET Nom="Torse";
INSERT INTO mensuration SET Nom="Epaule";
-- Matériel
INSERT INTO `materiel` (`Nom`) VALUES ('Aucun');
INSERT INTO `materiel` (`Nom`) VALUES ('Élastique');
INSERT INTO `materiel` (`Nom`) VALUES ('Haltère');
INSERT INTO `materiel` (`Nom`) VALUES ('Vélo elliptiques');
INSERT INTO `materiel` (`Nom`) VALUES ('Tapis de course');
INSERT INTO `materiel` (`Nom`) VALUES ('Machine');
INSERT INTO `materiel` (`Nom`) VALUES ('Banc inclinable');
INSERT INTO `materiel` (`Nom`) VALUES ('Barre droite');

-- Muscle
INSERT INTO `muscle` (`Nom`) VALUES ('Abdominaux');
INSERT INTO `muscle` (`Nom`) VALUES ('Biceps');
INSERT INTO `muscle` (`Nom`) VALUES ('Triceps');
INSERT INTO `muscle` (`Nom`) VALUES ('Jambes');
INSERT INTO `muscle` (`Nom`) VALUES ('Pectoraux');
INSERT INTO `muscle` (`Nom`) VALUES ('Deltoides');
INSERT INTO `muscle` (`Nom`) VALUES ('Dos');
INSERT INTO `muscle` (`Nom`) VALUES ('Fessiers');
-- Exercice
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Pompe', 'https://www.youtube.com/watch?v=TPlZLe-nk7k', '0', '1');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Crunch', 'https://www.youtube.com/', '0', '1');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Relevé de jambe', 'https://www.youtube.com/', '0', '1');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Gainage', 'https://www.youtube.com/', '0','1');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Curl marteau', 'https://www.youtube.com/', '0', '3');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Curl concentré', 'https://www.youtube.com/', '0', '3');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Extension triceps avec haltère', 'https://www.youtube.com/', '0', '3');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Presse', 'https://www.youtube.com/', '0', '6');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Dips', 'https://www.youtube.com/', '0', '6');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Squat', 'https://www.youtube.com/', '0', '8');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Butterfly', 'https://www.youtube.com/', '0', '6');
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Traction', 'https://www.youtube.com/', '0', '6');

INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('1', '5');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('1', '6');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('2', '1');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('3', '1');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('4', '1');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('5', '2');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('6', '2');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('7', '3');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('8', '4');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('9', '3');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('10', '4');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('10', '8');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('11', '5');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('11', '7');
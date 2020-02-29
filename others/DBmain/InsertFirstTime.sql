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
-- Matériel
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
-- Exercice
INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`) VALUES ('Pompe', 'Pompe basique', '0');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('1', '5');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('1', '6');

INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`) VALUES ('Crunch', 'Au sol sur le dos avec les genoux pliés. Courber les coudes vers le bassin.', '0');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('2', '1');

INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`) VALUES ('Relevé de jambe', 'Au sol sur le dos droit. Remonter une jambe une par une.', '0');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('3', '1');

INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`) VALUES ('Gainage', 'Se positionner face au sol, en appui sur les pointes de pied et les avant-bras, coudes à l aplomb des épaules.', '1');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('4', '1');

INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Curl marteau', 'Une haltère dans chaque main, remontée à la verticale une par une jusqu aux épaules', '0', '2');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('5', '2');

INSERT INTO `exercice` (`Nom`, `Description`, `Cardio`, `IDMateriel`) VALUES ('Curl concentré', 'Assis, une haltère dans une main, remontée à la l horizontal', '0', '2');
INSERT INTO `cible` (`IDExercice`, `IDMuscle`) VALUES ('6', '2');


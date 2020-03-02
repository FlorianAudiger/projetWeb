-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.1              
-- * Generator date: Dec  4 2018              
-- * Generation date: Sat Feb 29 10:15:57 2020 
-- * LUN file: C:\xampp\htdocs\projetWeb\others\DBmain\DMmain.lun 
-- * Schema: MLD-Version2/1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database ProgrammeSport;
use ProgrammeSport;


-- Tables Section
-- _____________ 

create table accede (
     IDCompte int not null,
     IDProgramme int not null,
     constraint ID_accede_ID primary key (IDProgramme, IDCompte));

create table cible (
     IDExercice int not null,
     IDMuscle int not null,
     constraint ID_cible_ID primary key (IDMuscle, IDExercice));

create table Compte (
     IDCompte int not null AUTO_INCREMENT,
     Mail varchar(30) not null,
     MDP varchar(100) not null,
     Nom varchar(30) not null,
     Prenom varchar(30) not null,
     constraint ID_Compte_ID primary key (IDCompte));

create table Exercice (
     IDExercice int not null AUTO_INCREMENT,
     Nom varchar(30) not null,
     Description varchar(300),
     Cardio boolean not null,
     IDMateriel int,
     constraint ID_Exercice_ID primary key (IDExercice));

create table fait (
     IDFait int not null AUTO_INCREMENT,
     IDCompte int not null,
     Date date not null,
     IDExercice int not null,
     PoidsMax int not null,
     constraint ID_fait_ID primary key (IDFait));

create table Materiel (
     IDMateriel int not null AUTO_INCREMENT,
     Nom varchar(30) not null,
     constraint ID_Materiel_ID primary key (IDMateriel));

create table Mensuration (
     IDMensuration int not null AUTO_INCREMENT,
     Nom varchar(30) not null,
     constraint ID_Mensuration_ID primary key (IDMensuration));

create table Muscle (
     IDMuscle int not null AUTO_INCREMENT,
     Nom varchar(30) not null,
     constraint ID_Muscle_ID primary key (IDMuscle));

create table possede (
     IDCompte int not null,
     Date date not null,
     IDMensuration int not null,
     Valeur int not null,
     constraint ID_possede_ID primary key (IDCompte, IDMensuration));

create table Programme (
     IDProgramme int not null AUTO_INCREMENT,
     Nom varchar(30) not null,
     Description varchar(300),
     IDCompte int not null,
     constraint ID_Programme_ID primary key (IDProgramme));

create table Seance (
     IDSeance int not null AUTO_INCREMENT,
     Nom varchar(30) not null,
     IDProgramme int not null,
     constraint ID_Seance_ID primary key (IDSeance));

create table seConstitue (
     IDExercice int not null,
     IDSeance int not null,
     TempsRepos int not null,
     Serie int not null,
     Repetition int not null,
     Poids int,
     constraint ID_seConstitue_ID primary key (IDExercice, IDSeance));


-- Constraints Section
-- ___________________ 

alter table accede add constraint FKacc_Pro
     foreign key (IDProgramme)
     references Programme (IDProgramme);

alter table accede add constraint FKacc_Com_FK
     foreign key (IDCompte)
     references Compte (IDCompte);

alter table cible add constraint FKcib_Mus
     foreign key (IDMuscle)
     references Muscle (IDMuscle);

alter table cible add constraint FKcib_Exe_FK
     foreign key (IDExercice)
     references Exercice (IDExercice);

-- Not implemented
-- alter table Compte add constraint ID_Compte_CHK
--     check(exists(select * from possede
--                  where possede.IDCompte = IDCompte)); 

-- Not implemented
-- alter table Exercice add constraint ID_Exercice_CHK
--     check(exists(select * from cible
--                  where cible.IDExercice = IDExercice)); 

alter table Exercice add constraint FKutilise_FK
     foreign key (IDMateriel)
     references Materiel (IDMateriel);

alter table fait add constraint FKfai_Com_FK
     foreign key (IDCompte)
     references Compte (IDCompte);

alter table possede add constraint FKpos_Men_FK
     foreign key (IDMensuration)
     references Mensuration (IDMensuration);

alter table possede add constraint FKpos_Com_FK
     foreign key (IDCompte)
     references Compte (IDCompte);

-- Not implemented
-- alter table Programme add constraint ID_Programme_CHK
--     check(exists(select * from Seance
--                  where Seance.IDProgramme = IDProgramme)); 

alter table Programme add constraint FKcreer_FK
     foreign key (IDCompte)
     references Compte (IDCompte);

alter table Seance add constraint FKconcerne_FK
     foreign key (IDProgramme)
     references Programme (IDProgramme);

alter table seConstitue add constraint FKseC_Sea_FK
     foreign key (IDSeance)
     references Seance (IDSeance);

alter table seConstitue add constraint FKseC_Exe
     foreign key (IDExercice)
     references Exercice (IDExercice);


-- Index Section
-- _____________ 

create unique index ID_accede_IND
     on accede (IDProgramme, IDCompte);

create index FKacc_Com_IND
     on accede (IDCompte);

create unique index ID_cible_IND
     on cible (IDMuscle, IDExercice);

create index FKcib_Exe_IND
     on cible (IDExercice);

create unique index ID_Compte_IND
     on Compte (IDCompte);

create unique index ID_Exercice_IND
     on Exercice (IDExercice);

create index FKutilise_IND
     on Exercice (IDMateriel);

create index FKfai_Com_IND
     on fait (IDCompte);

create unique index ID_Materiel_IND
     on Materiel (IDMateriel);

create unique index ID_Mensuration_IND
     on Mensuration (IDMensuration);

create unique index ID_Muscle_IND
     on Muscle (IDMuscle);

create unique index ID_possede_IND
     on possede (IDCompte, IDMensuration);

create index FKpos_Men_IND
     on possede (IDMensuration);

create index FKpos_Com_IND
     on possede (IDCompte);

create unique index ID_Programme_IND
     on Programme (IDProgramme);

create index FKcreer_IND
     on Programme (IDCompte);

create unique index ID_Seance_IND
     on Seance (IDSeance);

create index FKconcerne_IND
     on Seance (IDProgramme);

create unique index ID_seConstitue_IND
     on seConstitue (IDExercice, IDSeance);

create index FKseC_Sea_IND
     on seConstitue (IDSeance);


-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.1              
-- * Generator date: Dec  4 2018              
-- * Generation date: Sat Feb 22 00:29:42 2020 
-- * LUN file: C:\xampp\htdocs\projetWeb\DMmain.lun 
-- * Schema: MLD/1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database ProgrammeSport;
use ProgrammeSport;


-- Tables Section
-- _____________ 

create table Compte (
     IDCompte bigint NOT NULL AUTO_INCREMENT,
     Mail varchar(30) not null,
     MDP varchar(30) not null,
     Nom varchar(30) not null,
     Prenom varchar(30) not null,
     constraint ID_Compte_ID primary key (IDCompte));

create table Programme (
     IDProgramme bigint NOT NULL AUTO_INCREMENT,
     Nom varchar(30) not null,
     Description varchar(300) not null,
     IDCompte bigint not null,
     constraint ID_Programme_ID primary key (IDProgramme));

create table Seance (
     IDSeance bigint NOT NULL AUTO_INCREMENT,
     Ordre bigint not null,
     Nom varchar(30) not null,
     IDProgramme bigint not null,
     constraint ID_Seance_ID primary key (IDSeance));

create table Exercice (
     IDExercice bigint NOT NULL AUTO_INCREMENT,
     Nom varchar(30) not null,
     Description varchar(300) not null,
     Cardio char not null,
     constraint ID_Exercice_ID primary key (IDExercice));

create table Muscle (
     IDMuscle bigint NOT NULL AUTO_INCREMENT,
     Nom varchar(30) not null,
     IDExercice bigint not null,
     constraint ID_Muscle_ID primary key (IDMuscle));

create table Materiel (
     IDMateriel bigint NOT NULL AUTO_INCREMENT,
     Nom varchar(30) not null,
     IDExercice bigint not null,
     constraint ID_Materiel_ID primary key (IDMateriel));

create table Mensuration (
     IDMensuration bigint not null,
     Nom varchar(30) not null,
     constraint ID_Mensuration_ID primary key (IDMensuration));

create table Date (
     Date date not null,
     constraint ID_Date_ID primary key (Date));

create table accede (
     IDCompte bigint not null,
     IDProgramme bigint not null,
     constraint ID_accede_ID primary key (IDProgramme, IDCompte));

create table fait (
     IDCompte bigint not null,
     Date date not null,
     IDExercice bigint not null,
     PoidsMax bigint not null,
     constraint ID_fait_ID primary key (IDExercice, Date, IDCompte));

create table possede (
     IDCompte bigint not null,
     Date date not null,
     IDMensuration bigint not null,
     Valeur bigint not null,
     constraint ID_possede_ID primary key (Date, IDCompte, IDMensuration));

create table seConstitue (
     IDExercice bigint not null,
     IDSeance bigint not null,
     TempsRepos bigint not null,
     Serie bigint not null,
     Repetition bigint not null,
     Poids bigint not null,
     Ordre bigint not null,
     constraint ID_seConstitue_ID primary key (IDExercice, IDSeance));


-- Constraints Section
-- ___________________ 

-- Not implemented
-- alter table Compte add constraint ID_Compte_CHK
--     check(exists(select * from possede
--                  where possede.IDCompte = IDCompte)); 

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

-- Not implemented
-- alter table Exercice add constraint ID_Exercice_CHK
--     check(exists(select * from Muscle
--                  where Muscle.IDExercice = IDExercice)); 

alter table Muscle add constraint FKcible_FK
     foreign key (IDExercice)
     references Exercice (IDExercice);

alter table Materiel add constraint FKutilise_FK
     foreign key (IDExercice)
     references Exercice (IDExercice);

alter table accede add constraint FKacc_Pro
     foreign key (IDProgramme)
     references Programme (IDProgramme);

alter table accede add constraint FKacc_Com_FK
     foreign key (IDCompte)
     references Compte (IDCompte);

alter table fait add constraint FKfai_Exe
     foreign key (IDExercice)
     references Exercice (IDExercice);

alter table fait add constraint FKfai_Dat_FK
     foreign key (Date)
     references Date (Date);

alter table fait add constraint FKfai_Com_FK
     foreign key (IDCompte)
     references Compte (IDCompte);

alter table possede add constraint FKpos_Men_FK
     foreign key (IDMensuration)
     references Mensuration (IDMensuration);

alter table possede add constraint FKpos_Dat
     foreign key (Date)
     references Date (Date);

alter table possede add constraint FKpos_Com_FK
     foreign key (IDCompte)
     references Compte (IDCompte);

alter table seConstitue add constraint FKseC_Sea_FK
     foreign key (IDSeance)
     references Seance (IDSeance);

alter table seConstitue add constraint FKseC_Exe
     foreign key (IDExercice)
     references Exercice (IDExercice);


-- Index Section
-- _____________ 

create unique index ID_Compte_IND
     on Compte (IDCompte);

create unique index ID_Programme_IND
     on Programme (IDProgramme);

create index FKcreer_IND
     on Programme (IDCompte);

create unique index ID_Seance_IND
     on Seance (IDSeance);

create index FKconcerne_IND
     on Seance (IDProgramme);

create unique index ID_Exercice_IND
     on Exercice (IDExercice);

create unique index ID_Muscle_IND
     on Muscle (IDMuscle);

create index FKcible_IND
     on Muscle (IDExercice);

create unique index ID_Materiel_IND
     on Materiel (IDMateriel);

create index FKutilise_IND
     on Materiel (IDExercice);

create unique index ID_Mensuration_IND
     on Mensuration (IDMensuration);

create unique index ID_Date_IND
     on Date (Date);

create unique index ID_accede_IND
     on accede (IDProgramme, IDCompte);

create index FKacc_Com_IND
     on accede (IDCompte);

create unique index ID_fait_IND
     on fait (IDExercice, Date, IDCompte);

create index FKfai_Dat_IND
     on fait (Date);

create index FKfai_Com_IND
     on fait (IDCompte);

create unique index ID_possede_IND
     on possede (Date, IDCompte, IDMensuration);

create index FKpos_Men_IND
     on possede (IDMensuration);

create index FKpos_Com_IND
     on possede (IDCompte);

create unique index ID_seConstitue_IND
     on seConstitue (IDExercice, IDSeance);

create index FKseC_Sea_IND
     on seConstitue (IDSeance);


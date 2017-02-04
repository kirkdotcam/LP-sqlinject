CREATE DATABASE injection_db;
USE injection_db;
CREATE TABLE accounts (
	id INTEGER(10) AUTO_INCREMENT NOT NULL
	, fname VARCHAR(30) NOT NULL
    , lname VARCHAR(30)
	, password VARCHAR(20) NOT NULL
    , account INTEGER(15) NOT NULL
    , PRIMARY KEY (id)

);

CREATE TABLE `Users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(25) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `avtar` VARCHAR(100) NOT NULL,
   `address` VARCHAR(255) NOT NULL,
   `rol` SMALLINT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   `model` VARCHAR(50) NOT NULL,
   `price` DECIMAL NOT NULL,
   `color` VARCHAR(20) NOT NULL,
   `stock` INT NOT NULL,
   `image` VARCHAR(255),
   `description` VARCHAR(100),
   `idCategory` ,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Cart` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `idUser` INT,
   `idPhones` INT,
   `quantity` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Payment` (
   `id` INT,
   `name` VARCHAR(20) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Orders` (
   `id` INT NOT NULL,
   `idUser` INT,
   `idPayment` INT,
   `idCart` INT,
   `total` DECIMAL NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Detail_Order` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `idOrder` INT,
   `total` DECIMAL NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Category` (
   `id`  NOT NULL,
   `phones`  NOT NULL,
   `accessories`  NOT NULL,
   `watches`  NOT NULL,
   `notebooks`  NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `Products` ADD CONSTRAINT `FK_641b6f50-c943-4f1a-ae27-93fcbbcf1ec7` FOREIGN KEY (`idCategory`) REFERENCES `Category`(`id`)  ;

ALTER TABLE `Cart` ADD CONSTRAINT `FK_f30b1241-25d7-40f3-be44-a445d9765573` FOREIGN KEY (`idUser`) REFERENCES `Users`(`id`)  ;

ALTER TABLE `Cart` ADD CONSTRAINT `FK_f4515249-79f7-428e-afba-44858211afe4` FOREIGN KEY (`idPhones`) REFERENCES `Products`(`id`)  ;

ALTER TABLE `Orders` ADD CONSTRAINT `FK_31c4a74b-2d92-4b55-8e75-2c0cc90cc084` FOREIGN KEY (`idPayment`) REFERENCES `Payment`(`id`)  ;

ALTER TABLE `Orders` ADD CONSTRAINT `FK_eb36f568-945f-4792-91e1-7bafa9c9e77a` FOREIGN KEY (`idCart`) REFERENCES `Cart`(`id`)  ;

ALTER TABLE `Orders` ADD CONSTRAINT `FK_27b6bc4c-8120-4709-9fdf-c4c6e3119b2c` FOREIGN KEY (`idUser`) REFERENCES `Users`(`id`)  ;

ALTER TABLE `Detail_Order` ADD CONSTRAINT `FK_9b8d8a5a-3fc8-48fa-9d0b-37ee56e8f339` FOREIGN KEY (`idOrder`) REFERENCES `Orders`(`id`)  ;

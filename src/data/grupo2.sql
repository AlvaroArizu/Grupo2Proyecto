CREATE TABLE `Users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `first_name` VARCHAR(50) NOT NULL,
   `last_name` VARCHAR(50) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `address` VARCHAR(255) NOT NULL,
   `id_rol` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `stock` INT NOT NULL,
   `price` DECIMAL NOT NULL,
   `description` VARCHAR(100),
   `id_category` INT,
   `id_brands` INT,
   `id_model` INT,
   `id_color` INT,
   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Payments` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Orders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `id_payment` INT,
   `id_user` INT,
   `id_prducts` INT,
   `quantity` INT,
   `total` DECIMAL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Detail__Orders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `id_order` INT,
   `total` DECIMAL NOT NULL,
   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `category` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Imagens` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `imagen` VARCHAR(100),
   PRIMARY KEY (`id`)
);

CREATE TABLE `user_imagen` (
   `id` INT AUTO_INCREMENT,
   `id_users` INT,
   `id_imagen` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Brands` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Models` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Colors` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `color` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `product_image` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `id_imagen` INT,
   `id_products` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Rols` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `rol` VARCHAR(50),
   PRIMARY KEY (`id`)
);

ALTER TABLE
   `Users`
ADD
   CONSTRAINT `FK_db555033-43c9-44c7-adec-324d307f42a2` FOREIGN KEY (`id_rol`) REFERENCES `Rol`(`id`);

ALTER TABLE
   `Products`
ADD
   CONSTRAINT `FK_641b6f50-c943-4f1a-ae27-93fcbbcf1ec7` FOREIGN KEY (`id_category`) REFERENCES `Category`(`id`);

ALTER TABLE
   `Products`
ADD
   CONSTRAINT `FK_61ecbf4b-f21c-4ff5-b93c-d57761a543d3` FOREIGN KEY (`id_brands`) REFERENCES `Brands`(`id`);

ALTER TABLE
   `Products`
ADD
   CONSTRAINT `FK_e2795695-a4a5-49d5-9a9c-ecf9c1fbd669` FOREIGN KEY (`id_model`) REFERENCES `Model`(`id`);

ALTER TABLE
   `Products`
ADD
   CONSTRAINT `FK_60b67979-54f8-4f61-832e-d37bb4617ab3` FOREIGN KEY (`id_color`) REFERENCES `Color`(`id`);

ALTER TABLE
   `Orders`
ADD
   CONSTRAINT `FK_31c4a74b-2d92-4b55-8e75-2c0cc90cc084` FOREIGN KEY (`id_payment`) REFERENCES `Payment`(`id`);

ALTER TABLE
   `Orders`
ADD
   CONSTRAINT `FK_c1d14caf-63cb-4370-9ccf-479142fd99d9` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`);

ALTER TABLE
   `Orders`
ADD
   CONSTRAINT `FK_d1348c1d-3d0d-4f76-a643-60deb7c730c0` FOREIGN KEY (`id_prducts`) REFERENCES `Products`(`id`);

ALTER TABLE
   `Detail_Order`
ADD
   CONSTRAINT `FK_9b8d8a5a-3fc8-48fa-9d0b-37ee56e8f339` FOREIGN KEY (`id_order`) REFERENCES `Orders`(`id`);

ALTER TABLE
   `user_imagen`
ADD
   CONSTRAINT `FK_75f99de8-f0f5-486b-b3c9-e8e7cb6f3c68` FOREIGN KEY (`id_users`) REFERENCES `Users`(`id`);

ALTER TABLE
   `user_imagen`
ADD
   CONSTRAINT `FK_12216cde-3b35-4712-9f06-909adec3167e` FOREIGN KEY (`id_imagen`) REFERENCES `Imagen`(`id`);

ALTER TABLE
   `product_image`
ADD
   CONSTRAINT `FK_a77d9481-b626-4c8e-a007-82cc1f3c27c6` FOREIGN KEY (`id_imagen`) REFERENCES `Imagen`(`id`);

ALTER TABLE
   `product_image`
ADD
   CONSTRAINT `FK_5b8a1b85-5884-4e91-b150-4257f4e1f4bd` FOREIGN KEY (`id_products`) REFERENCES `Products`(`id`);
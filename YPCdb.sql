-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema YPCdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema YPCdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `YPCdb` DEFAULT CHARACTER SET utf8 ;
USE `YPCdb` ;

-- -----------------------------------------------------
-- Table `YPCdb`.`users`
-- -----------------------------------------------------
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(12) DEFAULT NULL,
  `zipcode` varchar(5) DEFAULT NULL,
  `1st_pref` varchar(45) DEFAULT NULL,
  `2nd_pref` varchar(45) DEFAULT NULL,
  `3rd_pref` varchar(45) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `YPCdb`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YPCdb`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `body` MEDIUMTEXT NULL,
  `photo_link` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YPCdb`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YPCdb`.`events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_time` DATETIME NULL,
  `venue` VARCHAR(255) NULL,
  `description` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YPCdb`.`photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YPCdb`.`photos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YPCdb`.`committees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YPCdb`.`committees` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YPCdb`.`users_committees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YPCdb`.`users_committees` (
  `committee_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`committee_id`, `user_id`),
  INDEX `fk_committees_has_users_users1_idx` (`user_id` ASC),
  INDEX `fk_committees_has_users_committees_idx` (`committee_id` ASC),
  CONSTRAINT `fk_committees_has_users_committees`
    FOREIGN KEY (`committee_id`)
    REFERENCES `YPCdb`.`committees` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_committees_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `YPCdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

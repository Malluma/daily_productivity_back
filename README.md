API for "Daily productivity" project (https://github.com/Malluma/filter_table)

The project is written using express.
This API will allow you to get data on the daily activity of the user from the database, as well as record the data entered by the user into this database.

## Create Database

    CREATE SCHEMA `daily_prod_schema` ;
   
    CREATE TABLE `filter_table`.`filter_table` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `date_` DATE NOT NULL,
      `name_` VARCHAR(45) NOT NULL,
      `amount` DECIMAL NOT NULL,
      `distance` DECIMAL NOT NULL,
      PRIMARY KEY (`id`),
      UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

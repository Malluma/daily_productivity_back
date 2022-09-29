API for "Daily productivity" project (https://github.com/Malluma/daily_productivity)

The project is written using express.
This API will allow you to get data on the daily activity of the user from the database, as well as record the data entered by the user into this database.

## Create Database

    CREATE SCHEMA `daily_prod_schema` ;
   
    CREATE TABLE `daily_prod_schema`.`intervals` (
       `activity_type` VARCHAR(45) NOT NULL,
       `interval_start` DATETIME NOT NULL,
       `user_id` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`interval_start`, `user_id`));

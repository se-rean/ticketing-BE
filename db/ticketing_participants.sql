-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: ticketing
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `performance_code` varchar(45) DEFAULT NULL,
  `area` varchar(45) DEFAULT NULL,
  `pricetype_code` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dateofbirth` varchar(45) DEFAULT NULL,
  `internationalcode` varchar(45) DEFAULT NULL,
  `areacode` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `address_line_1` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `countrycode` varchar(45) DEFAULT NULL,
  `createdAt` varchar(45) DEFAULT NULL,
  `updatedAt` varchar(45) DEFAULT NULL,
  `barcode` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `participantsCode` varchar(45) DEFAULT NULL,
  `basketId` varchar(45) DEFAULT NULL,
  `generate_barcode_api_respose` longtext,
  `amount` varchar(45) DEFAULT NULL,
  `orderId` varchar(45) DEFAULT NULL,
  `totalAmount` varchar(45) DEFAULT NULL,
  `salutation` varchar(45) DEFAULT NULL,
  `offerCode` varchar(45) DEFAULT NULL,
  `qualifierCode` varchar(45) DEFAULT NULL,
  `job_title` varchar(45) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13862 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (13856,'PDUB01DEC2023B','SGOLDA','D','1','rene','andoy','fil','andoyandoy5@gmail.com','feb 11, 1996','PH','ASD','909090','address','surigao','philippines','ASD','2024-02-08 06:09:53','2024-02-08 06:10:02',NULL,'failed',NULL,NULL,'Validation Error. The CountryCode is not in the correct format., Country Code cannot exceed 2 characters in length.',NULL,NULL,'35000',NULL,NULL,NULL,NULL,NULL,NULL),(13857,'PDUB01DEC2023B','SGOLDA','D','1','rene2','andoy','fil','andoyandoy5@gmail.com','feb 11, 1996','PH','AE','909090','address','surigao','philippines','QA','2024-02-08 06:09:53','2024-02-08 06:10:03','9bf3f64b-ba2b-467b-a63a-469259317031','sold','135164','1298573','OK',NULL,'17826','35000',NULL,NULL,NULL,NULL,NULL,NULL),(13858,'PDUB01DEC2023B','SGOLDA','D','1','rene','andoy','fil','andoyandoy5@gmail.com','feb 11, 1996','PH','ASD','909090','address','surigao','philippines','ASD','2024-02-08 06:10:23','2024-02-08 06:10:28',NULL,'failed',NULL,NULL,'Validation Error. The CountryCode is not in the correct format., Country Code cannot exceed 2 characters in length.',NULL,NULL,'35000',NULL,NULL,NULL,NULL,NULL,NULL),(13859,'PDUB01DEC2023B','SGOLDA','D','1','rene2','andoy','fil','andoyandoy5@gmail.com','feb 11, 1996','PH','AE','909090','address','surigao','philippines','QA','2024-02-08 06:10:23','2024-02-08 06:10:29','fbe713a6-b602-4c10-91f2-d4663407ebdd','sold','135166','1298605','OK',NULL,'17827','35000',NULL,NULL,NULL,NULL,NULL,NULL),(13860,'PDUB01DEC2023B','SGOLDA','D','1','rene','andoy','fil','andoyandoy5@gmail.com','feb 11, 1996','PH','ASD','909090','address','surigao','philippines','ASD','2024-02-08 06:11:20','2024-02-08 06:11:44',NULL,'failed',NULL,NULL,'Validation Error. The CountryCode is not in the correct format., Country Code cannot exceed 2 characters in length.',NULL,NULL,'35000',NULL,NULL,NULL,NULL,NULL,NULL),(13861,'PDUB01DEC2023B','SGOLDA','D','1','rene2','andoy','fil','andoyandoy5@gmail.com','feb 11, 1996','PH','AE','909090','address','surigao','philippines','QA','2024-02-08 06:11:20','2024-02-08 06:11:45','54645644-69dc-4a57-a4ad-12e5e68914a7','sold','135171','1298690','OK',NULL,'17828','35000',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 11:06:22

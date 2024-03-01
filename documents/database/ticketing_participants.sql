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
  `email` longtext,
  `dateofbirth` varchar(45) DEFAULT NULL,
  `internationalcode` varchar(45) DEFAULT NULL,
  `areacode` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `address_line_1` longtext,
  `city` longtext,
  `state` longtext,
  `countrycode` longtext,
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
  `job_title` longtext,
  `company_name` longtext,
  `type` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=155700 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (155687,'PDUB01DEC2023B','SVIP1','A','1','Kameron','Haley','TM','Eldora.Bradtke@yahoo.com','1998-08-28 15:26:48','TL','TL','(540) 876-8459 x793','83722 W Maple Street','Quincy','Arkansas','TL','2024-02-28 12:03:03','2024-02-28 19:18:14','66b134ab-6c2e-4f44-9177-9fb88ae44f48','refunded','169801','2003860','refund successful',NULL,'20216','50000','Mrs.','','','Dynamic Accountability Strategist','Lesch - Wunsch','Consultant'),(155688,'PDUB01DEC2023B','SVIP1','A','1','Marlen','Wolff','IM','Gwendolyn.VonRueden@gmail.com','1986-10-26 16:06:49','TL','TL','(682) 656-7867','7768 Haley Crescent','Wadeberg','Colorado','TL','2024-02-28 12:03:03','2024-02-28 16:53:28','ad3544fb-4d37-4670-a88e-5fc3fdfafdf8','refunded','169802','2003861','refund successful',NULL,'20217','50000','Ms.','','','International Assurance Liaison','Hodkiewicz, Torp and Wilderman','Coordinator'),(155689,'PDUB01DEC2023B','SVIP1','A','1','Anya','Wiegand','AT','Deondre.Stamm@gmail.com','1998-09-02 04:19:07','AE','AE','1-363-313-5544','83759 Bath Road','Fort Favian','New Mexico','AE','2024-02-28 12:04:13','2024-02-28 19:18:14','101e928c-3ded-4128-84bf-a926273a5aaf','refunded','169804','2003862','refund successful',NULL,'20218','50000','Mrs.','','','Dynamic Brand Producer','Schmitt LLC','Engineer'),(155690,'PDUB01DEC2023B','SVIP1','A','1','Deondre','Romaguera','PS','Jeremy_Kihn33@gmail.com','2005-09-17 05:50:35','AE','AE','1-982-343-7261 x127','95343 Keshawn Fork','South Simeonstead','Tennessee','AE','2024-02-28 12:04:13','2024-02-28 19:18:14','5137cabb-a183-4501-be44-3a78eacdb25a','refunded','169803','2003863','refund successful',NULL,'20219','50000','Ms.','','','Chief Implementation Facilitator','Koch LLC','Facilitator'),(155691,'PDUB01DEC2023B','SVIP1','A','1','Virginie','Kovacek','AT','Wilfredo_Douglas@gmail.com','1998-07-25','UM','UM','(525) 667-9077 x774','28158 Funk Camp','El Dorado Hills','Maine','UM','2024-02-28 16:50:34','2024-02-28 16:53:28','52af612f-4e8a-4df2-b15b-503cec0f7cc6','refunded','169818','2003877','refund successful',NULL,'20232','50000','Ms.','','','Dynamic Infrastructure Executive','Hickle, Halvorson and Towne','Liaison'),(155692,'PDUB01DEC2023B','SVIP1','A','1','Karley','Deckow','RU','Ana.Monahan9@gmail.com','1976-09-20 08:46:56','UM','UM','800.314.2251 x53616','163 Xzavier Branch','Koeppburgh','California','UM','2024-02-28 16:50:34','2024-02-28 16:53:28','d822e50c-bf92-4354-9807-46263782c0c6','refunded','169817','2003876','refund successful',NULL,'20231','50000','Mrs.','','','Chief Tactics Officer','Ratke - Kautzer','Officer'),(155693,'PDUB01DEC2023B','SVIP1','A','1','Telly','Konopelski','BO','Larue.Balistreri83@yahoo.com','1985-10-06 17:08:13','QA','QA','1-592-225-8163 x28472','1293 Viviane Plaza','Ryanhaven','Virginia','QA','2024-02-28 20:58:23','2024-02-28 20:59:47','1b37060d-4646-4f09-8c8a-16a44af93ec4','refunded','169926','2005057','refund successful',NULL,'20266','50000','Ms.','','','District Markets Associate','Kreiger, Beier and Kilback','Engineer'),(155694,'PDUB01DEC2023B','SVIP1','A','1','Roxane','Schuster','NP','Omari.Kautzer93@hotmail.com','1957-11-26 00:04:41','QA','QA','347-853-8954 x3117','76032 Garden Close','Fort Lonstad','Nebraska','QA','2024-02-28 20:58:23','2024-02-28 20:59:47','8647a5e4-b89d-4267-883c-923623f18cde','refunded','169927','2005058','refund successful',NULL,'20267','50000','Miss','','','Human Interactions Coordinator','McKenzie Inc','Architect'),(155695,'PDUB01DEC2023B','SVIP1','A','1','Adell','Bergstrom','AW','Kiara24@yahoo.com','1997-03-29 01:13:38','TG','TG','965-924-0952','90213 Cedar Grove','South Wilfridborough','Montana','TG','2024-02-28 21:02:09','2024-02-28 21:02:36','47cfcb78-e89d-4114-8aec-9261929e3e45','refunded','169928','2005059','refund successful',NULL,'20270','50000','Mr.','','','Central Markets Liaison','Wehner Group','Representative'),(155696,'PDUB01DEC2023B','SVIP1','A','1','Noble','Monahan-Rice','AX','Selmer_Rowe@hotmail.com','1971-05-23 02:41:35','TG','TG','379-902-5226 x70290','836 Keebler Curve','East Raheemfield','Arkansas','TG','2024-02-28 21:02:09','2024-02-28 21:02:36','0e0f9db5-e91d-439a-96b3-42bdb87f4669','refunded','169929','2005061','refund successful',NULL,'20273','50000','Miss','','','Lead Metrics Associate','Fisher Inc','Orchestrator'),(155697,'PDUB01DEC2023B','SVIP1','A','1','Ken','Bode','NP','Clay84@hotmail.com','1972-07-16 11:11:45','TG','TG','999-981-9739 x038','655 Morar Court','Emilieside','Vermont','TG','2024-02-28 21:02:09','2024-02-28 21:02:36','d851577d-b906-4f93-9704-056132342153','refunded','169932','2005063','refund successful',NULL,'20274','50000','Dr.','','','Global Mobility Executive','Ratke - Dibbert','Producer'),(155698,'PDUB01DEC2023B','SVIP1','A','1','Jana','Lockman','NL','Rory_Ebert@gmail.com','1970-06-04 02:02:30','TG','TG','615.668.7530 x45526','6224 Adelia Manors','South Sabryna','Arizona','TG','2024-02-28 21:02:09','2024-02-28 21:02:36','c08dbc7b-ec25-40ea-b180-aeca760f1cca','refunded','169931','2005060','refund successful',NULL,'20271','50000','Mr.','','','Future Usability Administrator','McCullough - Zemlak','Executive'),(155699,'PDUB01DEC2023B','SVIP1','A','1','Paul','Witting','MH','Aletha.Baumbach@hotmail.com','2001-04-26 19:38:04','TG','TG','220-966-6139 x073','83121 Kianna Shores','Percyview','Mississippi','TG','2024-02-28 21:02:09','2024-02-28 21:02:36','56b4df78-f078-4522-a73a-60b859340f42','refunded','169930','2005062','refund successful',NULL,'20272','50000','Dr.','','','Chief Research Analyst','Kozey Inc','Assistant');
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

-- Dump completed on 2024-03-01 13:32:01

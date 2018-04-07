-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: hu_db1
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.17.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `about`
--

DROP TABLE IF EXISTS `about`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `about` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) DEFAULT NULL,
  `short_desc` text,
  `long_desc` text,
  `mission` text,
  `vision` text,
  `listing_img` varchar(800) DEFAULT NULL,
  `cover_img` varchar(800) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `updated_by` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `meta_title` varchar(300) DEFAULT NULL,
  `meta_desc` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about`
--

LOCK TABLES `about` WRITE;
/*!40000 ALTER TABLE `about` DISABLE KEYS */;
INSERT INTO `about` VALUES (1,'About us','test short','test long','test mission','test vision','http://localhost:3008/extra-images/blog-grid-img1.jpg','http://localhost:3008/extra-images/blog-grid-img1.jpg','2018-03-18 02:05:01.000000','','12','NULL','NULL');
/*!40000 ALTER TABLE `about` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `address` text,
  `city` varchar(300) DEFAULT NULL,
  `state` varchar(300) DEFAULT NULL,
  `country` varchar(300) DEFAULT NULL,
  `phone_no` varchar(300) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `geo_long` varchar(15) DEFAULT NULL,
  `geo_lat` varchar(15) DEFAULT NULL,
  `sort_order` int(255) DEFAULT NULL,
  `inserted_on` datetime DEFAULT NULL,
  `inserted_by` varchar(300) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'dipesh patel','at post valsad','vapi','gujarat','india','9586741777','dipesh12@gmail.com','72.9193','20.3617',1,'2017-12-12 00:00:00','dipesh patel','2018-01-25 13:28:06','dipeshbhai patel','104.133.24.33',1),(2,'mayank dhnau','at post:daman','daman','gujarat','india','7086459090','mayan11@gmail.com','20.396359','72.831844',2,'2017-12-12 00:00:00','mayankdhanu','2018-01-18 13:47:06','mayankdhanu','127.12.1.0',1),(3,'nagendra dhnau','deheri mangelwad','vapi','gujarat','india','9558722693','jonty12@gmail.com','20.389499','72.906002',3,'2017-12-12 00:00:00','jonty dhanu','2018-01-22 15:30:24','sunny shah','::1',1);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `slug` varchar(300) DEFAULT NULL,
  `short_desc` text,
  `cover_image` varchar(300) DEFAULT NULL,
  `list_image` varchar(300) DEFAULT NULL,
  `meta_title` varchar(300) DEFAULT NULL,
  `meta_desc` text,
  `status` tinyint(1) DEFAULT NULL,
  `sort_order` int(225) DEFAULT NULL,
  `inserted_on` datetime(6) DEFAULT NULL,
  `inserted_by` varchar(300) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `updated_by` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'tests','tests','<p>test</p>','/media/logos/slider-3.jpg','/media/Figure/Figure.jpg','test','test',1,1,'2018-03-18 02:05:01.000000','sunny shah','2018-03-18 02:12:53.000000','sunny shah','::1'),(2,'testsss','testsss','<p>test</p>','/media/logos/slider-3.jpg','/media/Figure/Figure.jpg','test','test',-1,1,'2018-03-18 02:11:46.000000','sunny shah','2018-03-18 02:13:04.000000',NULL,'::1');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `enq_for` varchar(300) DEFAULT NULL,
  `name` varchar(300) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `phone` varchar(300) DEFAULT NULL,
  `message` text,
  `remark` text,
  `status` tinyint(1) DEFAULT NULL,
  `inserted_on` datetime DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,NULL,'ethan','ethan@gmail.com','9876543210','dgaciudagiuagviaugchsihiadsugciausgciuasiugaigiausg',NULL,NULL,'2018-02-10 18:25:00','::1'),(2,NULL,'ethan007','ethan@gmail.com','9876543210','saffafafafafafafafa',NULL,NULL,'2018-02-10 19:01:20','::1'),(4,NULL,'venkatesh Parihar','venkateshparihar@gmail.com','9725648553','hello',NULL,NULL,'2018-03-14 16:20:08','::1'),(5,NULL,'abc','abc@gmail.com','9876543210','dgfgfdgfgfgfgfgfgfgfg',NULL,NULL,'2018-03-14 17:59:21','::ffff:192.168.0.144'),(6,'Contact Us','sakir choudhary','sa@sas.sas','7412589630','sakir1234',NULL,0,'2018-03-19 00:00:37','::1'),(7,'Contact Us','sakir choudhary','sa@sas.sas','7412589630','sakir1234',NULL,0,'2018-03-19 00:00:49','::1'),(8,'Contact Us','sakir choudhary','sakir1433@gmail.com','741258963','adad',NULL,0,'2018-03-19 00:03:21','::1'),(9,'General Enquiry','zakir','zakir@gmail.com','789654123','asas',NULL,0,'2018-03-19 01:06:03','::1');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `figure`
--

DROP TABLE IF EXISTS `figure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `figure` (
  `id` int(255) NOT NULL,
  `name` varchar(300) DEFAULT NULL,
  `figures` int(10) DEFAULT NULL,
  `symbol` varchar(10) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `sort_order` int(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `inserted_on` datetime(6) DEFAULT NULL,
  `inserted_by` varchar(300) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `updated_by` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figure`
--

LOCK TABLES `figure` WRITE;
/*!40000 ALTER TABLE `figure` DISABLE KEYS */;
INSERT INTO `figure` VALUES (1,'ASSOCIATES OFFICES PAN INDIA',200,'+','fa fa-comments','C:\\Users\\nagendradhanu\\Pictures\\img1',1,1,'2017-12-12 00:00:00.000000','dipeshbhai patel','2017-12-12 00:00:00.000000','dipeshbhai patel','198.23.12.6'),(2,'SME CLIENTS',150,'-','fa fa-comments','C:\\Users\\nagendradhanu\\Pictures\\img1',2,1,'2017-12-12 00:00:00.000000','jonty dhanu','2017-12-12 00:00:00.000000','jonty dhanu','198.3.21.12'),(3,'PROFESSIONALS & SUPPORTING STAFF',12,'%','fa fa-comments','C:\\Users\\nagendradhanu\\Pictures\\img1.jpg',3,1,'2017-12-12 00:00:00.000000','venky parihar','2017-12-12 00:00:00.000000','venky parihar','198.12.3.11'),(4,'INDUSTRY EXPOSURE',12,'$','fa fa-comments','C:\\Users\\nagendradhanu\\Pictures\\img1.jpg',4,1,'2017-12-12 00:00:00.000000','venky parihar','2017-12-12 00:00:00.000000','venky parihar','198.12.3.11');
/*!40000 ALTER TABLE `figure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(225) NOT NULL AUTO_INCREMENT,
  `category_id` int(225) DEFAULT NULL,
  `name` varchar(300) DEFAULT NULL,
  `slug` varchar(300) DEFAULT NULL,
  `short_desc` text,
  `long_desc` text,
  `list_image` varchar(300) DEFAULT NULL,
  `cover_image` varchar(300) DEFAULT NULL,
  `attr` text,
  `meta_title` varchar(300) DEFAULT NULL,
  `meta_desc` text,
  `status` tinyint(1) NOT NULL,
  `sort_order` int(10) NOT NULL,
  `inserted_on` datetime(6) DEFAULT NULL,
  `inserted_by` varchar(300) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `updated_by` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,1,'hhfh','hhfh','<p>fghfh</p>','<p>fhfgh</p>','/media/demo/blog-classic-img2.jpg','/media/demo/blog-classic-img9.jpg','%5B%7B%22name%22%3A%22a%22%2C%22value%22%3A%22b%22%2C%22%24%24hashKey%22%3A%22object%3A11%22%7D%2C%7B%22name%22%3A%22s%22%2C%22value%22%3A%22s%22%2C%22%24%24hashKey%22%3A%22object%3A90%22%7D%2C%7B%22name%22%3A%22a%22%2C%22value%22%3A%22a%22%2C%22%24%24hashKey%22%3A%22object%3A92%22%7D%5D','rewrwr','werwer',1,1,'2018-03-18 04:25:35.000000','sunny shah','2018-03-18 12:58:51.000000','kaushik','::1');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service` (
  `id` int(225) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `short_desc` text,
  `icon` varchar(100) DEFAULT NULL,
  `long_desc` text,
  `list_image` varchar(300) DEFAULT NULL,
  `cover_img` varchar(300) DEFAULT NULL,
  `slug` varchar(300) DEFAULT NULL,
  `meta_title` varchar(300) DEFAULT NULL,
  `meta_desc` text,
  `sort_order` int(225) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `inserted_on` datetime(6) DEFAULT NULL,
  `inserted_by` varchar(300) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `updated_by` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Financial Advisory & Management','Debt Syndication is an innovative timely financing technique that has been used in many high-profile corporate projects. Increasingly, project financing is emerging as the preferred alternative to conventional methods of financing infrastructure and other large-scale projects worldwide. HRK CORPADVICE holds considerable expertise and is a reliable name in Project Consultancy services.','fa fa-cloud-download','Debt Syndication is an innovative timely financing technique that has been used in many high-profile corporate projects. Increasingly, project financing is emerging as the preferred alternative to conventional methods of financing infrastructure and other large-scale projects worldwide. HRK CORPADVICE holds considerable expertise and is a reliable name in Project Consultancy services. Advice is given to clients during the project conception stage followed by preparation of the project report with optimal financial structuring. Debt Syndication effectively bridges the gap between major fund seeking industries and Financial Institutes of India. Project advisory constitutes:','NULL','http://test.dcubepublicity.com/media/Heading/Heading_01.jpg','abc','Financial Advisory & Management','Financial Advisory & Management',2,1,'2017-12-12 00:00:00.000000','kunal shah','2018-02-09 05:54:07.000000','sunny shah','103.2.80.177'),(2,'Risk Advisory Management Assurance','HRK\'s internal audit team works with the audit committees, management and audit executives of, public or private, companies to assist them in managing the Internal Audit activities on a fully outsourced or on co-sourcing basis. Our Internal Audit services are focused towards:\r\nImproving organization’s overall governance, risk management and internal controls.\r\nProviding insight based on analyses and assessments of information, data and business processes through extensive use of advance audit tools and technologies.','fa fa-laptop','HRK\'s internal audit team works with the audit committees, management and audit executives of, public or private, companies to assist them in managing the Internal Audit activities on a fully outsourced or on co-sourcing basis. Our Internal Audit services are focused towards:HRK\'s internal audit team works with the audit committees, management and audit executives of, public or private, companies to assist them in managing the Internal Audit activities on a fully outsourced or on co-sourcing basis. Our Internal Audit services are focused towards:','NULL','C:\\Users\\nagendradhanu\\Pictures\\img1','qwe','Risk Advisory Management Assurance','Risk Advisory Management Assurance',3,1,'2017-12-12 00:00:00.000000','manish bhai','2017-12-12 00:00:00.000000','manish bhai','198.3.5.12'),(3,'Corporate Laws IDT.','Advice is given to clients during the project conception stage followed by preparation of the project report with optimal financial structuring. Debt Syndication effectively bridges the gap between major fund seeking industries and Financial Institutes of India. Project advisory constitutes:','fa fa-home','<p>fasgyfaeiuhfaafufauhgsafsoihafsuohafs</p>','NULL','http://test.dcubepublicity.com/media/Heading/Heading_02.jpg','asd','','',1,1,'2017-12-12 00:00:00.000000','venketesh parihar','2018-02-09 05:54:25.000000','sunny shah','103.2.80.177'),(4,'ethan','uhifdsiuhgsdgfuhisgfdgiusfduhgi','fa fa-car','<p>uhoidsfiuhgfsdaoiuhfdshusdf y8fdsiuyosdgf 8dsfoiuhy gfdssgfd 8uysfd 8oyfgds 8yfseliufse 8ygs</p>','NULL','http://localhost:3007/media/icon.png','zxc','sashgsaiuygdsfuyg','dasvuyosaygudsa yg iygdas gyfdsag asd iygdsa iludsfaldfsal 8yfdsal y8dsfa y8asf iuyt',1,-1,'2018-01-22 18:20:20.000000','sunny shah','2018-01-27 15:56:39.000000','','::1');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slider`
--

DROP TABLE IF EXISTS `slider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slider` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `list_image` varchar(300) DEFAULT NULL,
  `cover_image` varchar(1000) DEFAULT NULL,
  `short_desc` text,
  `sort_order` int(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `insert_on` datetime DEFAULT NULL,
  `insert_by` varchar(300) DEFAULT NULL,
  `update_on` datetime DEFAULT NULL,
  `update_by` varchar(300) DEFAULT NULL,
  `ip` varchar(300) CHARACTER SET dec8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slider`
--

LOCK TABLES `slider` WRITE;
/*!40000 ALTER TABLE `slider` DISABLE KEYS */;
INSERT INTO `slider` VALUES (1,'Logolepsy','/media/sliders/internet-speed.png','/media/sliders/slider1.jpg','asa',1,1,'2017-12-12 00:00:00','nagendra dhanu','2018-03-18 14:50:54','kaushik','::1'),(2,'Eunoia','/media/sliders/internet-speed.png','/media/sliders/slider2.jpg','dasadd ssad',2,1,'2017-12-12 00:00:00','nagendra dhanu','2018-03-18 14:55:44','kaushik','::1'),(4,'Tacenda','/media/sliders/internet-speed.png','/media/sliders/slider4.jpg','as sdff s sdg f sd s',5,1,'2018-01-23 12:35:51','sunny shah','2018-03-18 14:57:01','kaushik','::1'),(5,'Saudade','/media/sliders/internet-speed.png','/media/sliders/slider3.jpg','asc dcdacas asdsac asd a',5,1,'2018-01-29 16:17:10','sunny shah','2018-03-18 14:58:12','kaushik','::1'),(6,'tryry','/media/logos/slider-3.jpg','/media/logos/slider-3.jpg','ryry',5,0,'2018-03-18 03:12:02','sunny shah','2018-03-18 03:12:09',NULL,'::1');
/*!40000 ALTER TABLE `slider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialmedia`
--

DROP TABLE IF EXISTS `socialmedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialmedia` (
  `id` int(225) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `link` text,
  `sort_order` int(225) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `inserted_on` datetime DEFAULT NULL,
  `inserted_by` varchar(300) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialmedia`
--

LOCK TABLES `socialmedia` WRITE;
/*!40000 ALTER TABLE `socialmedia` DISABLE KEYS */;
INSERT INTO `socialmedia` VALUES (2,'facebook','fa fa-facebook','C:\\Users\\nagendradhanu\\Pictures\\fb.png','https://www.facebook.com',1,-1,'2017-12-12 00:00:00','nagendra dhanu','2017-12-12 00:00:00','nagendra dhanu','192.23.5.12'),(3,'instagram','fa fa-instagram','C:\\Users\\nagendradhanu\\Pictures\\insta.jpg','https://www.instagram.com',1,1,'2017-12-12 00:00:00','dipesh patel','2018-02-19 17:09:23','sunny shah','::1'),(1,'twitter','fa fa-twitter','C:\\Users\\nagendradhanu\\Pictures\\twitter.png','https://www.twitter.com',2,1,'2017-12-12 00:00:00','deep patel','2018-02-19 17:34:20','sunny shah','::1'),(4,'facebook','fa fa-facebook','http://localhost:3007/media/icon.png','https://www.facebook.com',3,1,'2018-01-18 12:45:36','sunny shah','2018-02-19 17:34:36','sunny shah','::1'),(5,'google-plus','fa fa-google-plus','http://localhost:3007/media/d2.jpg','https://plus.google.com',4,1,'2018-01-22 14:06:22','sunny shah','2018-02-19 17:34:58','sunny shah','::1'),(8,'facebook','fa fa-facebook','http://localhost:3007/media/icon.png','https://www.facebook.com',5,-1,'2018-01-22 14:26:09','sunny shah','2018-02-19 17:36:08','sunny shah','::1');
/*!40000 ALTER TABLE `socialmedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_setting`
--

DROP TABLE IF EXISTS `store_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_setting` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `description` text,
  `tagline` varchar(300) DEFAULT NULL,
  `logo` varchar(300) DEFAULT NULL,
  `notify_email` varchar(300) DEFAULT NULL,
  `career_email` varchar(300) DEFAULT NULL,
  `conf_email` varchar(300) DEFAULT NULL,
  `conf_password` varchar(300) DEFAULT NULL,
  `conf_host` varchar(300) DEFAULT NULL,
  `conf_port` varchar(30) DEFAULT NULL,
  `conf_secure` tinyint(1) DEFAULT NULL,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_desc` text,
  `updated_by` varchar(300) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_setting`
--

LOCK TABLES `store_setting` WRITE;
/*!40000 ALTER TABLE `store_setting` DISABLE KEYS */;
INSERT INTO `store_setting` VALUES (1,'CometDigisol1','test1','You Can have results or excuses not both','/media/logos/logo.png','notify@gmail.com','career@gmail.com','nagendrad502@gmail.com','123456','123','3008',0,'sguisdgfishgfisoyisa','sgdafghgiuSAGIwseiagyweIT98 Ye99t8wi','nagendradhanu','2018-01-17 18:22:05.000000','::1');
/*!40000 ALTER TABLE `store_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribes`
--

DROP TABLE IF EXISTS `subscribes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscribes` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `email` varchar(500) DEFAULT NULL,
  `inserted_on` datetime DEFAULT NULL,
  `inserted_by` varchar(100) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `sort_order` int(100) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribes`
--

LOCK TABLES `subscribes` WRITE;
/*!40000 ALTER TABLE `subscribes` DISABLE KEYS */;
INSERT INTO `subscribes` VALUES (1,'sakir1433@gmail.com','2018-03-19 00:33:39',NULL,NULL,NULL,0,NULL,'::1');
/*!40000 ALTER TABLE `subscribes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimony`
--

DROP TABLE IF EXISTS `testimony`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testimony` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `message` text,
  `company` varchar(300) DEFAULT NULL,
  `designation` varchar(300) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `sort_order` int(225) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `inserted_on` datetime(6) DEFAULT NULL,
  `inserted_by` varchar(300) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `updated_by` varchar(300) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimony`
--

LOCK TABLES `testimony` WRITE;
/*!40000 ALTER TABLE `testimony` DISABLE KEYS */;
INSERT INTO `testimony` VALUES (1,'Jeffrey Preston','American businessman, founder, president, CEO, and chairman of Amazon.com, Jeffrey Preston “Jeff” Bezos, has a net worth of $104 billion in January 2018. In November 2017, Bezos achieved a 12-figure net worth which made him the richest man in the world during that time.','Amazon','CEO','https://s3.amazonaws.com/uifaces/faces/twitter/rssems/128.jpg',1,1,'2017-12-13 00:00:00.000000','nagendra dhanu','2018-02-07 18:24:12.000000','sunny shah','::1'),(2,'Bill Gates','American business magnate, computer programmer, investor, philanthropist and author, Bill Gates has a net worth of $92.3 billion in January 2018. The software giant and current richest person in the world co-founded the largest computer software company in the world, Microsoft, with Paul Allen.','Microsoft','ceo','https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',2,1,'2017-12-13 00:00:00.000000','sunny shah','2018-02-07 18:27:07.000000','sunny shah','::1'),(3,'Mukesh Ambani','ndian business magnate, Mukesh Ambani, has an estimated net worth of $40.2 billion in January 2018. Despite dropping from the list of top ten richest people in the world after losing $4.7 billion, Mukesh Ambani is still the richest Indian in the world. He is the chairman and managing director of the one of India’s largest conglomerate, Reliance Industries Limited.','Reliance','Founder','https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',3,1,'2017-12-13 00:00:00.000000','dipesh patel','2018-02-07 18:26:43.000000','sunny shah','::1');
/*!40000 ALTER TABLE `testimony` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `token` varchar(800) DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `inserted_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,'1','7410cdf658c40b5ece6c1b6091a9587c',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36','2018-03-18 12:40:19','2018-03-18 14:58:12',NULL,'::1');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(800) DEFAULT NULL,
  `email` varchar(800) DEFAULT NULL,
  `password` varchar(800) DEFAULT NULL,
  `address` text,
  `phone` varchar(15) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `inserted_by` varchar(800) DEFAULT NULL,
  `inserted_on` datetime DEFAULT NULL,
  `updated_by` varchar(800) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'kaushik','admin@admin.com','d8578edf8458ce06fbc5bb76a58c5ca4','silvassa(ss)','2345678901','http://test.dcubepublicity.com/media/d2.jpg','1','ethan','2018-01-02 00:00:00','hunt','2018-02-19 13:29:05',1,'145.224.10.34');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-20 14:25:49

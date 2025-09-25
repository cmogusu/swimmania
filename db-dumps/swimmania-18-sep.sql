-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 18, 2025 at 09:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `swimmania`
--

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE `entity` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `type` enum('swimmer','school','pool','team','swimMeet','coach') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `insertTime` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entity`
--

INSERT INTO `entity` (`id`, `name`, `type`, `description`, `location`, `insertTime`) VALUES
(6, 'favorite pool', 'pool', 'swimMeet more coherent description ', 'kiambu town', '2024-10-25 15:35:10'),
(41, 'Magdalen Garden', 'pool', 'out how now although worriedly miserably habit drat oh monumental until interestingly tentacle recklessly', 'function () { [native code] } function () { [native code] }', '2025-09-18 18:24:24'),
(43, 'North Street', 'pool', 'flawless minor proliferate publicize usually whether wheel for lonely scorn effector when carelessly despite gown despite egg corporation', 'Essex Timor-Leste', '2025-09-18 18:48:58'),
(44, 'N Railroad Street', 'pool', 'but for although inside trick ack uh-huh uniform interestingly at', 'County Armagh Indonesia', '2025-09-18 19:20:25');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `filepath` varchar(255) NOT NULL,
  `isDefault` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `entityId`, `alt`, `filepath`, `isDefault`) VALUES
(1, 6, 'image1 descrpt', '/images/pool-1.jpg', 0),
(2, 6, 'better image2 description', '/images/pool-4.jpg', 1),
(3, 6, 'desc', '/images/pool-3.jpg', 0),
(4, 6, 'image 4 description againsted', '/images/pool-5.jpg', 0),
(5, 6, 'desc', '/images/pool-2.jpg', 0),
(8, 41, 'interesting hence requirement', '/images/pool-1.jpg', 1),
(10, 43, 'scratch gratefully when best-seller excitedly aw', '/images/pool-3.jpg', 1),
(11, 44, 'pale denitrify schedule cannon um', '/images/pool-6.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `metadata`
--

CREATE TABLE `metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `entityType` enum('swimmer','school','pool','team','swimMeet','coach') DEFAULT NULL,
  `name` varchar(254) NOT NULL,
  `value` varchar(254) DEFAULT NULL,
  `itemIndex` int(11) DEFAULT 0,
  `value_tiny` tinyint(1) DEFAULT NULL,
  `value_time` bigint(20) DEFAULT NULL,
  `value_num` int(11) DEFAULT NULL,
  `value_text` varchar(255) DEFAULT NULL,
  `value_lat` double DEFAULT NULL,
  `value_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata`
--

INSERT INTO `metadata` (`id`, `entityId`, `entityType`, `name`, `value`, `itemIndex`, `value_tiny`, `value_time`, `value_num`, `value_text`, `value_lat`, `value_lng`) VALUES
(13, 6, 'pool', 'poolDimensions.length', '25', 0, NULL, NULL, 25, NULL, NULL, NULL),
(14, 6, 'pool', 'location.lat', '-1.2611664809506706', 0, NULL, NULL, NULL, NULL, -1.2611664809506706, NULL),
(15, 6, 'pool', 'location.lng', '36.80447787409544', 0, NULL, NULL, NULL, NULL, 36.80447787409544, NULL),
(24, 6, 'pool', 'operatingHours.closing', '29100000', 0, NULL, 32700000, NULL, NULL, NULL, NULL),
(25, 6, 'pool', 'hasLaneRopes', '1', 0, 0, NULL, NULL, NULL, NULL, NULL),
(26, 6, 'pool', 'isHeated', 'true', 0, 0, NULL, NULL, NULL, NULL, NULL),
(28, 6, 'pool', 'cleanliness', '2', 0, 5, NULL, NULL, NULL, NULL, NULL),
(29, 6, 'pool', 'hasOnDutyLifeguard', '0', 0, 0, NULL, NULL, NULL, NULL, NULL),
(35, 6, 'pool', 'hostInstitutionType', 'gym', 0, NULL, NULL, NULL, 'school', NULL, NULL),
(36, 6, 'pool', 'poolShape', 'square', 0, NULL, NULL, NULL, 'round', NULL, NULL),
(37, 6, 'pool', 'poolDimensions.length', '12', 0, NULL, NULL, 125, NULL, NULL, NULL),
(40, 6, 'pool', 'poolDimensions.width', '23', 0, NULL, NULL, 26, NULL, NULL, NULL),
(41, 6, 'pool', 'crowdiness', '2', 0, 4, NULL, NULL, NULL, NULL, NULL),
(42, 6, 'pool', 'openToPublic', 'true', 0, 0, NULL, NULL, NULL, NULL, NULL),
(43, 6, 'pool', 'entryFeeIn.ksh', '54', 0, NULL, NULL, 57, NULL, NULL, NULL),
(44, 6, 'pool', 'changingRoomCleanliness', '4', 0, 5, NULL, NULL, NULL, NULL, NULL),
(45, 6, 'pool', 'operatingHours.opening', '14820000', 0, NULL, 22020000, NULL, NULL, NULL, NULL),
(46, 6, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 47, NULL, NULL, NULL),
(57, 43, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 7, NULL, NULL, NULL),
(58, 43, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(59, 43, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(60, 43, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 97, NULL, NULL, NULL),
(61, 43, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 19, NULL, NULL, NULL),
(62, 43, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(63, 43, 'pool', 'operatingHours.closing', NULL, 0, NULL, 76800000, NULL, NULL, NULL, NULL),
(64, 43, 'pool', 'operatingHours.opening', NULL, 0, NULL, 29340000, NULL, NULL, NULL, NULL),
(65, 43, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 43, NULL, NULL, NULL),
(66, 43, 'pool', 'cleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(67, 43, 'pool', 'changingRoomCleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(68, 43, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.18135756673602, NULL),
(69, 43, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.886576888271335),
(141, 41, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(142, 41, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 20, NULL, NULL, NULL),
(143, 41, 'pool', 'operatingHours.opening', NULL, 0, NULL, 63000000, NULL, NULL, NULL, NULL),
(144, 41, 'pool', 'operatingHours.closing', NULL, 0, NULL, 51600000, NULL, NULL, NULL, NULL),
(145, 41, 'pool', 'crowdiness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(146, 41, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(147, 41, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(148, 41, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(149, 41, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(150, 41, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 59, NULL, NULL, NULL),
(151, 41, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 39, NULL, NULL, NULL),
(152, 41, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(153, 41, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(154, 41, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(155, 41, 'pool', 'changingRoomCleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(156, 41, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(157, 41, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.1288782556062, NULL),
(158, 41, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 79, NULL, NULL, NULL),
(159, 41, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.83443749542126),
(160, 44, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(161, 44, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(162, 44, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 69, NULL, NULL, NULL),
(163, 44, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Curvy', NULL, NULL),
(164, 44, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(165, 44, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 13, NULL, NULL, NULL),
(166, 44, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 34, NULL, NULL, NULL),
(167, 44, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(168, 44, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(169, 44, 'pool', 'cleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(170, 44, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.21124353908365, NULL),
(171, 44, 'pool', 'operatingHours.opening', NULL, 0, NULL, 64140000, NULL, NULL, NULL, NULL),
(172, 44, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(173, 44, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.856021292099534),
(174, 44, 'pool', 'operatingHours.closing', NULL, 0, NULL, 58320000, NULL, NULL, NULL, NULL),
(175, 44, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 71, NULL, NULL, NULL),
(176, 44, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(177, 44, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(178, 44, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `relations`
--

CREATE TABLE `relations` (
  `id` int(11) NOT NULL,
  `entityId1` int(11) NOT NULL,
  `entityId2` int(11) NOT NULL,
  `relationship` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relations`
--

INSERT INTO `relations` (`id`, `entityId1`, `entityId2`, `relationship`) VALUES
(19, 12, 6, 'coach-pool');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entity`
--
ALTER TABLE `entity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id-entityId-default` (`id`,`entityId`,`alt`);

--
-- Indexes for table `metadata`
--
ALTER TABLE `metadata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id-entityId-type` (`id`,`entityId`,`entityType`) USING BTREE,
  ADD UNIQUE KEY `number-values` (`id`,`name`,`value_num`),
  ADD KEY `time-values` (`id`,`name`,`value_time`),
  ADD KEY `text-values` (`id`,`name`,`value_text`),
  ADD KEY `lat-lng-values` (`id`,`name`,`value_lat`,`value_lng`),
  ADD KEY `tinyInt-values` (`id`,`name`,`value_tiny`) USING BTREE;

--
-- Indexes for table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `entityId1` (`entityId1`,`entityId2`,`relationship`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `metadata`
--
ALTER TABLE `metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

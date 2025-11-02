-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 31, 2025 at 08:00 PM
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
-- Table structure for table `coach_metadata`
--

CREATE TABLE `coach_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `performance` tinyint(4) DEFAULT NULL,
  `friendliness` tinyint(4) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `ratePerHour_ksh` int(11) DEFAULT NULL,
  `ratePerHour_usd` int(11) DEFAULT NULL,
  `workingHours_opening` time DEFAULT NULL,
  `workingHours_closing` time DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach_metadata`
--

INSERT INTO `coach_metadata` (`id`, `entityId`, `performance`, `friendliness`, `experience`, `ratePerHour_ksh`, `ratePerHour_usd`, `workingHours_opening`, `workingHours_closing`, `location_lat`, `location_lng`) VALUES
(1, 57, 2, 2, 57188, -749840, -457283, '19:29:19', '09:50:29', -1.23201824951693, 36.74166987282876),
(2, 81, 1, 5, 918900, 960121, -464315, '21:43:34', '08:07:51', -1.15408591001772, 36.82770075335528),
(4, 108, 2, 3, 594860, 166891, 321256, '15:47:05', '19:28:46', -1.17570614390815, 36.80378748888529),
(5, 118, 3, 2, 908529, 2261, 878508, '13:36:04', '05:34:19', -1.12331345830633, 36.76906475630724),
(6, 46, NULL, NULL, NULL, NULL, 1, NULL, '20:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE `entity` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `type` enum('swimmer','school','pool','team','swimMeet','coach','lifeguard','swimResult','swimEvent','parent','user') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `insertTime` timestamp NULL DEFAULT current_timestamp(),
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entity`
--

INSERT INTO `entity` (`id`, `name`, `type`, `description`, `insertTime`, `userId`) VALUES
(6, 'favorite pool', 'pool', 'event more coherent description ', '2024-10-25 12:35:10', 122),
(41, 'Magdalen Garden', 'pool', 'out how now althoug worriedly miserably habit drat oh monumental until interestingly tentacle recklessly', '2025-09-18 15:24:24', 122),
(43, 'North Streets', 'pool', 'flawless minor proliferate publicize usually whether wheel for lonely scorn effector when carelessly despite gown despite egg corporatio', '2025-09-18 15:48:58', 123),
(44, 'N Railroad Street', 'coach', 'but for although inside trick ack uh-huh uniform interestingly at', '2025-09-18 16:20:25', 122),
(45, 'Andreane Track', 'coach', 'hence gruesome who home incidentally pfft haunting out till why yahoo ouch blue versus micromanage tag', '2025-09-19 16:17:23', 122),
(46, 'S College Street', 'coach', 'moral sorrowful stealthily out afore with pants apud long lively sunny cricket stool regarding vulgarise mmm louse even honorable phew', '2025-09-19 16:17:23', 122),
(47, 'Post Road', 'coach', 'writhing sizzling blah impure intensely grim opposite viability hovercraft with valuable exalt', '2025-09-19 16:17:23', 122),
(48, 'Goodwin Falls', 'pool', 'including although throughout promptly hydrolyse shrilly in foolish supposing incidentally provided blight lock beside an reassuringly so rebuild unless step-mother', '2025-09-19 16:17:23', 122),
(49, 'Justus Haven', 'pool', 'lampoon relieve ick er when than yowza reborn than summer discrete pro since underplay uselessly duh exempt not', '2025-09-19 16:17:23', 123),
(50, 'Willow Road', 'swimmer', 'electrify whether unexpectedly swerve yum agreement but indeed charlatan swill meanwhile whose scented uh-huh gladly among along an celsius gasp', '2025-09-19 16:17:23', 122),
(51, 'Caitlyn Dale', 'pool', 'above of demob boldly so jiggle colorize sympathetically going outside buttery duh late overheard', '2025-09-19 16:17:23', 122),
(52, 'Kings Highway', 'pool', 'provided nor dental upon fashion pro if governance ponder finally friendly questionable tinted', '2025-09-19 16:17:23', 122),
(53, 'Cedar Street', 'school', 'efface er searchingly huzzah reassuringly distant provided wearily ack cruelty override patiently supposing earth until hygienic whenever pace', '2025-09-19 16:17:23', 122),
(54, 'Dooley Lake', 'coach', 'geez finally taut cow quit when slight ah tray pfft nervous knavishly gah topsail onto experienced toward loyally up', '2025-09-19 16:17:23', 122),
(55, 'N 9th Street', 'pool', 'dim whenever between once ah however scrutinise recount scorpion how', '2025-09-19 16:24:54', 122),
(56, 'Pine Close', 'pool', 'plain whoa rear mozzarella grimy from circa inspect eyebrow fond abnormally far but bathhouse', '2025-09-19 16:24:54', 122),
(57, 'Victoria Place', 'coach', 'uh-huh incidentally bug as anguished till ick likewise king truly despite hmph detective never thoughtfully alongside adaptation incidentally webbed eyeglasses', '2025-09-19 16:24:54', 122),
(58, 'Manor Way', 'pool', 'cycle boohoo until willow those brush hence trusting likewise fragrant pace awareness midst huzzah lest bonfire', '2025-09-19 16:24:54', 122),
(59, 'Matteo Forge', 'team', 'bus wallaby mountain spring formula instead swim clamour mainstream after bookcase ridge massage redesign yet politely a restfully', '2025-09-19 16:24:54', 122),
(60, 'Gloucester Road', 'coach', 'readies unless um underneath necklace glossy mmm around institute hence king dispose sun yowza biodegradable provided successfully meanwhile', '2025-09-19 16:24:54', 122),
(61, 'Cassin Falls', 'pool', 'motivate why knowledgeably aha quip oh dish countess account loftily yippee sock folklore political underneath brave aha but amid lest', '2025-09-19 16:24:54', 122),
(62, 'Alvena Hill', 'pool', 'if busy lazy so mmm supposing authentic cutlet fooey whose however yum yippee', '2025-09-19 16:24:54', 122),
(63, 'S Broad Street', 'pool', 'absent besmirch rapid righteously gee mobility gifted toward hunt yippee early yahoo verbally neatly horse unnaturally terraform willow swiftly with', '2025-09-19 16:24:54', 122),
(64, 'S Monroe Street', 'pool', 'object boohoo merrily pants mouser moralise yet in unexpectedly terribly guard blah upliftingly over reluctantly athwart amidst litter', '2025-09-19 16:24:54', 122),
(65, 'Inter Clubs Swimming Championships', 'swimMeet', 'NCSA Inter-Clubs Swimming Championships April 11-13 2025', '2025-09-22 14:22:59', 122),
(66, 'Beech Road', 'swimmer', 'community oof since midwife tut hm posh after planula excluding until', '2025-10-24 14:49:55', 122),
(67, 'Beaulah Land', 'swimmer', 'tedious fen up scope nor honestly because boo fast irresponsible the curly', '2025-10-24 14:51:21', 122),
(68, 'N 7th Street', 'swimmer', 'functional circa friendly yahoo ouch meanwhile er monstrous following nor', '2025-10-24 15:45:47', 122),
(69, 'Peter Mews', 'swimmer', 'as via weighty contrail times rapidly sticky lashes the scale coaxingly friendly step-mother boohoo folklore foodstuffs at courageously near oof', '2025-10-24 15:48:15', 122),
(70, 'Cassin Burgs', 'swimmer', 'but within readjust scrape coin faint even self-assured recount uselessly rubbery modulo enormously boss ouch', '2025-10-24 15:48:48', 122),
(71, 'Alisa Streets', 'swimmer', 'frantically inspect cutover arraign king growing hm via conceal community blushing psst fooey upbeat nectarine reboot stupendous dearly lady', '2025-10-24 15:55:41', 122),
(72, 'West Street', 'school', 'hmph barring wherever wholly neatly versus now hornet separately rekindle essence between bootleg which sleepily', '2025-10-24 15:58:39', 122),
(73, 'Turner Locks', 'school', 'in bravely whose hm beautifully utilized aha upon why within mooch fidget horn unbearably', '2025-10-24 16:03:28', 122),
(74, 'Wintheiser Shores', 'school', 'worth redesign retool but lack numb than enormously stable pfft yowza plus', '2025-10-24 16:03:46', 122),
(75, 'Georgette Freeway', 'school', 'since above hm scrape inject dash pfft yahoo spark sure-footed super signature jaggedly um monstrous usefully realistic any', '2025-10-24 16:04:04', 122),
(76, 'Becker Ways', 'school', 'coaxingly resort blah insist meanwhile but innovate worth mmm fiddle writ joshingly boo yahoo helpfully however', '2025-10-24 16:04:04', 122),
(77, 'First Street', 'school', 'scarily ouch miserably profuse verbally fragrant fearless as outside gum confute aboard geez duh oval immediately', '2025-10-24 16:04:04', 122),
(78, 'O\'Connell Tunnel', 'school', 'indeed meh oh degenerate grass and engender shampoo loyally gosh excited freely outlying across collaborate jovially however distant', '2025-10-24 16:04:04', 122),
(79, 'Kozey Valleys', 'school', 'an yum modulo softly before but beautifully what within underplay forecast shiny regularly story alert hence once', '2025-10-24 16:04:04', 122),
(80, 'Karianne Glen', 'school', 'out against proofread accountability light throughout oh terrible information reporter bah curry weatherize disposer what oxidise on bah yowza', '2025-10-24 16:04:47', 122),
(81, 'Abbott Lights', 'lifeguard', 'lava gosh institute pile amidst for whenever soap sequester while brr whether cinema deeply live ah warming quixotic flood', '2025-10-24 16:34:05', 122),
(82, 'The Coppice', 'lifeguard', 'joyously even place shout when mortally gladly digit fooey roughly or mid near dusk thoroughly via', '2025-10-24 16:37:32', 122),
(83, 'Meadow Lane', 'swimEvent', 'per psst eggplant paltry partridge meanwhile over live hoot deliberately spirit pro remorseful forenenst', '2025-10-24 16:40:52', 122),
(84, 'The Laurels', 'swimEvent', 'though bah small modulo solemnly than until second inasmuch yet', '2025-10-24 17:00:45', 122),
(85, 'Miller Oval', 'swimEvent', 'towards however before gee ham finding urban minus bakeware punctually kissingly lest', '2025-10-24 17:03:48', 122),
(86, 'Imogene Loop', 'swimEvent', 'pro uncover vanish elegant likewise atop unwritten which because shyly mid', '2025-10-24 17:07:21', 122),
(87, 'Well Lane', 'swimEvent', 'remark out custom shakily grandpa prohibition nor yahoo um bowler ouch nor hm sleepily as', '2025-10-24 17:08:10', 122),
(88, 'Ezra Rapid', 'swimEvent', 'optimal incidentally for fine repossess developing someplace too abaft excluding blah crumble gosh hmph bemuse', '2025-10-24 17:09:24', 122),
(89, 'Kelton Garden', 'swimEvent', 'without plus drug pro reasoning innocently yahoo that snow premium far since fooey cruelly retool humiliating fooey', '2025-10-24 17:09:24', 122),
(90, 'Connelly Ford', 'swimEvent', 'ferociously ethyl turret chairperson ah digestive querulous ha inasmuch creator boohoo phooey yet overfeed wasteful furthermore lanky', '2025-10-24 17:09:24', 122),
(91, 'Predovic Common', 'swimEvent', 'yet ew forage nice aha innocently excepting via that where worse ouch before vivaciously provided pro fooey likely treble', '2025-10-24 17:09:24', 122),
(92, 'S Broadway Street', 'swimEvent', 'qua tooth genuine meanwhile fairly train mmm design what sometimes stabilise underplay rout', '2025-10-24 17:09:24', 122),
(93, 'Adrian Ranch', 'swimEvent', 'huzzah hamburger CD delightfully kissingly strictly deduce oh nearly ashamed fair tensely cavernous huzzah spew abaft mmm treble angelic fortunately', '2025-10-24 17:10:25', 122),
(94, 'Roob Run', 'swimEvent', 'pfft hoarse inasmuch than flickering athwart meh igloo descent pfft meaningfully', '2025-10-24 17:10:51', 122),
(95, 'Walsh Springs', 'swimEvent', 'toward swiftly pasta shameless upliftingly without phooey gadzooks fen compromise next entomb intensely unbalance', '2025-10-24 17:10:51', 122),
(96, 'Cedar Close', 'swimEvent', 'gah worldly uh-huh table physically whoever oddly excluding revere limp endow ramp versus where bah meh inasmuch outdo even unearth', '2025-10-24 17:10:51', 122),
(97, 'Bruen Brook', 'swimEvent', 'angelic censor fussy gruesome sup pretend quiet voluntarily sunbeam gosh er till frivolous', '2025-10-24 17:10:51', 122),
(98, 'Jaycee Corners', 'swimEvent', 'except hm opposite ugh consequently croon hello stale pip even', '2025-10-24 17:10:51', 122),
(99, 'Hawthorn Avenue', 'swimEvent', 'finally fall familiar through eyebrow beneath revitalise junior circa pro meh boohoo profitable digit instead aside', '2025-10-24 17:11:40', 122),
(100, 'Block Cape', 'swimEvent', 'smoothly tame openly old incidentally speedily unless colon huzzah yum', '2025-10-24 17:13:14', 122),
(101, 'Albin Meadows', 'lifeguard', 'broadside pecan ah celebrate goose guilty graft oh mmm beautifully lieu except bob right thoughtfully ouch', '2025-10-24 17:19:43', 122),
(102, 'W Washington Avenue', 'lifeguard', 'noteworthy since plump solder briefly readily geez ownership degrease antelope of mountain valiantly meanwhile woot below frenetically majestic who', '2025-10-24 17:20:23', 122),
(103, 'Reva Corner', 'pool', 'beside minus ew consequently igloo drat acclaimed or monthly as obnoxiously', '2025-10-24 17:22:44', 122),
(104, 'Phyllis Ville', 'pool', 'pish ride quicker excited what certainly homeschool yahoo commonly goose failing profane but joshingly', '2025-10-24 17:23:13', 122),
(105, 'Little Drive', 'school', 'violently phew char failing until loyally inside amongst yahoo clonk sad ack continually grade', '2025-10-24 17:43:19', 122),
(106, 'Schimmel Extensions', 'team', 'while when adumbrate healthily prejudge mid railway service snoopy respectful dwell blink minty before', '2025-10-24 17:43:47', 122),
(107, 'N Jefferson Street', 'swimMeet', 'loyally sticky academics in last joyously unnaturally direct into emphasise dependable failing cinema for', '2025-10-24 17:43:56', 122),
(108, 'Kaylin Corner', 'coach', 'gratefully incidentally brr given embossing um lovingly collaboration hmph via responsible properly madly unto charter exactly', '2025-10-24 18:10:22', 122),
(109, 'Auer Crossing', 'team', 'lounge aw athwart aware aha internationalize or notwithstanding deafening enfold zowie awful accompany until since capsize crossly bony consequently hmph', '2025-10-24 18:10:45', 122),
(110, 'Woodlands', 'pool', 'greedily political wilt underneath true whoever where unearth poorly vice confusion times vista yippee gosh wherever bide joyful too unhappy', '2025-10-24 18:11:24', 122),
(111, 'N Washington Street', 'school', 'scare acidic hmph omelet supposing although shred if that unused', '2025-10-24 18:11:34', 122),
(112, 'Old State Road', 'swimmer', 'baptise mid bitterly decryption pluck fictionalize content geez impact edible mid clamour zowie minty see wear', '2025-10-24 18:12:27', 122),
(113, 'Alaina Curve', 'parent', 'upliftingly notwithstanding gee dependent daily closed eyeliner reopen yawningly grumpy limp indeed since last allocation viability', '2025-10-24 18:15:02', 122),
(114, 'Chestnut Street', 'parent', 'uniform which developing not task fooey yearn steel asset hence graft nor inasmuch uh-huh worth finally phooey cook', '2025-10-24 18:15:31', 122),
(115, 'Herminia Burgs', 'swimEvent', 'back furthermore unless thoroughly judgementally gosh but peter watery out covenant aha dapper grubby rejigger ambitious psst consequently quickly', '2025-10-24 18:15:58', 122),
(116, 'Funk Pine', 'swimEvent', 'beneath produce annex spectate neck psst celebrate puny into whereas dwell', '2025-10-24 18:16:13', 122),
(117, 'Vanessa Prairie', 'lifeguard', 'repentant nervously commonly almost leading towards uh-huh next nor elevation screw almost throughout where yahoo thrifty', '2025-10-24 18:16:29', 122),
(118, 'Dietrich Islands', 'coach', 'closed well-documented for dally remand embarrassment considering coliseum incidentally toward why through unimpressively joshingly opposite and gnaw neatly morbidity rosemary', '2025-10-24 18:16:48', 122),
(119, 'Yasmine Estates', 'swimMeet', 'closely oh video whoa plus however pish floodlight drug pricey flustered edible zowie bidet throughout anesthetize privilege gosh', '2025-10-24 18:17:07', 122),
(120, 'Effertz Falls', 'team', 'finer via through round ravage co-producer and aboard meager rigidly bogus careless ah following without', '2025-10-24 18:17:30', 122),
(121, 'Witting Walk', 'swimMeet', 'pfft sweet twine joshingly useless cornet now less coarse live chairperson epic bruised punctual amongst meh spanish', '2025-10-24 18:21:32', 122),
(122, 'Clive', 'user', 'this is a good thing', '2025-10-31 16:22:59', 122),
(123, 'Strange', 'user', 'doctor strange', '2025-10-31 16:43:38', 22);

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
(8, 41, 'interesting hence requirement', '/images/pool-1.jpg', 1),
(10, 43, 'scratch gratefully when best-seller excitedly aw', '/images/pool-3.jpg', 1),
(11, 44, 'pale denitrify schedule cannon um', '/images/pool-6.jpg', 1),
(12, 50, 'down quantify now truly uniform angelic throughout', '/images/pool-7.jpg', 1),
(13, 45, 'unexpectedly but pretend hence address extra-large beyond', '/images/pool-2.jpg', 1),
(14, 51, 'apud unless far excepting till event', '/images/pool-5.jpg', 1),
(15, 46, 'overcoat zowie after bleakly if ceramic stealthily', '/images/pool-7.jpg', 1),
(16, 49, 'to capsize bouncy justly federate aha', '/images/pool-3.jpg', 1),
(17, 52, 'punctually atop during recklessly gadzooks until unlike cricket', '/images/pool-3.jpg', 1),
(18, 48, 'bolster sans metabolite yum adolescent tasty before distinction', '/images/pool-2.jpg', 1),
(19, 47, 'now ew toward chip likewise', '/images/pool-6.jpg', 1),
(20, 53, 'ignorant gah celebrated ouch yowza courteous classic', '/images/pool-1.jpg', 1),
(21, 54, 'absent meh freckle', '/images/pool-3.jpg', 1),
(22, 55, 'once throughout clear', '/images/pool-2.jpg', 1),
(23, 56, 'yahoo enormously psst trust under', '/images/pool-2.jpg', 1),
(24, 57, 'serene horn pertain minus yippee bravely', '/images/pool-7.jpg', 1),
(25, 62, 'before early recommendation quiet strange', '/images/pool-2.jpg', 1),
(26, 61, 'playfully colon moor aw throughout till culminate', '/images/pool-5.jpg', 1),
(27, 63, 'faithfully savour meaningfully yahoo', '/images/pool-1.jpg', 1),
(28, 58, 'off now scorpion sleepily tune-up newsprint kissingly', '/images/pool-3.jpg', 1),
(29, 59, 'although designation oh beyond colour brandish incidentally solemnly', '/images/pool-1.jpg', 1),
(30, 60, 'dreamily heartbeat whoever insist', '/images/pool-3.jpg', 1),
(31, 64, 'hammock unusual monster ack excepting joshingly swill', '/images/pool-4.jpg', 1),
(32, 6, 'swiftly bah cuddly oil wearily or baptise', '/images/pool-7.jpg', 1),
(33, 6, 'gleefully rationalise muted beneath considering wing amendment aw', '/images/pool-5.jpg', 1),
(34, 6, 'furthermore pinion terribly anxiously defenseless', '/images/pool-5.jpg', 1),
(35, 66, 'trench woot symbolise quickly by', '/images/pool-7.jpg', 1),
(36, 67, 'of solution generally', '/images/pool-3.jpg', 1),
(37, 68, 'excepting likewise hope', '/images/pool-1.jpg', 1),
(38, 69, 'nor thankfully elderly huzzah', '/images/pool-3.jpg', 1),
(39, 70, 'sometimes hastily whoever dilate', '/images/pool-7.jpg', 1),
(40, 71, 'woefully ew phew bravely edge rue', '/images/pool-2.jpg', 1),
(41, 72, 'hence unnaturally past obedience', '/images/pool-5.jpg', 1),
(42, 73, 'hope carefully brr redound', '/images/pool-3.jpg', 1),
(43, 74, 'between kinase limply than brandish', '/images/pool-5.jpg', 1),
(44, 75, 'drat while gadzooks', '/images/pool-3.jpg', 1),
(45, 76, 'though practical greatly', '/images/pool-3.jpg', 1),
(46, 77, 'dream produce reluctantly sadly smoggy huzzah flight', '/images/pool-6.jpg', 1),
(47, 78, 'like forearm harp wealthy massage light', '/images/pool-4.jpg', 1),
(48, 79, 'archaeology mob indeed tightly', '/images/pool-6.jpg', 1),
(49, 80, 'voluminous fooey times', '/images/pool-2.jpg', 1),
(50, 81, 'oddly unbalance ultimate valley as stage lest considering', '/images/pool-5.jpg', 1),
(51, 82, 'how plus circulate gee pro atop how gigantic', '/images/pool-5.jpg', 1),
(52, 83, 'apropos whenever weekly where oh absolve', '/images/pool-3.jpg', 1),
(53, 84, 'untried yum wallaby fast', '/images/pool-5.jpg', 1),
(54, 85, 'amidst willing er before yahoo why perspire', '/images/pool-7.jpg', 1),
(55, 86, 'in whoever satirise', '/images/pool-4.jpg', 1),
(56, 87, 'lest absentmindedly supposing whereas if during oh', '/images/pool-1.jpg', 1),
(57, 88, 'elementary amid faint sesame recompense instead yahoo cemetery', '/images/pool-3.jpg', 1),
(58, 89, 'tense ick pliers loyalty', '/images/pool-7.jpg', 1),
(59, 90, 'crossly hollow sidetrack ligate precedent oh frantically gosh', '/images/pool-7.jpg', 1),
(60, 91, 'woot hearten politely because mealy', '/images/pool-4.jpg', 1),
(61, 92, 'however ham till up controvert', '/images/pool-2.jpg', 1),
(62, 93, 'unnecessarily opposite proselytise on', '/images/pool-2.jpg', 1),
(63, 94, 'so bleakly grok optimistically', '/images/pool-2.jpg', 1),
(64, 95, 'famously challenge phooey for oof speedily as', '/images/pool-7.jpg', 1),
(65, 97, 'frankly times haircut qua printer beside', '/images/pool-7.jpg', 1),
(66, 96, 'clinking that lampoon yuck fleck thunderbolt if ha', '/images/pool-6.jpg', 1),
(67, 98, 'zowie lest while loaf pip cone ha sandy', '/images/pool-1.jpg', 1),
(68, 99, 'knowingly segregate jealous formula limp quadruple boo engage', '/images/pool-7.jpg', 1),
(69, 100, 'where down swanling down wherever that till tuber', '/images/pool-7.jpg', 1),
(70, 101, 'instead ignorance as duster honestly bouncy', '/images/pool-1.jpg', 1),
(71, 102, 'er cheerfully accidentally obedience corner vibration between promise', '/images/pool-2.jpg', 1),
(72, 103, 'inside following sweetly likewise', '/images/pool-7.jpg', 1),
(73, 104, 'widow anneal joyful that eyeliner uselessly phew tarragon', '/images/pool-5.jpg', 1),
(74, 105, 'married necessary willow mid fit underneath', '/images/pool-4.jpg', 1),
(75, 106, 'ah accompany pile how although suffice', '/images/pool-3.jpg', 1),
(76, 107, 'upward unethically phew times adrenalin', '/images/pool-7.jpg', 1),
(77, 108, 'boiling thankfully oof celebrated peony sleepily lively', '/images/pool-2.jpg', 1),
(78, 109, 'properly accomplished chainstay fax augment', '/images/pool-1.jpg', 1),
(79, 110, 'daughter validity criminal since shrill recede boohoo', '/images/pool-5.jpg', 1),
(80, 111, 'atop before when', '/images/pool-5.jpg', 1),
(81, 112, 'trusting whose incidentally', '/images/pool-2.jpg', 1),
(82, 113, 'knowledgeable traduce gee for unabashedly', '/images/pool-1.jpg', 1),
(83, 114, 'supposing tag demobilise versus', '/images/pool-6.jpg', 1),
(84, 115, 'hence unless astride late always', '/images/pool-6.jpg', 1),
(85, 116, 'underneath phew scarily infamous', '/images/pool-7.jpg', 1),
(86, 117, 'who whose subsidy whether ack fishery pulverize', '/images/pool-4.jpg', 1),
(87, 118, 'next instead now gah pish but poppy', '/images/pool-5.jpg', 1),
(88, 119, 'consequently row gently fiercely book moor inasmuch eternity', '/images/pool-6.jpg', 1),
(89, 120, 'sweet wire oil towards', '/images/pool-3.jpg', 1),
(90, 121, 'garage dish capsize who', '/images/pool-7.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `lifeguard_metadata`
--

CREATE TABLE `lifeguard_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `thirdName` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lifeguard_metadata`
--

INSERT INTO `lifeguard_metadata` (`id`, `entityId`, `firstName`, `surname`, `thirdName`, `dob`, `location_lat`, `location_lng`) VALUES
(1, 81, 'ack', 'excluding', 'encouragement', 'aha', -1.27483214278864, 36.89327138010387),
(2, 82, 'excluding', 'after', 'warmly', 'finally', -1.11194633393434, 36.882762634334824),
(3, 101, 'hairy', 'liberalize atrium', 'whereas beside', 'despite through', -1.27496890905312, 36.75626246372862),
(4, 102, 'optimistically whether', 'crank times', 'laughter mechanically', 'uselessly', -1.27091691406872, 36.722366341884744),
(5, 117, 'plain', 'partially', 'rightfully up', 'yippee mathematics', -1.16263002994382, 36.80121492186542);

-- --------------------------------------------------------

--
-- Table structure for table `parent_metadata`
--

CREATE TABLE `parent_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_metadata`
--

INSERT INTO `parent_metadata` (`id`, `entityId`, `location_lat`, `location_lng`) VALUES
(1, 113, -1.22796878955042, 36.76733630773894),
(2, 114, -1.28943227926395, 36.84911065350581);

-- --------------------------------------------------------

--
-- Table structure for table `pool_metadata`
--

CREATE TABLE `pool_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `poolDimensions_length` int(11) DEFAULT NULL,
  `poolDimensions_width` int(11) DEFAULT NULL,
  `operatingHours_opening` time DEFAULT NULL,
  `crowdiness` tinyint(4) DEFAULT NULL,
  `openToPublic` tinyint(4) DEFAULT NULL,
  `entryFeeIn_ksh` int(11) DEFAULT NULL,
  `entryFeeIn_usd` int(11) DEFAULT NULL,
  `isIndoor` tinyint(4) DEFAULT NULL,
  `cleanliness` tinyint(4) DEFAULT NULL,
  `changingRoomCleanliness` tinyint(4) DEFAULT NULL,
  `hasOnDutyLifeguard` tinyint(4) DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL,
  `openToChildren` tinyint(4) DEFAULT NULL,
  `hasLaneRopes` tinyint(4) DEFAULT NULL,
  `isHeated` tinyint(4) DEFAULT NULL,
  `operatingHours_closing` time DEFAULT NULL,
  `hostInstitutionType` enum('hotel','school','gym') DEFAULT NULL,
  `poolShape` enum('round','rectangle','square','curvy') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pool_metadata`
--

INSERT INTO `pool_metadata` (`id`, `entityId`, `poolDimensions_length`, `poolDimensions_width`, `operatingHours_opening`, `crowdiness`, `openToPublic`, `entryFeeIn_ksh`, `entryFeeIn_usd`, `isIndoor`, `cleanliness`, `changingRoomCleanliness`, `hasOnDutyLifeguard`, `location_lat`, `location_lng`, `openToChildren`, `hasLaneRopes`, `isHeated`, `operatingHours_closing`, `hostInstitutionType`, `poolShape`) VALUES
(2, 6, 9, 199, '01:33:20', 4, 1, 2, 9996, 1, 5, 5, 1, -1.25489104578669, 36.87588352399299, 1, 1, 1, '01:10:52', 'gym', 'square'),
(3, 103, 41901, 385669, '23:12:49', 1, 1, 215193, 186253, 0, 4, 4, 0, -1.22384322957105, 36.81805509325541, 0, 0, 1, '04:49:14', 'school', 'rectangle'),
(4, 104, 827367, 81400, '03:55:17', 5, 1, 984579, 914248, 0, 4, 4, 1, -1.11661684837771, 36.797572091112045, 1, 1, 1, '03:44:42', 'school', 'curvy'),
(5, 110, 653677, 49994, '07:02:43', 3, 1, 788668, 386717, 0, 3, 4, 0, -1.28767622488849, 36.71729918908408, 1, 1, 1, '01:56:52', 'school', 'square'),
(6, 41, NULL, 6, '17:12:35', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '17:30:48', 'school', 'square');

-- --------------------------------------------------------

--
-- Table structure for table `relations`
--

CREATE TABLE `relations` (
  `id` int(11) NOT NULL,
  `entityId1` int(11) NOT NULL,
  `entityId2` int(11) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `relationshipType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relations`
--

INSERT INTO `relations` (`id`, `entityId1`, `entityId2`, `relationship`, `relationshipType`) VALUES
(19, 12, 6, 'coach-pool', 'worksAt'),
(25, 46, 6, 'coach-pool', 'worksAt'),
(26, 44, 6, 'coach-pool', 'worksAt'),
(27, 54, 6, 'coach-pool', 'worksAt'),
(30, 45, 43, 'coach-pool', 'worksAt'),
(31, 45, 50, 'coach-swimmer', 'isAlso'),
(32, 6, 59, 'pool-team', 'trainsAt'),
(33, 6, 53, 'pool-school', 'canBeFoundAt'),
(34, 6, 50, 'pool-swimmer', 'trainsAt');

-- --------------------------------------------------------

--
-- Table structure for table `school_metadata`
--

CREATE TABLE `school_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `averageSchoolFees_ksh` int(11) DEFAULT NULL,
  `averageSchoolFees_usd` int(11) DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_metadata`
--

INSERT INTO `school_metadata` (`id`, `entityId`, `averageSchoolFees_ksh`, `averageSchoolFees_usd`, `location_lat`, `location_lng`) VALUES
(1, 72, -401848, -836373, -1.27996997728995, 36.723871457908245),
(2, 73, 720242, 662308, -1.13589105602977, 36.82529539825214),
(3, 74, -477244, -505827, -1.15762029338794, 36.87569740801951),
(4, 76, -664887, -999816, -1.28641510969292, 36.79036022312516),
(5, 75, -460486, 930078, -1.20646313415519, 36.790611139961186),
(6, 79, 39554, -610125, -1.22082013096565, 36.80502940844136),
(7, 77, 406569, -30953, -1.12411454546256, 36.8939381044727),
(8, 78, -387028, 592201, -1.16601561962901, 36.808162235567586),
(9, 80, 576881, -645377, -1.20467828965119, 36.88421683511817),
(10, 105, 139969, 842684, -1.11751028771765, 36.81689922871688),
(11, 111, 805381, 398999, -1.12303190135988, 36.7493910640722);

-- --------------------------------------------------------

--
-- Table structure for table `swmmer_metadata`
--

CREATE TABLE `swmmer_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `thirdName` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `swmmer_metadata`
--

INSERT INTO `swmmer_metadata` (`id`, `entityId`, `firstName`, `surname`, `thirdName`, `dob`) VALUES
(1, 66, 'meanwhile husky', 'vivacious inscribe', 'instead until', '2025-07-23'),
(2, 71, 'lined notwithstanding', 'instead oil', 'incidentally', '2025-12-02'),
(3, 112, 'whose', 'along', 'considering moralise', '2025-03-20');

-- --------------------------------------------------------

--
-- Table structure for table `swm_event_metadata`
--

CREATE TABLE `swm_event_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `eventNumber` int(11) DEFAULT NULL,
  `swimStroke` varchar(255) DEFAULT NULL,
  `swimDistance` varchar(255) DEFAULT NULL,
  `swimDistanceUnit` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `ageGroup` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `swm_event_metadata`
--

INSERT INTO `swm_event_metadata` (`id`, `entityId`, `eventNumber`, `swimStroke`, `swimDistance`, `swimDistanceUnit`, `gender`, `ageGroup`) VALUES
(1, 87, 43406, 'individual_medley', '4x25', 'yard', 'male', 'generously'),
(2, 92, 558541, 'medley_relay', '4x50', 'yard', 'female', 'custody account'),
(3, 88, 94416, 'backstroke', '25', 'meter', 'male', 'apricot'),
(4, 89, 688851, 'medley_relay', '400', 'meter', 'female', 'the overfeed'),
(5, 90, 466655, 'breaststroke', '25', 'yard', 'male', 'while'),
(6, 91, 931866, 'freestyle_relay', '1500', 'meter', 'male', 'hmph'),
(7, 93, 285955, 'freestyle_relay', '50', 'yard', 'female', 'object now'),
(8, 94, 815752, 'individual_medley', '1500', 'yard', 'female', 'via'),
(9, 98, 194155, 'medley_relay', '25', 'meter', 'female', 'sympathetically word'),
(10, 96, 57176, 'butterfly', '25', 'meter', 'male', 'cash'),
(11, 95, 124108, 'butterfly', '1500', 'yard', 'male', 'tectonics gee'),
(12, 97, 907648, 'butterfly', '25', 'meter', 'female', 'bah mouser'),
(13, 99, 471683, 'freestyle', '1500', 'meter', 'male', 'seagull enthusiastically'),
(14, 100, 362092, 'backstroke', '4x50', 'meter', 'female', 'perfectly'),
(15, 115, 446232, 'freestyle', '100', 'yard', 'male', 'zowie what');

-- --------------------------------------------------------

--
-- Table structure for table `swm_meet_metadata`
--

CREATE TABLE `swm_meet_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `course` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL,
  `startEndDates_startDate` date DEFAULT NULL,
  `startEndDates_endDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `swm_meet_metadata`
--

INSERT INTO `swm_meet_metadata` (`id`, `entityId`, `course`, `time`, `location_lat`, `location_lng`, `startEndDates_startDate`, `startEndDates_endDate`) VALUES
(1, 107, 'short', '07:26:12', -1.24825922172442, 36.70133951956484, '2026-04-27', '2026-10-23'),
(2, 119, 'long', '10:12:47', -1.26467241559693, 36.82894175302987, '2026-10-11', '2025-09-20'),
(3, 121, 'short', '21:27:57', -1.26011013776285, 36.77109689515262, '2025-07-01', '2026-04-12'),
(4, 65, NULL, '18:30:57', 38.90359569038469, -77.08090578967045, '2025-10-01', '2025-10-08');

-- --------------------------------------------------------

--
-- Table structure for table `swm_result_metadata`
--

CREATE TABLE `swm_result_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `rank` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `thirdName` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `swm_result_metadata`
--

INSERT INTO `swm_result_metadata` (`id`, `entityId`, `rank`, `firstName`, `time`, `surname`, `thirdName`, `age`) VALUES
(1, 85, -831123, 'valuable', '00:39:21', 'undergo mysteriously', 'relaunch aw', 'plus spook'),
(2, 116, 120298, 'decongestant ack', '07:50:17', 'arid', 'yearn wonderfully', 'hypothesise vibration');

-- --------------------------------------------------------

--
-- Table structure for table `team_metadata`
--

CREATE TABLE `team_metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `openToPublic` int(11) DEFAULT NULL,
  `membershipFee_ksh` int(11) DEFAULT NULL,
  `membershipFee_usd` int(11) DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_metadata`
--

INSERT INTO `team_metadata` (`id`, `entityId`, `openToPublic`, `membershipFee_ksh`, `membershipFee_usd`, `location_lat`, `location_lng`) VALUES
(1, 106, 946590, 585073, 211747, -1.2378010912707, 36.711778790221025),
(2, 109, 317778, 931600, 959828, -1.16462554907698, 36.74836872876976),
(3, 120, 259514, 955832, 269762, -1.29562875121114, 36.886285906736354);

-- --------------------------------------------------------

--
-- Table structure for table `unprocessed_swim_results`
--

CREATE TABLE `unprocessed_swim_results` (
  `id` int(11) NOT NULL,
  `eventNumber` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `team` varchar(200) NOT NULL,
  `distance` varchar(10) NOT NULL,
  `distanceUnit` varchar(10) NOT NULL,
  `stroke` varchar(20) NOT NULL,
  `rank` int(11) NOT NULL,
  `firstName` varchar(120) NOT NULL,
  `surname` varchar(120) NOT NULL,
  `thirdName` varchar(120) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `ageGroup` varchar(50) NOT NULL,
  `time` varchar(20) NOT NULL,
  `isProcessed` tinyint(4) NOT NULL DEFAULT 0,
  `created-at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unprocessed_swim_results`
--

INSERT INTO `unprocessed_swim_results` (`id`, `eventNumber`, `gender`, `team`, `distance`, `distanceUnit`, `stroke`, `rank`, `firstName`, `surname`, `thirdName`, `age`, `ageGroup`, `time`, `isProcessed`, `created-at`) VALUES
(1, 101, 'female', 'KE', '100', 'meter', 'freestyle', 1, 'Waburi', 'Anne', '', 29, '25-29', '1:36.13', 0, '2025-09-26 20:03:01'),
(2, 101, 'female', 'KE', '100', 'meter', 'freestyle', 2, 'Beyu', 'Anjichi', '', 26, '25-29', '1:42.00', 0, '2025-09-26 20:04:53'),
(3, 101, 'female', 'KE', '100', 'meter', 'freestyle', 3, 'Victoria', 'Mutheu', '', 27, '25-29', '2:19.69', 0, '2025-09-26 20:05:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coach_metadata`
--
ALTER TABLE `coach_metadata`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `lifeguard_metadata`
--
ALTER TABLE `lifeguard_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parent_metadata`
--
ALTER TABLE `parent_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pool_metadata`
--
ALTER TABLE `pool_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `entityId1` (`entityId1`,`entityId2`,`relationship`);

--
-- Indexes for table `school_metadata`
--
ALTER TABLE `school_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `swmmer_metadata`
--
ALTER TABLE `swmmer_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `swm_event_metadata`
--
ALTER TABLE `swm_event_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `swm_meet_metadata`
--
ALTER TABLE `swm_meet_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `swm_result_metadata`
--
ALTER TABLE `swm_result_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_metadata`
--
ALTER TABLE `team_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unprocessed_swim_results`
--
ALTER TABLE `unprocessed_swim_results`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coach_metadata`
--
ALTER TABLE `coach_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `lifeguard_metadata`
--
ALTER TABLE `lifeguard_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `parent_metadata`
--
ALTER TABLE `parent_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pool_metadata`
--
ALTER TABLE `pool_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `school_metadata`
--
ALTER TABLE `school_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `swmmer_metadata`
--
ALTER TABLE `swmmer_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `swm_event_metadata`
--
ALTER TABLE `swm_event_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `swm_meet_metadata`
--
ALTER TABLE `swm_meet_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `swm_result_metadata`
--
ALTER TABLE `swm_result_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `team_metadata`
--
ALTER TABLE `team_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `unprocessed_swim_results`
--
ALTER TABLE `unprocessed_swim_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

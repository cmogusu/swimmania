-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 24, 2025 at 11:26 PM
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
(3, 81, 1, 5, -382027, 572037, 437710, '23:03:51', '20:46:20', -1.18515150588124, 36.84186913039588),
(4, 108, 2, 3, 594860, 166891, 321256, '15:47:05', '19:28:46', -1.17570614390815, 36.80378748888529),
(5, 118, 3, 2, 908529, 2261, 878508, '13:36:04', '05:34:19', -1.12331345830633, 36.76906475630724);

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE `entity` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `type` enum('swimmer','school','pool','team','swimMeet','coach','lifeguard','swimResult','swimEvent','parent') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `insertTime` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entity`
--

INSERT INTO `entity` (`id`, `name`, `type`, `description`, `location`, `insertTime`) VALUES
(6, 'favorite pool', 'pool', 'event more coherent description ', 'kiambu town', '2024-10-25 15:35:10'),
(41, 'Magdalen Garden', 'pool', 'out how now althoug worriedly miserably habit drat oh monumental until interestingly tentacle recklessly', 'Clay Korea County', '2025-09-18 18:24:24'),
(43, 'North Streets', 'pool', 'flawless minor proliferate publicize usually whether wheel for lonely scorn effector when carelessly despite gown despite egg corporatio', 'Essex Timor-Lest', '2025-09-18 18:48:58'),
(44, 'N Railroad Street', 'coach', 'but for although inside trick ack uh-huh uniform interestingly at', 'County Armagh Indonesia', '2025-09-18 19:20:25'),
(45, 'Andreane Track', 'coach', 'hence gruesome who home incidentally pfft haunting out till why yahoo ouch blue versus micromanage tag', 'Clay County Taiwan', '2025-09-19 19:17:23'),
(46, 'S College Street', 'coach', 'moral sorrowful stealthily out afore with pants apud long lively sunny cricket stool regarding vulgarise mmm louse even honorable phew', 'Scott County French Southern Territories', '2025-09-19 19:17:23'),
(47, 'Post Road', 'coach', 'writhing sizzling blah impure intensely grim opposite viability hovercraft with valuable exalt', 'Clark County Somalia', '2025-09-19 19:17:23'),
(48, 'Goodwin Falls', 'pool', 'including although throughout promptly hydrolyse shrilly in foolish supposing incidentally provided blight lock beside an reassuringly so rebuild unless step-mother', 'Wiltshire Lebanon', '2025-09-19 19:17:23'),
(49, 'Justus Haven', 'pool', 'lampoon relieve ick er when than yowza reborn than summer discrete pro since underplay uselessly duh exempt not', 'Devon South Africa', '2025-09-19 19:17:23'),
(50, 'Willow Road', 'swimmer', 'electrify whether unexpectedly swerve yum agreement but indeed charlatan swill meanwhile whose scented uh-huh gladly among along an celsius gasp', 'Warren County Wallis and Futuna', '2025-09-19 19:17:23'),
(51, 'Caitlyn Dale', 'pool', 'above of demob boldly so jiggle colorize sympathetically going outside buttery duh late overheard', 'County Antrim Falkland Islands (Malvinas)', '2025-09-19 19:17:23'),
(52, 'Kings Highway', 'pool', 'provided nor dental upon fashion pro if governance ponder finally friendly questionable tinted', 'Wiltshire Holy See (Vatican City State)', '2025-09-19 19:17:23'),
(53, 'Cedar Street', 'school', 'efface er searchingly huzzah reassuringly distant provided wearily ack cruelty override patiently supposing earth until hygienic whenever pace', 'Clark County Aruba', '2025-09-19 19:17:23'),
(54, 'Dooley Lake', 'coach', 'geez finally taut cow quit when slight ah tray pfft nervous knavishly gah topsail onto experienced toward loyally up', 'Warren County Trinidad and Tobago', '2025-09-19 19:17:23'),
(55, 'N 9th Street', 'pool', 'dim whenever between once ah however scrutinise recount scorpion how', 'Pike County Honduras', '2025-09-19 19:24:54'),
(56, 'Pine Close', 'pool', 'plain whoa rear mozzarella grimy from circa inspect eyebrow fond abnormally far but bathhouse', 'Strathclyde Rwanda', '2025-09-19 19:24:54'),
(57, 'Victoria Place', 'coach', 'uh-huh incidentally bug as anguished till ick likewise king truly despite hmph detective never thoughtfully alongside adaptation incidentally webbed eyeglasses', 'Grant County Ecuador', '2025-09-19 19:24:54'),
(58, 'Manor Way', 'pool', 'cycle boohoo until willow those brush hence trusting likewise fragrant pace awareness midst huzzah lest bonfire', 'Jackson County Singapore', '2025-09-19 19:24:54'),
(59, 'Matteo Forge', 'team', 'bus wallaby mountain spring formula instead swim clamour mainstream after bookcase ridge massage redesign yet politely a restfully', 'Worcestershire Greenland', '2025-09-19 19:24:54'),
(60, 'Gloucester Road', 'coach', 'readies unless um underneath necklace glossy mmm around institute hence king dispose sun yowza biodegradable provided successfully meanwhile', 'Carroll County Chad', '2025-09-19 19:24:54'),
(61, 'Cassin Falls', 'pool', 'motivate why knowledgeably aha quip oh dish countess account loftily yippee sock folklore political underneath brave aha but amid lest', 'Warren County Andorra', '2025-09-19 19:24:54'),
(62, 'Alvena Hill', 'pool', 'if busy lazy so mmm supposing authentic cutlet fooey whose however yum yippee', 'Greene County Saudi Arabia', '2025-09-19 19:24:54'),
(63, 'S Broad Street', 'pool', 'absent besmirch rapid righteously gee mobility gifted toward hunt yippee early yahoo verbally neatly horse unnaturally terraform willow swiftly with', 'Logan County Guyana', '2025-09-19 19:24:54'),
(64, 'S Monroe Street', 'pool', 'object boohoo merrily pants mouser moralise yet in unexpectedly terribly guard blah upliftingly over reluctantly athwart amidst litter', 'Tayside Iran', '2025-09-19 19:24:54'),
(65, 'Inter Clubs Swimming Championships', 'swimMeet', 'NCSA Inter-Clubs Swimming Championships April 11-13 2025', 'Kiota School, Dennis Pritt Road, Nairobi', '2025-09-22 17:22:59'),
(66, 'Beech Road', 'swimmer', 'community oof since midwife tut hm posh after planula excluding until', 'Montgomery County Antarctica', '2025-10-24 17:49:55'),
(67, 'Beaulah Land', 'swimmer', 'tedious fen up scope nor honestly because boo fast irresponsible the curly', 'Washington County Bhutan', '2025-10-24 17:51:21'),
(68, 'N 7th Street', 'swimmer', 'functional circa friendly yahoo ouch meanwhile er monstrous following nor', 'Tayside Bahrain', '2025-10-24 18:45:47'),
(69, 'Peter Mews', 'swimmer', 'as via weighty contrail times rapidly sticky lashes the scale coaxingly friendly step-mother boohoo folklore foodstuffs at courageously near oof', 'Logan County American Samoa', '2025-10-24 18:48:15'),
(70, 'Cassin Burgs', 'swimmer', 'but within readjust scrape coin faint even self-assured recount uselessly rubbery modulo enormously boss ouch', 'Leicestershire Aland Islands', '2025-10-24 18:48:48'),
(71, 'Alisa Streets', 'swimmer', 'frantically inspect cutover arraign king growing hm via conceal community blushing psst fooey upbeat nectarine reboot stupendous dearly lady', 'Grant County Denmark', '2025-10-24 18:55:41'),
(72, 'West Street', 'school', 'hmph barring wherever wholly neatly versus now hornet separately rekindle essence between bootleg which sleepily', 'Avon Cameroon', '2025-10-24 18:58:39'),
(73, 'Turner Locks', 'school', 'in bravely whose hm beautifully utilized aha upon why within mooch fidget horn unbearably', 'Tayside Cuba', '2025-10-24 19:03:28'),
(74, 'Wintheiser Shores', 'school', 'worth redesign retool but lack numb than enormously stable pfft yowza plus', 'Dorset Bosnia and Herzegovina', '2025-10-24 19:03:46'),
(75, 'Georgette Freeway', 'school', 'since above hm scrape inject dash pfft yahoo spark sure-footed super signature jaggedly um monstrous usefully realistic any', 'Berkshire Honduras', '2025-10-24 19:04:04'),
(76, 'Becker Ways', 'school', 'coaxingly resort blah insist meanwhile but innovate worth mmm fiddle writ joshingly boo yahoo helpfully however', 'Greene County Chad', '2025-10-24 19:04:04'),
(77, 'First Street', 'school', 'scarily ouch miserably profuse verbally fragrant fearless as outside gum confute aboard geez duh oval immediately', 'Perry County Falkland Islands (Malvinas)', '2025-10-24 19:04:04'),
(78, 'O\'Connell Tunnel', 'school', 'indeed meh oh degenerate grass and engender shampoo loyally gosh excited freely outlying across collaborate jovially however distant', 'Cleveland Gambia', '2025-10-24 19:04:04'),
(79, 'Kozey Valleys', 'school', 'an yum modulo softly before but beautifully what within underplay forecast shiny regularly story alert hence once', 'Gwent Vanuatu', '2025-10-24 19:04:04'),
(80, 'Karianne Glen', 'school', 'out against proofread accountability light throughout oh terrible information reporter bah curry weatherize disposer what oxidise on bah yowza', 'Lancashire Togo', '2025-10-24 19:04:47'),
(81, 'Abbott Lights', 'lifeguard', 'lava gosh institute pile amidst for whenever soap sequester while brr whether cinema deeply live ah warming quixotic flood', 'Polk County Bouvet Island', '2025-10-24 19:34:05'),
(82, 'The Coppice', 'lifeguard', 'joyously even place shout when mortally gladly digit fooey roughly or mid near dusk thoroughly via', 'Powys Lebanon', '2025-10-24 19:37:32'),
(83, 'Meadow Lane', 'swimEvent', 'per psst eggplant paltry partridge meanwhile over live hoot deliberately spirit pro remorseful forenenst', 'Marshall County Bonaire, Sint Eustatius and Saba', '2025-10-24 19:40:52'),
(84, 'The Laurels', 'swimEvent', 'though bah small modulo solemnly than until second inasmuch yet', 'Isle of Wight Haiti', '2025-10-24 20:00:45'),
(85, 'Miller Oval', 'swimEvent', 'towards however before gee ham finding urban minus bakeware punctually kissingly lest', 'Carroll County Bolivia', '2025-10-24 20:03:48'),
(86, 'Imogene Loop', 'swimEvent', 'pro uncover vanish elegant likewise atop unwritten which because shyly mid', 'Polk County Bouvet Island', '2025-10-24 20:07:21'),
(87, 'Well Lane', 'swimEvent', 'remark out custom shakily grandpa prohibition nor yahoo um bowler ouch nor hm sleepily as', 'South Glamorgan Costa Rica', '2025-10-24 20:08:10'),
(88, 'Ezra Rapid', 'swimEvent', 'optimal incidentally for fine repossess developing someplace too abaft excluding blah crumble gosh hmph bemuse', 'Herefordshire Lebanon', '2025-10-24 20:09:24'),
(89, 'Kelton Garden', 'swimEvent', 'without plus drug pro reasoning innocently yahoo that snow premium far since fooey cruelly retool humiliating fooey', 'West Yorkshire South Sudan', '2025-10-24 20:09:24'),
(90, 'Connelly Ford', 'swimEvent', 'ferociously ethyl turret chairperson ah digestive querulous ha inasmuch creator boohoo phooey yet overfeed wasteful furthermore lanky', 'Polk County Slovakia', '2025-10-24 20:09:24'),
(91, 'Predovic Common', 'swimEvent', 'yet ew forage nice aha innocently excepting via that where worse ouch before vivaciously provided pro fooey likely treble', 'Tayside Gabon', '2025-10-24 20:09:24'),
(92, 'S Broadway Street', 'swimEvent', 'qua tooth genuine meanwhile fairly train mmm design what sometimes stabilise underplay rout', 'Somerset Pakistan', '2025-10-24 20:09:24'),
(93, 'Adrian Ranch', 'swimEvent', 'huzzah hamburger CD delightfully kissingly strictly deduce oh nearly ashamed fair tensely cavernous huzzah spew abaft mmm treble angelic fortunately', 'Powys Saint Vincent and the Grenadines', '2025-10-24 20:10:25'),
(94, 'Roob Run', 'swimEvent', 'pfft hoarse inasmuch than flickering athwart meh igloo descent pfft meaningfully', 'Franklin County Cambodia', '2025-10-24 20:10:51'),
(95, 'Walsh Springs', 'swimEvent', 'toward swiftly pasta shameless upliftingly without phooey gadzooks fen compromise next entomb intensely unbalance', 'Calhoun County Singapore', '2025-10-24 20:10:51'),
(96, 'Cedar Close', 'swimEvent', 'gah worldly uh-huh table physically whoever oddly excluding revere limp endow ramp versus where bah meh inasmuch outdo even unearth', 'Devon Christmas Island', '2025-10-24 20:10:51'),
(97, 'Bruen Brook', 'swimEvent', 'angelic censor fussy gruesome sup pretend quiet voluntarily sunbeam gosh er till frivolous', 'Adams County Aruba', '2025-10-24 20:10:51'),
(98, 'Jaycee Corners', 'swimEvent', 'except hm opposite ugh consequently croon hello stale pip even', 'Gwynedd County Yemen', '2025-10-24 20:10:51'),
(99, 'Hawthorn Avenue', 'swimEvent', 'finally fall familiar through eyebrow beneath revitalise junior circa pro meh boohoo profitable digit instead aside', 'Polk County Papua New Guinea', '2025-10-24 20:11:40'),
(100, 'Block Cape', 'swimEvent', 'smoothly tame openly old incidentally speedily unless colon huzzah yum', 'Cheshire Serbia', '2025-10-24 20:13:14'),
(101, 'Albin Meadows', 'lifeguard', 'broadside pecan ah celebrate goose guilty graft oh mmm beautifully lieu except bob right thoughtfully ouch', 'Washington County New Zealand', '2025-10-24 20:19:43'),
(102, 'W Washington Avenue', 'lifeguard', 'noteworthy since plump solder briefly readily geez ownership degrease antelope of mountain valiantly meanwhile woot below frenetically majestic who', 'County Tyrone Cocos (Keeling) Islands', '2025-10-24 20:20:23'),
(103, 'Reva Corner', 'pool', 'beside minus ew consequently igloo drat acclaimed or monthly as obnoxiously', 'Marshall County Cocos (Keeling) Islands', '2025-10-24 20:22:44'),
(104, 'Phyllis Ville', 'pool', 'pish ride quicker excited what certainly homeschool yahoo commonly goose failing profane but joshingly', 'Norfolk Malaysia', '2025-10-24 20:23:13'),
(105, 'Little Drive', 'school', 'violently phew char failing until loyally inside amongst yahoo clonk sad ack continually grade', 'East Sussex Slovakia', '2025-10-24 20:43:19'),
(106, 'Schimmel Extensions', 'team', 'while when adumbrate healthily prejudge mid railway service snoopy respectful dwell blink minty before', 'Pike County Latvia', '2025-10-24 20:43:47'),
(107, 'N Jefferson Street', 'swimMeet', 'loyally sticky academics in last joyously unnaturally direct into emphasise dependable failing cinema for', 'Tayside Panama', '2025-10-24 20:43:56'),
(108, 'Kaylin Corner', 'coach', 'gratefully incidentally brr given embossing um lovingly collaboration hmph via responsible properly madly unto charter exactly', 'Leicestershire Serbia', '2025-10-24 21:10:22'),
(109, 'Auer Crossing', 'team', 'lounge aw athwart aware aha internationalize or notwithstanding deafening enfold zowie awful accompany until since capsize crossly bony consequently hmph', 'Cheshire Turkmenistan', '2025-10-24 21:10:45'),
(110, 'Woodlands', 'pool', 'greedily political wilt underneath true whoever where unearth poorly vice confusion times vista yippee gosh wherever bide joyful too unhappy', 'Lawrence County Maldives', '2025-10-24 21:11:24'),
(111, 'N Washington Street', 'school', 'scare acidic hmph omelet supposing although shred if that unused', 'Shropshire Brunei Darussalam', '2025-10-24 21:11:34'),
(112, 'Old State Road', 'swimmer', 'baptise mid bitterly decryption pluck fictionalize content geez impact edible mid clamour zowie minty see wear', 'Henry County Botswana', '2025-10-24 21:12:27'),
(113, 'Alaina Curve', 'parent', 'upliftingly notwithstanding gee dependent daily closed eyeliner reopen yawningly grumpy limp indeed since last allocation viability', 'Shropshire Panama', '2025-10-24 21:15:02'),
(114, 'Chestnut Street', 'parent', 'uniform which developing not task fooey yearn steel asset hence graft nor inasmuch uh-huh worth finally phooey cook', 'Marshall County Chad', '2025-10-24 21:15:31'),
(115, 'Herminia Burgs', 'swimEvent', 'back furthermore unless thoroughly judgementally gosh but peter watery out covenant aha dapper grubby rejigger ambitious psst consequently quickly', 'Adams County South Africa', '2025-10-24 21:15:58'),
(116, 'Funk Pine', 'swimEvent', 'beneath produce annex spectate neck psst celebrate puny into whereas dwell', 'Buckinghamshire Somalia', '2025-10-24 21:16:13'),
(117, 'Vanessa Prairie', 'lifeguard', 'repentant nervously commonly almost leading towards uh-huh next nor elevation screw almost throughout where yahoo thrifty', 'Norfolk Cape Verde', '2025-10-24 21:16:29'),
(118, 'Dietrich Islands', 'coach', 'closed well-documented for dally remand embarrassment considering coliseum incidentally toward why through unimpressively joshingly opposite and gnaw neatly morbidity rosemary', 'South Glamorgan Reunion', '2025-10-24 21:16:48'),
(119, 'Yasmine Estates', 'swimMeet', 'closely oh video whoa plus however pish floodlight drug pricey flustered edible zowie bidet throughout anesthetize privilege gosh', 'Herefordshire France', '2025-10-24 21:17:07'),
(120, 'Effertz Falls', 'team', 'finer via through round ravage co-producer and aboard meager rigidly bogus careless ah following without', 'Merseyside South Sudan', '2025-10-24 21:17:30'),
(121, 'Witting Walk', 'swimMeet', 'pfft sweet twine joshingly useless cornet now less coarse live chairperson epic bruised punctual amongst meh spanish', 'Adams County Grenada', '2025-10-24 21:21:32');

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
-- Table structure for table `metadata`
--

CREATE TABLE `metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `entityType` enum('swimmer','school','pool','team','event','coach') DEFAULT NULL,
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
(178, 44, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(179, 50, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(180, 50, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(181, 50, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 22, NULL, NULL, NULL),
(182, 50, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 60, NULL, NULL, NULL),
(183, 50, 'pool', 'operatingHours.opening', NULL, 0, NULL, 35820000, NULL, NULL, NULL, NULL),
(184, 50, 'pool', 'operatingHours.closing', NULL, 0, NULL, 64980000, NULL, NULL, NULL, NULL),
(185, 50, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(186, 50, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(187, 50, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(188, 50, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(189, 50, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(190, 50, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 99, NULL, NULL, NULL),
(191, 50, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 4, NULL, NULL, NULL),
(192, 50, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(193, 50, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(194, 50, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(195, 50, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(196, 50, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.27179516377543, NULL),
(197, 50, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.70611645650471),
(198, 45, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(199, 45, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(200, 45, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 96, NULL, NULL, NULL),
(201, 45, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 68, NULL, NULL, NULL),
(202, 45, 'pool', 'operatingHours.opening', NULL, 0, NULL, 11160000, NULL, NULL, NULL, NULL),
(203, 45, 'pool', 'operatingHours.closing', NULL, 0, NULL, 58740000, NULL, NULL, NULL, NULL),
(204, 45, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(205, 45, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(206, 45, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(207, 45, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(208, 45, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(209, 45, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 36, NULL, NULL, NULL),
(210, 45, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 92, NULL, NULL, NULL),
(211, 45, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(212, 45, 'pool', 'cleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(213, 45, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(214, 45, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(215, 45, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.12048181449622, NULL),
(216, 45, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.77437370829553),
(217, 51, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(218, 51, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(219, 51, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 53, NULL, NULL, NULL),
(220, 51, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 19, NULL, NULL, NULL),
(221, 51, 'pool', 'operatingHours.opening', NULL, 0, NULL, 13320000, NULL, NULL, NULL, NULL),
(222, 51, 'pool', 'operatingHours.closing', NULL, 0, NULL, 38220000, NULL, NULL, NULL, NULL),
(223, 51, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(224, 51, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(225, 51, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(226, 51, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(227, 51, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 78, NULL, NULL, NULL),
(228, 51, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(229, 51, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 8, NULL, NULL, NULL),
(230, 51, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(231, 51, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(232, 51, 'pool', 'changingRoomCleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(233, 51, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(234, 51, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.28791680222649, NULL),
(235, 51, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.871897805687176),
(236, 46, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(237, 46, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(238, 46, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 51, NULL, NULL, NULL),
(239, 46, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 24, NULL, NULL, NULL),
(240, 46, 'pool', 'operatingHours.opening', NULL, 0, NULL, 37080000, NULL, NULL, NULL, NULL),
(241, 46, 'pool', 'operatingHours.closing', NULL, 0, NULL, 27060000, NULL, NULL, NULL, NULL),
(242, 46, 'pool', 'crowdiness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(243, 46, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(244, 46, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(245, 46, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(246, 46, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(247, 46, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 37, NULL, NULL, NULL),
(248, 46, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 23, NULL, NULL, NULL),
(249, 46, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(250, 46, 'pool', 'cleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(251, 46, 'pool', 'changingRoomCleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(252, 46, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(253, 46, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.2975009101683, NULL),
(254, 46, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.80892847395416),
(255, 49, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(256, 49, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(257, 49, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 66, NULL, NULL, NULL),
(258, 49, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 54, NULL, NULL, NULL),
(259, 49, 'pool', 'operatingHours.opening', NULL, 0, NULL, 37320000, NULL, NULL, NULL, NULL),
(260, 49, 'pool', 'operatingHours.closing', NULL, 0, NULL, 25740000, NULL, NULL, NULL, NULL),
(261, 49, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(262, 49, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(263, 49, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(264, 49, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(265, 49, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(266, 49, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 98, NULL, NULL, NULL),
(267, 49, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 20, NULL, NULL, NULL),
(268, 49, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(269, 49, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(270, 49, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(271, 49, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(272, 49, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.28480893220072, NULL),
(273, 49, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.74295430424679),
(274, 52, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(275, 52, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(276, 52, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 36, NULL, NULL, NULL),
(277, 52, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 37, NULL, NULL, NULL),
(278, 52, 'pool', 'operatingHours.opening', NULL, 0, NULL, 53400000, NULL, NULL, NULL, NULL),
(279, 52, 'pool', 'operatingHours.closing', NULL, 0, NULL, 17520000, NULL, NULL, NULL, NULL),
(280, 52, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(281, 52, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(282, 52, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(283, 52, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(284, 52, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(285, 52, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 39, NULL, NULL, NULL),
(286, 52, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 79, NULL, NULL, NULL),
(287, 52, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(288, 52, 'pool', 'changingRoomCleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(289, 52, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(290, 52, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(291, 52, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.22578206793024, NULL),
(292, 52, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.7419881447182),
(293, 48, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(294, 48, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 58, NULL, NULL, NULL),
(295, 48, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 49, NULL, NULL, NULL),
(296, 48, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(297, 48, 'pool', 'operatingHours.opening', NULL, 0, NULL, 71640000, NULL, NULL, NULL, NULL),
(298, 48, 'pool', 'operatingHours.closing', NULL, 0, NULL, 54000000, NULL, NULL, NULL, NULL),
(299, 48, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(300, 48, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(301, 48, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(302, 48, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(303, 48, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(304, 48, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 72, NULL, NULL, NULL),
(305, 48, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 29, NULL, NULL, NULL),
(306, 48, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(307, 48, 'pool', 'cleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(308, 48, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(309, 48, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(310, 48, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.16608495456819, NULL),
(311, 48, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.87584130013584),
(312, 47, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(313, 47, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(314, 47, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 61, NULL, NULL, NULL),
(315, 47, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 84, NULL, NULL, NULL),
(316, 47, 'pool', 'operatingHours.opening', NULL, 0, NULL, 29820000, NULL, NULL, NULL, NULL),
(317, 47, 'pool', 'operatingHours.closing', NULL, 0, NULL, 56520000, NULL, NULL, NULL, NULL),
(318, 47, 'pool', 'crowdiness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(319, 47, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(320, 47, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(321, 47, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(322, 47, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(323, 47, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 13, NULL, NULL, NULL),
(324, 47, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 8, NULL, NULL, NULL),
(325, 47, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(326, 47, 'pool', 'cleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(327, 47, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(328, 47, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(329, 47, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.26903112209799, NULL),
(330, 47, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.72514520802755),
(331, 53, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(332, 53, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(333, 53, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 100, NULL, NULL, NULL),
(334, 53, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 3, NULL, NULL, NULL),
(335, 53, 'pool', 'operatingHours.opening', NULL, 0, NULL, 15300000, NULL, NULL, NULL, NULL),
(336, 53, 'pool', 'operatingHours.closing', NULL, 0, NULL, 45000000, NULL, NULL, NULL, NULL),
(337, 53, 'pool', 'crowdiness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(338, 53, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(339, 53, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(340, 53, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(341, 53, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(342, 53, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 7, NULL, NULL, NULL),
(343, 53, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 86, NULL, NULL, NULL),
(344, 53, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(345, 53, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(346, 53, 'pool', 'changingRoomCleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(347, 53, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(348, 53, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.12143006731014, NULL),
(349, 53, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.771492148665715),
(350, 54, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(351, 54, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(352, 54, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 76, NULL, NULL, NULL),
(353, 54, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 63, NULL, NULL, NULL),
(354, 54, 'pool', 'operatingHours.opening', NULL, 0, NULL, 15240000, NULL, NULL, NULL, NULL),
(355, 54, 'pool', 'operatingHours.closing', NULL, 0, NULL, 67860000, NULL, NULL, NULL, NULL),
(356, 54, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(357, 54, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(358, 54, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(359, 54, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(360, 54, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(361, 54, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 74, NULL, NULL, NULL),
(362, 54, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 86, NULL, NULL, NULL),
(363, 54, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(364, 54, 'pool', 'cleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(365, 54, 'pool', 'changingRoomCleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(366, 54, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(367, 54, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.23299291012833, NULL),
(368, 54, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.81301589053815),
(369, 55, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(370, 55, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(371, 55, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 61, NULL, NULL, NULL),
(372, 55, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 81, NULL, NULL, NULL),
(373, 55, 'pool', 'operatingHours.opening', NULL, 0, NULL, 29520000, NULL, NULL, NULL, NULL),
(374, 55, 'pool', 'operatingHours.closing', NULL, 0, NULL, 74100000, NULL, NULL, NULL, NULL),
(375, 55, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(376, 55, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(377, 55, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(378, 55, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(379, 55, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(380, 55, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 98, NULL, NULL, NULL),
(381, 55, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 37, NULL, NULL, NULL),
(382, 55, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(383, 55, 'pool', 'cleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(384, 55, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(385, 55, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(386, 55, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.18349738419893, NULL),
(387, 55, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.88247584077504),
(388, 56, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(389, 56, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(390, 56, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 60, NULL, NULL, NULL),
(391, 56, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 75, NULL, NULL, NULL),
(392, 56, 'pool', 'operatingHours.opening', NULL, 0, NULL, 75720000, NULL, NULL, NULL, NULL),
(393, 56, 'pool', 'operatingHours.closing', NULL, 0, NULL, 52140000, NULL, NULL, NULL, NULL),
(394, 56, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(395, 56, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(396, 56, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(397, 56, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(398, 56, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(399, 56, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 86, NULL, NULL, NULL),
(400, 56, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(401, 56, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 16, NULL, NULL, NULL),
(402, 56, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(403, 56, 'pool', 'changingRoomCleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(404, 56, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(405, 56, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.29191550122956, NULL),
(406, 56, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.817430112948216),
(407, 57, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(408, 57, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Curvy', NULL, NULL),
(409, 57, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 58, NULL, NULL, NULL),
(410, 57, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 59, NULL, NULL, NULL),
(411, 57, 'pool', 'operatingHours.opening', NULL, 0, NULL, 30240000, NULL, NULL, NULL, NULL),
(412, 57, 'pool', 'operatingHours.closing', NULL, 0, NULL, 56160000, NULL, NULL, NULL, NULL),
(413, 57, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(414, 57, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(415, 57, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(416, 57, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(417, 57, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(418, 57, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 93, NULL, NULL, NULL),
(419, 57, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 55, NULL, NULL, NULL),
(420, 57, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(421, 57, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(422, 57, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(423, 57, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(424, 57, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.21766173423782, NULL),
(425, 57, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.8852572459341),
(426, 62, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(427, 62, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(428, 62, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 51, NULL, NULL, NULL),
(429, 62, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 63, NULL, NULL, NULL),
(430, 62, 'pool', 'operatingHours.opening', NULL, 0, NULL, 44640000, NULL, NULL, NULL, NULL),
(431, 62, 'pool', 'operatingHours.closing', NULL, 0, NULL, 72240000, NULL, NULL, NULL, NULL),
(432, 62, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(433, 62, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(434, 62, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(435, 62, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(436, 62, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(437, 62, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 38, NULL, NULL, NULL),
(438, 62, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 92, NULL, NULL, NULL),
(439, 62, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(440, 62, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(441, 62, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(442, 62, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(443, 62, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.18015425793895, NULL),
(444, 62, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.71433225870354),
(445, 61, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(446, 61, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Curvy', NULL, NULL),
(447, 61, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 27, NULL, NULL, NULL),
(448, 61, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 73, NULL, NULL, NULL),
(449, 61, 'pool', 'operatingHours.opening', NULL, 0, NULL, 51300000, NULL, NULL, NULL, NULL),
(450, 61, 'pool', 'operatingHours.closing', NULL, 0, NULL, 77820000, NULL, NULL, NULL, NULL),
(451, 61, 'pool', 'crowdiness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(452, 61, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(453, 61, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(454, 61, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(455, 61, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(456, 61, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 84, NULL, NULL, NULL),
(457, 61, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 100, NULL, NULL, NULL),
(458, 61, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(459, 61, 'pool', 'cleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(460, 61, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(461, 61, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(462, 61, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.19650691197597, NULL),
(463, 61, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.863445343717224),
(464, 63, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(465, 63, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(466, 63, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 42, NULL, NULL, NULL),
(467, 63, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 20, NULL, NULL, NULL),
(468, 63, 'pool', 'operatingHours.opening', NULL, 0, NULL, 77220000, NULL, NULL, NULL, NULL),
(469, 63, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(470, 63, 'pool', 'operatingHours.closing', NULL, 0, NULL, 16620000, NULL, NULL, NULL, NULL),
(471, 63, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(472, 63, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(473, 63, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(474, 63, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(475, 63, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 85, NULL, NULL, NULL),
(476, 63, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 26, NULL, NULL, NULL),
(477, 63, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(478, 63, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(479, 63, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(480, 63, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(481, 63, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.14040462109087, NULL),
(482, 63, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.85747910827525),
(483, 58, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(484, 58, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(485, 58, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 4, NULL, NULL, NULL),
(486, 58, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 58, NULL, NULL, NULL),
(487, 58, 'pool', 'operatingHours.opening', NULL, 0, NULL, 28800000, NULL, NULL, NULL, NULL),
(488, 58, 'pool', 'operatingHours.closing', NULL, 0, NULL, 79920000, NULL, NULL, NULL, NULL),
(489, 58, 'pool', 'crowdiness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(490, 58, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(491, 58, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(492, 58, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(493, 58, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(494, 58, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 49, NULL, NULL, NULL),
(495, 58, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 38, NULL, NULL, NULL),
(496, 58, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(497, 58, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(498, 58, 'pool', 'changingRoomCleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(499, 58, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(500, 58, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.16156634177412, NULL),
(501, 58, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.86398483221031),
(502, 59, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(503, 59, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(504, 59, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 16, NULL, NULL, NULL),
(505, 59, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 65, NULL, NULL, NULL),
(506, 59, 'pool', 'operatingHours.opening', NULL, 0, NULL, 80700000, NULL, NULL, NULL, NULL),
(507, 59, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(508, 59, 'pool', 'operatingHours.closing', NULL, 0, NULL, 66780000, NULL, NULL, NULL, NULL),
(509, 59, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(510, 59, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(511, 59, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(512, 59, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(513, 59, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 22, NULL, NULL, NULL),
(514, 59, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 85, NULL, NULL, NULL),
(515, 59, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(516, 59, 'pool', 'cleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(517, 59, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(518, 59, 'pool', 'changingRoomCleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(519, 59, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.11792042963823, NULL),
(520, 59, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.75559689026559),
(521, 60, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(522, 60, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(523, 60, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 68, NULL, NULL, NULL),
(524, 60, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 88, NULL, NULL, NULL),
(525, 60, 'pool', 'operatingHours.opening', NULL, 0, NULL, 37260000, NULL, NULL, NULL, NULL),
(526, 60, 'pool', 'operatingHours.closing', NULL, 0, NULL, 20640000, NULL, NULL, NULL, NULL),
(527, 60, 'pool', 'crowdiness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(528, 60, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(529, 60, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(530, 60, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(531, 60, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(532, 60, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 26, NULL, NULL, NULL),
(533, 60, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 50, NULL, NULL, NULL),
(534, 60, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(535, 60, 'pool', 'cleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(536, 60, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(537, 60, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(538, 60, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.21236700142554, NULL),
(539, 60, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.892189803214755),
(540, 64, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(541, 64, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Curvy', NULL, NULL),
(542, 64, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 98, NULL, NULL, NULL),
(543, 64, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 72, NULL, NULL, NULL),
(544, 64, 'pool', 'operatingHours.opening', NULL, 0, NULL, 57300000, NULL, NULL, NULL, NULL),
(545, 64, 'pool', 'operatingHours.closing', NULL, 0, NULL, 78120000, NULL, NULL, NULL, NULL),
(546, 64, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(547, 64, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(548, 64, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(549, 64, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(550, 64, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(551, 64, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 21, NULL, NULL, NULL),
(552, 64, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(553, 64, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 85, NULL, NULL, NULL),
(554, 64, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(555, 64, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(556, 64, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(557, 64, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.27910478579362, NULL),
(558, 64, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.827863523995696);

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
(1, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '19:00:59', 'hotel', 'rectangle'),
(2, 6, -870263, 837437, '01:32:20', 3, 0, -432005, 918964, 1, 1, 5, 1, -1.25489104578669, 36.87588352399299, 0, 1, 1, '01:08:50', 'gym', 'square'),
(3, 103, 41901, 385669, '23:12:49', 1, 1, 215193, 186253, 0, 4, 4, 0, -1.22384322957105, 36.81805509325541, 0, 0, 1, '04:49:14', 'school', 'rectangle'),
(4, 104, 827367, 81400, '03:55:17', 5, 1, 984579, 914248, 0, 4, 4, 1, -1.11661684837771, 36.797572091112045, 1, 1, 1, '03:44:42', 'school', 'curvy'),
(5, 110, 653677, 49994, '07:02:43', 3, 1, 788668, 386717, 0, 3, 4, 0, -1.28767622488849, 36.71729918908408, 1, 1, 1, '01:56:52', 'school', 'square');

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
(3, 121, 'short', '21:27:57', -1.26011013776285, 36.77109689515262, '2025-07-01', '2026-04-12');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

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
-- AUTO_INCREMENT for table `metadata`
--
ALTER TABLE `metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=559;

--
-- AUTO_INCREMENT for table `parent_metadata`
--
ALTER TABLE `parent_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pool_metadata`
--
ALTER TABLE `pool_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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

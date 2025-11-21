DELIMITER $$
CREATE DEFINER=`swimmania`@`localhost` PROCEDURE IF NOT EXISTS `get_entities`(IN `entityType` VARCHAR(100), IN `count` INT(11), IN `offset` INT(11))
    NO SQL
BEGIN
  SELECT 
    e.id,
    e.name as entityName,
    e.description as entityDescription,
    i.alt as imageAlt,
    i.filepath as imageFilePath,
    m.*
    FROM entity AS e 
    LEFT JOIN metadata_pool AS m ON e.id=m.entityId
    LEFT JOIN (select * from image where isDefault=1) AS i ON e.id=i.entityId
    WHERE e.type=entityType
    ORDER BY e.insertTime DESC
    LIMIT count
    OFFSET offset;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`swimmania`@`localhost` PROCEDURE IF NOT EXISTS `get_meet_results`(IN `meetId` INT(11))
    NO SQL
BEGIN
  SELECT
    *
    FROM entity AS e
    WHERE e.id = meetId;
  SELECT 
    event.name as eventName,
    event.description as eventDescription,
    eventMet.*,
    result.id as resultId,
    result.name as resultName,
    result.description as resultDescription,
    resultMet.*
    FROM entity AS meet
    RIGHT JOIN relationships_swimResult AS relMeetEvent ON meet.id=relMeetEvent.entityId2
    INNER JOIN entity AS event ON event.id = relMeetEvent.entityId1
    INNER JOIN metadata_swm_event AS eventMet ON event.id = eventMet.entityId
    RIGHT JOIN relationships_swimResult AS relEventResult ON event.id=relEventResult.entityId1
    INNER JOIN entity AS result ON result.id = relEventResult.entityId2
    INNER JOIN metadata_swm_result AS resultMet ON result.id = resultMet.entityId
    WHERE meet.type='swimMeet'
    AND relMeetEvent.relationship = 'swimEvent-swimMeet'
    AND relMeetEvent.relationshipType = 'contains'
    AND meet.id = meetId;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`swimmania`@`localhost` PROCEDURE IF NOT EXISTS `get_sth`()
    NO SQL
BEGIN
  SELECT 
    e.id,
    e.name as entityName,
    e.description as entityDescription,
    i.alt as imageAlt,
    i.filepath as imageFilePath,
    m.*
    FROM entity AS e 
    LIMIT 5;
END$$
DELIMITER ;
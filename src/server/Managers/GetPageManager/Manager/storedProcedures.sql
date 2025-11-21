DELIMITER $$
CREATE PROCEDURE `get_entities`(IN `entityType` VARCHAR(100))
    NO SQL
BEGIN
  SELECT * FROM entity AS e INNER JOIN metadata_pool AS m ON e.id=m.entityId WHERE e.type=entityType LIMIT 3;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`swimmania`@`localhost` PROCEDURE `get_entities`(IN `entityType` VARCHAR(100))
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

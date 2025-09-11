import React, { memo, useMemo } from "react";
import { EntityTypesValues, EntityTypePlurals } from "../../constants";
import { LinkButton } from "../Common";
import { Images } from "../Image";
import { EditMetadata } from "../Metadata";
import { RelatedEntity } from "../RelatedEntity";
import { AddEditBaseEntity } from "./AddEditBaseEntity";

export const AddEditEntity = ({
  entity,
  entityId,
  entityType,
  images,
  metadata,
  schema,
  relatedEntities,
}) => {
  if (!entityId) {
    return (
      <main>
        <LinkButton path={`/${entityType}`} text="Back" />
        <hr className="w-50" />

        <h2>Add new {entityType}</h2>
        <div className="col-6 p-2 mb-3">
          <AddEditBaseEntity entityType={entityType} />
        </div>
      </main>
    );
  }

  return (
    <main>
      <LinkButton path={`/${entityType}/${entityId}`} text="Back" />
      <hr className="w-50" />

      <section className="grid grid-cols-6 gap-3 mb-5">
        <div className="p-2 mb-3">
          <Images images={images} />
          <LinkButton
            path={`/add/${entityType}/${entityId}/image`}
            text="Add / Edit image"
          />
        </div>

        <div className="p-2 mb-3">
          <AddEditBaseEntity
            entity={entity}
            entityType={entityType}
            entityId={entityId}
          />
        </div>
      </section>

      <hr className="w-full" />

      <section className="mb-5">
        <EditMetadata
          entityId={entityId}
          entityType={entityType}
          metadata={metadata}
          schema={schema}
        />
      </section>

      <hr className="w-full" />

      <RelatedEntities
        entityId={entityId}
        entityType={entityType}
        relatedEntities={relatedEntities}
      />
    </main>
  );
};

const RelatedEntities = memo(function RelatedEntities({
  entityId,
  entityType,
  relatedEntities,
}) {
  const relatedEntitiesByType = useMemo(
    () =>
      relatedEntities.reduce((entitiesObj, { type, entities }) => {
        entitiesObj[type] = entities;
        return entitiesObj;
      }, {}),
    []
  );

  return EntityTypesValues.filter(
    (relatedEntityType) => entityType != relatedEntityType
  ).map((relatedEntityType) => (
    <section key={relatedEntityType}>
      <h3>Related {EntityTypePlurals[relatedEntityType]}</h3>
      <div>
        <RelatedEntity
          relatedEntities={relatedEntitiesByType[relatedEntityType]}
        />
        <LinkButton
          path={`/edit/${entityType}/${entityId}/${relatedEntityType}`}
          text={`Add / Edit ${relatedEntityType}`}
        />
        <hr className="w-full" />
      </div>
    </section>
  ));
});

import axios from "axios";
import { logError } from "./log";
import { BaseUrl, EntityTypes } from "../constants";
import { buildQueryString } from "./utilities";

export const getPools = (pageNumber) => {
  const options = {
    method: "GET",
  };

  return fetch(`${BaseUrl}/pools?page=${pageNumber}`, options)
    .then(validateResponse)
    .then(onMultipleItemResult)
    .catch(handleError);
};

export const getEntities = (entityType, pageNumber, filterBy) => {
  const staticErrorMessage = `Unable to load ${entityType}`;
  const queryString = buildQueryString({
    page: pageNumber,
    filterBy,
  });

  return axios
    .get(`${BaseUrl}/${entityType}?${queryString}`)
    .then(onMultipleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const getRelatedEntities = (
  entityType,
  entityId,
  relatedEntityType,
  pageNumber
) =>
  axios
    .get(
      `${BaseUrl}/${entityType}/${entityId}/${relatedEntityType}?page=${pageNumber}`
    )
    .then(onSingleItemResult)
    .catch(onError);

export const getNonRelatedEntities = (
  entityType,
  entityId,
  relatedEntityType,
  pageNumber
) =>
  axios
    .get(
      `${BaseUrl}/${entityType}/${entityId}/not/${relatedEntityType}?page=${pageNumber}`
    )
    .then(onSingleItemResult)
    .catch(onError);

export const postRelatedEntity = (
  entityType,
  entityId,
  relatedEntityType,
  relatedEntityId
) => {
  const staticErrorMessage = `Unable to create ${entityType}`;

  return axios
    .post(
      `${BaseUrl}/${entityType}/${entityId}/${relatedEntityType}/${relatedEntityId}`,
      {}
    )
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const deleteRelatedEntity = (
  entityType,
  entityId,
  relatedEntityType,
  relatedEntityId
) => {
  const staticErrorMessage = `Unable to create ${entityType}`;

  return axios
    .delete(
      `${BaseUrl}/${entityType}/${entityId}/${relatedEntityType}/${relatedEntityId}`,
      {}
    )
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const getEntityById = (entityType, entityId) => {
  const staticErrorMessage = `Unable to load ${entityType}`;

  return axios
    .get(`${BaseUrl}/${entityType}/${entityId}`)
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const getImageById = (entityType, entityId, imageId) => {
  const staticErrorMessage = `Unable to load ${entityType} image`;

  return axios
    .get(`${BaseUrl}/${entityType}/${entityId}/image/${imageId}`)
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const getImages = (entityType, entityId) => {
  const staticErrorMessage = `Unable to load ${entityType} image`;

  return axios
    .get(`${BaseUrl}/${entityType}/${entityId}/image/`)
    .then(onMultipleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const updateImage = (entityType, entityId, imageId, formData) => {
  const staticErrorMessage = `Unable to update ${entityType}`;

  if (!entityId || !entityType) {
    logError(
      staticErrorMessage,
      "Unable to update entity. Entity id or entity type is missing"
    );
    return Promise.reject();
  }

  const request = imageId
    ? axios.patch(
        `${BaseUrl}/${entityType}/${entityId}/image/${imageId}`,
        formData
      )
    : axios.post(`${BaseUrl}/${entityType}/${entityId}/image`, formData);

  return request.then(onSingleItemResult).catch((error) => {
    logError(staticErrorMessage, error?.message);
  });
};

export const getEntityMetadata = (entityType, entityId) => {
  const staticErrorMessage = `Unable to load ${entityType}`;

  return axios
    .get(`${BaseUrl}/${entityType}/${entityId}/metadata`)
    .then(onMultipleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const getEntityMetadatum = (entityType, entityId, metadataId) => {
  const staticErrorMessage = `Unable to load ${entityType}`;

  return axios
    .get(`${BaseUrl}/${entityType}/${entityId}/metadata/${metadataId}`)
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const getMetadataSchema = (entityType) => {
  const staticErrorMessage = `Unable to load metadata schema`;

  return axios
    .get(`${BaseUrl}/${entityType}/metadataschema`)
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const getEntityImages = (entityId) => {
  const staticErrorMessage = "Unable to fetch images";

  return axios
    .get(`${BaseUrl}/entity/images/${entityId}`)
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

// Post
export const postEntity = (entityType, entity) => {
  const staticErrorMessage = `Unable to create ${entityType}`;

  if (!entityType) {
    logError(staticErrorMessage, "Entity type is missing");
    return;
  }

  return axios
    .post(`${BaseUrl}/${entityType}`, { entity })
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

// Patch
export const patchEntity = (entityType, entityId, entity) => {
  const staticErrorMessage = `Unable to update ${entityType}`;

  if (!entityType || !entityId) {
    logError(staticErrorMessage, "Entity id or entity type is missing");
    return;
  }

  return axios
    .patch(`${BaseUrl}/${entityType}/${entityId}`, { entity })
    .then(onSingleItemResult)
    .catch((error) => {
      logError(staticErrorMessage, error?.message);
    });
};

export const patchMetadata = (entityType, metadata) => {
  const { entityId, id } = metadata;
  return axios
    .patch(`${BaseUrl}/${entityType}/${entityId}/metadata/${id}`, { metadata })
    .then(onSingleItemResult)
    .catch((error) => {
      logError("Unable to edit pool".error?.message);
    });
};

export const postMetadata = (entityType, metadata) => {
  const { entityId } = metadata;
  return axios
    .post(`${BaseUrl}/${entityType}/${entityId}/metadata`, {
      metadata,
    })
    .then(onSingleItemResult)
    .catch((error) => {
      logError("Unable to edit pool".error?.message);
    });
};

// Delete
export const deleteEntity = (entityType, entityId) => {
  const entityUrl = `${BaseUrl}/${entityType}/${entityId}`;
  return deleteItem(entityUrl, EntityTypes.pool);
};

export const deleteImage = (entityType, entityId, imageId) => {
  const imageUrl = `${BaseUrl}/${entityType}/${entityId}/metadata/${imageId}`;
  return deleteItem(imageUrl, EntityTypes.image);
};

export const deleteMetadata = (entityType, entityId, metadataId) => {
  const metadataUrl = `${BaseUrl}/${entityType}/${entityId}/metadata/${metadataId}`;
  return deleteItem(metadataUrl, EntityTypes.metadata);
};

export const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

const deleteItem = (entityDeleteUrl, entityType) => {
  return axios
    .delete(entityDeleteUrl)
    .then(onSingleItemResult)
    .catch((error) => {
      logError(`Unable to delete ${entityType}`.error?.message);
    });
};

const validateResponse = (response) => {
  if (response.statusText === "OK") {
    return response.json();
  } else {
    const error = new Error(`Response status: ${response.status}`);
    logError("Response validation failed", error);
  }
};

const handleError = (error) => {
  logError("Unable to load pools", error);
};

const onSingleItemResult = ({ data, statusText }) => {
  const { success, data: entity, error } = data || {};
  if (statusText == "OK" && success == true && !error) {
    return entity;
  } else {
    logError(staticErrorMessage, error);
  }
};

const onMultipleItemResult = ({ data, statusText }) => {
  const { success, data: entities, error } = data || {};
  if (statusText == "OK" && success == true && !error) {
    return entities;
  } else {
    logError(staticErrorMessage, error);
  }
};

const onError = (error) => {
  logError(`Unable to load`, error?.message);
};


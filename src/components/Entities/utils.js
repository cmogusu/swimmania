import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { EntityTypes } from "../../constants";
import { api } from "../../utilities";

export const getEntities = (entityType) => api.getEntities(entityType, 1, "");

export const useGetEntities = (entityType) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useGetIsMounted();

  const loadEntity = useCallback(
    (currentPage) => {
      const filterByParams = getFilteryByQueryParams();

      setIsLoading(true);
      api
        .getEntities(entityType, currentPage, filterByParams)
        .then((entities) => {
          if (!entities?.length) {
            return;
          }

          setEntities((prevEntities) => {
            const comparator = (e1, e2) => e1.id == e2.id;
            return _.unionWith(prevEntities, entities, comparator);
          });
          setIsLoading(false);
        });
    },
    [entityType]
  );

  const loadMoreEntities = useCallback(
    _.throttle(() => {
      isMounted && setPageNumber((page) => page + 1);
    }, 1500),
    [isMounted]
  );

  useEffect(() => {
    if (entityType && EntityTypes[entityType]) {
      loadEntity(pageNumber);
    }
  }, [entityType, pageNumber]);

  return { isLoading, entities, reload: loadEntity, loadMoreEntities };
};

export const useGetIsMounted = () => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
};

export const getFilteryByQueryParams = () => {
  const params = new URLSearchParams();
  return params.get("filterBy");
};

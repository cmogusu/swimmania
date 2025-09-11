import { useCallback, useEffect, useState } from "react";
import { TextAreaInput, TextInput } from "../Inputs";

export const AddEditBaseEntity = ({ entity, entityId, entityType }) => {
  const { editedEntity, isEdited, onChange } = usePrepareEdit(entity);
  const { name, description, location } = editedEntity;

  useRedirectToEntityEditPage(entityType, entityId);

  return (
    <form method={entityId ? "patch" : "post"} action="./">
      <input type="hidden" name="entityId" defaultValue={entityId} />

      <div className="grid grid-cols-6 gap-3 mb-1">
        <div className="">Title:</div>
        <div className="">
          <TextInput name="name" value={name} type="text" onChange={onChange} />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 mb-1">
        <div className="">Description:</div>
        <div className="">
          <TextAreaInput
            name="description"
            value={description}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 mb-1">
        <div className="">Location:</div>
        <div className="">
          <TextInput
            name="location"
            value={location}
            type="text"
            onChange={onChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            disabled={!(name && description && isEdited)}
          >
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
};

const usePrepareEdit = (entity) => {
  const [isEdited, setIsEdited] = useState();
  const [editedEntity, setEditedEntity] = useState(entity || {});

  const onChange = useCallback(
    (propName, value) => {
      setEditedEntity({ ...editedEntity, [propName]: value });
      setIsEdited(true);
    },
    [editedEntity]
  );

  return { editedEntity, isEdited, onChange };
};

const useRedirectToEntityEditPage = (entityType, entityId) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAddEntityPage = location.pathname.startsWith("/add");
    if (entityId && isAddEntityPage) {
      console.log("should redirect");
      navigate(`/edit/${entityType}/${entityId}`);
    }
  }, [entityType, entityId]);
};

const useNavigate = () => 
  (link) => console.log(link)  

const useLocation = () => window.location

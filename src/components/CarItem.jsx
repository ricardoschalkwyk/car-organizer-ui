import React, { useEffect, useState } from "react";
import Api from "../Api";

import { PencilAltIcon, SaveIcon, TrashIcon } from "@heroicons/react/solid";

import Button from "./buttons/Button";
import Input from "./form/Input";
import Checkbox from "./form/Checkbox";

function CarItem({
  data,
  getCars,
  setItemActive,
  setItemEdit,
  setModelValue,
  setMakeValue,
  setOwnerValue,
  setRegistrationValue,
}) {
  const [update, setUpdate] = useState(false);

  // This state turns to true when the pencil is clicked
  // When clicked it gives input fields for updating

  const [edit, setEdit] = useState(false);

  // User input info
  // Every input has its own state for settings values
  const [model, setModel] = useState(data.model);
  const [make, setMake] = useState(data.make);
  const [owner, setOwner] = useState(data.owner);
  const [registrationNumber, setRegistrationNumber] = useState(
    data.registrationNumber
  );

  // Handles a single item update
  const handleUpdate = async (updateData) => {
    try {
      // UPDATE request
      await Api.put(`/${data._id}`, {
        ...updateData,
        model: Number(updateData.model),
      });

      // GETS the new collection
      getCars();
      setUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Handles a single item delete
  const handleDelete = async () => {
    try {
      // Makes delete request
      await Api.delete(`/${data._id}`);
      // Then makes a Get reqeust after to get to output

      getCars();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setItemEdit(data, edit);
  }, [edit]);

  return (
    <div className="flex-1 p-3 text-black bg-slate-400 mb-4 ring-2 ring-white">
      <div className="grid grid-cols-6 items-center gap-2">
        <div>
          <Checkbox
            checked={data.active}
            onChange={(e) => {
              setItemActive(data, e.target.checked);
            }}
          />
        </div>

        <form
          className="grid grid-cols-5 col-span-5 gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            // The onSubmit fires the handleUpdate function for the PUT request
            handleUpdate({
              model,
              make,
              owner,
              registrationNumber,
            });
          }}
        >
          {/* Each input has an isActive state which determines whether it is shown or not */}
          {/* Each input also has the data.edit conditional rendering for opening all of the inputs at once */}
          <div>
            {data.edit ? (
              <Input
                type="text"
                placeholder="Enter Model"
                value={model}
                tiny
                onChange={(e) => {
                  setModel(e.target.value);
                  setModelValue(data, e.target.value);
                }}
              />
            ) : (
              data.model
            )}
          </div>

          <div>
            {data.edit ? (
              <Input
                type="text"
                placeholder="Enter Make"
                value={make}
                tiny
                onChange={(e) => {
                  setMake(e.target.value);
                  setMakeValue(data, e.target.value);
                }}
              />
            ) : (
              data.make
            )}
          </div>

          <div>
            {data.edit ? (
              <Input
                type="text"
                placeholder="Enter Owner"
                value={owner}
                tiny
                onChange={(e) => {
                  setOwner(e.target.value);
                  setOwnerValue(data, e.target.value);
                }}
              />
            ) : (
              data.owner
            )}
          </div>

          <div>
            {data.edit ? (
              <Input
                type="text"
                placeholder="Enter Registration"
                value={registrationNumber}
                tiny
                onChange={(e) => {
                  setRegistrationNumber(e.target.value);
                  setRegistrationValue(data, e.target.value);
                }}
              />
            ) : (
              data.registrationNumber
            )}
          </div>

          <div>
            {!update && (
              <div className="flex gap-2">
                {!data.edit && (
                  <Button
                    onClick={() => {
                      setEdit(!edit);
                    }}
                  >
                    <PencilAltIcon className="w-4 h-4" />
                  </Button>
                )}

                {data.edit && (
                  <Button type="submit">
                    <SaveIcon className="w-4 h-4" />
                  </Button>
                )}

                {!data.edit && (
                  <Button onClick={handleDelete}>
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarItem;

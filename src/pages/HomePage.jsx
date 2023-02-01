import React, { useEffect, useState } from "react";
import Api from "../Api";

import {
  FilterIcon,
  PencilAltIcon,
  SaveIcon,
  TrashIcon,
} from "@heroicons/react/solid";

import CarDetails from "../components/CarDetails";
import CarItem from "../components/CarItem";

import Button from "../components/buttons/Button";
import Checkbox from "../components/form/Checkbox";

function HomePage() {
  // This state holds the current cars database collection
  const [cars, setCars] = useState([]);

  // This state is used for deciding if the filter wil be used or not
  const [filter, setFilter] = useState(false);

  // This state sets the active state of Checkboxes
  const [checked, setChecked] = useState(false);

  const [edit, setEdit] = useState(false);

  // This function controls / checks whether an item is checked or not
  const setItemActive = (data, checked) => {
    // This Finds the current index of a car inside the Array
    const index = cars.findIndex((car) => car._id === data._id);

    // This maps through the cars array again and confirms whether a car is checked or not
    setCars((cars) =>
      cars.map((car, i) => ({
        ...car,
        active: index === i ? checked : car.active,
      }))
    );
  };

  const setItemEdit = (data, edit) => {
    // This Finds the current index of a car inside the Array
    const index = cars.findIndex((car) => car._id === data._id);

    // This maps through the cars array again and confirms whether a car is checked or not
    setCars((cars) =>
      cars.map((car, i) => ({
        ...car,
        edit: index === i ? edit : car.edit,
      }))
    );
  };

  const setModelValue = (data, value) => {
    // This Finds the current index of a car inside the Array
    const index = cars.findIndex((car) => car._id === data._id);

    // This maps through the cars array again and confirms whether a car is checked or not
    setCars((cars) =>
      cars.map((car, i) => ({
        ...car,
        model: index === i ? value : car.model,
      }))
    );
  };

  const setMakeValue = (data, value) => {
    // This Finds the current index of a car inside the Array
    const index = cars.findIndex((car) => car._id === data._id);

    // This maps through the cars array again and confirms whether a car is checked or not
    setCars((cars) =>
      cars.map((car, i) => ({
        ...car,
        make: index === i ? value : car.make,
      }))
    );
  };

  const setOwnerValue = (data, value) => {
    // This Finds the current index of a car inside the Array
    const index = cars.findIndex((car) => car._id === data._id);

    // This maps through the cars array again and confirms whether a car is checked or not
    setCars((cars) =>
      cars.map((car, i) => ({
        ...car,
        owner: index === i ? value : car.owner,
      }))
    );
  };

  const setRegistrationValue = (data, value) => {
    // This Finds the current index of a car inside the Array
    const index = cars.findIndex((car) => car._id === data._id);

    // This maps through the cars array again and confirms whether a car is checked or not
    setCars((cars) =>
      cars.map((car, i) => ({
        ...car,
        registrationNumber: index === i ? value : car.registrationNumber,
      }))
    );
  };

  // This function GETS the current collections from the database
  async function getCars(filters) {
    try {
      let filter = "";

      if (filters) {
        filter = "?";
        if (filters.olderThan) {
          filter += `olderThan=${filters.olderThan}`;
        }
      }

      const res = await Api.get(`/` + filter);
      // This sets the current collection to the cars state
      // Then gives it a default active prop of false
      setCars(
        res.map((car) => ({
          ...car,
          active: false,
          edit: false,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }

  // This function Controls multiple deletes
  const handleDeleteMany = async (data) => {
    try {
      // It will filter through the cars array to confirm the current active prop state
      const selected = cars.filter((car) => car.active);

      // Then it is looped again to find the id of a car
      const ids = selected.map((car) => car._id);

      // This calls the /bulk endpoint and makes the delete request
      await Api.delete("/bulk", { ids });

      getCars();
      setChecked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMany = async () => {
    try {
      await Api.put("/bulk-update", { cars });

      getCars();
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  // This function controls the POST requests made from adding a new car
  const handleSubmit = async (data) => {
    try {
      // POST request
      const newCar = await Api.post("/", {
        ...data,
        model: Number(data.model),
      });

      // This spreads the cars array and the newCar and applies an active prop set to false
      setCars((cars) => [...cars, { ...newCar, active: checked }]);
    } catch (error) {
      console.log(error);
    }
  };

  // This useEffect is made to run the GET request only once per render
  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    if (filter) {
      getCars({ olderThan: 2017 });
    } else {
      getCars();
    }
  }, [filter]);

  useEffect(() => {
    setCars((cars) => cars.map((car) => ({ ...car, edit })));
  }, [edit]);

  return (
    <div>
      <div className="flex place-content-center p-8">
        <div className="text-xl">Car-Organiser</div>
      </div>

      <div className="flex gap-8 max-w-6xl mx-auto pb-4">
        {/* The POST request function is sent to CarDetails for submission requests on the form */}
        <CarDetails handleSubmit={handleSubmit} />

        <div className="flex-1">
          <div className="flex gap-3 mb-3 justify-between">
            <div className="flex gap-3">
              <Button
                disabled={!cars.some((data) => data.active)}
                onClick={() => handleDeleteMany()}
              >
                Delete
                <TrashIcon className="w-4 h-4" />
              </Button>
              <Button
                active={filter}
                onClick={() => {
                  setFilter(!filter);
                }}
              >
                Filter
                <FilterIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-3">
              <Button
                active={edit}
                onClick={() => {
                  setEdit(!edit);
                  setCars((cars) => cars.map((car) => ({ ...car, edit })));
                }}
              >
                Edit All
                <PencilAltIcon className="w-4 h-4" />
              </Button>
              <Button
                disabled={!edit}
                onClick={() => {
                  handleUpdateMany();
                }}
              >
                Save All
                <SaveIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-6 p-3 gap-2">
            <div className="flex">
              {/* This is a dynamic Checkbox component */}
              <Checkbox
                checked={checked}
                // onCHange it will set a check mark to all current cars inside the list
                onChange={(e) => {
                  setChecked(e.target.checked);
                  setCars((cars) =>
                    cars.map((car) => ({ ...car, active: e.target.checked }))
                  );
                }}
              />
            </div>

            <div>Model</div>
            <div>Make</div>
            <div>Owner</div>
            <div>Registration</div>
            <div>Options</div>
          </div>
          <div>
            {cars.map((data) => (
              <CarItem
                key={data._id}
                data={data}
                getCars={getCars}
                setItemActive={setItemActive}
                setItemEdit={setItemEdit}
                setModelValue={setModelValue}
                setMakeValue={setMakeValue}
                setOwnerValue={setOwnerValue}
                setRegistrationValue={setRegistrationValue}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import React, { useState } from "react";
import Button from "./buttons/Button";
import Input from "./form/Input";

function CarDetails({ handleSubmit }) {
  // User input info
  // Every input has its own state for settings values
  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [owner, setOwner] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  return (
    <div className="top-4 sticky self-start border-solid border-1 border-white rounded bg-slate-200 p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // The POST request is given each State with the current user input
          handleSubmit({ model, make, owner, registrationNumber });

          // Sets all input fields to there default state
          setModel("");
          setMake("");
          setOwner("");
          setRegistrationNumber("");
        }}
      >
        {/* Each state is set to there own individual input field */}
        {/* Model */}
        <div className="mb-4">
          <Input
            label="Year Model"
            type="text"
            placeholder="Enter Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        {/* Make */}
        <div className="mb-4">
          <Input
            label="Car Make"
            type="text"
            placeholder="Enter Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>

        {/* Owner */}
        <div className="mb-4">
          <Input
            label="Car Owner"
            type="text"
            placeholder="Enter Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        {/* Registeration */}
        <div className="mb-6">
          <Input
            label="Registration"
            type="text"
            placeholder="Enter Registration"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
        </div>

        <div>
          <Button type="submit" className="w-full justify-center">
            Add New Car
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CarDetails;

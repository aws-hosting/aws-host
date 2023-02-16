import React, { useState } from "react";
import SelectDesks from "../components/SelectDesks";
import ButtonPrimary from "../components/ButtonPrimary";

import { NotificationManager } from "react-notifications";
import Select from "react-select";

const NewBooking = () => {
  // const [name, setName] = useState("");
  // const [type, setType] = useState("");
  // const [venue, setVenue] = useState("");
  // const [maxRow, setMaxRow] = useState("");
  // const [maxColumn, setMaxColumn] = useState("");
  // const [unselectedDesks, setUnSelectedDesks] = useState([]);
  // const [showDesks, setShowDesks] = useState(false);
  // const [bluePrint, setBluePrint] = useState({})
  // const [name, setName] = useState("");
  // temporarily
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [venue, setVenue] = useState("");
  const [maxRow, setMaxRow] = useState("");
  const [maxColumn, setMaxColumn] = useState("");
  const [unselectedDesks, setUnSelectedDesks] = useState([]);
  const [showDesks, setShowDesks] = useState(false);
  const [bluePrint, setBluePrint] = useState({});

  const generateBluePrint = () => {
    // console.log("hi");
    setShowDesks(true);
  };
  const saveData = async () => {
    console.log(type);

    const save =
      type == "CC"
        ? {
            name,
            type,
            venue,
            noOfDeskRow: maxRow,
            noOfDeskColumns: maxColumn,
            bluePrint,
            capacity: { one: maxRow * maxColumn - unselectedDesks.length },
            noOfComputers: maxColumn * maxRow,
          }
        : type == "CL"
        ? {
            name,
            type,
            venue,
            noOfDeskRow: maxRow,
            noOfDeskColumns: maxColumn,
            bluePrint,
            capacity: { one: maxRow * maxColumn - unselectedDesks.length },
            totalDeskCount: maxColumn * maxRow,
          }
        : null;
    console.log(save);
    const response = await fetch("http://35.77.45.226:8000/v1/halls/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department, halls: save }),
    })
      .then(async (doc) => {
        let json = await doc.json();
        console.log(json.dev.error.statusCode);
        if (json.dev.error.statusCode === 400) {
          NotificationManager.error("Classroom Already Exist", "Error", 5000);
        }
      })
      .catch((err) => {
        console.log(err.dev);
      });
  };
  const bookingTypes = [
    { label: "Classroom", value: "CL" },
    { label: "Computer Center (CC)", value: "CC" },
  ];

  const detpartmentValues = [
    {
      label: "CSE",
      value: "Computer Science and Engineering ",
    },

    {
      label: "IT",
      value: "Information Technology",
    },
  ];

  const submitHandler = () => {
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxColumn; j++) {
        const tempBlueprint = bluePrint;
        if (!unselectedDesks.includes(`desk-${i}-${j}`)) {
          tempBlueprint[`desk-${i}-${j}`] = true;
        } else {
          tempBlueprint[`desk-${i}-${j}`] = false;
        }
        setBluePrint(tempBlueprint);
      }
    }

    saveData();
  };

  return (
    <div id="new-booking-section">
      <div>
        <div className="input-field-container">
          <label className="input-field-label">Name :</label>
          <input
            className="input-field"
            placeholder="Eg. ITP-S12"
            type={"text"}
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Department :</label>
          <div className="select-field-container">
            <Select
              options={detpartmentValues}
              name="type"
              onChange={(e) => {
                setDepartment(e.value);
              }}
            />
          </div>
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Type :</label>
          <div className="select-field-container">
            <Select
              options={bookingTypes}
              name="type"
              onChange={(e) => {
                setType(e.value);
              }}
            />
          </div>
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Venue : </label>
          <input
            type="text"
            className="input-field"
            placeholder="Eg. IT PARK - CSE 2nd Floor - S12"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Max Row : </label>
          <input
            className="input-field number"
            placeholder="Max row"
            value={maxRow}
            type={"number"}
            onChange={(e) => {
              setShowDesks(false);

              if (e.target.value <= 20 && !(e.target.value < 0)) {
                setMaxRow(e.target.value);
              } else {
                NotificationManager.warning(
                  "Value should between 0 to 20 only",
                  "Warning",
                  5000
                );
              }
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Max Column : </label>
          <input
            className="input-field number"
            placeholder="Max col"
            value={maxColumn}
            type={"number"}
            onChange={(e) => {
              setShowDesks(false);
              if (e.target.value <= 20 && !(e.target.value < 0))
                setMaxColumn(e.target.value);
              else {
                NotificationManager.warning(
                  "Value should be less than 20",
                  "Warning",
                  5000
                );
              }
            }}
          />
        </div>
        <div className="button-container">
          <ButtonPrimary
            style={{ borderRadius: 2 }}
            onClick={() => {
              generateBluePrint();
            }}
          >
            <p>Show Blueprint</p>
          </ButtonPrimary>
        </div>
      </div>
      <div className="desks">
        {showDesks && (
          <>
            <p className="seats-available">
              Capacity - {maxRow * maxColumn - unselectedDesks.length}
            </p>
            <SelectDesks
              key={unselectedDesks}
              unselectedDesks={unselectedDesks}
              setUnSelectedDesks={setUnSelectedDesks}
              maxColumn={maxColumn}
              maxRow={maxRow}
            />
            <div className="book">
              <ButtonPrimary
                style={{ borderRadius: 2 }}
                onClick={submitHandler}
              >
                Save Hall
              </ButtonPrimary>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewBooking;

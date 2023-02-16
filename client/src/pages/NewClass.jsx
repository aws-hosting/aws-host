import React, { useState } from "react";
import SelectDesks from "../components/SelectDesks";
import ButtonPrimary from "../components/ButtonPrimary";

import { NotificationManager } from "react-notifications";
import Select from "react-select";

const NewClass = () => {
  // const [name, setSection] = useState("");
  // const [type, setType] = useState("");
  // const [Lateral, setLateral] = useState("");
  // const [maxRow, setMaxRow] = useState("");
  // const [maxColumn, setMaxColumn] = useState("");
  // const [unselectedDesks, setUnSelectedDesks] = useState([]);
  // const [showDesks, setShowDesks] = useState(false);
  // const [bluePrint, setBluePrint] = useState({})
  // const [name, setSection] = useState("");
  // temporarily
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [year, setType] = useState("");
  const [Total, setTotal] = useState(0);
  const [Lateral, setLateral] = useState(0);
  const [Regular, setRegular] = useState(0);
  const [LateralStarting, setLateralStarting] = useState(1);
  const [RegularStarting, setRegularStarting] = useState(1);
  const [RegularPrefix, setRegularPrefix] = useState("");
  const [LateralPrefix, setLateralPrefix] = useState("");
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
    const save = {
      noOfStudents: Lateral + Regular,
      lateral: Lateral,
      reqular: Regular,
      reqularStartingRollnumber: RegularStarting,
      lateralStartingRollnumber: LateralStarting,
      regularRollNoPrefix: RegularPrefix,
      lateralRollNoPrefix: LateralPrefix,
      joinedYear: year,
      department: department,
      section: section,
      notEligible: [14, 23],
    };
    console.log([save]);
    const response = await fetch("http://35.77.45.226:8000/v1/class/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([save]),
    })
      .then(async (doc) => {
        let json = await doc.json();
        console.log(json.dev.error.statusCode);
        if (json.dev.error.statusCode === 400) {
          NotificationManager.error("Classroom Already Exist", "Error", 5000);
        } else {
          NotificationManager.success("Successfully added", "Success", 5000);
        }
      })
      .catch((err) => {
        console.log(err.dev);
      });
  };
  const bookingTypes = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
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

  const submitHandler = (e) => {
    e.preventDefault();
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
          <label className="input-field-label">Year :</label>
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
          <label className="input-field-label">Section :</label>
          <input
            className="input-field"
            placeholder="Eg. A, B, C, D"
            type={"text"}
            name="name"
            value={section}
            onChange={(e) => {
              setSection(e.target.value);
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Total : </label>
          <input
            type="number"
            className="input-field"
            placeholder="Eg. 15"
            name="Lateral"
            value={Total}
            readOnly={true}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Lateral : </label>
          <input
            type="number"
            className="input-field"
            placeholder="Eg. 5"
            name="Lateral"
            value={Lateral}
            onChange={(e) => {
              setLateral(e.target.value);
              console.log("asd", Total, Lateral, Regular);
              setTotal(parseInt(e.target.value) + parseInt(Regular));
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Regular : </label>
          <input
            type="number"
            className="input-field"
            placeholder="Eg. 10"
            name="Regular"
            value={Regular}
            onChange={(e) => {
              setRegular(e.target.value);
              setTotal(parseInt(Lateral) + parseInt(e.target.value));
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Regular starting : </label>
          <input
            type="number"
            className="input-field"
            placeholder="Eg. 1"
            name="Regular"
            value={RegularStarting}
            onChange={(e) => {
              setRegularStarting(e.target.value);
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Lateral starting : </label>
          <input
            type="number"
            className="input-field"
            placeholder="Eg. 247"
            name="Lateral"
            value={LateralStarting}
            onChange={(e) => {
              setLateralStarting(e.target.value);
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Regular Prefix : </label>
          <input
            type="text"
            className="input-field"
            placeholder="Eg. 20CSR , 20ITR"
            name="Regular prefix"
            value={RegularPrefix}
            onChange={(e) => {
              setRegularPrefix(e.target.value);
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Lateral Prefix : </label>
          <input
            type="text"
            className="input-field"
            placeholder="Eg. 20CSR , 20ITR"
            name="Lateral prefix"
            value={LateralPrefix}
            onChange={(e) => {
              setLateralPrefix(e.target.value);
            }}
          />
        </div>
        <div className="button-container">
          <ButtonPrimary
            style={{ borderRadius: 2 }}
            onClick={() => {
              saveData();
            }}
          >
            <p>Save Class</p>
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

export default NewClass;

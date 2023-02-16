import React, { useEffect, useState } from "react";
import "./../styles/pages/SeatAllocation.scss";
import Select from "react-select";

import SeatsAllocated from "../components/SeatsAllocated";
import Loading from "../components/Loading";

const SeatAllocation = () => {
  const yearValue = [
    { label: "2019", value: "2019" },
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
  ];

  const sessionValue = [
    { label: "FN", value: "FN" },
    { label: "AN", value: "AN" },
  ];

  const [inputDatas, setInputaData] = useState({
    year: "",
    name: "",
    subject: "",
    classes: [],
    department: [],
    session: "",
    halls: [],
    count: "",
    ccNeeded: false,
  });

  const [departmentDatas, setDepartmentDatas] = useState([]);
  const [hallsUsedDatas, setHallsUsedDatas] = useState([]);
  const [hallsSelectData, setHallSelectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hallsDataWithDepartment, setHallDataWithDepartment] = useState([]);
  const [classList, setClassList] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [classData, setClassData] = useState([]);
  const [hallCapacity, setHallCapacity] = useState(0);
  const [rollNumbers, setRollNumbers] = useState([]);

  const selectChangeHandler = (e, name) => {
    setInputaData({ ...inputDatas, [name]: e.value });
  };

  const inputChangeHandler = (e) => {
    setInputaData({ ...inputDatas, [e.target.name]: e.target.value });
  };

  const checkBoxChangeHandler = (e) => {
    setInputaData({ ...inputDatas, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    const fetchDepartmentData = async () => {
      setLoading(true);
      const response = await fetch("http://35.77.45.226:8000/v1/halls/all");
      const json = await response.json();

      //department datas

      let tempDepartment = [];
      json.data.map((data) => {
        tempDepartment.push({ label: data.department, value: data.department });
      });

      setDepartmentDatas(tempDepartment);

      let temphallDetails = [];

      json.data.map((data) => {
        data.halls.map((singleHall) => {
          let desk = singleHall.noOfDeskRow * singleHall.noOfDeskColumns;

          temphallDetails.push({
            department: data.department,
            hall: singleHall.name,
            capacity: desk,
          });
        });
      });

      setHallsUsedDatas(temphallDetails);
    };

    const fetchClassData = async () => {
      const response = await fetch("http://35.77.45.226:8000/v1/class/all");
      const json = await response.json();

      let temp = [];
      setClassData(json.data);

      json.data.map((singleData) => {
        temp.push({ label: singleData._id, value: singleData._id });
      });

      setClassList(temp);
      setLoading(false);
    };

    fetchDepartmentData();
    fetchClassData();
  }, []);

  useEffect(() => {
    let temp = [];

    hallsUsedDatas.map((singleData) => {
      if (inputDatas.department.includes(singleData.department)) {
        temp.push({ label: singleData.hall, value: singleData.hall });
      }
    });

    setHallSelectData(temp);
  }, [inputDatas.department]);

  useEffect(() => {
    let capacity = 0;
    hallsUsedDatas.map((singleData) => {
      if (inputDatas.halls.includes(singleData.hall)) {
        capacity += singleData.capacity;
        setHallDataWithDepartment([...hallsDataWithDepartment, singleData]);
      }
    });
    setHallCapacity(capacity);
  }, [inputDatas.halls]);

  useEffect(() => {
    let count = 0;
    let notEligleCount = 0;
    let temp = [];
    classData.map((singleData) => {
      if (inputDatas.classes.includes(singleData._id)) {
        count += singleData.noOfStudents;

        console.log(singleData);

        for (
          let i = singleData.reqularStartingRollnumber;
          i < singleData.reqularStartingRollnumber + singleData.reqular;
          i++
        ) {
          if (!singleData.notEligible.includes(i)) {
            if (i < 10) {
              temp.push(singleData.regularRollNoPrefix + "00" + i);
            } else if (i < 100) {
              temp.push(singleData.regularRollNoPrefix + "0" + i);
            } else {
              temp.push(singleData.regularRollNoPrefix + i);
            }
          }
        }

        for (
          let i = singleData.lateralStartingRollnumber;
          i < singleData.lateralStartingRollnumber + singleData.lateral;
          i++
        ) {
          temp.push(singleData.lateralRollNoPrefix + i);
        }

        notEligleCount += singleData.notEligible.length;
      }
      setRollNumbers(temp);
    });
    console.log(count);

    setRollNumbers(temp);

    setTotalStudents(count - notEligleCount);
  }, [inputDatas.classes]);

  const selectMultipleChangeHandler = (e, name) => {
    let temp = [];
    e.map((singleData) => {
      temp.push(singleData.value);
    });

    setInputaData({ ...inputDatas, [name]: temp });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="seat-allocation-section">
      <div>
        <form>
          <div className="form-input-container">
            <label className="form-label">Year</label>
            <div className="form-select-container">
              <Select
                value={{ label: inputDatas.year, value: inputDatas.year }}
                options={yearValue}
                onChange={(e) => selectChangeHandler(e, "year")}
              />
            </div>
          </div>
          <div className="form-input-container">
            <label className="form-label">Name : </label>
            <input
              value={inputDatas.name}
              name="name"
              onChange={inputChangeHandler}
              className="form-input"
            />
          </div>
          <div className="form-input-container">
            <label className="form-label">Session : </label>
            <input
              value={inputDatas.session}
              name="session"
              onChange={inputChangeHandler}
              className="form-input"
            />
          </div>
          <div className="form-input-container">
            <label className="form-label">Subject : </label>
            <input
              value={inputDatas.subject}
              name="subject"
              onChange={inputChangeHandler}
              className="form-input"
            />
          </div>
          <div className="form-input-container">
            <label className="form-label">CC Needed : </label>
            <input type="checkbox" onChange={checkBoxChangeHandler} />
          </div>
          <div className="form-input-container">
            <label className="form-label">Classes : </label>
            <div className="form-select-container">
              <Select
                options={classList}
                isMulti
                onChange={(e) => {
                  selectMultipleChangeHandler(e, "classes");
                }}
              />
            </div>
          </div>
          <div className="form-input-container">
            <label className="form-label">Departments : </label>
            <div className="form-select-container">
              <Select
                options={departmentDatas}
                isMulti
                onChange={(e) => {
                  selectMultipleChangeHandler(e, "department");
                }}
              />
            </div>
          </div>
          <div className="form-input-container">
            <label className="form-label">Halls : </label>
            <div className="form-select-container">
              <Select
                options={hallsSelectData}
                isMulti
                onChange={(e) => {
                  selectMultipleChangeHandler(e, "halls");
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="class-info">
        <h1>
          {totalStudents} Students | {hallCapacity} Hall Capacity
        </h1>
      </div>
      {totalStudents <= hallCapacity ? (
        <div>
          <SeatsAllocated
            halls={hallsDataWithDepartment}
            totalSudents={totalStudents}
            session={inputDatas.session}
            subject={inputDatas.subject}
            name={inputDatas.name}
            year={inputDatas.year}
            rollNumbers={rollNumbers}
          />
        </div>
      ) : (
        <p>Hall Capacity must be Higher</p>
      )}
    </div>
  );
};

export default SeatAllocation;

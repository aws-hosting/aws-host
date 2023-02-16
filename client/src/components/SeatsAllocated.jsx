import React, { useEffect, useState } from "react";
import "./../styles/pages/NewBooking.scss";
import Loading from "./Loading";
import ButtonPrimary from "../components/ButtonPrimary";
import { NotificationManager } from "react-notifications";
const SeatsAllocated = ({
  halls = [],
  totalSudents,
  session,
  subject,
  year,
  name,
  rollNumbers,
}) => {
  let k = 0;
  let venueBlueprints = [];
  const [hallDetails, setHallDetails] = useState([]);
  const [storeData, setStoreData] = useState([]);
  function removeDuplicates(arr) {
    let seen = new Set();
    return arr.filter((item) => {
      const stringified = JSON.stringify(item);
      if (seen.has(stringified)) {
        return false;
      }
      seen.add(stringified);
      return true;
    });
  }
  const saveHandler = async (e) => {
    e.preventDefault();
    console.log("Hi");
    const saveData = removeDuplicates(storeData);
    const response = await fetch("http://35.77.45.226:8000/v1/halls/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saveData),
    });
    // .then(async (doc) => {
    //   let json = await doc.json();
    //   console.log(json.dev.error.statusCode);
    //   if (json.dev.error.statusCode === 400) {
    //     NotificationManager.error("Classroom Already Exist", "Error", 5000);
    //   }
    //   console.log("Hi");
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    const json = await response.json();
    console.log(json);
    if (json.status === "success") {
      NotificationManager.success("Successfully Allocated !", "Success", 5000);
    } else {
      // NotificationManager.error("Error in Allocating", "Error", 5000);
      console.log("error");
    }
  };

  useEffect(() => {
    const fetchHallDetails = async () => {
      const response = await fetch("http://35.77.45.226:8000/v1/halls/all");

      const json = await response.json();

      setHallDetails(json.data);
    };

    fetchHallDetails();
  }, []);
  let desks = [];
  if (halls.length > 0) {
    halls.map((hall) => {
      hallDetails.map((singleHallFullDetail) => {
        if (hall.department === singleHallFullDetail.department) {
          let avaliableHalls = singleHallFullDetail.halls;
          avaliableHalls.map((singleHall) => {
            if (hall.hall === singleHall.name) {
              venueBlueprints.push({
                name: singleHall.name,
                blueprint: singleHall.bluePrint,
                capacity: singleHall.totalDeskCount,
                row: singleHall.noOfDeskRow,
                column: singleHall.noOfDeskColumns,
              });
            }
          });
        }
      });
    });

    let startingRollNo = 1;
    venueBlueprints.map((temp) => {
      const rowValue = temp.row;
      const colValue = temp.column;
      const arr = [];
      for (let i = 0; i < colValue; i++) {
        arr[i] = [];

        for (let j = 0; j < rowValue; j++) {
          arr[i][j] = 0;
        }
      }

      for (let i = 0; i < colValue; i++) {
        if (startingRollNo > totalSudents) {
          break;
        }
        for (let j = 0; j < rowValue; j++) {
          if (temp["blueprint"][`desk-${j}-${i}`] === false) {
            continue;
          }
          arr[j][i] = rollNumbers[k++];
          storeData.push({
            table: `desk-${j + 1}-${i + 1}`,
            rollNo:
              startingRollNo > 10
                ? "20CSR0" + startingRollNo
                : "20CSR00" + startingRollNo,
            hall: temp.name,
            session: session,
            subject: subject,
            year: year,
            name: name,
          });
          startingRollNo++;

          if (startingRollNo > totalSudents) {
            break;
          }
        }

        if (startingRollNo > totalSudents) {
          break;
        }
      }

      for (let i = 0; i < rowValue; i++) {
        let rowDesk = [];

        for (let j = 0; j < colValue; j++) {
          if (arr[i][j] === 0) {
            rowDesk.push(
              <div className="desk">
                <p>-</p>
                <p className="allocated-seat"></p>
              </div>
            );
          } else {
            rowDesk.push(
              <div className="desk">
                <p>{temp.name}</p>
                <p className="allocated-seat">{arr[i][j]}</p>
              </div>
            );
          }
        }

        desks.push(
          <div className="desk-row" key={`${Math.random()}-desk${i}`}>
            {rowDesk}
          </div>
        );
      }
    });
  }

  return (
    <div>
      {desks}
      <div>
        <ButtonPrimary
          onClick={(e) => {
            saveHandler(e);
          }}
        >
          Save
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SeatsAllocated;

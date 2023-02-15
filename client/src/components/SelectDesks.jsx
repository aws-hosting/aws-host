import React from "react";
import "./../styles/components/SelectDesks.scss";
import deskBW from "../assests/desk-bw.png";
import deskOriginal from "../assests/desk.png";

const SelectDesks = ({
  unselectedDesks,
  setUnSelectedDesks,
  maxColumn,
  maxRow,
}) => {
  const clickHandler = (unSelectedDesk) => {
    let flag = unselectedDesks.find((desk) => desk === unSelectedDesk);
    console.log(flag);
    if (!flag) {
      setUnSelectedDesks([...unselectedDesks, unSelectedDesk]);
    } else {
      console.log("In Else Part");
      let temp = unselectedDesks;
      console.log(temp);
      temp.splice(temp.indexOf(unSelectedDesk), 1);
      console.log(temp);
      setUnSelectedDesks([...temp]);
    }
  };

  const checkIsInArray = (id) => {
    return unselectedDesks.find((desk) => desk === id);
  };

  const desks = [];
  for (let row = 0; row < maxRow; row++) {
    const rowDesks = [];
    for (let col = 0; col < maxColumn; col++) {
      rowDesks.push(
        <div
          key={`desk-${row}-${col}`}
          id={`desk-${row}-${col}`}
          className="desk"
          onClick={() => {
            clickHandler(`desk-${row}-${col}`);
          }}
        >
          <div>
            {checkIsInArray(`desk-${row}-${col}`) ? (
              <img src={deskBW} className="desk-img" />
            ) : (
              <img src={deskOriginal} className="desk-img" />
            )}
            <p>
              {row + 1} - {col + 1}
            </p>
          </div>
        </div>
      );
    }
    desks.push(
      <div key={`row-${row}`} className="desk-row">
        {rowDesks}
      </div>
    );
  }

  console.log(desks);
  return <>{desks}</>;
};

export default SelectDesks;

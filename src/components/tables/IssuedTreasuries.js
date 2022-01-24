import React, { useState, useContext, useEffect } from "react";
import "../../styles/IssuedTreasuries.css";
import { EventContext } from "../../App";
import { AppContext } from "../../index";
//Utils
import Button from "../global/Button";
//Assets
import RedX from "../../assets/off_close.svg";
import GreenCheck from "../../assets/circle_check.svg";

function IssuedTreasuries({ currAddr, signer }) {
  //Context
  const treasuryData = useContext(EventContext);
  const appData = useContext(AppContext);
  //Component State
  const [issuedData, setIssuedData] = useState(null);

  useEffect(() => {
    if (!treasuryData.issued || !treasuryData.bought || !treasuryData.paid)
      return;
    setIssuedData(treasuryData.issued);
    return () => {
      setIssuedData(null);
    };
  }, [treasuryData]);

  console.log("appData", appData);
  console.log("issuedData", issuedData);

  return (
    <div className="IssuedTreasuries__Container">
      <h2>All Issued Treasuries</h2>
      <table>
        <thead>
          <tr>
            <th>Issued Treasury</th>
            <th>Max Amount</th>
            <th>Rate</th>
            <th>Duration</th>
            <th>Payout Date</th>
            <th>Active</th>
            <th>Buy Treasury</th>
          </tr>
        </thead>
        <tbody>
          {issuedData &&
            issuedData.map((event) => (
              <tr key={event.id}>
                <td>{event.treasuryName}</td>
                <td>{event.maxAmount}</td>
                <td>{event.rate}</td>
                <td>{event.duration}</td>
                <td>{event.payoutDate}</td>
                <td>
                  <img
                    src={event.active ? GreenCheck : RedX}
                    alt={
                      event.active
                        ? "active treasury icon"
                        : "inactive treasury icon"
                    }
                  />
                </td>
                <td>
                  <Button children={"Buy This Treasury"} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default IssuedTreasuries;

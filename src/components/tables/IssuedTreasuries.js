import React, { useState, useContext, useEffect } from "react";
import "../../styles/AllTables.css";
import { EventContext } from "../../App";
//Assets
import RedX from "../../assets/off_close.svg";
import GreenCheck from "../../assets/circle_check.svg";

function IssuedTreasuries({ setBuying, setSelected }) {
  //Context
  const treasuryData = useContext(EventContext);
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

  //Function Handlers
  const handleSelect = (treasury) => {
    setSelected(treasury);
    setBuying(true);
  };

  return (
    <div className="AllTables__Container">
      <h2>All Issued Treasuries</h2>
      <table>
        <thead className="IssuedTreasuries__Header">
          <tr>
            <th>Issued Treasury</th>
            <th>Max Amount</th>
            <th>Rate</th>
            <th>Duration</th>
            <th>Payout Date</th>
            <th>Active</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody className="IssuedTreasuries__Body">
          {issuedData &&
            issuedData.map((treasury) => (
              <tr key={treasury.id}>
                <td>{treasury.treasuryName}</td>
                <td>{treasury.maxAmount}</td>
                <td>{treasury.rate}</td>
                <td>{treasury.duration}</td>
                <td>{treasury.payoutDate}</td>
                <td>
                  <img
                    src={treasury.active ? GreenCheck : RedX}
                    alt={
                      treasury.active
                        ? "active treasury icon"
                        : "inactive treasury icon"
                    }
                  />
                </td>
                <td>
                  <button
                    children={"Buy This Treasury"}
                    onClick={() => handleSelect(treasury)}
                    className="Global__Button"
                  >
                    Buy This Treasury
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default IssuedTreasuries;

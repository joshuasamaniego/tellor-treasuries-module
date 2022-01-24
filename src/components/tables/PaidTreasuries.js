import React, { useState, useEffect, useContext } from "react";
import "../../styles/AllTables.css";
import { EventContext } from "../../App";
import { AppContext } from "../../index";
import { truncateAddr } from "../../utils/helpers";
import NoData from "../global/NoData";
import Button from "../global/Button";

function PaidTreasuries({ currAddr, signer }) {
  //Context
  const treasuryData = useContext(EventContext);
  const appData = useContext(AppContext);
  //Component State
  const [paidData, setPaidData] = useState(null);

  useEffect(() => {
    if (!treasuryData.issued || !treasuryData.bought || !treasuryData.paid)
      return;
    if (treasuryData.paid.length > 0) {
      let temp;
      if (!currAddr) {
        temp = treasuryData.paid.filter(
          (event) => event.investor === appData.currentAddress
        );
      } else {
        temp = treasuryData.paid.filter((event) => event.investor === currAddr);
      }
      temp.length > 0 ? setPaidData(temp) : setPaidData(null);
    }
    return () => {
      setPaidData(null);
    };
  }, [treasuryData, currAddr, appData.currentAddress]);

  console.log("appData", appData);
  console.log("paidData", paidData);

  return (
    <div className="AllTables__Container">
      <h2>{`Treasuries Paid to ${
        currAddr.length > 0
          ? truncateAddr(currAddr)
          : truncateAddr(appData.currentAddress)
      }`}</h2>
      {paidData ? (
        <table>
          <thead className="PaidTreasuries__Header">
            <tr>
              <th>Paid Treasury</th>
              <th>Rate</th>
              <th>Payment Amount</th>
              <th>Date Paid</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody className="PaidTreasuries__Body">
            {paidData &&
              paidData.map((event) => (
                <tr key={event.id}>
                  <td>{event.treasuryName}</td>
                  <td>{event.rate}</td>
                  <td>{event.amountPaid}</td>
                  <td>{event.datePaid}</td>
                  <td>
                    <Button children={"View on Etherscan"} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default PaidTreasuries;

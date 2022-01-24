import React, { useState, useEffect, useContext } from "react";
import { EventContext } from "../../App";
import { AppContext } from "../../index";
import { truncateAddr } from "../../utils/helpers";
import NoData from "../global/NoData";

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
    <div>
      <h2>{`Treasuries Paid to ${
        currAddr.length > 0
          ? truncateAddr(currAddr)
          : truncateAddr(appData.currentAddress)
      }`}</h2>
      {paidData ? (
        <table>
          <thead>
            <tr>
              <th>Paid Treasury</th>
              <th>Rate</th>
              <th>Payment Amount</th>
              <th>Date Paid</th>
            </tr>
          </thead>
          <tbody>
            {paidData &&
              paidData.map((event) => (
                <tr key={event.id}>
                  <td>{event.treasuryName}</td>
                  <td>{event.rate}</td>
                  <td>{event.amountPaid}</td>
                  <td>{event.datePaid}</td>
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

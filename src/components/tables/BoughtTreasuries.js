import React, { useState, useEffect, useContext } from "react";
import "../../styles/AllTables.css";
import { EventContext } from "../../App";
import { AppContext } from "../../index";
import { truncateAddr } from "../../utils/helpers";
//Utils
import Button from "../global/Button";
import NoData from "../global/NoData";

function BoughtTreasuries({ currAddr, signer }) {
  //Context
  const treasuryData = useContext(EventContext);
  const appData = useContext(AppContext);
  //Component State
  const [boughtData, setBoughtData] = useState(null);

  useEffect(() => {
    if (!treasuryData.issued || !treasuryData.bought || !treasuryData.paid)
      return;
    if (treasuryData.bought.length > 0) {
      let temp;
      if (!currAddr) {
        temp = treasuryData.bought.filter(
          (event) => event.investor === appData.currentAddress
        );
      } else {
        temp = treasuryData.bought.filter(
          (event) => event.investor === currAddr
        );
      }
      temp.length > 0 ? setBoughtData(temp) : setBoughtData(null);
    }
    return () => {
      setBoughtData(null);
    };
  }, [treasuryData, currAddr, appData.currentAddress]);

  console.log("appData", appData);
  console.log("boughtData", boughtData);

  return (
    <div className="AllTables__Container">
      <h2>{`Treasuries Bought by ${
        currAddr.length > 0
          ? truncateAddr(currAddr)
          : truncateAddr(appData.currentAddress)
      }`}</h2>
      {boughtData ? (
        <table>
          <thead className="BoughtTreasuries__Header">
            <tr>
              <th>Bought Treasury</th>
              <th>Amount Bought</th>
              <th>Payout Date</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody className="BoughtTreasuries__Body">
            {boughtData &&
              boughtData.map((event) => (
                <tr key={event.id}>
                  <td>{event.treasuryName}</td>
                  <td>{event.amountBought}</td>
                  <td>{event.payoutDate}</td>
                  <td>
                    <Button children={"Payout Treasury"} />
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

export default BoughtTreasuries;

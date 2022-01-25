import React, { useState, useEffect, useContext } from "react";
import "../../styles/AllTables.css";
import "../../styles/Button.css";
import { EventContext } from "../../App";
import { AppContext } from "../../index";
import { truncateAddr } from "../../utils/helpers";
//Utils
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
              <th>Date Bought</th>
              <th>Date of Payout </th>
            </tr>
          </thead>
          <tbody className="BoughtTreasuries__Body">
            {boughtData &&
              boughtData.map((treasury) => (
                <tr key={treasury.id}>
                  <td>{treasury.treasuryName}</td>
                  <td>{treasury.amountBought}</td>
                  <td>{treasury.dateBought}</td>
                  <td>{treasury.payoutDate}</td>
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

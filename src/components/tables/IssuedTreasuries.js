import React, { useState, useContext, useEffect } from "react";
import "../../styles/AllTables.css";
import { EventContext } from "../../App";
import { AppContext } from "../../index";
//Assets
import RedX from "../../assets/off_close.svg";
import GreenCheck from "../../assets/circle_check.svg";
//Utils
import TESTTellorTreasuryABI from "../../utils/TESTTellorTreasuryABI.json";
import TellorTreasuryABI from "../../utils/TellorTreasuryABI.json";
//Web3
import { ethers } from "ethers";

function IssuedTreasuries({
  currAddr,
  setBuying,
  setSelected,
  setErrMessage,
  setLoading,
  setTxnHash,
  setBought,
}) {
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

  //Function Handlers
  const handleSelect = (treasury) => {
    if (treasury.active) {
      setSelected(treasury);
      setBuying(true);
    } else {
      handlePayout(treasury);
    }
  };

  const handlePayout = (treasury) => {
    if (!issuedData) return;
    if (!appData) return;

    let contract;
    let abi;
    // let wasPaid;

    if (appData.chainId === "Mainnet") {
      abi = TellorTreasuryABI;
      contract = new ethers.Contract(
        appData.contractAddress,
        abi,
        appData.signer
      );

      try {
        contract
          .wasPaid(
            treasury.treasuryId,
            currAddr.length > 0 ? currAddr : appData.currentAddress
          )
          .then((response) => {
            if (!response) {
              setLoading(true);
              contract
                .payTreasury(
                  currAddr.length > 0 ? currAddr : appData.currentAddress,
                  treasury.treasuryId
                )
                .then((res) => {
                  setLoading(false);
                  setTxnHash(res.hash);
                  setBought(true);
                })
                .catch((err) => {
                  setErrMessage(err.message);
                  setLoading(false);
                });
            } else {
              setErrMessage("This treasury was already paid out.");
            }
          })
          .catch((err) => {
            setErrMessage(err.message);
          });
      } catch (err) {
        setErrMessage(err.message);
      }
    } else if (appData.chainId === "Ropsten" || appData.chainId === "Rinkeby") {
      abi = TESTTellorTreasuryABI;
      contract = new ethers.Contract(
        appData.contractAddress,
        abi,
        appData.signer
      );

      try {
        contract
          .wasPaid(
            treasury.treasuryId,
            currAddr.length > 0 ? currAddr : appData.currentAddress
          )
          .then((response) => {
            if (!response) {
              setLoading(true);
              contract
                .payTreasury(
                  currAddr.length > 0 ? currAddr : appData.currentAddress,
                  treasury.treasuryId
                )
                .then((res) => {
                  setLoading(false);
                  setTxnHash(res.hash);
                  setBought(true);
                })
                .catch((err) => {
                  setErrMessage(err.message);
                  setLoading(false);
                });
            } else {
              setErrMessage("This treasury was already paid out.");
            }
          })
          .catch((err) => {
            setErrMessage(err.message);
          });
      } catch (err) {
        setErrMessage(err.message);
      }
    }
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
                    onClick={() => handleSelect(treasury)}
                    className="Global__Button"
                  >
                    {treasury.active ? "Buy This Treasury" : "Ready for Payout"}
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

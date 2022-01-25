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

function IssuedTreasuries({ currAddr, signer, setBuying, setSelected }) {
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

  // const handleVote = async (bool) => {
  //   if (!data) return;

  //   let contract;
  //   let didAlreadyVote;

  //   if (data.chainId === "0x1") {
  //     contract = new ethers.Contract(
  //       data.tellorGovMainnet,
  //       TellorGovABI,
  //       Object.keys(signer) > 0 ? signer : data.signer
  //     );

  //     didAlreadyVote = await contract.didVote(
  //       voteIdMainnet,
  //       currAddr.length > 0 ? currAddr : data.currentAddress
  //     );

  //     if (!didAlreadyVote) {
  //       setLoading(true);
  //       try {
  //         contract
  //           .vote(voteIdMainnet, bool, false)
  //           .then((res) => {
  //             setLoading(false);
  //             setTxnHash(res.hash);
  //             setJustVoted(true);
  //           })
  //           .catch((err) => {
  //             console.log("MetaMask Txn Err: ", err);
  //             setLoading(false);
  //             setErrMessage(err.message);
  //           });
  //       } catch (err) {
  //         // console.log("ERR::: ", err.message);
  //         setErrMessage(err.message);
  //       }
  //     } else {
  //       setErrMessage(
  //         "Execution reverted: You already voted at this address on this network. Thank you for voting!"
  //       );
  //     }
  //   } else if (data.chainId === "0x4") {
  //     contract = new ethers.Contract(
  //       data.tellorGovRinkeby,
  //       TellorGovABI,
  //       Object.keys(signer) > 0 ? signer : data.signer
  //     );

  //     didAlreadyVote = await contract.didVote(
  //       voteIdRinkeby,
  //       currAddr.length > 0 ? currAddr : data.currentAddress
  //     );

  //     if (!didAlreadyVote) {
  //       setLoading(true);
  //       try {
  //         contract
  //           .vote(voteIdRinkeby, bool, false)
  //           .then((res) => {
  //             setLoading(false);
  //             setTxnHash(res.hash);
  //             setJustVoted(true);
  //           })
  //           .catch((err) => {
  //             //console.log("MetaMask Txn Err: ", err);
  //             setLoading(false);
  //             setErrMessage(err.message);
  //           });
  //       } catch (err) {
  //         // console.log("MetaMask Txn Err:: ", err.message);
  //         setErrMessage(err.message);
  //       }
  //     } else {
  //       setErrMessage(
  //         "Execution reverted: You already voted at this address on this network. Thank you for voting!"
  //       );
  //     }
  //   }
  // };

  const handlePayout = (treasury) => {
    if (!issuedData) return;
    if (!appData) return;

    let contract;
    let abi;
    let wasPaid;

    if (appData.chainId === "Mainnet") {
    } else if (appData.chainId === "Rinkeby") {
    } else if (appData.chainId === "Ropsten") {
      ////////////////////////////////////////
      //      THIS IS WHERE I LEFT OFF.     //
      ////////////////////////////////////////

      /* TRY TO SEE IF YOU CAN GET AWAY WITHOUT SEPARATING CHAINS */
      abi = TellorTreasuryABI;
      contract = new ethers.Contract(
        appData.contractAddress,
        abi,
        Object.keys(signer) > 0 ? signer : appData.signer
      );

      try {
        contract
          .wasPaid(
            treasury.treasuryId,
            currAddr.length > 0 ? currAddr : appData.currentAddress
          )
          .then((response) => console.log(response));
      } catch (err) {
        console.log(err);
      }
    }
  };

  //Function Handlers
  const handleSelect = (treasury) => {
    if (treasury.active) {
      setSelected(treasury);
      setBuying(true);
    } else {
      console.log(treasury);
      handlePayout(treasury);
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

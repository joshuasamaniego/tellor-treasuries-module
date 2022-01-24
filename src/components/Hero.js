import React, { useState, useContext } from "react";
import "../styles/Hero.css";
//Web3
import { ethers } from "ethers";
//Context
import { AppContext } from "../index";
//Utils/Helpers
import TellorGovABI from "../utils/TellorGovABI.json";
import { truncateAddr } from "../utils/helpers";
//Components
import MetaMaskErrModal from "./MetaMaskErrModal";
import TxnLoader from "./TxnLoader";
import TxnModal from "./TxnModal";
//Table Components
import IssuedTreasuries from "./tables/IssuedTreasuries";
import BoughtTreasuries from "./tables/BoughtTreasuries";
import PaidTreasuries from "./tables/PaidTreasuries";

function Hero({ currAddr, signer }) {
  //Component State
  const [loading, setLoading] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [txnHash, setTxnHash] = useState(null);
  //Context
  const data = useContext(AppContext);
  //Refs
  const ref = React.createRef();
  const ErrModal = React.forwardRef((props, ref) => {
    return <MetaMaskErrModal ref={ref}>{props.children}</MetaMaskErrModal>;
  });

  return (
    <div className="Hero">
      <div className="Hero__View">
        <h1>Tellor Treasuries</h1>
        <h2>{`Account Page for ${
          currAddr.length > 0
            ? truncateAddr(currAddr)
            : truncateAddr(data.currentAddress)
        }`}</h2>
        <h3>
          This page is for displaying your current address' interaction with the
          Tellor Treasuries contract.
        </h3>
        <h3>
          Take a look at the current treasury available, and if you would like
          to stake your TRB in order to receive the return rate, click on "Buy
          Treasury" and fill out the form with how much you'd like to invest.
        </h3>
        <h3>
          For more information on how Tellor Treasuries works, visit this link:{" "}
          <a href="https://docs.tellor.io/tellor/whitepaper/tellor-oracle-overview/monetary-policy#tellor-treasuries">
            Tellor's Monetary Policy
          </a>
        </h3>
        <div className="Hero__CTAContainer">
          <div className="Hero__MainTable">
            <IssuedTreasuries currAddr={currAddr} signer={signer} />
            <BoughtTreasuries currAddr={currAddr} signer={signer} />
            <PaidTreasuries currAddr={currAddr} signer={signer} />
          </div>
        </div>
      </div>
      <ErrModal innerRef={ref}>{[errMessage, setErrMessage]}</ErrModal>
      <TxnLoader loading={loading} />
      <TxnModal
        chainId={data.chainId}
        address={currAddr.length > 0 ? currAddr : data.currentAddress}
        justVoted={justVoted}
        setJustVoted={setJustVoted}
        txnHash={txnHash}
      />
    </div>
  );
}

export default Hero;

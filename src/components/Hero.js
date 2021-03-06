import React, { useState, useContext } from "react";
import "../styles/Hero.css";
//Context
import { AppContext } from "../index";
//Components
import MetaMaskErrModal from "./MetaMaskErrModal";
import TxnLoader from "./TxnLoader";
import TxnModal from "./TxnModal";
//Table Components
import IssuedTreasuries from "./tables/IssuedTreasuries";
import BoughtTreasuries from "./tables/BoughtTreasuries";
import PaidTreasuries from "./tables/PaidTreasuries";
import BuyModal from "./BuyModal";

function Hero({ currAddr, signer }) {
  //Component State
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [bought, setBought] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [txnHash, setTxnHash] = useState(null);
  const [selected, setSelected] = useState(null);
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
        <h3>
          This page displays your current address' interaction with the{" "}
          <a
            href={data.etherscanLink}
            alt={`${data.chainId} Tellor Treasury Contract, Etherscan Link`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tellor Treasuries Contract
          </a>
          . Take a look at the current treasury available below, and if you
          would like to stake your TRB in order to receive the return rate after
          the denoted duration, then click on "Buy Treasury" and fill out the
          form with how much you'd like to invest.
        </h3>
        <h3>
          For more information on how Tellor Treasuries works, visit this link:{" "}
          <a href="https://docs.tellor.io/tellor/whitepaper/tellor-oracle-overview/monetary-policy#tellor-treasuries">
            Tellor's Monetary Policy
          </a>
        </h3>
        <div className="Hero__CTAContainer">
          <div className="Hero__MainTable">
            <IssuedTreasuries
              currAddr={currAddr}
              signer={signer}
              setBuying={setBuying}
              setSelected={setSelected}
              setErrMessage={setErrMessage}
              setLoading={setLoading}
              setTxnHash={setTxnHash}
              setBought={setBought}
            />
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
        bought={bought}
        setBought={setBought}
        txnHash={txnHash}
      />
      <BuyModal
        signer={signer}
        buying={buying}
        selected={selected}
        setBuying={setBuying}
        setErrMessage={setErrMessage}
        setLoading={setLoading}
        setTxnHash={setTxnHash}
        setBought={setBought}
      />
    </div>
  );
}

export default Hero;

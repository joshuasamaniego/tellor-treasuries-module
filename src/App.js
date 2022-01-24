import React, { useState, useContext, useEffect } from "react";
//Router
import { BrowserRouter as Router } from "react-router-dom";
//Components
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Background from "./components/Background";
//Web3
import { ethers } from "ethers";
//Context
import { AppContext } from "./index";
//The Graph
import { useQuery } from "@apollo/client";
//Utils
import { GET_TREASURY_EVENTS } from "./utils/graphQueries";
import {
  timeConverter,
  nameHelper,
  timerHelper,
  payoutTimerHelper,
  activeHelper,
} from "./utils/helpers";

export const EventContext = React.createContext();

function App() {
  //Component State
  const [currAddr, setCurrAddr] = useState("");
  const [signer, setSigner] = useState({});
  const [treasuryIssued, setTreasuryIssued] = useState(null);
  const [treasuryBought, setTreasuryBought] = useState(null);
  const [treasuryPaid, setTreasuryPaid] = useState(null);
  //Context
  const data = useContext(AppContext);
  //Global Functions
  //Listening for changes in ChainId (Mainnet/Rinkeby/Others)
  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
  //Listening for changes in Metamask Accounts
  window.ethereum.on("accountsChanged", (accounts) => {
    setCurrAddr(ethers.utils.getAddress(accounts[0]));
    const signerFromProvider = data.provider.getSigner();
    setSigner(signerFromProvider);
  });
  //Global Variables
  const treasuryObject = {
    issued: treasuryIssued,
    bought: treasuryBought,
    paid: treasuryPaid,
  };

  //Graph Querying
  const treasuryEvents = useQuery(GET_TREASURY_EVENTS, {
    fetchPolicy: "network-only",
    pollInterval: 5000,
  });
  //useEffect for formatting graphData
  useEffect(() => {
    if (!treasuryEvents.data) return;

    const issuedArray = [];
    const boughtArray = [];
    const paidArray = [];

    treasuryEvents.data.treasuryIssuedEntities &&
      treasuryEvents.data.treasuryIssuedEntities.forEach((entity) => {
        let clone = JSON.parse(JSON.stringify(entity));
        clone.durationSeconds = clone.duration;
        clone.duration = timeConverter(clone.duration);
        clone.maxAmount = `${ethers.utils.formatEther(clone.maxAmount)} TRB`;
        clone.totalLocked = `${ethers.utils.formatEther(
          clone.totalLocked
        )} TRB`;
        clone.rate = `${clone.rate / 100}%`;
        clone.treasuryName = nameHelper(clone.dateStarted);
        clone.payoutDate = timerHelper(
          clone.dateStarted,
          clone.durationSeconds
        );
        clone.active = activeHelper(clone.dateStarted, clone.durationSeconds);
        issuedArray.push(clone);
      });
    treasuryEvents.data.treasuryPurchasedEntities &&
      treasuryEvents.data.treasuryPurchasedEntities.forEach((entity) => {
        let clone = JSON.parse(JSON.stringify(entity));
        clone.durationSeconds = clone.duration;
        clone.duration = timeConverter(clone.duration);
        clone.maxAmount = `${ethers.utils.formatEther(clone.maxAmount)} TRB`;
        clone.totalLocked = `${ethers.utils.formatEther(
          clone.totalLocked
        )} TRB`;
        clone.rate = `${clone.rate / 100}%`;
        clone.treasuryName = nameHelper(clone.dateStarted);
        clone.amountBought = `${ethers.utils.formatEther(
          clone.amountBought
        )} TRB`;
        clone.investor = ethers.utils.getAddress(clone.investor);
        clone.payoutDate = timerHelper(
          clone.dateStarted,
          clone.durationSeconds
        );
        boughtArray.push(clone);
      });
    treasuryEvents.data.treasuryPaidEntities &&
      treasuryEvents.data.treasuryPaidEntities.forEach((entity) => {
        let clone = JSON.parse(JSON.stringify(entity));
        clone.duration = timeConverter(clone.duration);
        clone.maxAmount = `${ethers.utils.formatEther(clone.maxAmount)} TRB`;
        clone.totalLocked = `${ethers.utils.formatEther(
          clone.totalLocked
        )} TRB`;
        clone.rate = `${clone.rate / 100}%`;
        clone.amountPaid = `${clone.amountPaid} TRB`;
        clone.investor = ethers.utils.getAddress(clone.investor);
        clone.treasuryName = nameHelper(clone.dateStarted);
        clone.datePaid = payoutTimerHelper(clone.timestamp);
        paidArray.push(clone);
      });

    setTreasuryIssued(issuedArray);
    setTreasuryBought(boughtArray);
    setTreasuryPaid(paidArray);

    return () => {
      setTreasuryIssued(null);
      setTreasuryBought(null);
      setTreasuryPaid(null);
    };
  }, [
    data.chainId,
    currAddr,
    treasuryEvents.data,
    treasuryEvents.loading,
    treasuryEvents.error,
  ]);

  return (
    <EventContext.Provider value={treasuryObject}>
      <div className="App">
        <Router>
          <Background />
          <Nav currAddr={currAddr} />
          <Hero currAddr={currAddr} signer={signer} />
          <Footer />
        </Router>
      </div>
    </EventContext.Provider>
  );
}

export default App;

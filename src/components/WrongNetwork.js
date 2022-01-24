import React from "react";
import "../styles/WrongNetwork.css";
import { ReactComponent as Tellor } from "../assets/Tellor_TRB.svg";

function WrongNetwork() {
  //Listening for changes in ChainId (Mainnet/Rinkeby/Others)
  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
  return (
    <div className="WrongNetwork__Container">
      <Tellor className="WrongNetwork__Swoosh" />
      <h1>Currently this app supports the following networks: </h1>
      <h1>Mainnet</h1>
      <h1>Rinkeby</h1>
      <h1>Ropsten</h1>
      <h1>
        Please use MetaMask to change to one of these networks. Thank you!
      </h1>
    </div>
  );
}

export default WrongNetwork;

import React from "react";
import "../styles/TxnModal.css";
import { ReactComponent as Close } from "../assets/CloseX.svg";
import { truncateAddr } from "../utils/helpers";

function TxnModal({ chainId, address, bought, setBought, txnHash }) {
  const closeModal = () => {
    setBought(false);
  };

  return (
    <div className="TxnModal" style={{ display: bought ? "flex" : "none" }}>
      <div className="TxnModal__Content">
        <div className="TxnModal__Exit">
          <Close className="TxnModal__ExitIcon" onClick={closeModal} />
        </div>
        <div className="TxnModal__Message">
          <h1>
            {address
              ? `Thank you for interacting with Tellor Treasuries, ${truncateAddr(
                  address
                )}!`
              : "Thank you for interacting with Tellor Treasuries!"}
          </h1>
          <p>To view your transaction on etherscan, click below:</p>
          {txnHash ? (
            chainId === "Mainnet" ? (
              <a
                href={`https://etherscan.io/tx/${txnHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >{`https://etherscan.io/tx/${txnHash}`}</a>
            ) : chainId === "Rinkeby" ? (
              <a
                href={`https://rinkeby.etherscan.io/tx/${txnHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >{`https://rinkeby.etherscan.io/tx/${txnHash}`}</a>
            ) : (
              <a
                href={`https://ropsten.etherscan.io/tx/${txnHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >{`https://ropsten.etherscan.io/tx/${txnHash}`}</a>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TxnModal;

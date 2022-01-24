import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WrongNetwork from "./components/WrongNetwork";
import Loader from "./components/Loader";
import PleaseConnect from "./components/PleaseConnect";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
//Graph
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
//Utils
import { chains } from "./utils/chains";

const tellorGovMainnet = "0x51d4088d4EeE00Ae4c55f46E0673e9997121DB00";
const tellorGovRinkeby = "0xA64Bb0078eB80c97484f3f09Adb47b9B73CBcA00";
export const AppContext = React.createContext();

if (typeof window.ethereum !== "undefined") {
  detectEthereumProvider()
    .then((res) => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      let appContext = {
        chainId: "",
        currentAddress: "",
        provider: provider,
        signer: signer,
        tellorGovMainnet: tellorGovMainnet,
        tellorGovRinkeby: tellorGovRinkeby,
        etherscanLink: "",
        contractAddress: "",
      };
      //Apollo Clients
      let clientM = new ApolloClient({
        uri: chains[1].subgraphURL,
        //Look into what InMemoryCache does
        cache: new InMemoryCache(),
      });
      let clientRop = new ApolloClient({
        uri: chains[3].subgraphURL,
        //Look into what InMemoryCache does
        cache: new InMemoryCache(),
      });
      let clientRink = new ApolloClient({
        uri: chains[4].subgraphURL,
        //Look into what InMemoryCache does
        cache: new InMemoryCache(),
      });

      if (res.chainId === "0x1") {
        appContext.chainId = "Mainnet";
        appContext.currentAddress = ethers.utils.getAddress(
          res.selectedAddress
        );
        appContext.contractAddress =
          "0x3b0f3eaEFaAc9f8F7FDe406919ecEb5270fE0607";
        appContext.etherscanLink =
          "https://etherscan.io/address/0x3b0f3eaEFaAc9f8F7FDe406919ecEb5270fE0607";

        ReactDOM.render(
          <ApolloProvider client={clientM}>
            <AppContext.Provider value={appContext}>
              <App />
            </AppContext.Provider>
          </ApolloProvider>,
          document.getElementById("root")
        );
      } else if (res.chainId === "0x4") {
        appContext.chainId = "Rinkeby";
        appContext.currentAddress = ethers.utils.getAddress(
          res.selectedAddress
        );
        appContext.contractAddress =
          "0x7d69B996dee32956908f8876cE42bA09808308EA";
        appContext.etherscanLink =
          "https://rinkeby.etherscan.io/address/0x7d69b996dee32956908f8876ce42ba09808308ea";

        ReactDOM.render(
          <ApolloProvider client={clientRink}>
            <AppContext.Provider value={appContext}>
              <App />
            </AppContext.Provider>
          </ApolloProvider>,
          document.getElementById("root")
        );
      } else if (res.chainId === "0x3") {
        appContext.chainId = "Ropsten";
        appContext.currentAddress = ethers.utils.getAddress(
          res.selectedAddress
        );
        appContext.contractAddress =
          "0xb7C38be763D1eebcBF23F99678507ca4621448A0";
        appContext.etherscanLink =
          "https://ropsten.etherscan.io/address/0xb7C38be763D1eebcBF23F99678507ca4621448A0";

        ReactDOM.render(
          <ApolloProvider client={clientRop}>
            <AppContext.Provider value={appContext}>
              <App />
            </AppContext.Provider>
          </ApolloProvider>,
          document.getElementById("root")
        );
      } else if (res.chainId === null) {
        ReactDOM.render(<Loader />, document.getElementById("root"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        ReactDOM.render(<WrongNetwork />, document.getElementById("root"));
      }
    })
    .catch((err) => {
      console.log("MetaMask Error: ", err);
      ReactDOM.render(<PleaseConnect />, document.getElementById("root"));
    });
} else {
  window.alert("Please install MetaMask");
  window.location.assign("https://metamask.io/");
}

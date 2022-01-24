import React, { useState, useEffect, useContext } from "react";
import "../styles/BuyModal.css";
import { ReactComponent as Close } from "../assets/CloseX.svg";
import * as yup from "yup";
import { formSchema } from "./global/BuyModalSchema";
//Context
import { AppContext } from "../index";
//Web3
import { ethers } from "ethers";
//Utils
import TESTTellorTreasuryABI from "../utils/TESTTellorTreasuryABI.json";
import TellorTreasuryABI from "../utils/TellorTreasuryABI.json";

let initialFormValues = {
  amount: "",
};

let initialErrorValues = {
  amount: "",
};

function BuyModal({
  signer,
  buying,
  selected,
  setBuying,
  setErrMessage,
  setLoading,
  setTxnHash,
  setBought,
}) {
  //Component State
  const [form, setForm] = useState(initialFormValues);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [maxAmount, setMaxAmount] = useState(null);
  const [amountLeft, setAmountLeft] = useState(null);
  //Setting Form Errors
  const [errors, setErrors] = useState(initialErrorValues);
  //Context
  const appData = useContext(AppContext);

  //useEffect for comparing values from selected treasury
  //used for form validation
  useEffect(() => {
    if (!selected) return;
    let max = parseInt(selected.maxAmount.split(".")[0]);
    let totalLocked = parseInt(selected.totalLocked.split(".")[0]);
    let left = Math.floor(max - totalLocked);
    setMaxAmount(max);
    setAmountLeft(left);
    return () => {
      setMaxAmount(null);
      setAmountLeft(null);
    };
  }, [selected]);
  //Form Validation
  const validateFormChange = (e) => {
    e.persist();
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        if (parseInt(e.target.value) > maxAmount) {
          setErrors({
            ...errors,
            [e.target
              .name]: `Cannot exceed max treasury amount of ${selected.maxAmount}`,
          });
        } else if (parseInt(e.target.value) > amountLeft) {
          setErrors({
            ...errors,
            [e.target
              .name]: `Sorry, only ${amountLeft} TRB left on this Treasury`,
          });
        } else {
          setErrors({
            ...errors,
            [e.target.name]: "",
          });
        }
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };
  //Form Validation useEffect
  useEffect(() => {
    formSchema.isValid(form).then((valid) => setButtonDisabled(!valid));
  }, [form]);

  //Function Handlers
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    validateFormChange(event);
  };
  const handleClose = () => {
    setForm(initialFormValues);
    setErrors(initialErrorValues);
    setBuying(false);
  };
  const handleBuy = (event) => {
    if (!appData) return;

    let contract;
    let abi;

    if (appData.chainId === "Mainnet") {
      abi = TellorTreasuryABI;
      contract = new ethers.Contract(
        appData.contractAddress,
        abi,
        Object.keys(signer) > 0 ? signer : appData.signer
      );

      if (event.totalLocked < event.maxAmount) {
        setLoading(true);
        setBuying(false);
        try {
          contract
            .buyTreasury(event.treasuryId, ethers.utils.parseEther(form.amount))
            .then((res) => {
              setLoading(false);
              setTxnHash(res.hash);
              setBought(true);
              setForm(initialFormValues);
              setErrors(initialErrorValues);
            })
            .catch((err) => {
              //console.log("MetaMask Txn Err: ", err);
              setLoading(false);
              setErrMessage(err.message);
            });
        } catch (err) {
          // console.log("ERR::: ", err.message);
          setErrMessage(err.message);
        }
      } else {
        setErrMessage("We're sorry, this treasury is fully bought up.");
      }
    } else if (appData.chainId === "Rinkeby") {
      abi = TESTTellorTreasuryABI;
      contract = new ethers.Contract(
        appData.contractAddress,
        abi,
        Object.keys(signer) > 0 ? signer : appData.signer
      );

      if (event.totalLocked < event.maxAmount) {
        setLoading(true);
        setBuying(false);
        try {
          contract
            .buyTreasury(event.treasuryId, ethers.utils.parseEther(form.amount))
            .then((res) => {
              setLoading(false);
              setTxnHash(res.hash);
              setBought(true);
              setForm(initialFormValues);
              setErrors(initialErrorValues);
            })
            .catch((err) => {
              //console.log("MetaMask Txn Err: ", err);
              setLoading(false);
              setErrMessage(err.message);
            });
        } catch (err) {
          // console.log("ERR::: ", err.message);
          setErrMessage(err.message);
        }
      } else {
        setErrMessage("We're sorry, this treasury is fully bought up.");
      }
    } else if (appData.chainId === "Ropsten") {
      abi = TESTTellorTreasuryABI;
      contract = new ethers.Contract(
        appData.contractAddress,
        abi,
        Object.keys(signer) > 0 ? signer : appData.signer
      );

      if (event.totalLocked < event.maxAmount) {
        setLoading(true);
        setBuying(false);
        try {
          contract
            .buyTreasury(event.treasuryId, ethers.utils.parseEther(form.amount))
            .then((res) => {
              setLoading(false);
              setTxnHash(res.hash);
              setBought(true);
              setForm(initialFormValues);
              setErrors(initialErrorValues);
            })
            .catch((err) => {
              //console.log("MetaMask Txn Err: ", err);
              setLoading(false);
              setErrMessage(err.message);
            });
        } catch (err) {
          // console.log("ERR::: ", err.message);
          setErrMessage(err.message);
        }
      } else {
        setErrMessage("We're sorry, this treasury is fully bought up.");
      }
    }
  };

  return (
    <div className="BuyModal" style={{ display: buying ? "flex" : "none" }}>
      <div className="BuyModal__Content">
        <div className="BuyModal__Exit">
          <Close className="BuyModal__ExitIcon" onClick={handleClose} />
        </div>
        <div className="BuyModal__Message">
          <h1>
            Enter the amount of TRB you'd like to enter into this Tellor
            Treasury.
          </h1>
          <h2>(No need to add extra zeros)</h2>
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            type="text"
          />
          <h5>{errors.amount}</h5>
          <button
            disabled={buttonDisabled}
            className="Global__Button"
            onClick={() => handleBuy(selected)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyModal;

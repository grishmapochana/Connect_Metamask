import "./index.css";
import { ethers } from "ethers";
import React, { useState } from "react";
import Contract from "./Contract";
import NFTConnect from "./NFTConnect";

const ConnectWallet = () => {
  const [defaultAccount, setDefaultAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [chainId_, setChainId] = useState("");
  const [transactionHash, settransactionHash] = useState("");
  const { ethereum } = window;
  const transactionParameters = {
    nonce: "0x00",
    gasPrice: "0x09184e72a000",
    gas: "0x2710",
    to: "0x2226699B4430Cbb32b366a1f2F366e9227703a86",
    from: ethereum.selectedAddress,
    value: "0x00",
    data: "",
    chainId: "",
  };
  async function ConnectAccount() {
    try {
      if (ethereum) {
        const data = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [data[0], "latest"],
        });
        const chainId = await ethereum.request({ method: "eth_chainId" });

        setUserBalance(ethers.utils.formatEther(balance));
        setDefaultAccount(data[0]);
        setChainId(parseInt(chainId));
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  const onChainChanged = (chainId_) => {
    console.log(parseInt(chainId_));
    window.location.reload();
  };
  const sendCurrency = async () => {
    try {
      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      settransactionHash(txHash);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  ethereum.on("accountsChanged", ConnectAccount);
  ethereum.on("chainChanged", onChainChanged);
  return (
    <div className="app-container">
      <div className="container">
        <button className="connect-button" onClick={ConnectAccount}>
          Connect Wallet
        </button>
        <h4>Current Chain:{chainId_}</h4>
        <h4>Address: {defaultAccount}</h4>
        <h4>Balance: {userBalance}</h4>
        <button className="connect-button" onClick={sendCurrency}>
          Send Currency
        </button>
        {transactionHash && <h4>{transactionHash}</h4>}
        {errorMessage && <h6>{errorMessage}</h6>}
      </div>
      <div className="contract-container ">
        <Contract />
      </div>
      <div className="contract-container">
        <NFTConnect wallet={defaultAccount} />
      </div>
    </div>
  );
};

export default ConnectWallet;

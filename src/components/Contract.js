import { useState } from "react";
import { ethers } from "ethers";
import ABI from "./erc20abi.json";

//0xC817F6527f52A18FA1F298FCaB823aFdFF192Ea2
//0xB5A3Dac781D4707a9e972541d9b2A951999E7ABB

const Contract = () => {
  const [ContractAddress, setContractAdderss] = useState("");
  const [result, setResult] = useState("");
  const [address, setAddress] = useState("");
  const [spender, setSpender] = useState("");
  const [value, setValue] = useState("");

  const getContractAddress = (event) => {
    setContractAdderss(event.target.value);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const erc20 = new ethers.Contract(ContractAddress, ABI, signer);
  console.log(erc20);

  const getTotalSupply = async () => {
    try {
      const totalSupply = await erc20.totalSupply();
      setResult(ethers.utils.formatEther(totalSupply));
    } catch (e) {
      setResult(e.code);
    }
  };
  const getSymbol = async () => {
    try {
      const symbol = await erc20.symbol();
      setResult(symbol);
    } catch (e) {
      setResult(e.code + "enter contract address");
    }
  };
  const getTokenName = async () => {
    try {
      const tokenname = await erc20.name();
      setResult(tokenname);
    } catch (e) {
      setResult(
        e.code + "enter contract address/connect metamask/check chain network"
      );
    }
  };
  const getOwner = async () => {
    try {
      const owner = await erc20.owner();
      setResult(owner);
    } catch (e) {
      setResult(e.code);
    }
  };
  const getDecimals = async () => {
    try {
      const decimals = await erc20.decimals();
      setResult(decimals);
    } catch (e) {
      setResult(e.code);
    }
  };
  const getBalance = async () => {
    try {
      const balance = await erc20.balanceOf(address);
      setResult(ethers.utils.formatEther(balance));
    } catch (e) {
      setResult(e.code);
    }
  };
  const getAllowance = async () => {
    try {
      const allowance = await erc20.allowance(address, spender);
      setResult(ethers.utils.formatEther(allowance));
    } catch (e) {
      setResult(e.code);
    }
  };
  const getApprove = async () => {
    try {
      await erc20.approve(spender, value);
      setResult("transaction successfull");
    } catch (e) {
      setResult("Transaction unsuccessfull :" + e.code);
    }
  };
  const getTransfer = async () => {
    try {
      await erc20.transfer(spender, value);
      setResult("transaction successfull ");
    } catch (e) {
      setResult("Transaction unsuccessfull :" + e.code);
    }
  };
  const getIncreasedAllowance = async () => {
    try {
      await erc20.increaseAllowance(spender, value);
      setResult("transaction successfull");
    } catch (e) {
      setResult("Transaction unsuccessfull :" + e.code);
    }
  };
  const getDecreasedAllowance = async () => {
    try {
      // console.log({ value });
      const val = ethers.utils.parseEther(value);
      await erc20.decreaseAllowance(spender, val);
      setResult("transaction successfull");
    } catch (e) {
      setResult("Transaction unsuccessfull :" + e.code);
    }
  };
  const getMint = async () => {
    try {
      await erc20.mint(address, value);
      setResult("transaction successfull");
    } catch (e) {
      setResult("Transaction unsuccessfull:" + e.code);
    }
  };
  const getTransferFrom = async () => {
    try {
      await erc20.transferFrom(address, spender, value);
      setResult("Transaction successfull");
    } catch (e) {
      setResult("Transaction unsuccessfull:" + e.code);
    }
  };
  const getTransferOwnerShip = async () => {
    try {
      await erc20.transferOwnership(address);
      setResult("transaction successfull");
    } catch (e) {
      setResult("Transaction unsuccessfull  :" + e.code);
    }
  };

  return (
    <div>
      <label htmlFor="contractaddress">
        <h4>ContractAddress:</h4>
      </label>
      <input
        id="contractaddress"
        className="input"
        type="text"
        onChange={getContractAddress}
      />
      <table>
        <tbody>
          <tr>
            <td>
              <button className="contract-getbutton" onClick={getTotalSupply}>
                Total Supply
              </button>
            </td>
            <td>
              <button className="contract-getbutton" onClick={getSymbol}>
                Token Symbol
              </button>
            </td>
            <td>
              <button className="contract-getbutton" onClick={getTokenName}>
                Token Name
              </button>
            </td>
            <td>
              <button className="contract-getbutton" onClick={getOwner}>
                Owner
              </button>
            </td>
            <td>
              <button className="contract-getbutton" onClick={getDecimals}>
                Decimals
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="balance">
                <p>Balance</p>
              </label>
            </td>
            <td>
              <input
                id="balance"
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </td>
            <td>
              <button className="contract-getbutton" onClick={getBalance}>
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="allowance">
                <p>allowance</p>
              </label>
            </td>
            <td>
              <input
                id="allowance"
                type="text"
                placeholder="owner"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                id="spender"
                type="text"
                placeholder="spender"
                onChange={(e) => setSpender(e.target.value)}
              ></input>
            </td>
            <td>
              <button className="contract-getbutton" onClick={getAllowance}>
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="approve">
                <p>approve</p>
              </label>
            </td>
            <td>
              <input
                id="approve"
                type="text"
                placeholder="address"
                onChange={(e) => setSpender(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                id="spender"
                type="text"
                placeholder="allowance(uint256)"
                onChange={(e) => setValue(e.target.value)}
              ></input>
            </td>
            <td>
              <button className="contract-postbutton" onClick={getApprove}>
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="transfer">
                <p>Transfer</p>
              </label>
            </td>
            <td>
              <input
                id="transfer"
                type="text"
                placeholder="address"
                onChange={(e) => setSpender(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                id="spender"
                type="text"
                placeholder="amount(uint256)"
                onChange={(e) => setValue(e.target.value)}
              ></input>
            </td>
            <td>
              <button className="contract-postbutton" onClick={getTransfer}>
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="increaseallowance">
                <p>Increase Allowance</p>
              </label>
            </td>
            <td>
              <input
                id="increaseallowance"
                type="text"
                placeholder="spender"
                onChange={(e) => setSpender(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                id="value"
                type="text"
                placeholder="value to increase"
                onChange={(e) => setValue(e.target.value)}
              ></input>
            </td>
            <td>
              <button
                className="contract-postbutton"
                onClick={getIncreasedAllowance}
              >
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="decreaseallowance">
                <p>Decrease Allowance</p>
              </label>
            </td>
            <td>
              <input
                id="decreaseallowance"
                type="text"
                placeholder="spender"
                onChange={(e) => setSpender(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                id="value"
                type="text"
                placeholder="value to decrease"
                onChange={(e) => setValue(e.target.value)}
              ></input>
            </td>
            <td>
              <button
                className="contract-postbutton"
                onClick={getDecreasedAllowance}
              >
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="mint">
                <p>Mint</p>
              </label>
            </td>
            <td>
              <input
                id="mint"
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                id="value"
                type="text"
                placeholder="value"
                onChange={(e) => setValue(e.target.value)}
              ></input>
            </td>
            <td>
              <button className="contract-postbutton" onClick={getMint}>
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="transferfrom">
                <p>Transfer From</p>
              </label>
            </td>
            <td>
              <input
                id="transferfrom"
                type="text"
                placeholder="from"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                id="transferfrom"
                type="text"
                placeholder="to"
                onChange={(e) => setSpender(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                id="value"
                type="text"
                placeholder="value"
                onChange={(e) => setValue(e.target.value)}
              ></input>
            </td>
            <td>
              <button className="contract-postbutton" onClick={getTransferFrom}>
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="transferOwner">
                <p>Transfer OwnerShip</p>
              </label>
            </td>
            <td>
              <input
                id="transferOwner"
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </td>
            <td>
              <button
                className="contract-postbutton"
                onClick={getTransferOwnerShip}
              >
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {result && <h4>{result}</h4>}
    </div>
  );
};
export default Contract;

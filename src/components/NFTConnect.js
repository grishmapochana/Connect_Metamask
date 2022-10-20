import { useState } from "react";
import Web3 from "web3";
import NFT from "./erc720abi.json";
import "./Contract.css";
//https://testnets-api.opensea.io/api/v1
//"0x9f961F1a49b4DB02Ae266A8f04102638e1DC5E97"
// "https://testnets-api.opensea.io/api/v1/items/byOwner/?owner=ETHEREUM:0xC817F6527f52A18FA1F298FCaB823aFdFF192Ea2"

const NFTConnect = (props) => {
  const { wallet } = props;
  const [nftContractAddress, setnftContractAddress] = useState("");
  const [error, setError] = useState("");

  const getNFTContractAddress = (event) => {
    try {
      setnftContractAddress(event.target.value);
    } catch (e) {
      setError(e.message);
    }
  };

  const getNFT = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(NFT, nftContractAddress);
    contract.defaultAccount = wallet;
    const nft = await contract.methods.balanceOf(wallet).call();
    // console.log(nft);
    console.log(contract.methods);

    for (let i = 0; i < nft; i++) {
      const tokenId = await contract.methods
        .tokenOfOwnerByIndex(wallet, i)
        .call();
      // console.log(tokenId);

      let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call();

      if (tokenMetadataURI.startsWith("ipfs://")) {
        tokenMetadataURI = `https://ipfs.io/ipfs/${
          tokenMetadataURI.split("ipfs://")[1]
        }`;
      }

      const tokenMetadata = await fetch(tokenMetadataURI).then((response) =>
        response.json()
      );
      console.log(tokenMetadata);
    }
  };

  return (
    <div>
      <label htmlFor="nft">Contract Address</label>
      <input
        className="input"
        type="text"
        id="nft"
        onChange={getNFTContractAddress}
      />
      <br></br>
      <button className="button" onClick={getNFT}>
        get NFT's
      </button>

      {error && <h4>{error}</h4>}
    </div>
  );
};
export default NFTConnect;

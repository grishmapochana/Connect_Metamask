// try {
//   if (!(ethereum && ethereum.isMetaMask)) {
//     // setErrorMessage(true);
//   }
// } catch (e) {
//   console.log(e);
// }
// console.log(data);
// console.log("Balance:", ethers.utils.formatEther(balance));
// balance = ethers.utils.formatEther(balance);
// console.log(parseInt(chainId));
// const web3 = new Web3(window.ethereum);
//   const contract = new web3.eth.Contract(
//     NFT,
//     "0x9f961F1a49b4DB02Ae266A8f04102638e1DC5E97"
//   );
//   const addressArr = await window.ethereum.request({
//     method: "eth_requestAccounts",
//   });
//   contract.defaultAccount = addressArr[0];
//   console.log(contract);
//   console.log(erc720);
// import SpacePunksTokenABI from "./space_punks_token.js"

// document.addEventListener("DOMContentLoaded", () => {
//   const web3 = new Web3(window.ethereum)

//   document.getElementById("load_button").addEventListener("click", async () => {
//     const contract = new web3.eth.Contract(SpacePunksTokenABI, "0x45DB714f24f5A313569c41683047f1d49e78Ba07")
//     const walletAddress = document.getElementById("wallet_address").value
//     contract.defaultAccount = walletAddress
//     const spacePunksBalance = await contract.methods.balanceOf(walletAddress).call()

//     document.getElementById("nfts").innerHTML = ""

//     for(let i = 0; i < spacePunksBalance; i++) {
//       const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call()

//       let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()

//       if (tokenMetadataURI.startsWith("ipfs://")) {
//         tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
//       }

//       const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())

//       const spacePunkTokenElement = document.getElementById("nft_template").content.cloneNode(true)
//       spacePunkTokenElement.querySelector("h1").innerText = tokenMetadata["name"]
//       spacePunkTokenElement.querySelector("a").href = `https://opensea.io/assets/0x45db714f24f5a313569c41683047f1d49e78ba07/${tokenId}`
//       spacePunkTokenElement.querySelector("img").src = tokenMetadata["image"]
//       spacePunkTokenElement.querySelector("img").alt = tokenMetadata["description"]

//       document.getElementById("nfts").append(spacePunkTokenElement)
//     }
//   })
// })

// require("dotenv").config();

// const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;


// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// const web3 = createAlchemyWeb3(API_URL);

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// console.log(PUBLIC_KEY)

// const contractAddress = "0xA4518C234ae62554380E9f78483A9af1BF5E0AFA";
// const myNFTContract = new web3.eth.Contract(contract.abi, contractAddress);

// async function minNFT(tokenURI) {
//   const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

//   const tx = {
//     from: PUBLIC_KEY,
//     to: contractAddress,
//     nonce: nonce,
//     gas: 500000,
//     data: myNFTContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI,
//   };

//   const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
//   signPromise
//     .then((signedTx) => {
//       web3.eth.sendSignedTransaction(
//         signedTx.rawTransaction,
//         function (err, hash) {
//           if (!err) {
//             console.log(
//               "The hash of your transaction is: ",
//               hash,
//               "\nCheck Alchemy's Mempool to view the status of your transaction!"
//             );
//           } else {
//             console.log(
//               "Something went wrong when submitting your transaction:",
//               err
//             );
//           }
//         }
//       );
//     })
//     .catch((err) => {
//       console.log(" Promise failed:", err);
//     });
// }

// minNFT("https://gateway.pinata.cloud/ipfs/QmSLBS7DtSi5xCSACA1LsdjqGr7gcMPUfeK2Ew85jLydKE");


require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// console.log(JSON.stringify(contract.abi));

const contractAddress = "0xA4518C234ae62554380E9f78483A9af1BF5E0AFA";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmSLBS7DtSi5xCSACA1LsdjqGr7gcMPUfeK2Ew85jLydKE"
);

//0xb40145b31610eb02976f93f9cbdf748176c1cd85b2af55f7d19bba0ca3298d82
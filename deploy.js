const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  // compile
  // add binary
  // add abi
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // const encryptedJsonKey = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJsonKey,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = await wallet.connect(provider);

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_FirstContract.bin",
    "utf8"
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_FirstContract.abi", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying please wait...");
  const contract = await contractFactory.deploy();

  console.log(`Contract address: ${contract.address}`);

  const currentFavouriteNumber = await contract.favouriteNumber("Vlad");
  console.log(
    `Current favourite number is ${currentFavouriteNumber.toString()}`
  );

  const transactionResponse = await contract.addPerson("10", "Vlad");
  const transactionReceipt = await transactionResponse.wait(1);

  const newFavouriteNumber = await contract.favouriteNumber("Vlad");
  console.log(`Now favourite number is ${newFavouriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    ProcessingInstruction.exit(1);
  });

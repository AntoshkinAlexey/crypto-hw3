const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { API_KEY } = require("./cfg.js");

const alchemy = createAlchemyWeb3(API_KEY);
const contractAddr = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const contract = require("./../contracts/artifacts/Storage.json");
stepContract = new alchemy.eth.Contract(contract.abi, contractAddr);

stepContract.methods.set(contractAddr, 10, true, "first").call();
stepContract.methods.remove(contractAddr).call();

async function getContractEvents(_address, _filter) {
  stepContract.getPastEvents(eventName='logSet', {
    address: _address,
    filter: _filter,
    fromBlock: 0,
    topics: [],
    toBlock: "latest"
  }).then(function(events) {
    console.log(events);
  });
}

async function viewContractStorage(_address, position) {
  try {
    const slotValue = await alchemy.eth.getStorageAt(contractAddr, position);
    console.log(slotValue);
  } catch (error) {
    console.error(error);
  }
}

getContractEvents(contractAddr, {});
viewContractStorage(contractAddr, "0x0");


const contractAddress = 0x9eBC6b649Ffd603c5435438CA944cc6Ca3350b52;
const contractABI = [
  // Minimal ABI to interact
  {
    "inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],
    "name":"sendTokens",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"_addr","type":"address"}],
    "name":"getBalance",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
];

let provider, signer, contract;

document.getElementById("connectWallet").onclick = async () => {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    document.getElementById("walletAddress").innerText = await signer.getAddress();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    alert("Please install MetaMask");
  }
};

document.getElementById("checkBalance").onclick = async () => {
  if (contract) {
    const addr = await signer.getAddress();
    const balance = await contract.getBalance(addr);
    document.getElementById("balance").innerText = balance.toString();
  }
};

document.getElementById("sendTokens").onclick = async () => {
  const to = document.getElementById("recipient").value;
  const amount = document.getElementById("amount").value;
  if (contract && to && amount) {
    const tx = await contract.sendTokens(to, amount);
    await tx.wait();
    alert("Tokens sent!");
  }
};

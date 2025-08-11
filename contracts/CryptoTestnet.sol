// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CryptoTestnet {
    string public name = "CryptoTestnet";
    address public owner;

    mapping(address => uint256) public balances;

    event TokensMinted(address indexed to, uint256 amount);
    event TokensSent(address indexed from, address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        balances[_to] += _amount;
        emit TokensMinted(_to, _amount);
    }

    function sendTokens(address _to, uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        emit TokensSent(msg.sender, _to, _amount);
    }

    function getBalance(address _addr) public view returns (uint256) {
        return balances[_addr];
    }
}

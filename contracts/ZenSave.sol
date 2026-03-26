// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ZenSave {

    // Guarda cuánto depositó cada usuario
    mapping(address => uint256) public balances;
    
    // Registro de cada depósito para el historial
    event Deposited(address indexed user, uint256 amount, uint256 timestamp);
    event Withdrawn(address indexed user, uint256 amount);

    // El usuario deposita RBTC (el "peaje del ahorro")
    function deposit() external payable {
        require(msg.value > 0, "Debes enviar algo de RBTC");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value, block.timestamp);
    }

    // El usuario puede retirar lo que ahorró
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Saldo insuficiente");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Ver el balance de cualquier address
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}
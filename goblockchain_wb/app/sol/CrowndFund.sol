pragma solidity ^0.4.24;

import "./Ownable.sol";

contract CrownFund is Ownable {
    
    event tokenComprado(address comprador); 
    
    function() public payable {
        emit tokenComprado(msg.sender);
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function kill() public onlyOwner {
        selfdestruct(owner);
    }
    
}
pragma solidity ^0.4.24;
import "./Ownable.sol";

contract CrowndFund is Ownable {
    event tokenBought(address adr);
    
    function() public payable {
        emit tokenBought(msg.sender);
    }
    
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function kill() public onlyOwner {
        selfdestruct(owner);
    }
    
}
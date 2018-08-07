pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./Ownable.sol";

contract Event is Ownable {
    using SafeMath for uint256;
    enum State { Active, Closed }
    State public state;
    event Closed();
  
    event Payments(address indexed paying, uint256 weiAmount);
    event Withdrawn(address indexed paying, uint256 weiAmount);

    mapping(address => uint256) private payments;
    
    uint256 public eventPrice;
    string public name;
    string public date;
    
    constructor(uint256 _eventPrice, string _name, string _date) public {
        eventPrice = _eventPrice;
        name = _name;
        date = _date;
    }

    function payOf(address paying) public view returns (uint256) {
        return payments[paying];
    }

    function pay() public payable {
        require(state == State.Active);
        require(msg.value >= eventPrice);
        uint256 amount = msg.value;
        payments[msg.sender] = payments[msg.sender].add(amount);
        emit Payments(msg.sender, amount);
    }
  
    function close() public onlyOwner {
        require(state == State.Active);
        state = State.Closed;
        emit Closed();
    }
  
    function withdraw(address _paying) public onlyOwner {
        require(state == State.Closed);
        uint256 payment = payments[_paying];
        assert(address(this).balance >= payment);
        payments[_paying] = 0;
    
        _paying.transfer(payment);
        emit Withdrawn(_paying, payment);
    }
  
    function getBalance() public view returns(uint256 balance) {
        return address(this).balance;
    }
  
    function kill() public onlyOwner {
        require(state == State.Closed);
        selfdestruct(owner);
    }
}
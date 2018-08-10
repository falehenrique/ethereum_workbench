pragma solidity ^0.4.24;


import "./CrowndFund.sol";
import "./TokenClass.sol";

contract Person is TokenClass {
    address owner;

    //date of create
    uint public dateCreate;
    uint public identificationPerson;

    //name of person
    string public name;

    //variables to be validates
    string public email;

    //events
    event LogUpdateEmail(address _addressPerson, string _newEmail); 

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // constructor
    constructor (string _name, string _email) public {
        name = _name;
        email = _email;
        owner = msg.sender;
        dateCreate = now;
        identificationPerson = block.number+now;
        owner = msg.sender;
    }

    // change the email
    function changeEmail(string _newMail) public onlyOwner {
        email = _newMail;
        emit LogUpdateEmail(this, email);
    }
    
    function buyTokens(uint8 _qtd) public payable {

    }
}
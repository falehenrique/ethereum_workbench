pragma solidity 0.4.24;

contract PersonTeste {
    address public owner;
    
    uint public dataCreate;
    uint public identificationPerson;
    
    string public name;
    string public email;
    
    event LogUpdateEmail(address _addressPerson, string _newEmail);
    
    constructor(string _name, string _email) public {
        name = _name;
        email = _email;
        owner = msg.sender;
        dataCreate = now;
        identificationPerson = block.number + now;
    }
    
    modifier onlyOwner() {
        require (msg.sender == owner);
        _;
    }
    
    function changeEmail(string _email) public onlyOwner {
        email = _email;
        emit LogUpdateEmail(msg.sender, _email);
    }
}
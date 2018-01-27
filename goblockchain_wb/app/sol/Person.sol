pragma solidity ^0.4.18;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}

contract IPerson {
    
    function changeEmail(string _newMail) public;
    function sendValidationIdentity(address _addressPerson, bool _isValid) public;
    function validatorIdentity(address _contractPersonValidator, bool isValid) public;
}

contract Person is IPerson, Ownable {
    //date of create
    uint public dateCreate;
    uint identificationPerson;

    //name of person
    string public name;

    //variables to be validates
    string public email;
    mapping(bytes32 => bool) public isValidEmail;

    string public phone;
    int16 public identificationCellPhone;
    bool public isValidPhone;

    bytes32 public addressIPFSPhoto;
    mapping(address => bool) public isValidAddressIPFSPhoto;

    address[] public listCellPhoneValidator;
    mapping(address => bool) public mapCellPhoneValidator;

    //validator allowed
    mapping (address=>bool) listMapAddressValidator;

    //total personValidator
    int public totalPersonValid;
    int public totalPersonInvalid;

    //events
    event LogPersonValidator(address _contractPersonValidator, bool _isValid);
    event LogUpdateEmail(address _addressPerson, string _newEmail); 
    event LogUpdatePhoto(address _addressPerson, string _newEmail);
    event LogValidateCellPhone(address _owner, address _contractIdentity, string _phone, uint _identificationPerson);
    event LogValidateEmail(address _owner, address _contractIdentity, string _email, uint _identificationPerson);

    // constructor
    function Person(string _name, string _email, string _phone) public {
        name = _name;
        email = _email;
        phone = _phone;
        owner = msg.sender;
        dateCreate = now;
        identificationPerson = block.number+now;
        validateCellPhone(this, phone, identificationPerson);
        validateEmail(this, email, identificationPerson);
    }

    //modifiers to check is the address is a validator
    modifier onlyValidator(address _validator) {
        require(listMapAddressValidator[_validator]);
        _;
    }   

    function getEmail() public view returns(string _email) {
        return email;
    }

    // change the email
    function changeEmail(string _newMail) public onlyOwner {
        email = _newMail;
        LogUpdateEmail(this, email);
    }

    //add the validator
    function addValidator(address _validator) external onlyOwner {
        require(listMapAddressValidator[_validator]);
        listMapAddressValidator[_validator] = true;
    }
    
    function validateCellPhone(address _contractIdentity, string _phone, uint _identificationPerson) private onlyOwner {
        LogValidateCellPhone(owner, _contractIdentity, _phone, _identificationPerson);
    }
        
    function validateEmail(address _contractIdentity, string _email, uint _identificationPerson) private onlyOwner {
        LogValidateEmail(owner, _contractIdentity, _email, _identificationPerson);
    } 
    // set the cellphone identification
    // call in application mobile
    function validateCellPhone(int8 _identicationCellPhone, uint _randonNumber) private view onlyOwner returns(bool) {
        require(_identicationCellPhone > 0);
        require(_randonNumber > 0);
        require(_identicationCellPhone == identificationCellPhone);
        if (identificationPerson == _randonNumber) {
            return true;
        }
        return false;
    }  

    function sendValidationIdentity(address _addressPerson, bool _isValid) public onlyOwner {
        Person person = Person(_addressPerson);
        person.validatorIdentity(this, _isValid);
    }
    
    function validatorIdentity(address _contractPersonValidator, bool isValid) public {
        require(tx.origin != owner);
        require(address(msg.sender) != address(this));

        // Person person = Person(_contractPersonValidator);
        // require(person.isValidPhone());
        // require(person.identificationCellPhone() != identificationCellPhone);

        if (isValid) {
            totalPersonValid++;
        } else {
            totalPersonInvalid++;
        }
        LogPersonValidator(_contractPersonValidator, isValid);
    }
}
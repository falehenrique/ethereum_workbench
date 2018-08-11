pragma solidity ^0.4.24;

import "./StandardToken.sol";

contract TokenClass is StandardToken {

    string public constant name = "TokenClass";
    string public constant symbol = "CLS";
    uint8 public constant decimals = 18;
    
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));
    
    event tokenBought(address adr);
    
    CrownFund public crownFund;
    
    uint256 public tokenPrice;
    
    constructor(uint256 _tokenPrice) public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
        
        crownFund = new CrownFund();
        tokenPrice = _tokenPrice;
    }
    
    function comprarTokens(uint8 _qtd) public payable {
        require(_qtd > 0);
        require(msg.value > 0);
        require(msg.value == (_qtd * tokenPrice));
        
        balances[owner] = balances[owner].sub(_qtd);
        balances[msg.sender] = balances[msg.sender].add(_qtd);
        address(crownFund).transfer(msg.value);
        emit Transfer(owner, msg.sender, _qtd);
    }
}
//https://rinkeby.etherscan.io/address/0xbb4e7286850b3d66283e6bddb7115bee27b3844b
pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./Ownable.sol";

contract Event is Ownable {
    //biblioteca para trabaljhar com uint256 ( + - * /)
    using SafeMath for uint256;
    
    // enum para armazenar informações estáticas
    enum State { Active, Closed }
    State public state;
    
    // evento
    event Closed();
    event Payments(address indexed paying, uint256 weiAmount);
    event Withdrawn(address indexed paying, uint256 weiAmount);

    // objeto para armazenar chave e valor, exemplo: "enderecoPublico = valorPago"
    mapping(address => uint256) private payments;
    
    //tipo
    uint256 public eventPrice;
    string public name;
    string public date;
    
    // construtor, utilizado na geração do contrato ( instância)
    constructor(uint256 _eventPrice, string _name, string _date) public {
        eventPrice = _eventPrice;
        name = _name;
        date = _date;
    }

    // retorna a quantidade paga pelo pagador
    function payOf(address paying) public view returns (uint256) {
        return payments[paying];
    }

    // funç˜ão payable para receber o ticket
    function pay() public payable {
        require(state == State.Active);
        require(msg.value >= eventPrice);
        uint256 amount = msg.value;
        payments[msg.sender] = payments[msg.sender].add(amount);
        emit Payments(msg.sender, amount);
    }
  
    // função encerra o evento
    function close() public onlyOwner {
        require(state == State.Active);
        state = State.Closed;
        emit Closed();
    }
  
    // vou fazer o estorno para os presentes no evento
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
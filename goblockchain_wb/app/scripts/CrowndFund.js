var abi = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"comprador","type":"address"}],"name":"tokenComprado","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];

function getInstance() {
    let enderecoContratoFundo = $("#enderecoContratoFundo").val();

    let Contract = web3.eth.contract(abi);
    let instance = Contract.at(enderecoContratoFundo);
    return instance;
}

function carregarFundo() {
    let instance  = getInstance();
    instance.getBalance(function (error, result) {
        $("#saldo").val(result);
    });

    instance.owner(function (error, result) {
        $("#responsavel").val(result);
    });    
}


let abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"eventPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pay","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"date","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"close","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_paying","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"paying","type":"address"}],"name":"payOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_eventPrice","type":"uint256"},{"name":"_name","type":"string"},{"name":"_date","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"Closed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"paying","type":"address"},{"indexed":false,"name":"weiAmount","type":"uint256"}],"name":"Payments","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"paying","type":"address"},{"indexed":false,"name":"weiAmount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];

/**
 * Criar Evento
 */
$( "#criarEvento" ).click(function() {
var _eventPrice = $("#valorEvento").val();
var _name = $("#nomeEvento").val();
var _date = $("#dataEvento").val();
var eventContract = web3.eth.contract(abi);
var event = eventContract.new(
   _eventPrice,
   _name,
   _date,
   { 
     data: '0x608060405234801561001057600080fd5b5060405161082e38038061082e83398101604090815281516020808401519284015160008054600160a060020a03191633179055600283905592840180519294909301916100649160039190850190610081565b508051610078906004906020840190610081565b5050505061011c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100c257805160ff19168380011785556100ef565b828001600101855582156100ef579182015b828111156100ef5782518255916020019190600101906100d4565b506100fb9291506100ff565b5090565b61011991905b808211156100fb5760008155600101610105565b90565b6107038061012b6000396000f3006080604052600436106100b95763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100be57806312065fe0146101485780631a0deb861461016f5780631b9265b814610184578063323046b11461018e57806341c0e1b5146101a357806343d726d6146101b857806351cff8d9146101cd5780638a9610e3146101ee5780638da5cb5b1461020f578063c19d93fb14610240578063f2fde38b14610279575b600080fd5b3480156100ca57600080fd5b506100d361029a565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561010d5781810151838201526020016100f5565b50505050905090810190601f16801561013a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015457600080fd5b5061015d610328565b60408051918252519081900360200190f35b34801561017b57600080fd5b5061015d61032d565b61018c610333565b005b34801561019a57600080fd5b506100d36103d6565b3480156101af57600080fd5b5061018c610431565b3480156101c457600080fd5b5061018c61047a565b3480156101d957600080fd5b5061018c600160a060020a0360043516610501565b3480156101fa57600080fd5b5061015d600160a060020a03600435166105ea565b34801561021b57600080fd5b50610224610605565b60408051600160a060020a039092168252519081900360200190f35b34801561024c57600080fd5b50610255610614565b6040518082600181111561026557fe5b60ff16815260200191505060405180910390f35b34801561028557600080fd5b5061018c600160a060020a0360043516610624565b6003805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103205780601f106102f557610100808354040283529160200191610320565b820191906000526020600020905b81548152906001019060200180831161030357829003601f168201915b505050505081565b303190565b60025481565b60008060005460a060020a900460ff16600181111561034e57fe5b1461035857600080fd5b60025434101561036757600080fd5b5033600090815260016020526040902054349061038a908263ffffffff61064716565b33600081815260016020908152604091829020939093558051848152905191927f3d476ad1040b7c53f4279ee863698f162054d1882bf4f671d54cac6d550f4a8792918290030190a250565b6004805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103205780601f106102f557610100808354040283529160200191610320565b600054600160a060020a0316331461044857600080fd5b600160005460a060020a900460ff16600181111561046257fe5b1461046c57600080fd5b600054600160a060020a0316ff5b600054600160a060020a0316331461049157600080fd5b6000805460a060020a900460ff1660018111156104aa57fe5b146104b457600080fd5b6000805474ff0000000000000000000000000000000000000000191660a060020a1781556040517f1cdde67b72a90f19919ac732a437ac2f7a10fc128d28c2a6e525d89ce5cd9d3a9190a1565b60008054600160a060020a0316331461051957600080fd5b600160005460a060020a900460ff16600181111561053357fe5b1461053d57600080fd5b50600160a060020a038116600090815260016020526040902054303181111561056257fe5b600160a060020a0382166000818152600160205260408082208290555183156108fc0291849190818181858888f193505050501580156105a6573d6000803e3d6000fd5b50604080518281529051600160a060020a038416917f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5919081900360200190a25050565b600160a060020a031660009081526001602052604090205490565b600054600160a060020a031681565b60005460a060020a900460ff1681565b600054600160a060020a0316331461063b57600080fd5b6106448161065a565b50565b8181018281101561065457fe5b92915050565b600160a060020a038116151561066f57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a723058208cae051a2b4c5995d040165a1de116b8efed6e0e76e452cc6b367f548a9b944c0029', 
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
});


function getInstance() {
    let Contract = web3.eth.contract(abi);
    let instance = Contract.at($("#enderecoContratoEvento").val());
    return instance;
}

/**
 * Consultar Evento
 */
$( "#btnConsultarEvento" ).click(function() {

    let instance = getInstance();
    instance.eventPrice(function(error, result){
        $("#valor").val(result);
    })

    instance.name(function(error, result){
        $("#nome").val(result);
    })

    instance.getBalance(function(error, result){
        $("#saldo").val(result);
    })
     
    instance.date(function(error, result){
        $("#data").val(result);
    })      

    instance.owner(function(error, result){
        $("#responsavel").val(result);
    }) 

    instance.state(function(error, result){
        if (result == 0) {
            $("#status").val("Aberto");
        } else {
            $("#status").val("Fechado");
        }
    })  
    
    iniciarEventos(instance);
});

/**
 * Comprar Evento
 */
$( "#btnComprarEvento" ).click(function() {
    let instance = getInstance();

    let tx = {
        value: $("#valor").val()
    }

    instance.pay.sendTransaction(tx, function(error, result){
        console.info(result);
    });    
})

/**
 * Encerrar compras
 */
$( "#btnEncerrarCompras" ).click(function() {
    let instance = getInstance();
    instance.close.sendTransaction(function(error, result){
        console.info(result);
    });
})

/**
 * Estonar valor
 */
$( "#btnEstonarValor" ).click(function() {
    let instance = getInstance();
    let contaComprador = $("#contaComprador").val();
    instance.withdraw.sendTransaction(contaComprador, function(error, result){
        console.info(result);
    });
})

//event.stopWatching();
function iniciarEventos(instance) {
    let evento = instance.Payments();
    evento.watch(function(error, result){
        console.info(result);
        $("#eventoCompras").val("Evento pago por: " + result.args.paying + " valor = " + result.args.weiAmount);
    });

    let eventoClosed = instance.Closed();
    eventoClosed.watch(function(error, result){
        console.info(result);
        $("#eventoFechado").val("Evento encerrado");
    });      

    let eventoWithdrawn = instance.Withdrawn();
    eventoWithdrawn.watch(function(error, result){
        console.info(result);
        $("#transferencia").val("Valor estornado para : " + result.args.paying + " valor = " + result.args.weiAmount);
    });    
    
}
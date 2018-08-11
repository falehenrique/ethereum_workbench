//geth --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private"

// web3 
// projeto https://github.com/ethereum/web3.js
//documentação https://github.com/ethereum/wiki/wiki/JavaScript-API

//load
window.addEventListener('load', function() {
    var urlNode = 'http://127.0.0.1:7545';
    // var urlNode = 'http://localhost:8545';
    window.web3 = new Web3(new Web3.providers.HttpProvider(urlNode));
    // conect with metamask
    // window.web3 = new Web3(web3.currentProvider)
    checkWeb3()

    carregarToken();
});

//Check the web3 connection
function checkWeb3(){
    // Set the connect status on the app
    if (web3 && web3.isConnected()) {
        console.info('Connected');
        $('#no_status').text("Conectado");
        // Set version
        setWeb3Version();
        checkNodeStatus();
    } else {
        console.info('Not Connected');
        $('#no_status').text("Desconectado");
    }
}

//Get web3 version
function setWeb3Version() {
    var versionJson = {};
    // Asynchronous version
    web3.version.getNode(function(error, result){
        if(error){
            console.info(error);
        } else {
            $('#versionGeth').text(result);
            console.info(result);
        }
    });
}

//check if the client is listening and peer count
function checkNodeStatus()  {
    // it is Asynch
    web3.net.getListening(function(error, result){
        if(error) {
            console.info('get_peer_count ' + error);
        } else {
            // get the peer count
            web3.net.getPeerCount(  function(  error,  result ) {
                if(error){
                    console.info('get_peer_count ' + error);
                } else {
                    $('#nodes').text(result);
                    console.info('Peer Count: ' + result);
                }
            });
        listAccounts();
        }
    });
}

function listAccounts() {
    //Asynch
    web3.eth.getAccounts(function (error, result) {
        if (error) {
            console.info('accounts ' + error);
        } else {
            var accounts = result;
            $('#sizeAccounts').text(result.length);
            console.info('accounts length =' + result.length);

            var accounts_ul = $('#accounts_ul');
            // clear the accounts_ul
            accounts_ul.empty;
            // Add the accounts as list items
            for (var i = 0; i < result.length; i++) {
                accounts_ul.append('<li>'+result[i]+'</li>');
            }
            
            var coinbase = web3.eth.coinbase;
            if(coinbase){

            }
            coinbase = coinbase.substring(0,25)+'...'
            console.info('==coinbase==='+ coinbase);
            var defaultAccount = web3.eth.defaultAccount;
            console.info('==defaultAccount==='+ defaultAccount);
        }
    });
}

$( "#btnBalance" ).click(function() {
    var account = $('#account').val();
    console.info(account);
    web3.eth.getBalance(account, web3.eth.defaultBlock, function(error, result){
        console.info(result);
        var balance = web3.fromWei(result, 'ether').toFixed(2);
        $('#accountBalance').val(balance);
    });
});

$( "#btnUnlock" ).click(function() {
    var accountUnlock = $("#accountUnlock").val();
    var password = $("#password").val();
    console.info(accountUnlock);
    web3.personal.unlockAccount(accountUnlock, password, function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                alert('Account unlock');
            } else {
                alert("It wasn't possible to unlock the account.");
            }   
        }
    });
});

$( "#btnSendEther" ).click(function() {
    var sender = $("#from").val();
    var receiver = $("#to").val();
    var amount = $("#valueToSend").val();

    web3.eth.sendTransaction({
        "from": sender,
        "to": receiver,
        "value": web3.toWei(amount, 'ether'),
        "gas": 300000},
        function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                $('#labelResultSendEther').text(result);
            } else {
                alert("It wasn't possible to send transaction.");
            }   
        }
    });
});

$( "#btnTransaction" ).click(function() {
    var transaction = $("#transaction").val();

    web3.eth.getTransaction(transaction, function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                console.info(result);
                $('#resultTransaction').val(JSON.stringify(result, null, '\t'));
            } else {
                alert("It wasn't possible to view the transaction.");
            }   
        }
    });
});


var abiToken = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"crownFund","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_qtd","type":"uint8"}],"name":"comprarTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_tokenPrice","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"adr","type":"address"}],"name":"tokenBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
var enderecoToken = "0x48fd8b537f38c3776937f2342d71d7ab941c746a";
function getInstanceToken() {
    let PersonContract = web3.eth.contract(abiToken);
    let personInstance = PersonContract.at(enderecoToken);
    return personInstance;
}

function carregarToken() {
    let instance  = getInstanceToken();

    web3.eth.getAccounts(function (error, contaMetamask) {

        instance.balanceOf(contaMetamask, function(error, result) {

            instance.symbol(function(error, retornoSymbol) {
                $("#quantidade").val(retornoSymbol + " " + result)
            });
        });
    });

    instance.tokenPrice(function(error, result) {
        $("#valorToken").val(result)
    });

}

function transferirTokens() {
    let endereco = $("#transferirPara").val();
    let quantidade = $("#quantidadeTransferir").val();   
    
    let instance  = getInstanceToken();

    instance.transfer.sendTransaction(endereco, quantidade, function(error, result){
        if (error) {
            alert("Ocorreu um erro " + error);
        } else {
            console.info(result);
        }
    });
}

function consultarTokens() {
    let endereco = $("#enderecoPessoa").val();
    
    let instance  = getInstanceToken();

    instance.balanceOf(endereco, function(error, result) {
        $("#quantidadePessoa").val(result)
    });
}

function comprarTokens() {
    let quantidadeComprar = $("#quantidadeComprar").val();
    let valorToken = $("#valorToken").val();    
    let instance  = getInstanceToken();

    var tx = {
        value: quantidadeComprar * valorToken,
        gas: "470000",
        data: "go"
    }

    instance.comprarTokens.sendTransaction(quantidadeComprar, tx, function(error, result){
        if (error) {
            alert("Ocorreu um erro " + error);
        } else {
            console.info(result);
        }
    });
}
//geth --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private" --mine

//load
 window.addEventListener('load', function() {
    var urlNode = 'http://localhost:7545';
    window.web3 = new Web3(new Web3.providers.HttpProvider(urlNode));
    checkWeb3()
    
});

//Check the web3 connection
function checkWeb3(){
    // Set the connect status on the app
    if (web3 && web3.isConnected()) {
        console.info('Connected');
        // Set version
        setWeb3Version();
        checkNodeStatus();
    } else {
        console.info('Not Connected');
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

/**
 * Account balance
 */
$( "#btnBalance" ).click(function() {
    var account = $('#account').val();
    console.info(account);
    web3.eth.getBalance(account, web3.eth.defaultBlock, function(error, result){
        console.info(result);
        var balance = web3.fromWei(result,'ether').toFixed(2);
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


/**
 * Create Person
 */
$( "#btnCreatePerson" ).click(function() {

    var _name = $('#name').val();
    var _email = $('#email').val();
    var _phone = $('#phone').val();

    var personContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listCellPhoneValidator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapCellPhoneValidator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"identificationCellPhone","outputs":[{"name":"","type":"int16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressIPFSPhoto","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_validator","type":"address"}],"name":"addValidator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isValidPhone","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dateCreate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEmail","outputs":[{"name":"_email","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"email","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addressPerson","type":"address"},{"name":"_isValid","type":"bool"}],"name":"sendValidationIdentity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isValidAddressIPFSPhoto","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phone","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"isValidEmail","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPersonValid","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newMail","type":"string"}],"name":"changeEmail","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalPersonInvalid","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractPersonValidator","type":"address"},{"name":"isValid","type":"bool"}],"name":"validatorIdentity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_email","type":"string"},{"name":"_phone","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contractPersonValidator","type":"address"},{"indexed":false,"name":"_isValid","type":"bool"}],"name":"LogPersonValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addressPerson","type":"address"},{"indexed":false,"name":"_newEmail","type":"string"}],"name":"LogUpdateEmail","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addressPerson","type":"address"},{"indexed":false,"name":"_newEmail","type":"string"}],"name":"LogUpdatePhoto","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_contractIdentity","type":"address"},{"indexed":false,"name":"_phone","type":"string"},{"indexed":false,"name":"_identificationPerson","type":"uint256"}],"name":"LogValidateCellPhone","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_contractIdentity","type":"address"},{"indexed":false,"name":"_email","type":"string"},{"indexed":false,"name":"_identificationPerson","type":"uint256"}],"name":"LogValidateEmail","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]);
    var person = personContract.new(
       _name,
       _email,
       _phone,
       {
         from: $('#account').val(), 
         data: '0x606060405234156200001057600080fd5b60405162001b7038038062001b7083398101604052808051820191906020018051820191906020018051820191905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826003908051906020019062000098929190620005c8565b508160049080519060200190620000b1929190620005c8565b508060069080519060200190620000ca929190620005c8565b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555042600181905550424301600281905550620001dc3060068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015620001ba5780601f106200018e57610100808354040283529160200191620001ba565b820191906000526020600020905b8154815290600101906020018083116200019c57829003601f168201915b5050505050600254620002a664010000000002620011a3176401000000009004565b6200029d3060048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156200027b5780601f106200024f576101008083540402835291602001916200027b565b820191906000526020600020905b8154815290600101906020018083116200025d57829003601f168201915b5050505050600254620004376401000000000262001330176401000000009004565b50505062000677565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156200030257600080fd5b7ff6d55a992f33d6a826913924525133eb245bb5d21b0129049a1676b8c755369e6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16848484604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b83811015620003f4578082015181840152602081019050620003d7565b50505050905090810190601f168015620004225780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a1505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156200049357600080fd5b7ffbd53c8f634bf7d11e127dc53fed174593a729e5ee7bdfaae02aad7a4ca1937b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16848484604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156200058557808201518184015260208101905062000568565b50505050905090810190601f168015620005b35780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a1505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200060b57805160ff19168380011785556200063c565b828001600101855582156200063c579182015b828111156200063b5782518255916020019190600101906200061e565b5b5090506200064b91906200064f565b5090565b6200067491905b808211156200067057600081600090555060010162000656565b5090565b90565b6114e980620006876000396000f300606060405260043610610112576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146101175780632d773465146101a557806334e7dc31146102085780633d5f71ca146102595780634cf88750146102885780634d238c8e146102b95780634f11229c146102f25780636fd993581461031f5780637e79e8ba14610348578063820e93f5146103d6578063893fe85b146104645780638a00d190146104a85780638da5cb5b146104f95780639284f4971461054e578063c3cf5376146105dc578063c974e4931461061b578063d553357d14610644578063d6fc5509146106a1578063f2fde38b146106ca578063fbb75f7314610703575b600080fd5b341561012257600080fd5b61012a610747565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561016a57808201518184015260208101905061014f565b50505050905090810190601f1680156101975780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101b057600080fd5b6101c660048080359060200190919050506107e5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561021357600080fd5b61023f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610824565b604051808215151515815260200191505060405180910390f35b341561026457600080fd5b61026c610844565b604051808260010b60010b815260200191505060405180910390f35b341561029357600080fd5b61029b610857565b60405180826000191660001916815260200191505060405180910390f35b34156102c457600080fd5b6102f0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061085d565b005b34156102fd57600080fd5b61030561096b565b604051808215151515815260200191505060405180910390f35b341561032a57600080fd5b61033261097e565b6040518082815260200191505060405180910390f35b341561035357600080fd5b61035b610984565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561039b578082015181840152602081019050610380565b50505050905090810190601f1680156103c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103e157600080fd5b6103e9610a2c565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561042957808201518184015260208101905061040e565b50505050905090810190601f1680156104565780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561046f57600080fd5b6104a6600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610aca565b005b34156104b357600080fd5b6104df600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be9565b604051808215151515815260200191505060405180910390f35b341561050457600080fd5b61050c610c09565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561055957600080fd5b610561610c2e565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105a1578082015181840152602081019050610586565b50505050905090810190601f1680156105ce5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156105e757600080fd5b610601600480803560001916906020019091905050610ccc565b604051808215151515815260200191505060405180910390f35b341561062657600080fd5b61062e610cec565b6040518082815260200191505060405180910390f35b341561064f57600080fd5b61069f600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610cf2565b005b34156106ac57600080fd5b6106b4610e55565b6040518082815260200191505060405180910390f35b34156106d557600080fd5b610701600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610e5b565b005b341561070e57600080fd5b610745600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610fb0565b005b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107dd5780601f106107b2576101008083540402835291602001916107dd565b820191906000526020600020905b8154815290600101906020018083116107c057829003601f168201915b505050505081565b600a818154811015156107f457fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600b6020528060005260406000206000915054906101000a900460ff1681565b600760009054906101000a900460010b81565b60085481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108b857600080fd5b600c60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151561091057600080fd5b6001600c60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600760029054906101000a900460ff1681565b60015481565b61098c6110ea565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a225780601f106109f757610100808354040283529160200191610a22565b820191906000526020600020905b815481529060010190602001808311610a0557829003601f168201915b5050505050905090565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ac25780601f10610a9757610100808354040283529160200191610ac2565b820191906000526020600020905b815481529060010190602001808311610aa557829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b2757600080fd5b8290508073ffffffffffffffffffffffffffffffffffffffff1663fbb75f7330846040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018215151515815260200192505050600060405180830381600087803b1515610bd057600080fd5b6102c65a03f11515610be157600080fd5b505050505050565b60096020528060005260406000206000915054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610cc45780601f10610c9957610100808354040283529160200191610cc4565b820191906000526020600020905b815481529060010190602001808311610ca757829003601f168201915b505050505081565b60056020528060005260406000206000915054906101000a900460ff1681565b600d5481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d4d57600080fd5b8060049080519060200190610d639291906110fe565b507fa79e0bb5b2e79f7ddeca9530b41e5b4cca973196b9c0c73537101a3d8560d79f306004604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818154600181600116156101000203166002900481526020019150805460018160011615610100020316600290048015610e435780601f10610e1857610100808354040283529160200191610e43565b820191906000526020600020905b815481529060010190602001808311610e2657829003601f168201915b5050935050505060405180910390a150565b600e5481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610eb657600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610ef257600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163273ffffffffffffffffffffffffffffffffffffffff161415151561100c57600080fd5b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415151561104757600080fd5b801561106457600d60008154809291906001019190505550611077565b600e600081548092919060010191905055505b7fce1999d813c8f8f86decb86dfff5abe046627678996d958a3993af85cfa3fcbc8282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a15050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061113f57805160ff191683800117855561116d565b8280016001018555821561116d579182015b8281111561116c578251825591602001919060010190611151565b5b50905061117a919061117e565b5090565b6111a091905b8082111561119c576000816000905550600101611184565b5090565b90565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156111fe57600080fd5b7ff6d55a992f33d6a826913924525133eb245bb5d21b0129049a1676b8c755369e6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16848484604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156112ee5780820151818401526020810190506112d3565b50505050905090810190601f16801561131b5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a1505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561138b57600080fd5b7ffbd53c8f634bf7d11e127dc53fed174593a729e5ee7bdfaae02aad7a4ca1937b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16848484604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561147b578082015181840152602081019050611460565b50505050905090810190601f1680156114a85780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15050505600a165627a7a723058205d0e561c84cd820590d5a45c8e4ab3d40bcac35c0e10e3c19d7cf2cb09ae5f400029', 
         gas: '4700000'
       }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
             $('#resultTransaction').val('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        }
     })
    
    return;
});

function getInstancePerson() {
    let _addressContract = $('#addressContract').val();
    let PersonContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listCellPhoneValidator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapCellPhoneValidator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"identificationCellPhone","outputs":[{"name":"","type":"int16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressIPFSPhoto","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_validator","type":"address"}],"name":"addValidator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isValidPhone","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dateCreate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEmail","outputs":[{"name":"_email","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"email","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addressPerson","type":"address"},{"name":"_isValid","type":"bool"}],"name":"sendValidationIdentity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isValidAddressIPFSPhoto","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phone","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"isValidEmail","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPersonValid","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newMail","type":"string"}],"name":"changeEmail","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalPersonInvalid","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractPersonValidator","type":"address"},{"name":"isValid","type":"bool"}],"name":"validatorIdentity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_email","type":"string"},{"name":"_phone","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contractPersonValidator","type":"address"},{"indexed":false,"name":"_isValid","type":"bool"}],"name":"LogPersonValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addressPerson","type":"address"},{"indexed":false,"name":"_newEmail","type":"string"}],"name":"LogUpdateEmail","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addressPerson","type":"address"},{"indexed":false,"name":"_newEmail","type":"string"}],"name":"LogUpdatePhoto","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_contractIdentity","type":"address"},{"indexed":false,"name":"_phone","type":"string"},{"indexed":false,"name":"_identificationPerson","type":"uint256"}],"name":"LogValidateCellPhone","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_contractIdentity","type":"address"},{"indexed":false,"name":"_email","type":"string"},{"indexed":false,"name":"_identificationPerson","type":"uint256"}],"name":"LogValidateEmail","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]);
    let personInstance = PersonContract.at(_addressContract);

    return personInstance;
}

/**
 * Create Person
 */
$( "#btnGetPerson" ).click(function() {
    let personInstance = getInstancePerson();

    console.info(personInstance);

    personInstance.name.call({},web3.eth.defaultBlock, function(error,result){
        if (error) {
            console.info(error);
        } else {
            $('#lblName').val(result);
        }
    });

    personInstance.getEmail(function(error,result){
        if (error) {
            console.info(error);
        } else {        
            $('#lblEmail').val(result);
        }
    });    

    let lblPhone = personInstance.phone();
    $('#lblPhone').val(lblPhone);
    

    personInstance.totalPersonValid(function(error,result){
        if (error) {
            console.info(error);
        } else {        
            $('#totalPersonValid').val(result);
        }
    });   


    personInstance.owner(function(error,result){
        if (error) {
            console.info(error);
        } else {        
            $('#account').val(result);
        }
    });   

    startEventPerson(personInstance);

    return;
});

/**
 * Update Person
 */
$( "#btnUpdateEmail" ).click(function() {
    let personInstance = getInstancePerson();

    let _newEmail = $('#newEmail').val();

    var txn = {
        from: $('#account').val(),
        gas: 470000
    }

    personInstance.changeEmail.sendTransaction(_newEmail, txn,function(error, result)  {
        console.info(result);
        console.info(error);
    });  

});


//event.stopWatching();
function startEventPerson(personInstance) {

    var personEvent = personInstance.LogUpdateEmail();
    personEvent.watch(function(error, result){
        if (!error)
            {
                $("#labelResultEvent").html("novo email (" + result.args._newEmail + ") alterado pela conta (" + result.args._addressPerson +" )");
            } else {
                console.log(error);
            }
    });
    
    personEvent = personInstance.LogPersonValidator();
    personEvent.watch(function(error, result){
        if (!error)
            {
                $("#labelResultEvent").html("validação pelo endereço (" + result.args._contractPersonValidator + ") com valor (" + result.args._isValid +" )");
            } else {
                console.log(error);
            }
    });    
}

/**
 * Send Validation to Person
 */
$( "#btnSendValidation" ).click(function() {
    let personInstance = getInstancePerson();

    let _addressPerson = $('#addressPerson').val();
    let _valid = $('#valid').val();

    var txn = {
        from: $('#account').val(),
        gas: 470000
    }

    personInstance.sendValidationIdentity.sendTransaction(_addressPerson, _valid, txn,function(error, result)  {
        console.info(result);
        console.info(error);
    });  

});
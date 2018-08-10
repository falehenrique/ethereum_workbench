const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

var PersonTeste = artifacts.require("PersonTeste");

contract('PersonTeste', function(accounts) {
    var person;

    var dono = accounts[0];
    var donoIncorreto = accounts[1];

	before("Carrega pessoa ", async function() {
        person = await PersonTeste.deployed();
    });
    
	it("Verifica o nome", async function() {
		(await person.name()).should.be.equal("Henrique");
	});    
    
	it("Altera o email", async function() {
		await person.changeEmail("teste@gmail.com", {from: dono});

		(await person.email()).should.be.equal("teste@gmail.com");
	});   

	it("deve previnir que outras contas alterem o email", async function() {

        try {
            await person.changeEmail("teste@gmail.com",  {from: donoIncorreto});            
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('revert'), error.toString())
        }

	});

})
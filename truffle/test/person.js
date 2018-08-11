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
    
    before("Carregar a pessoa", async function(){

        person = await PersonTeste.deployed()
        
    });

    it("verificar nome", async function(){
        (await person.name()).should.be.equal("Henrique");
    })

    it("Alterar o email", async function(){
        await person.changeEmail("teste@gmai.com", {from: dono});
        (await person.email()).should.be.equal("teste@gmai.com");
    })    

	it("deve previnir que outras contas alterem o email", async function() {

        try {
            await person.changeEmail("teste11@gmail.com",  {from: donoIncorreto});            
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('revert'), error.toString())
        }
	});
  })
const express = require("express");
const bodyParser = require("body-parser");

var Web3 = require('web3');
var provider = 'https://mainnet.infura.io/v3/f9d85c7c10ad4133b635d730cbee885b';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);

let tokenAddress = "0x23894DC9da6c94ECb439911cAF7d337746575A72";
let whitelistAddress1 = "0x8ff934fa9ba5134f6b67ac197970078a232352af";
let tokendeployer = "0x7affa123efef506b4d822090f26a9904aeefe4fa";

const abi = [{"inputs":[{"internalType":"address","name":"geojamTeam","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"contract IPLPS","name":"_plps","type":"address"}],"name":"LiquidityProtection_setLiquidityProtectionService","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_holders","type":"address[]"}],"name":"LiquidityProtection_unblock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableProtection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getLiquidityPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isProtected","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_holders","type":"address[]"},{"internalType":"address","name":"_revokeTo","type":"address"}],"name":"revokeBlocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const Jamtoken = new web3.eth.Contract(abi, tokenAddress);
const circ = async () => {
    let balance1 = await Jamtoken.methods.balanceOf(whitelistAddress1).call();
    let totalSupply1 = await Jamtoken.methods.totalSupply().call();
    let balance2 = await Jamtoken.methods.balanceOf(tokendeployer).call()

    let balance22 = web3.utils.fromWei(balance2, 'ether');
    let balance11 = web3.utils.fromWei(balance1, 'ether');
    let totalBalance22 = web3.utils.fromWei(totalSupply1, 'ether');

    let circulatingSupply = totalBalance22 - balance11 - balance22;
    const yeet = await circulatingSupply.toString();
    return (yeet);
    
};

let act = function() {
    return circ().then(token => { return token } )
  };


const app = express();

let yeet = act();


app.use(bodyParser.text());

const sayHi = (req, res) => {

    yeet.then(function(result) {
        console.log(result)
        res.send(result); 
     })
    
  };
  
  app.get("/", sayHi);

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
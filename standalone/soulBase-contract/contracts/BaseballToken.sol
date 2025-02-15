// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BaseballToken is ERC20{

    address public owner;
    uint public MAX_SUPPLY;//토큰 발행량 
    uint public constant TAX = 2;// 0.02, 2% tx 
    bool public isTaxOn = true;
    address payable public treasuryWallet; //비상금 주소

    modifier onlyOwner(){
        require(msg.sender== owner, "Not the owner");
        _;
    }

    event BaseballTokenMinted(address indexed account, uint256 amount);
    event OwnerAction();

    constructor(address payable treasury) ERC20("Baseball Token", "BBT"){
        MAX_SUPPLY = 1000000 * 10**decimals();
        _mint(address(this), MAX_SUPPLY );//배포 시에 MAX_SUPPLY 만큼 발행
        owner = msg.sender;
        treasuryWallet = treasury;
    }

    function mint (address account, uint256 amount) external onlyOwner{
        _mint(account, amount);
        emit BaseballTokenMinted(account, amount);
    }
    
    //Tax 유무
    function toggleTax() external onlyOwner{
        isTaxOn = !isTaxOn;
        emit OwnerAction();
    }

    function _transfer(address from, address to, uint256 value) internal override {
        uint256 amountToTake; 
        if(isTaxOn){
            amountToTake = (TAX * value) / 100;
        }
        uint256 amountToTransfer = value - amountToTake;

        super._transfer(from, to, amountToTransfer);
            if (amountToTake > 0) {
                super._transfer(from, treasuryWallet, amountToTake);
            }
    }
}
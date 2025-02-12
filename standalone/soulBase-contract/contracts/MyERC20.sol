// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MyERC20 is ERC20{

    address public owner;
    uint public MAX_SUPPLY;//토큰 발행량 
    uint public constant TAX = 2;// 0.02, 2% tx 
    bool public isTaxOn = true;
    address payable public treasuryWallet; //비상금 주소

    modifier onlyOwner(){
        require(msg.sender== owner, "Not the owner");
        _;
    }

    event MyERC20Minted(address indexed account, uint256 amount);

    constructor(address payable treasury) ERC20("My ERC20 Token", "MyERC20"){
        MAX_SUPPLY = 1000000 * 10**decimals();
        _mint(address(this), MAX_SUPPLY );//배포 시에 MAX_SUPPLY 만큼 발행
        owner = msg.sender;
        treasuryWallet = treasury;
    }

    function mint (address account, uint256 amount) external onlyOwner{
        _mint(account, amount);
        emit MyERC20Minted(account, amount);
    }
    
    //Tax 유무
    function toggleTax() external onlyOwner{
        isTaxOn = !isTaxOn;
    }

    function _update(address from, address to, uint256 value) internal override {
        uint256 amountToTake; 
        if(isTaxOn){
            amountToTake = (TAX * value) / 100;
        }
        uint256 amountToTransfer = value - amountToTake;

        super._update(from, to, amountToTransfer);
            if (amountToTake > 0) {
                super._update(from, treasuryWallet, amountToTake);
            }
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./LiquidityPool.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BaseballToken is ERC20, Ownable {
    
    event TokensBought(address indexed _account, uint256 amount);
    event BaseballTokenMinted(address indexed account, uint256 amount);
    event OwnerAction();

    enum Phase{
        SEED,
        GENERAL,
        OPEN
    }
    Phase public currentPhase = Phase.SEED;

    uint public MAX_SUPPLY;//토큰 발행량 
    uint public constant TAX = 2;// 0.02, 2% tx 
    bool public isTaxOn = true;
    uint256 public totalContributed;
    address payable public treasuryWallet; //비상금 주소
    address public bbtRouter;

    mapping(address=>uint256) public balancesToClaim;
    mapping(address=>uint256) public contributionsOf; //유저당 ETH 기여
    mapping(address=>bool) public isWhitelisted;
    
    constructor(address payable treasury) ERC20("Baseball Token", "BBT"){
        MAX_SUPPLY = 1000000 * 10**decimals(); //100만개 BBT토큰
        _mint(address(this), MAX_SUPPLY );//배포 시에 MAX_SUPPLY 만큼 발행
         _transferOwnership(msg.sender); //owner 등록
        treasuryWallet = treasury;
    }

    // modifier onlyOwner(){
    //     require(msg.sender== owner, "ONLY_OWNER");
    //     _;
    // }
    modifier onlyRouter(){
        require(msg.sender == bbtRouter,"ONLY_ROUTER");
        _;
    }
    //배포된 라우터 계약 주소 
    function setRouterAddress(address _bbtRouter) external onlyOwner{
        require(address(bbtRouter)==address(0),"WRITE_ONCE");
        bbtRouter = _bbtRouter;
    }   

    function mint (address account, uint256 amount) external onlyOwner{
        _mint(account, amount);
        emit BaseballTokenMinted(account, amount);
    }
    function burn(address account, uint256 amount) external onlyOwner(){
        _burn(account, amount * 10**decimals());
    }
    //교환 비율 반영된 금액 저장
    function contribute() external payable{
        require(canUserContribute(msg.sender), "NOT_ALLOWED");
        require(contributionsOf[msg.sender]+msg.value <= getIndividualLimit(), "ABOVE_MAX_INDIVIDUAL_CONTRUBUTION");
        require(totalContributed+msg.value <= getPhaseLimit(), "ABOVE_MAX_CONTRIBUTION");

        uint256 tokenAmount = msg.value * 5; //1 ETH = 5 BBT
        balancesToClaim[msg.sender] += tokenAmount;
        contributionsOf[msg.sender] += msg.value;
        totalContributed += msg.value;

        emit TokensBought(msg.sender, tokenAmount);
    }
    //토큰 수령
    function claimTokens() external{
        require(balancesToClaim[msg.sender]>0,"NO_AVAILABLE_FUNDS");
        uint256 tokensToClaim = balancesToClaim[msg.sender];
        balancesToClaim[msg.sender] = 0;

        super._transfer(address(this), msg.sender, tokensToClaim);
    }
    //Tax 유무
    function toggleTax() external onlyOwner{
        isTaxOn = !isTaxOn;
        emit OwnerAction();
    }
    function canUserContribute(address account) public view returns (bool){
        return isWhitelisted[account] || currentPhase != Phase.SEED;
    }
    //개별 기여 한도
    function getIndividualLimit() private view returns (uint256){
        if(currentPhase==Phase.SEED){
            return 1500 ether;
        }
        else if(currentPhase==Phase.GENERAL){
            return 1000 ether;
        }
        else {
            return msg.value;
        }
    }
    //전체 한도
    function getPhaseLimit() private view returns (uint256 limit){
        if(currentPhase==Phase.SEED){
            limit = 15000 ether;
        }
        else if (currentPhase==Phase.GENERAL || currentPhase == Phase.OPEN){
            limit = 30000 ether;
        }
    }
    //유저를 화리에 추가 
    function addToWhitelist(address account) external onlyOwner{
        isWhitelisted[account]=true;
    }
    //세금 기능 포함된 전송
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
    //토큰 사용 한도 증가
    function increaseContractAllowance(address _owner, address _spender, uint256 _amount) public onlyRouter returns(bool){
        _approve(_owner, _spender,  allowance(msg.sender, address(this)) + _amount); //기존 allowance에 _amount 추가
        return true;
    }
    //유동성 공급
    function provideLiquidity(LiquidityPool liquidityPool) external onlyOwner{
        require(currentPhase == Phase.OPEN,"NOT_LAST_PHASE");
        uint256 TokenAmountToTransfer = totalContributed * 5; //TokenAmountToTransfer의 maximum은 30k eth*5=150,000 tokens
        
        super._transfer(address(this),address(liquidityPool),TokenAmountToTransfer);

        liquidityPool.deposit{value: totalContributed}(
            TokenAmountToTransfer, msg.sender
        );
        sendRemainingFundsToTreasury();
    }
    //남은 금액 비상금 계좌로
    function sendRemainingFundsToTreasury() internal {
        uint256 remainingToken = balanceOf(address(this));

        super._transfer(address(this), address(treasuryWallet),remainingToken);
    }

}
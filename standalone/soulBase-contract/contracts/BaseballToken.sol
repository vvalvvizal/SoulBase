// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./LiquidityPool.sol";

contract BaseballToken is Initializable, ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    
    event TokensBought(address indexed _account, uint256 amount);
    event BaseballTokenMinted(address indexed account, uint256 amount);
    event OwnerAction();
    event FundsMoved();

    enum Phase{
        SEED,
        GENERAL,
        OPEN
    }
    Phase public currentPhase;
    uint public MAX_SUPPLY;//토큰 발행량 
    uint public constant TAX = 2;// 0.02, 2% tx 
    uint public constant EXCHANGE = 1000;//1 ETH에 해당하는 BBT 토큰 수
    bool public isTaxOn;
    uint256 public totalContributed;
    bool public isContractPaused;
    bool public fundsAlreadyMoved;
    address payable public treasuryWallet; //비상금 주소
    address public bbtRouter;
    uint256 internal constant VERSION = 1;

    mapping(address=>uint256) public balancesToClaim;
    mapping(address=>uint256) public contributionsOf; //유저당 ETH 기여
    mapping(address=>bool) public isWhitelisted;
    
    function initialize(address payable treasury) public initializer {
        __ERC20_init("Baseball Token", "BBT");
        __Ownable_init();
        __UUPSUpgradeable_init();

        MAX_SUPPLY = 1_000_000 * 10 ** decimals(); //100만개 토큰 
        _mint(address(this), MAX_SUPPLY);

        treasuryWallet = treasury;
        isTaxOn = true;
        currentPhase = Phase.SEED;
    }

    modifier onlyRouter(){
        require(msg.sender == bbtRouter,"ONLY_ROUTER");
        _;
    }

    modifier areFundsMoved(){
        require(!fundsAlreadyMoved, "FUNDS_MOVED_TO_LP");
        _;
    }
    modifier isPaused(){
        require(!isContractPaused, "CONTRACT_PAUSED");
        _;
    }
    //upgrade용
    function version() public pure returns (uint256) {
            return VERSION;
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
    function burn(address account, uint256 amount) external onlyOwner{
        _burn(account, amount * 10**decimals());
    }
    //교환 비율 반영된 금액 저장
    function contribute() external payable{
        require(canUserContribute(msg.sender), "NOT_ALLOWED");
        require(contributionsOf[msg.sender]+msg.value <= getIndividualLimit(), "ABOVE_MAX_INDIVIDUAL_CONTRUBUTION");
        require(totalContributed+msg.value <= getPhaseLimit(), "ABOVE_MAX_CONTRIBUTION");

        uint256 tokenAmount = msg.value * EXCHANGE; // 1 ETH = 1000 BBT
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
    //Phase 상태 업그레이드 SEED -> GENERAL -> OPEN
    function advancePhase() external onlyOwner {
        require(currentPhase != Phase.OPEN, "LAST_PHASE");
        currentPhase = Phase(uint256(currentPhase) + 1);
        emit OwnerAction();
    }
    //Tax 유무
    function toggleTax() external onlyOwner{
        isTaxOn = !isTaxOn;
        emit OwnerAction();
    }
    //컨트랙트 pause
    function togglePauseContract() external onlyOwner{
        isContractPaused = !isContractPaused;
        emit OwnerAction();
    }
    function canUserContribute(address account) public view returns (bool){
        return isWhitelisted[account] || currentPhase != Phase.SEED;
    }
    //개별 기여 한도
    function getIndividualLimit() private view returns (uint256){
        if(currentPhase==Phase.SEED){
            return 150 * 10**18;
        }
        else if(currentPhase==Phase.GENERAL){
            return 100 * 10**18;
        }
        else { //제한 없음
            return msg.value;
        }
    }
    //전체 한도
    function getPhaseLimit() private view returns (uint256 limit){
        if(currentPhase==Phase.SEED){
            limit = 500 * 10**18; //SEED 단계에서 500 ETH 
        }
        else if (currentPhase==Phase.GENERAL || currentPhase == Phase.OPEN){
            limit = 1000 * 10**18; //1000 ETH
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

    //유동성 공급
    function provideLiquidity(LiquidityPool liquidityPool) external onlyOwner areFundsMoved(){
        require(currentPhase == Phase.OPEN,"NOT_LAST_PHASE");

        fundsAlreadyMoved = true;
        uint256 TokenAmountToTransfer = totalContributed * EXCHANGE; //TokenAmountToTransfer의 maximum은 1k eth*1000= 1,000,000 tokens
        
         _approve(address(this), address(liquidityPool), TokenAmountToTransfer);//deposit 내부의 transferFrom
         
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
        emit FundsMoved();
    }

   function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
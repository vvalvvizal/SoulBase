import { useState } from "react";
import Badge from "../atmos/Badge"
import Button from "../atmos/Button";
import { IconSettings } from "@tabler/icons-react";
import { BBT_TOKEN_INFO, POL_TOKEN_INFO, TokenInput } from "../organisms/TokenInput";

export const Swap = () => {
const [showSettings, setShowSettings] = useState(false);
const [slippage, setSlippage] = useState("0.5");
const [inputAmount, setInputAmount] = useState("");
const [outputAmount, setOutputAmount] = useState("");

const exchangeRate = 1000; // 1000 BBT = 1 POL

const handleInputChange = (value) => {
    setInputAmount(value);
    //input에 따라 교환될 output 계산
    if(value){
        const output = (Number.parseFloat(value) / exchangeRate).toFixed(6);
        setOutputAmount(output);
    }
    else{
        setOutputAmount("");
    }

}
const handleOutputChange = (value) => {
    if(value){
        const input = (Number.parseFloat(value)* exchangeRate).toFixed(6);
        setInputAmount(input);
    }
    setOutputAmount(value);
    //output에 따라 교환될 input 계산
}

const inputToken = BBT_TOKEN_INFO;
const outputToken = POL_TOKEN_INFO
    
return (
    <div className="container mx-auto px-4 py-8">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-center mb-2">SWAP</h1>
      <p className="text-gray-600 text-center mb-6">
        BBT와 POL을 DEX에서 Swap하세요 <br />
      </p>
    </div>
    <div className="flex justify-center">
        <div className="w-full max-w-md mx-auto bg-gray-900 rounded-2xl shadow-xl p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">토큰 스왑</h2>
        <Button
          onClick={() => setShowSettings(!showSettings)} intent="primary" size="small"
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <IconSettings />
        </Button>
      </div>
        {/* 설정 버튼을 눌렀을 때, showSettings 값이 true일 때 보여질 내용*/}
      {showSettings && (
        <div className="mb-4 p-3 bg-gray-800 rounded-xl">
          <h3 className="text-sm font-medium mb-2">슬리피지 허용 범위</h3>
          <div className="flex gap-2">
            {["0.1", "0.5", "1.0"].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  slippage === value ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {value}%
              </button>
            ))}

            {/* 직접 슬리피지 입력 */}
            <div className="relative flex-1">
              <input
                type="text"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute text-sm">%</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <TokenInput
          label="From"
          value={inputAmount}
          onChange={handleInputChange}
          token={inputToken}
          address="0x1234567890abcdef1234567890abcdef12345678"
          icon="/path/to/icon.png"
        />

        <div className="relative h-8 flex justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          {/* <button
            onClick={handleReverseTokens}
            className="relative z-10 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <ArrowDown size={20} />
          </button> */}
        </div>

        <TokenInput
          label="To"
          value={outputAmount}
          onChange={handleOutputChange}
          token={outputToken}
          address="0x1234567890abcdef1234567890abcdef12345678"
          icon="/path/to/icon.png"
        />
      </div>

      <div className="mt-4 p-3 bg-gray-800 rounded-xl text-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 flex items-center">
            <span>가격</span>
            {/* <Info size={14} className="ml-1 text-gray-500" /> */}
          </span>
          <span>
            {/* 1 {inputToken.symbol} = {isReversed ? (1 / exchangeRate).toFixed(6) : exchangeRate} {outputToken.symbol} */}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">최소 수령량</span>
          <span>
            {/* {minimumReceived} {outputToken.symbol} */}
          </span>
        </div>
      </div>

      {/* <button
        onClick={handleSwap}
        disabled={!inputAmount || Number.parseFloat(inputAmount) === 0}
        className={`w-full mt-4 py-4 rounded-xl font-bold text-lg ${
          !inputAmount || Number.parseFloat(inputAmount) === 0
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 transition-colors"
        }`}
      >
        {!inputAmount ? "금액을 입력하세요" : "스왑"}
      </button> */}

      {/* <div className="mt-4 flex justify-center">
        <button className="flex items-center text-sm text-gray-400 hover:text-gray-300">
          <RefreshCw size={14} className="mr-1" />
          가격 새로고침
        </button>
      </div> */}
    </div>
    </div>
    </div>)
}
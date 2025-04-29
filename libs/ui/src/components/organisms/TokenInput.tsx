import { useState } from "react";
import { ChevronDown } from "lucide-react"

interface TokenInfo {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    icon: string;
  }

export const BBT_TOKEN_INFO = {
    name:"BBT",
    symbol:"BBT",
    address:"",
    decimals:18,
    icon:"https://cryptologos.cc/logos/big-bang-token-bbt-logo.png",
}
export const POL_TOKEN_INFO = {
    name:"POL",
    symbol:"POL",
    address:"",
    decimals:18,
    icon:"https://cryptologos.cc/logos/polygon-matic-logo.png",
}

interface TokenInputProps {
    label:string
    value:string 
    onChange:(value:string)=>void
    token:TokenInfo
    address:string
    icon:string
}

export const TokenInput = (TokenInputs:TokenInputProps) => {
    const {label, value, onChange, token, address, icon} = TokenInputs;

    const [isTokenListOpen, setIsTokenListOpen] = useState(false);

    return(
           <div className="p-4 bg-gray-800 rounded-xl">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm text-gray-400">
          잔액: <span className="text-gray-300">{value}</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="w-full bg-transparent text-2xl font-medium focus:outline-none"
        />
        <div className="relative">
          <button
            onClick={() => setIsTokenListOpen(!isTokenListOpen)}
            className="flex items-center gap-2 py-2 px-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <img src={token.icon || "/placeholder.svg"} alt={token.name} className="w-5 h-5 rounded-full" />
            <span>{token.symbol}</span>
            <ChevronDown size={16} />
          </button>
          {isTokenListOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-gray-800 rounded-xl shadow-lg z-10 p-2">
              <div className="p-2 text-sm text-gray-400">토큰 선택</div>
              <div className="max-h-60 overflow-y-auto">
                {/* 실제 구현에서는 여기에 토큰 목록이 들어갑니다 */}
                <button
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => setIsTokenListOpen(false)}
                >
                  <img src={token.icon || "/placeholder.svg"} alt={token.name} className="w-6 h-6 rounded-full" />
                  <div className="text-left">
                    <div>{token.symbol}</div>
                    <div className="text-xs text-gray-400">{token.name}</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        {/* <button onClick={handleMaxClick} className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
          최대
        </button> */}
      </div>
    </div>);
}
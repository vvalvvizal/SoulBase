import { useState } from "react"
import { AlertCircle, ArrowDown, Info, Loader2 } from "lucide-react"
import  Button from "../atmos/Button";
import { usePoolStatus } from "@soulBase/util/src/hooks/usePoolStatus";
import { Loader } from "../molecules/Loader";
export default function LiquidityModal({
  onClose,
  userBbtBalance:userBBTBalance,
  userPolBalance:userPOLBalance,
  userLpTokens:userLPTokens,
}) {
  const [BBTAmount, setBBTAmount] = useState("")
  const [POLAmount, setPOLAmount] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const {exchangeRate} = usePoolStatus();


  //BBT 입력 계산
  const handleBBTChange = (value: string) => {
  setBBTAmount(value)
  if (value && !isNaN(Number.parseFloat(value)) && exchangeRate > 0) {
    const calculatedPol = Number.parseFloat(value) * exchangeRate//exchange는 1 BBT당 몇 Pol = POL/BBT
    setPOLAmount(calculatedPol.toFixed(6))
  } else {
    setPOLAmount("")
  }
}

const handlePOLChange = (value: string) => {
  setPOLAmount(value)
  if (value && !isNaN(Number.parseFloat(value)) && exchangeRate > 0) {
    const calculatedBBT = Number.parseFloat(value) / exchangeRate
    setBBTAmount(calculatedBBT.toFixed(6))
  } else {
    setBBTAmount("")
  }
}


  const handleAddLiquidity = async () => {
    try {
      setError(null)
      setSuccess(null)
      setLoading(true)

      if (!BBTAmount || !POLAmount) throw new Error("금액을 입력해주세요")

      const BBTValue = Number.parseFloat(BBTAmount)
      const POLValue = Number.parseFloat(POLAmount)

      if (isNaN(BBTValue) || isNaN(POLValue)) throw new Error("유효한 숫자를 입력해주세요")
      if (BBTValue <= 0 || POLValue <= 0) throw new Error("0보다 큰 금액을 입력해주세요")
      if (BBTValue > userBBTBalance) throw new Error("BBT 잔액이 부족합니다")
      if (POLValue > userPOLBalance) throw new Error("POL 잔액이 부족합니다")

      // 여기서 트랜잭션 action


      //
      setSuccess("유동성이 성공적으로 추가되었습니다")
      setBBTAmount("")
      setPOLAmount("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveLiquidity = async () => {
    try {
      setError(null)
      setSuccess(null)
      setLoading(true)

      if (userLPTokens <= 0) throw new Error("제거할 유동성이 없습니다")

      //여기서 LiquidityRemove 트랜잭션액션


      //
      setSuccess("유동성이 성공적으로 제거되었습니다")
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">유동성 관리</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">BBT 수량 (잔액: {userBBTBalance.toLocaleString()} BBT)</label>
            <div className="flex">
              <input
                type="text"
                value={BBTAmount}
                onChange={(e) => handleBBTChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                placeholder="0.0"
              />
              <button
                className="ml-2 text-sm text-blue-500"
                onClick={() => handleBBTChange(userBBTBalance.toString())}
              >
                최대
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="text-gray-400" size={20} />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">POL 수량 (잔액: {userPOLBalance.toLocaleString()} POL)</label>
            <div className="flex">
              <input
                type="text"
                value={POLAmount}
                onChange={(e) => handlePOLChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                placeholder="0.0"
              />
              <button
                className="ml-2 text-sm text-blue-500"
                onClick={() => handlePOLChange(userPOLBalance.toString())}
              >
                최대
              </button>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleAddLiquidity}
            intent="primary"
            size="medium"
            disabled={loading || !BBTAmount || !POLAmount}
            loading={loading}
          >
            {loading ? (<></>
            ) : (
              "유동성 추가하기"
            )}
          </Button>

          <Button
            className="w-full"
            onClick={handleRemoveLiquidity}
            disabled={loading || userLPTokens <= 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 처리 중...
              </>
            ) : (
              "모든 유동성 제거하기"
            )}
          </Button>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 p-3 rounded-lg text-sm">
              <div className="flex items-center">
                <AlertCircle size={16} className="mr-2" />
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-900/20 border border-green-800 text-green-400 p-3 rounded-lg text-sm">
              <div className="flex items-center">
                <Info size={16} className="mr-2" />
                {success}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

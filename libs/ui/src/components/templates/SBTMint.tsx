"use client"

import { useFormSBTMinter } from "@soulBase/forms/src/SBTMinter"
import { useContracts } from "@soulBase/util/src/hooks/useContracts"
import { useState, useEffect } from "react"
import { useAccount } from "@soulBase/util/src/hooks/useAccount"
import { Link } from "react-router-dom"
import { FileImage, Upload, Send, Wallet, CheckSquare } from "lucide-react"
import { sbtMinter } from "@soulBase/ui/utils/actions/sbtMinter"
import  Button  from "@soulBase/ui/src/components/atmos/Button"
import { HtmlInput } from "@soulBase/ui/src/components/atmos/HtmlInput"
import { HtmlLabel } from "@soulBase/ui/src/components/atmos/HtmlLabel"
import  Badge from "@soulBase/ui/src/components/atmos/Badge"

export const SBTMint = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormSBTMinter()
  const { account, initializeWeb3Provider, isConnected } = useAccount()
  const { SBTRouterContract: contract } = useContracts(account, isConnected)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState("mint")

  useEffect(() => {
    initializeWeb3Provider()
  }, [])

  const onSubmit = async ({
    to,
    metadataJSON_url,
  }: {
    to: string
    metadataJSON_url: string
  }) => {
    if (!contract) {
      console.log("Contract not found")
      return
    }

    setLoading(true)
    const success = await sbtMinter({
      contract,
      payload: { to, metadataJSON_url },
    })
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-center mb-2">관리자 페이지</h1>
        <p className="text-gray-500 mb-2">관리자는 SBT를 발행할 수 있습니다</p>
        {!isConnected && (
          <div className="mt-4 flex justify-center">
            <Button onClick={initializeWeb3Provider} className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              지갑 연결
            </Button>
          </div>
        )}
      </div>

      <div className="w-full">
         <div className="flex justify-start gap-4 mb-8">
          <button onClick={() => setTab("mint")} className="border p-2 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <CheckSquare className='h-4 w-4 mr-2'/>
            SBT 민팅
          </button>
          <button onClick={() => setTab("upload")} className="border p-2 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <Upload className="h-4 w-4 mr-2" />
            IPFS 업로드
          </button>
          <button onClick={() => setTab("history")} className="border p-2 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <FileImage className="h-4 w-4 mr-2" />
            업로드 이력
          </button>
        </div>

        {tab === "mint" && (
          <div className="border rounded-lg p-6 shadow">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">NFT 업로드 관리자</h2>
              <p className="text-sm text-gray-500">
                이미지와 메타데이터를 IPFS에 업로드하고 민팅에 사용할 수 있는 CID를 가져옵니다.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Badge variant='gray' >수신 주소</Badge>
                <HtmlInput
                  id="to"
                  placeholder="수신 주소를 입력하세요"
                  {...register("to")}
                  className={errors.to ? "border-red-500" : ""}
                />
                {errors.to?.message && <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>}
              </div>

              <div className="space-y-2">
                <Badge variant='gray'>메타데이터 URL</Badge>
                <HtmlInput
                  id="metadataJSON_url"
                  placeholder="메타데이터 JSON URL을 입력하세요"
                  {...register("metadataJSON_url")}
                  className={errors.metadataJSON_url ? "border-red-500" : ""}
                />
                {errors.metadataJSON_url?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.metadataJSON_url.message}</p>
                )}
              </div>

              <Button size='medium'type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    처리 중...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    민팅하기
                  </span>
                )}
              </Button>
            </form>
          </div>
        )}

        {tab === "upload" && (
          <div className="border rounded-lg p-6 shadow">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">IPFS 업로드</h2>
              <p className="text-sm text-gray-500">이미지와 메타데이터를 IPFS에 업로드합니다.</p>
            </div>
            <div className="flex justify-center">

                  <Upload className="h-4 w-4 mr-2" />
            </div>
          </div>
        )}

        {tab === "history" && (
          <div className="border rounded-lg p-6 shadow">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">업로드 이력</h2>
              <p className="text-sm text-gray-500">이전에 업로드한 파일들의 이력을 확인합니다.</p>
            </div>
            <div className="flex justify-center">

                  <FileImage className="h-4 w-4 mr-2" />

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

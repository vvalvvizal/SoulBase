import { BBTActionType } from '@soulBase/util/src/types';
import { parseUnits } from 'ethers';

export async function swap({
  BBTContract,
  BBTRouterContract,
  payload: { tokenAmount, ethAmount, minAmountOut },
}: BBTActionType<{ tokenAmount; ethAmount; minAmountOut }>): Promise<boolean> {
  try {

    
    const amountIn = parseUnits(String(tokenAmount), 18);
    const minOut = parseUnits(String(minAmountOut), 18); //반환값 BigNumber
    const ETHvalue = ethAmount? parseUnits(String(ethAmount),18):undefined;
    
    console.log("토큰 amount",amountIn, "슬리피지 반영된 최소 수령액",minOut, "eth value",ETHvalue)

    //bbt에 대해 user->router approve 필요
    const routerAddress = '0x96999C839c0f32c8a30d981eAbcAB70aBfe668Fb';
    const approveTx = await BBTContract.approve(routerAddress, amountIn);
    const approveReceipt = await approveTx.wait();
    

    if (approveReceipt.status !== 1) {
      console.error('BBT approve transaction failed');
      return false;
    }

  
      const swapTx = await BBTRouterContract.swapTokens(amountIn,minOut,{value : ETHvalue});
      const swapReceipt = await swapTx.wait();
  
      return swapReceipt.status === 1;
     } catch (error) {
       console.error('Error in swap:', error);
       return false;
     }
}

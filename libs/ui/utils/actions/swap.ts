import { usePoolStatus } from '@soulBase/util/src/hooks/usePoolStatus';
import { BBTActionType } from '@soulBase/util/src/types';
import { parseUnits } from 'ethers';
export async function swap({
  BBTContract,
  BBTRouterContract,
  payload: { tokenAmount, ethAmount, minAmountOut },
}: BBTActionType<{ tokenAmount; ethAmount; minAmountOut }>): Promise<boolean> {
  try {

    const amountIn = parseUnits(Number(tokenAmount).toFixed(18), 18);// toFixed 사용하기 위해 명시적으로 Number로 변환
    const minOut = parseUnits(Number(minAmountOut).toFixed(18), 18); 
    const ETHvalue = ethAmount
      ? parseUnits(Number(ethAmount).toFixed(18), 18)
      : undefined;

    console.log(
      '토큰 amount',
      amountIn,
      '슬리피지 반영된 최소 수령액',
      minOut,
      'eth value',
      ETHvalue,
    );

    //bbt에 대해 user->router approve 필요
    const routerAddress = '0x96999C839c0f32c8a30d981eAbcAB70aBfe668Fb';
    const approveTx = await BBTContract.approve(routerAddress, amountIn);
    const approveReceipt = await approveTx.wait();

    if (approveReceipt.status !== 1) {
      console.error('BBT approve transaction failed');
      return false;
    }

    const swapTx = await BBTRouterContract.swapTokens(amountIn, minOut, {
      value: ETHvalue,
    });
    const swapReceipt = await swapTx.wait();

    return swapReceipt.status === 1;
  } catch (error) {
    console.error('Error in swap:', error);
    return false;
  }
}

import { BBTActionType } from '@soulBase/util/src/types';
import { parseUnits } from 'ethers';

export async function addLiquidity({
  BBTRouterContract,
  BBTContract,
  payload: { tokenAmount, ethAmount },
}: BBTActionType<{
  tokenAmount: number;
  ethAmount: number;
}>): Promise<boolean> {
  if (!BBTContract || !BBTRouterContract) {
    console.error('Required contract is missing');
    return false;
  }
  try {
    const bbtAmount = parseUnits(String(tokenAmount), 18);
    const polAmount = parseUnits(String(ethAmount), 18);

    const routerAddress = '0x96999C839c0f32c8a30d981eAbcAB70aBfe668Fb';

    //유저의 bbt 라우터에 대해 approve
    const approveTx = await BBTContract.approve(routerAddress, bbtAmount);
    const approveReceipt = await approveTx.wait();

    if (approveReceipt && approveReceipt.status !== 1) {
      console.error('BBT approve transaction failed');
      return false;
    }

    const tx = await BBTRouterContract.addLiquidity(bbtAmount, {
      value: polAmount,
    });

    const receipt = await tx.wait();
    if (!receipt) return false;
    return receipt.status === 1;
  } catch (error) {
    console.error('Add liquidity error:', error);
    return false;
  }
}

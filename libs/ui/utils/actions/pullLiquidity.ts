import { BBTActionType } from '@soulBase/util/src/types';
import { parseUnits } from 'ethers';

export async function pullLiquidity({
  BBTRouterContract
}): Promise<boolean> {
  try {
    const tx = await BBTRouterContract.pullLiquidity();

    const receipt = await tx.wait();

    return receipt.status===1;
  } catch (error) {
    console.error('Pull liquidity error:', error);
    return false;
  }
}

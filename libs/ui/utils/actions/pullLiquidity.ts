import { BBTActionType } from '@soulBase/util/src/types';

export async function pullLiquidity({
  BBTRouterContract,
}: BBTActionType): Promise<boolean> {
  try {
    if (!BBTRouterContract) return false;
    const tx = await BBTRouterContract.pullLiquidity();

    const receipt = await tx.wait();
    if (!receipt) return false;

    return receipt.status === 1;
  } catch (error) {
    console.error('Pull liquidity error:', error);
    return false;
  }
}

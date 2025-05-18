import { SBTActionType } from '@soulBase/util/src/types';

export async function sbtMinter({
  contract,
  payload: { to, metadataJSON_url },
}: SBTActionType<{ to: string; metadataJSON_url: string }>): Promise<boolean> {
  try {
    
    const tx = await contract.mintSBT(to, metadataJSON_url);
    const receipt = await tx.wait();
    return receipt.status === 1;
  } catch (error) {
    console.error('Error in sbtMinter:', error);
    return false;
  }
}

import { BaseContract } from 'ethers';

export const checkOwner = async (contract: BaseContract, account: string) => {
  if (contract && account) {
    const owner = await contract.owner();
    return owner.toLowerCase() === account.toLowerCase();
  }
  return false;
};

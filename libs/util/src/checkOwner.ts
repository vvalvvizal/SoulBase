import { Contract } from 'ethers';

export const checkOwner = async (contract: Contract, account: string) => {
  if (contract && account) {
    const owner = await contract.owner();
    return owner.toLowerCase() === account.toLowerCase();
  }
  return false;
};

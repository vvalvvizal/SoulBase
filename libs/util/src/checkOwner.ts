export const checkOwner = async (SBTRouterContract, account: string) => {
  if (SBTRouterContract && account) {
    const owner = await SBTRouterContract.owner();
    return owner.toLowerCase() === account.toLowerCase();
  }
  return false;
};

export const checkOwner = async (
  contract: { owner: () => Promise<string> },
  account: string,
) => {
  if (contract && account) {
    const owner = await contract.owner();
    return owner.toLowerCase() === account.toLowerCase();
  }
  return false;
};

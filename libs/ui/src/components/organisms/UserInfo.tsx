import { useAccount } from '@soulBase/util/src/hooks/useAccount';
import { useEffect, useState } from 'react';
import { BaseComponent } from '@soulBase/util/src/types';
import { useContracts } from '@soulBase/util/src/hooks/useContracts';
import { checkOwner } from '@soulBase/util/src/hooks/checkOwner';

export const UserInfo = ({ className }: BaseComponent) => {
  const { account, balance, isConnected, initializeWeb3Provider } = useAccount();
  const { LPcontract } = useContracts(account, isConnected);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  
    useEffect(() => {
      initializeWeb3Provider();

    }, [account]);
  
    useEffect(() => {
      const fetchOwner = async () => {
        if (LPcontract && account) {
          const ownerStatus = await checkOwner(LPcontract, account);
          setIsOwner(ownerStatus);
        }
      };
      fetchOwner();
    }, [LPcontract, account]);



  return (
    <div className={className}>
      <div className="flex gap-3">
        <img
          src="/user-pattern.jpg"
          width={300}
          height={300}
          alt=""
          className="rounded-full w-16 h-16"
        />
        <div>
          <div className="mb-2 pr-6">
            <span className="text-gray-600 break-all">{account}</span>
            {isOwner ? (
              <span className="ml-2 border border-black shadow-lg px-2 mt-1 py-1 rounded-full">
                Contract Owner
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-2 bg-gray-200 p-2 text-right rounded">
        <div className="font-semibold">Balance</div>
        <p className="text-gray-600 font-light text-2xl">
          {Number(balance).toFixed(4)} POL
        </p>
      </div>
    </div>
  );
};

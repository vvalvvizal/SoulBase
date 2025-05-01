import {ethers} from 'ethers';

export const getProvider = async()=>{
    if (!window?.ethereum) {
      throw new Error('No Ethereum provider found');
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.getNetwork();//네트워크 정보 로딩
    return provider;
  
  }
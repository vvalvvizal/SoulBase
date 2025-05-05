import { BBTActionType } from "@soulBase/util/src/types";
import { parseUnits } from "ethers";


export async function swap({
    BBTContract, BBTRouterContract, payload:{tokenAmount, minAmountOut},
}: BBTActionType<{tokenAmount, minAmountOut}>):Promise<boolean>{
    try{
        const amountIn = parseUnits(String(tokenAmount), 18);
        const minOut = parseUnits(String(minAmountOut), 18);//반환값 BigNumber

        //bbt에 대해 user->router approve 필요 
        const routerAddress = '0x96999C839c0f32c8a30d981eAbcAB70aBfe668Fb';
        const approveTx = await BBTContract.approve(routerAddress, amountIn);
        await approveTx.wait();
    
        const tx = await BBTRouterContract.swapTokens(amountIn, minOut);
        const receipt = await tx.wait();
        return receipt.status === 1;  
    }
    catch(error){
        console.log('Error in swap:', error);
        return false;
    }
}
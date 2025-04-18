import { ActionType } from "@soulBase/util/src/types";

export async function sbtMinter({contract,payload:{to, tokenId, metadataJSON_url},}:ActionType<{to:string, tokenId:string, metadataJSON_url:string}>): Promise<boolean>{
    try {
        const tx = await contract.Mint(to, tokenId, metadataJSON_url);
        const receipt = await tx.wait();
        return receipt.status === 1;
    } catch (error) {
        console.error("Error in sbtMinter:", error);
        return false;
    }

}

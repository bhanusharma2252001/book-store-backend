import { getNumericIncrementIdFromPurchaseHistory } from "./getNumericIncrementIdFromPurchaseHistory";

export async function generatePurchaseId(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
    const numericIncrementId = await getNumericIncrementIdFromPurchaseHistory(); 

    const purchaseId = `${year}-${month}-${Number(numericIncrementId) + 1}`;
    return purchaseId;
}




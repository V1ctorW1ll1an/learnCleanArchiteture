import { ICacheStore } from "@/data/protocols/cache/cacheStore";

class LocalSavePurchases {
    constructor(private readonly cacheStore: ICacheStore) {}

    public async savePurchases(): Promise<void> {
        const key = "purchases";
        this.cacheStore.delete({ key });
    }
}

export { LocalSavePurchases };

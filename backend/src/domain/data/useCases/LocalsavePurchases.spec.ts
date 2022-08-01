interface ICacheStore {
    delete({ key }: { key: string }): Promise<void>;
}

interface ISutFactory {
    sut: LocalSavePurchases;
    cacheStore: CacheStoreSpay;
}

class LocalSavePurchases {
    constructor(private readonly cacheStore: ICacheStore) {}

    public async savePurchases(): Promise<void> {
        const key = "purchases";
        this.cacheStore.delete({ key });
    }
}

class CacheStoreSpay implements ICacheStore {
    public deleteCallsCount = 0;
    public key = "";
    public async delete({ key }: { key: string }): Promise<void> {
        this.deleteCallsCount++;
        this.key = key;
    }
}

const sutFactory = (): ISutFactory => {
    const cacheStore = new CacheStoreSpay();
    const sut = new LocalSavePurchases(cacheStore);
    return { sut, cacheStore };
};

describe("LocalSavePurchases", () => {
    it("Should not delete cache on sut.init", () => {
        const { cacheStore } = sutFactory();

        expect(cacheStore.deleteCallsCount).toBe(0);
    });

    it("Should delete old cache on sut.save", async () => {
        const { sut, cacheStore } = sutFactory();

        await sut.savePurchases();

        expect(cacheStore.deleteCallsCount).toBe(1);
    });

    it("Should invoke delete method with the correct key", async () => {
        const { sut, cacheStore } = sutFactory();

        sut.savePurchases();

        expect(cacheStore.key).toBe("purchases");
    });
});

interface ICacheStore {
    delete(): Promise<void>;
}

interface ISutFactory {
    sut: LocalSavePurchases;
    cacheStore: CacheStoreSpay;
}

class LocalSavePurchases {
    constructor(private readonly cacheStore: ICacheStore) {}

    public async savePurchases(): Promise<void> {
        this.cacheStore.delete();
    }
}

class CacheStoreSpay implements ICacheStore {
    public deleteCallsCount = 0;
    public async delete(): Promise<void> {
        this.deleteCallsCount++;
    }
}

const sutFactory = (): ISutFactory => {
    const cacheStore = new CacheStoreSpay();
    const sut = new LocalSavePurchases(cacheStore);
    return { sut, cacheStore };
};

describe("LocalSavePurchases", () => {
    it("Should not delete cache on sut.init", () => {
        // Arrange
        const { cacheStore } = sutFactory();

        // assert
        expect(cacheStore.deleteCallsCount).toBe(0);
    });

    it("Should delete old cache on sut.save", async () => {
        // Arrange
        const { sut, cacheStore } = sutFactory();

        // Act
        await sut.savePurchases();

        // assert
        expect(cacheStore.deleteCallsCount).toBe(1);
    });
});

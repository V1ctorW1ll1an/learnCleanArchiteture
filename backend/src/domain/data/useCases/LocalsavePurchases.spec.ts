interface ICacheStore {}

class LocalSavePurchases {
    constructor(private readonly cacheStore: ICacheStore) {}
}

class CacheStoreSpay implements ICacheStore {
    public deleteCallsCount = 0;
}

describe("LocalSavePurchases", () => {
    it("Should not delete cache on sut.init", () => {
        // Arrange
        const cacheStore = new CacheStoreSpay();
        new LocalSavePurchases(cacheStore);

        // assert
        expect(cacheStore.deleteCallsCount).toBe(0);
    });
});

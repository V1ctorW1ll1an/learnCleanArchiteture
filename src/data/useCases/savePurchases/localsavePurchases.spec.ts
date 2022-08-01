import { ICacheStore } from "@/data/protocols/cache/cacheStore";
import { LocalSavePurchases } from "./localSavePurchases";

interface ISutFactory {
    sut: LocalSavePurchases;
    cacheStore: CacheStoreSpay;
}

class CacheStoreSpay implements ICacheStore {
    public deleteCallsCount = 0;
    public insertionCallsCount = 0;
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

        await sut.savePurchases();

        expect(cacheStore.deleteCallsCount).toBe(1);
        expect(cacheStore.key).toBe("purchases");
    });

    it("Should not insert new cache if delete fails", async () => {
        const { sut, cacheStore } = sutFactory();

        // TODO - study this
        // cacheStore.delete = jest.fn(() => {
        //     throw new Error();
        // });
        jest.spyOn(cacheStore, "delete").mockImplementation(() => {
            throw new Error();
        });
        const promise = sut.savePurchases();

        expect(cacheStore.insertionCallsCount).toBe(0);
        expect(promise).rejects.toThrow();
    });
});

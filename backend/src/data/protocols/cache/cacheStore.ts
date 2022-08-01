interface ICacheStore {
    delete({ key }: { key: string }): Promise<void>;
}

export { ICacheStore };

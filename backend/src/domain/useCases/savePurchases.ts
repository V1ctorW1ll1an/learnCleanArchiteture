interface ISavePurchases {
    savePurchases(purchases: Array<ISavePurchases.Props>): Promise<void>;
}
namespace ISavePurchases {
    export type Props = {
        id: string;
        date: Date;
        value: number;
    };
}

export { ISavePurchases };

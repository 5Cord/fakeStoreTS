
export interface Product {
    title: string;
    price: number;
    specs: {
        processor: string;
        ram: string;
        graphics: string;
        storage: string;
    };
}
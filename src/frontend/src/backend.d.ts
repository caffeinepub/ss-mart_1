import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Banner {
    title: string;
    discountText: string;
    subtitle: string;
}
export interface StoreInfo {
    hours: string;
    tagline: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}
export interface Category {
    icon: string;
    name: string;
    description: string;
}
export interface Product {
    originalPrice?: bigint;
    name: string;
    category: string;
    badge?: string;
    price: bigint;
}
export interface backendInterface {
    getBanner(id: string): Promise<Banner>;
    getBanners(): Promise<Array<Banner>>;
    getCategories(): Promise<Array<Category>>;
    getCategory(id: string): Promise<Category>;
    getProduct(id: string): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getStoreInfo(): Promise<StoreInfo>;
}

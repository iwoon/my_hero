export interface Product {
    productId: string,
    name: string,
    image: string,
    stock: number,
    price: number,
    categoryId: string
}

export interface ProductResponse {
    productId: string,
    name: string,
    image: string,
    stock: number,
    price: number,
    categoryName: string
}

export interface CategoryResponse {
    name: string;
    categoryId: string;
}

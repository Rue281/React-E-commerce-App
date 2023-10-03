export interface Products {
    results:  number;
    metadata: Metadata;
    data:     Product[];
}

export interface Product {
    _id:                 string;
    title:               string;
    slug:                string;
    description:         string;
    quantity:            number;
    sold:                number;
    price:               number;
    imageCover:          string;
    images:              string[];
    category:            Brand;
    subcategory:         Brand[];
    brand:               Brand;
    ratingsAverage:      number;
    ratingsQuantity:     number;
    createdAt:           Date;
    updatedAt:           Date;
    id:                  string;
    priceAfterDiscount?: number;
    availableColors?:    any[];
}

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: Category;
}

export enum Category {
    The6407E96C5Bbc6E43516931D7 = "6407e96c5bbc6e43516931d7",
    The6407Ea145Bbc6E43516931Dc = "6407ea145bbc6e43516931dc",
    The6407Ea725Bbc6E43516931E2 = "6407ea725bbc6e43516931e2",
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
    nextPage:      number;
}

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc'
}
export enum SortPropertyType {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title'
}

export interface ISortItem {
  id: number,
  name: string,
  sortProperty: SortPropertyType,
  order: OrderType
}

// export interface IPizzaItem {
//   id: string;
//   title: string;
//   imageUrl: string;
//   types: number[];
//   sizes: number[];
//   price: number;
//   category: number;
//   rating: number;
//   count?: number
// }

export interface IProduct {
  id: string;
  title: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  count?: number
}

export type ICartProductOmit = Omit<IProduct, 'sizes' | 'types' | 'category' | 'rating'>;
export interface ICartProduct extends ICartProductOmit {
  type: string;
  size: number;
}

// export interface ICartProduct extends IProduct<Omit keyof "sizes" | 'types'>{
//   id: string;
//   title: string;
//   imageUrl: string;
//   type: string;
//   size: number;
//   price: number;
//   count: number
// }

export interface SortParams {
  category: number | null,
  sortBy: string,
  order: string,
  title: null | string,
  page: number,
  limit: number,
}
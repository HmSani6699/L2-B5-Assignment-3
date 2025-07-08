import { Model } from "mongoose";

export interface IBooks {
  title: string;
  auther: string;
  genre: string;
  isbn: string;
  decription: string;
  copies: number;
  available: boolean;
}

export interface BookMethods extends Model<IBooks> {
  getFilterBook(
    filter: string,
    sortBy: string,
    sort: string,
    limit: number
  ): Promise<any>;
}

import { ExistingItem } from "./item";

export interface Store {
  totalQuantity: number;
  noOfItems: number;
  items: ExistingItem[]
}

export interface TradeItemRequest {
  quantity: number;
}

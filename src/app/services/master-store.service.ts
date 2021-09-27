import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { replaceItemID } from '@utils/replace-itemid';
import { API_MASTER_STORE } from '@config/api-urls';
import { Item, MessageResponse, Store, TradeItemRequest } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class MasterStoreService {

  constructor(private readonly http: HttpClient) { }

  getItems(): Observable<Store> {
    return this.http.get<Store>(API_MASTER_STORE.items);
  }

  addItem(newItem: Item): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(API_MASTER_STORE.items, newItem);
  }

  deleteItem(deleteItemId: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(replaceItemID(API_MASTER_STORE.item, deleteItemId));
  }

  updateItem(updateItemId: string, updateItemDetails: Item): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(replaceItemID(API_MASTER_STORE.item, updateItemId), updateItemDetails);
  }

  buyItemQuantities(buyItemId: string, buyItemDetails: TradeItemRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(replaceItemID(API_MASTER_STORE.buyItem, buyItemId), buyItemDetails);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_MASTER_STORE, placeholderItemID } from '@config/api-urls';
import { Item, MessageResponse, Store } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class MasterStoreService {

  constructor(private readonly http: HttpClient) { }

  private replaceItemID(url: string, itemId: string): string {
    return url.replace(placeholderItemID, itemId);
  }

  getItems(): Observable<Store> {
    return this.http.get<Store>(API_MASTER_STORE.items);
  }

  addItem(newItem: Item): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(API_MASTER_STORE.items, newItem);
  }

  deleteItem(deleteItemId: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(this.replaceItemID(API_MASTER_STORE.item, deleteItemId));
  }

  updateItem(updateItemId: string, updateItemDetails: Item): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(this.replaceItemID(API_MASTER_STORE.item, updateItemId), updateItemDetails);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { replaceItemID } from '@utils/replace-itemid';
import { API_USER_STORE } from '@config/api-urls';
import { MessageResponse, Store, TradeItemRequest } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(private readonly http: HttpClient) { }

  getItems(): Observable<Store> {
    return this.http.get<Store>(API_USER_STORE.items);
  }

  sellItemQuantities(sellItemId: string, sellItemDetails: TradeItemRequest): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(replaceItemID(API_USER_STORE.sellItem, sellItemId), sellItemDetails);
  }

  sellItem(sellItemId: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(replaceItemID(API_USER_STORE.item, sellItemId));
  }
}

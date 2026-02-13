import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { ICollectionItemDTO } from '../../interfaces/collection-item-dto';
import { map, Observable } from 'rxjs';
import { CollectionItem } from '../../models/collection-item';

@Injectable({
  providedIn: 'root',
})
export class CollectionItemService {

  private readonly baseURL = 'http://localhost:3000';
  private readonly itemsEndpoint = this.baseURL + '/items';
  private readonly http = inject(HttpClient);

  getAll(): Observable<CollectionItem[]> {
    return this.http.get<ICollectionItemDTO[]>(this.itemsEndpoint).pipe(
      map(itemJsonArray => {
        return itemJsonArray.map(
          itemJson => CollectionItem.fromDTO(itemJson)
        );
      })
    );
  }

  get(itemId: number): Observable<CollectionItem> {
    const url = `${this.itemsEndpoint}/${itemId}`;
    return this.http.get<ICollectionItemDTO>(url).pipe(
      map(itemJson => CollectionItem.fromDTO(itemJson))
    );
  }

  add(item: CollectionItem): Observable<void> {
    return this.http.post<void>(this.itemsEndpoint, item.toDTO());
  }

  update(item: CollectionItem): Observable<void> {
    const url = `${this.itemsEndpoint}/${item.id}`;
    return this.http.put<void>(url, item.toDTO());
  }

  delete(item: CollectionItem): Observable<void> {
    const url = `${this.itemsEndpoint}/${item.id}`;
    return this.http.delete<void>(url);
  }

}
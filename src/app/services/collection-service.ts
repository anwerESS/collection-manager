import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ICollectionDTO } from '../interfaces/collection-dto';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private baseURL = 'http://localhost:3000';
  private collectionsEndpoint = this.baseURL + '/collections';

  private http = inject(HttpClient);

  selectedCollection = signal<Collection | null>(null);


  getAll(): Observable<Collection[]> {
    return this.http.get<ICollectionDTO[]>(this.collectionsEndpoint).pipe(
      map(collectionJsonArray => {
        return collectionJsonArray.map(
          collectionJson => Collection.fromDTO(collectionJson)
        );
      })
    );
  }

  get(collectionId: number): Observable<Collection> {
    const url = `${this.collectionsEndpoint}/${collectionId}`;
    return this.http.get<ICollectionDTO>(url).pipe(
      map(collectionJson => Collection.fromDTO(collectionJson))
    );
  }

}

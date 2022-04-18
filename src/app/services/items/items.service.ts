import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, Item } from 'src/app/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  protected readonly endpointBaseUrl = `${environment.apiBaseUrl}/items`;

  constructor(private http: HttpClient) { }

  // CRUD OPERATIONS
  // ---------------
  /*
  GET retrieves a representation of the resource at the specified URI. The body of the response message contains the details of the requested resource.
  POST creates a new resource at the specified URI. The body of the request message provides the details of the new resource. Note that POST can also be used to trigger operations that don't actually create resources.
  PUT either creates or replaces the resource at the specified URI. The body of the request message specifies the resource to be created or updated.
  PATCH performs a partial update of a resource. The request body specifies the set of changes to apply to the resource.
  DELETE removes the resource at the specified URI.
  */

  /**
   * ! CREATE operation
   * @name createItems
   * @description It creates a list of items
   * @param payloadItems
   * @returns an observable that emits a list of items created. ⚠️ Make sure to unsubscribe from the observable when is no longer required to avoid memory leaks
   */
  createItem(item: Item) {
    return this.http.post<ApiResponse<Item>>(this.endpointBaseUrl, item);
  }

  /**
   * ! READ operation
   * @name getItems
   * @description It retrieves a list of items from the API
   * @returns an observable that emits a list of items. ⚠️ Make sure to unsubscribe from the observable when is no longer required to avoid memory leaks
   */
  getItems(): Observable<ApiResponse<Item[]>> {
    return this.http.get<ApiResponse<Item[]>>(this.endpointBaseUrl);
  }

  /**
   * ! UPDATE operation
   * @name updateItems
   * @description It updates a group of items (a.k.a. resources) by resource Id.
   * The HTTP PUT request method creates a new resource or replaces a
   * representation of the target resource with the request payload.
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT
   * Meanwhile, the HTTP PATCH request method applies partial modifications
   * to a resource. https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
   * @param obj list of objects that will be updated/created totally (put overwrite) or partially modified (patch)
   * @param upsert boolean flag to indicate the behaviour if the resource trying to be updated is not in the database. If true, creates a new object.
   * @returns an observable that emits a list of the resources updated/created. ⚠️ Make sure to unsubscribe from the observable when is no longer required to avoid memory leaks
   */
  updateItem(obj: Item, upsert: boolean) {
    if (upsert) {
      // PUT (overwrites or creates a resource)
      return this.http.put<ApiResponse<Item>>(`${this.endpointBaseUrl}/${obj.id}`, obj);
    } else {
      // PATCH (partial modifications to a resource)
      return this.http.patch<ApiResponse<Item>>(`${this.endpointBaseUrl}/${obj.id}`, obj);
    }
  }

  deleteOneById(idToDelete: string) {
    // Deletion of a single resource
    // It identifies the resource to delete by the URL PARAM "id" sent in the request
    return this.http.delete<ApiResponse<Item>>(`${this.endpointBaseUrl}/${idToDelete}`);
  }

}

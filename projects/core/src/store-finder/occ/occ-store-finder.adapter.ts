import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StoreFinderSearchConfig, LongitudeLatitude } from '../model/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import {
  StoreFinderSearchPage,
  StoreCountList,
  PointOfService,
} from '../../model/store.model';
import { StoreFinderAdapter } from '../connectors/store-finder.adapter';

const STORES_ENDPOINT = 'stores';

@Injectable({ providedIn: 'root' })
export class OccStoreFinderAdapter implements StoreFinderAdapter {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: LongitudeLatitude
  ): Observable<StoreFinderSearchPage> {
    return this.callOccFindStores(query, searchConfig, longitudeLatitude);
  }

  loadCount(): Observable<StoreCountList> {
    const storeCountUrl = this.getStoresEndpoint('storescounts');

    return this.http
      .get(storeCountUrl)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  load(storeId: string): Observable<PointOfService> {
    const storeDetailsUrl = this.getStoresEndpoint(storeId);
    const params = { fields: 'FULL' };

    return this.http
      .get(storeDetailsUrl, { params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected callOccFindStores(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: LongitudeLatitude
  ): Observable<StoreFinderSearchPage> {
    const url = this.getStoresEndpoint();
    let params: HttpParams = new HttpParams({
      fromString:
        'fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),' +
        'geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email), features),' +
        'pagination(DEFAULT),' +
        'sorts(DEFAULT)',
    });

    if (longitudeLatitude) {
      params = params.set('longitude', String(longitudeLatitude.longitude));
      params = params.set('latitude', String(longitudeLatitude.latitude));
    } else {
      params = params.set('query', query);
    }
    if (searchConfig.pageSize) {
      params = params.set('pageSize', String(searchConfig.pageSize));
    }
    if (searchConfig.currentPage) {
      params = params.set('currentPage', String(searchConfig.currentPage));
    }
    if (searchConfig.sort) {
      params = params.set('sort', searchConfig.sort);
    }

    return this.http.get<StoreFinderSearchPage>(url, { params }).pipe(
      catchError((error: any) => {
        if (error.json) {
          return throwError(error.json());
        }
        return throwError(error);
      })
    );
  }

  protected getStoresEndpoint(url?: string): string {
    const baseUrl = this.occEndpoints.getEndpoint(STORES_ENDPOINT);

    return url ? baseUrl + '/' + url : baseUrl;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiFormat, ApiResponse } from '@dilta/platform-shared';
import { AbstractTransportService } from './transport.service';

// const REQUEST_TIME_OUT = 2000;
const REQUEST_TIME_OUT = 200000;

@Injectable({
  providedIn: 'root'
})
export class WebTransportService extends AbstractTransportService {
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * sends the JSON query to the main process event
   *
   */
  bus<ResponseType>(ctx: ApiFormat): Promise<ApiResponse<ResponseType>> {
    return this.http.post<ApiResponse<ResponseType>>('http://localhost:3000/api/actions', ctx)
    .toPromise();
  }

}

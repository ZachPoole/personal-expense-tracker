import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorOptionsApi {
  private http = inject(HttpClient);
  private basePath = 'http://localhost:5219/api';

  getColorOptions(): Observable<any> {
    return this.http.get(`${this.basePath}` + '/colorOptions');
  }
}

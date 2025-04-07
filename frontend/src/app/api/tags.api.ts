import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsApi {
  private http = inject(HttpClient);
  private basePath = 'http://localhost:5219/api';

  getTags(): Observable<any> {
    return this.http.get(`${this.basePath}` + '/tags');
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tag } from '../store/tags/tags.model';

@Injectable({
  providedIn: 'root',
})
export class TagsApi {
  private http = inject(HttpClient);
  private basePath = 'http://localhost:5219/api/tags';

  getTags(): Observable<Array<Tag>> {
    return this.http
      .get<{ items: Tag[] }>(`${this.basePath}` + '/')
      .pipe(map((tags) => tags.items || []));
  }
}

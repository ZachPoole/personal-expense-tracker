import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ColorOption } from '../store/colorOptions/colorOptions.model';

@Injectable({
  providedIn: 'root',
})
export class ColorOptionsApi {
  private http = inject(HttpClient);
  private basePath = 'http://localhost:5219/api/colorOptions';

  getColorOptions(): Observable<Array<ColorOption>> {
    return this.http
      .get<ColorOption[]>(`${this.basePath}` + '/')
      .pipe(map((colorOptions) => colorOptions || []));
  }
}

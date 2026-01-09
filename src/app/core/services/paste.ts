import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreatePasteInput, Paste, UpdatePasteInput } from '../models/paste.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasteService {
  private apiUrl = `${environment.apiUrl}/pastes`;

  constructor(private http: HttpClient) {}

  createPaste(data: CreatePasteInput): Observable<Paste> {
    return this.http.post<Paste>(this.apiUrl, data);
  }

  getPasteById(id: string): Observable<Paste> {
    return this.http.get<Paste>(`${this.apiUrl}/${id}`);
  }

  getPublicPastes(page: number = 1, limit: number = 20): Observable<Paste[]> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    return this.http.get<Paste[]>(`${this.apiUrl}/public`, { params });
  }

  getUserPastes(): Observable<Paste[]> {
    return this.http.get<Paste[]>(`${this.apiUrl}/me`);
  }
  updatePaste(id: string, data: UpdatePasteInput): Observable<Paste> {
    return this.http.put<Paste>(`${this.apiUrl}/${id}`, data);
  }

  deletePaste(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

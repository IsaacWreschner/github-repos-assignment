import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Repo {
  name: string;
  url: string;
  private: boolean;
}

export interface RepoResponse {
  totalCount: number;
  repos: Repo[];
  from: number;
  to: number;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class RepoService {
  private baseUrl = 'http://localhost:3000'; // your API URL

  constructor(private http: HttpClient) {}

  getRepos(orgName: string, from: number, to: number): Observable<{ repos: Repo[], totalCount: number }> {
    return this.http.get<{ repos: Repo[], totalCount: number }>(
      `http://localhost:3000/org/${orgName}/repos?from=${from}&to=${to}`
    );
  }
}
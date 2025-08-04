import { Component, OnInit, ViewChild } from '@angular/core';
import { Repo, RepoService } from '../services/repo.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repo-list',
  imports: [
    MatPaginatorModule,
    MatListModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  templateUrl: './repo-list.html',
  styleUrl: './repo-list.scss',
  standalone: true
})
export class RepoListComponent {
  orgName = 'remix-run'; // default
  repos: Repo[] = [];
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private repoService: RepoService) {}

  search(): void {
    this.currentPage = 0;
    this.loadRepos();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadRepos();
  }

  private loadRepos(): void {
    const from = this.currentPage * this.pageSize;
    const to = from + this.pageSize;

    this.repoService.getRepos(this.orgName, from, to).subscribe({
      next: response => {
        this.repos = response.repos;
        this.totalCount = response.totalCount;
      },
      error: err => {
        console.error('Failed to load repos:', err);
        this.repos = [];
        this.totalCount = 0;
      }
    });
  }
}

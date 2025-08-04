import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';
import { Repo, RepoService } from '../services/repo.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-repo-list',
  imports: [
    MatPaginatorModule,
    MatListModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './repo-list.html',
  styleUrl: './repo-list.scss',
  standalone: true
})
export class RepoListComponent {
  orgName = '';
  repos: Repo[] = [];
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;
  isLoading = false;
  errorMessage = '';

  constructor(
    private repoService: RepoService,
    private cdr: ChangeDetectorRef // ✅ inject ChangeDetectorRef
  ) {}

  search(): void {
    this.currentPage = 0;
    this.loadRepos();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    console.log(this.pageSize, this.currentPage)
    this.cdr.detectChanges()
    this.loadRepos();
  }

  private loadRepos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges(); // ✅ force CD immediately if needed

    const from = this.currentPage * this.pageSize;
    const to = from + this.pageSize;

    this.repoService.getRepos(this.orgName, from, to).subscribe({
      next: (response) => {
        this.repos = response.repos;
        this.totalCount = response.totalCount;
        this.isLoading = false;
        this.cdr.detectChanges(); // ✅ trigger CD after async work
      },
      error: (err) => {
        this.repos = [];
        this.totalCount = 0;
        this.isLoading = false;
        this.errorMessage =
          `Failed to load repos: ${err.error?.message || err.statusText || 'Unknown error'}`;
        this.cdr.detectChanges(); // ✅ trigger CD after error
      }
    });
  }
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RepoListComponent } from './repo-list/repo-list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [

    RouterOutlet

  ],
  providers: [HttpClient],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('client');
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home],
  template: `<app-home/>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-personal-website');
}

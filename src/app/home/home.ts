import { Component } from '@angular/core';
import { Song } from '../song/song';

@Component({
  selector: 'app-home',
  imports: [Song],
  template: `
    <h1> My Personal Website </h1>
    <app-song/>
  `,
  styleUrl: './home.css',
})
export class Home {}

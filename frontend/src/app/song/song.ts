import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song',
  imports: [],
  template: `
    <h2> Song Component </h2>
    <button (click)="fileInput.click()">Upload song</button>
    <input
      type="file"
      #fileInput
      accept=".wav"
      (change)="onFileSelected($event)"
      hidden
    />
    <p>{{ audioUrl }}</p>
    @if (audioUrl) {
   <audio controls>
      <source [src]="audioUrl" type="audio/wav" />
      Your browser does not support the audio element.
    </audio>  
    }  
    `,
  styleUrl: './song.css',
})
export class Song {
    selectedFile: File | null = null;
  audioUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file && file.type === 'audio/wav') {
      this.selectedFile = file;
      this.uploadFile();
    } else {
      alert('Please select a WAV file');
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/upload', formData, {
      responseType: 'text'
    }).subscribe((response: string) => {
      console.log("SETTING AUDIO URL:", response);
      this.audioUrl = response;
    });  
}
}

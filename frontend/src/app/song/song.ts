import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';




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
    <h3>Uploaded Songs</h3>
    
    @for(song of songs; track song) {
      <div>
          <p>{{ song }}</p>
          <audio [src]="getAudioUrl(song)" controls></audio>
      </div>
    }
    `,
  styleUrl: './song.css',
})
export class Song {
  
  songs: string[] = [];

  ngOnInit() {
    this.loadSongs();
  }

  loadSongs() {
    this.http.get<string[]>('http://localhost:8080/audio')
      .subscribe(data => {
        this.songs = data;
      });
  }  

  selectedFile: File | null = null;
  audioUrl: string | null = null;

  constructor(private http: HttpClient) {}

  getAudioUrl(filename: string): string {
  return `http://localhost:8080/audio/${filename}`;
  }

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

    this.loadSongs();
  }

  getFile() {
    // check if silectedFile is set to a value
    if (!this.selectedFile) return;

    
    const formData = new FormData();
    formData.append('file', this.selectedFile);



    // Copy-pasta
    this.http.post('http://localhost:8080/upload', formData, {
      responseType: 'text'
    }).subscribe((response: string) => {
      console.log("SETTING AUDIO URL:", response);
      this.audioUrl = response;
    })

  }
}

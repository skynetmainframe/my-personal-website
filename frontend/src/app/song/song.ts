import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';




@Component({
  selector: 'app-song',
  imports: [],
  template: `
    <h2> Song Component </h2>

    <h3>Uploaded Songs</h3>
    
    @for (song of songs; track song) {
      <div style="margin-bottom: 10px;">
        <p>{{ song }}</p>

        <audio
          #player
          [src]="getAudioUrl(song)"
          controls
          (play)="onPlay(player)"
          (pause)="onPause(player)"
          (ended)="onEnded(player)">
        </audio>
      </div>
    }
    <button (click)="fileInput.click()">Upload song</button>
    <input
      type="file"
      #fileInput
      accept=".wav"
      (change)="onFileSelected($event)"
      hidden
    /> 

    `,
  styleUrl: './song.css',
})
export class Song {
  
  songs: string[] = [];
  currentAudio: HTMLAudioElement | null = null;

  onPlay(audio: HTMLAudioElement) {

    // If another audio is playing → stop it
    if (this.currentAudio && this.currentAudio !== audio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    // Set new current audio
    this.currentAudio = audio;
  }

  onPause(audio: HTMLAudioElement) {
    if (this.currentAudio === audio) {
      this.currentAudio = null;
    }
  }

  onEnded(audio: HTMLAudioElement) {
    if (this.currentAudio === audio) {
      this.currentAudio = null;
    }
  }  

  ngOnInit() {
    console.log("Starting ngOnit()...")
    this.loadSongs();
  }

  loadSongs() {
   
    this.http.get<string[]>('http://localhost:8080/audio')
      .subscribe(data => {
        this.songs = data;
        console.log("Songs as JSON: ", this.songs);
      });
    
  }  

  selectedFile: File | null = null;
  audioUrl: string | null = null;

  constructor(private http: HttpClient) {}

  getAudioUrl(filename: string): string {
    console.log("Starting getAudioUrl", filename);

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

  // getFile() {
  //   // check if silectedFile is set to a value
  //   if (!this.selectedFile) return;

    
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);



  //   // Copy-pasta
  //   this.http.post('http://localhost:8080/upload', formData, {
  //     responseType: 'text'
  //   }).subscribe((response: string) => {
  //     console.log("SETTING AUDIO URL:", response);
  //     this.audioUrl = response;
  //   })

}

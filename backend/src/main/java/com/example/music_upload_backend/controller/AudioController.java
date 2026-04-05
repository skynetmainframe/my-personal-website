package com.example.music_upload_backend.controller;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AudioController {

    private final Path uploadPath = Paths.get("uploads");
    private static final String UPLOAD_DIR = "C:/Programmierung/my-personal-website/backend/uploads/";

    @GetMapping("/audio/{filename}")
    public ResponseEntity<Resource> getAudio(@PathVariable String filename) throws MalformedURLException {
        Path file = uploadPath.resolve(filename);
        Resource resource = new UrlResource(file.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/wav"))
                .body(resource);
    }

    @GetMapping("/audio")
    public List<String> getAllAudioFiles() {
        // by my assistant
        // File folder = new File(System.getProperty("user.dir") + "/uploads/");
        File folder = new File(UPLOAD_DIR);

        File[] files = folder.listFiles();

        System.out.println("Files found: " + (files == null ? "null" : files.length));
        System.out.println("Foldername: " + folder);

        if (files == null) {
            
            return List.of();
        }

        return Arrays.stream(files)
                .filter(file -> file.isFile())
                .map(File::getName)
                .toList();
    }
}
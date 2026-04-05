package com.example.music_upload_backend.controller;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
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

    // Warning: Right now this allows deleting ANY file on file system.
    @DeleteMapping("/audio/{filename}")
    public ResponseEntity<String> deleteAudio(@PathVariable String filename) {

        // by my Assistant
        // String uploadDir = System.getProperty("user.dir") + "/uploads/";

        File file = new File(UPLOAD_DIR + filename);

        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("File not found");
        }

        boolean deleted = file.delete();

        if (deleted) {
            return ResponseEntity.ok("File deleted");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Could not delete file");
        }
    }    
}
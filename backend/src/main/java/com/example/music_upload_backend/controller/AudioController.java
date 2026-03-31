package com.example.music_upload_backend.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AudioController {

    private final Path uploadPath = Paths.get("uploads");

    @GetMapping("/audio/{filename}")
    public ResponseEntity<Resource> getAudio(@PathVariable String filename) throws MalformedURLException {
        Path file = uploadPath.resolve(filename);
        Resource resource = new UrlResource(file.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/wav"))
                .body(resource);
    }
}
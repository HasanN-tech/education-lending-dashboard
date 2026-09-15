package com.hasan.controller;

import com.hasan.DTO.*;
import com.hasan.service.ApplicationService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService applicationService;


    @GetMapping
    public ResponseEntity<List<ApplicationResponse>>
    getAllApplications() {

        return ResponseEntity.ok(
                applicationService.getAllApplications()
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse>
    getApplication(@PathVariable Long id) {

        return ResponseEntity.ok(
                applicationService.getApplication(id)
        );
    }


    @PostMapping
    public ResponseEntity<ApplicationResponse>
    createApplication(
            @Valid @RequestBody ApplicationRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        applicationService
                                .createApplication(request)
                );
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse>
    updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {

        return ResponseEntity.ok(
                applicationService.updateStatus(
                        id,
                        request
                )
        );
    }


    @GetMapping("/search")
    public ResponseEntity<List<ApplicationResponse>>
    searchApplications(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                applicationService
                        .searchApplications(keyword)
        );
    }


    @GetMapping("/filter/status")
    public ResponseEntity<List<ApplicationResponse>>
    filterByStatus(
            @RequestParam String status) {

        return ResponseEntity.ok(
                applicationService
                        .filterByStatus(status)
        );
    }


    @GetMapping("/filter/course")
    public ResponseEntity<List<ApplicationResponse>>
    filterByCourse(
            @RequestParam String course) {

        return ResponseEntity.ok(
                applicationService
                        .filterByCourse(course)
        );
    }


    @GetMapping("/filter/institution")
    public ResponseEntity<List<ApplicationResponse>>
    filterByInstitution(
            @RequestParam String institution) {

        return ResponseEntity.ok(
                applicationService
                        .filterByInstitution(institution)
        );
    }
}
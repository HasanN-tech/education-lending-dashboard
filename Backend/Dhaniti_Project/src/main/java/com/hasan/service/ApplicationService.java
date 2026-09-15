package com.hasan.service;

import com.hasan.DTO.ApplicationRequest;
import com.hasan.DTO.ApplicationResponse;
import com.hasan.DTO.StatusUpdateRequest;

import java.util.List;

public interface ApplicationService {

    // Get all applications
    List<ApplicationResponse> getAllApplications();

    // Get one application
    ApplicationResponse getApplication(Long id);

    // Create new application
    ApplicationResponse createApplication(
            ApplicationRequest request
    );

    // Update application status
    ApplicationResponse updateStatus(
            Long id,
            StatusUpdateRequest request
    );

    // Search by application ID or student name
    List<ApplicationResponse> searchApplications(
            String keyword
    );

    // Filter by status
    List<ApplicationResponse> filterByStatus(
            String status
    );

    // Filter by course
    List<ApplicationResponse> filterByCourse(
            String course
    );

    // Filter by institution
    List<ApplicationResponse> filterByInstitution(
            String institution
    );

    // Sort by loan amount or credit score
    List<ApplicationResponse> sortApplications(
            String field,
            String direction
    );
}
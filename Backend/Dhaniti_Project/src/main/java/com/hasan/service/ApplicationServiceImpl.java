package com.hasan.service;

import com.hasan.DTO.ApplicationRequest;
import com.hasan.DTO.ApplicationResponse;
import com.hasan.DTO.StatusUpdateRequest;
import com.hasan.entity.Application;
import com.hasan.exception.ResourceNotFoundException;
import com.hasan.repository.ApplicationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl
        implements ApplicationService {


    private final ApplicationRepository applicationRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponse> getAllApplications() {

        return applicationRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ApplicationResponse getApplication(Long id) {

        Application application =
                applicationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Application not found with id: "
                                                + id
                                )
                        );

        return convertToResponse(application);
    }


    @Override
    @Transactional
    public ApplicationResponse createApplication(
            ApplicationRequest request) {


        // Check duplicate Application ID

        if (applicationRepository
                .existsByApplicationId(
                        request.getApplicationId()
                )) {

            throw new IllegalArgumentException(
                    "Application ID already exists: "
                            + request.getApplicationId()
            );
        }


        Application application =
                new Application();


        application.setApplicationId(
                clean(request.getApplicationId())
        );

        application.setStudentName(
                clean(request.getStudentName())
        );

        application.setAge(
                request.getAge()
        );

        application.setStudentState(
                clean(request.getStudentState())
        );

        application.setInstitutionId(
                clean(request.getInstitutionId())
        );

        application.setInstitutionName(
                clean(request.getInstitutionName())
        );

        application.setCourseId(
                clean(request.getCourseId())
        );

        application.setCourseName(
                clean(request.getCourseName())
        );

        application.setCourseDomain(
                clean(request.getCourseDomain())
        );

        application.setCourseFeeInr(
                request.getCourseFeeInr()
        );

        application.setLoanAmountRequestedInr(
                request.getLoanAmountRequestedInr()
        );

        application.setParentMonthlyIncomeInr(
                request.getParentMonthlyIncomeInr()
        );

        application.setExistingMonthlyObligationsInr(
                request.getExistingMonthlyObligationsInr()
        );

        application.setCreditScore(
                request.getCreditScore()
        );

        application.setEmploymentType(
                clean(request.getEmploymentType())
        );

        application.setApplicationDate(
                request.getApplicationDate()
        );

        application.setApplicationStatus(
                cleanStatus(
                        request.getApplicationStatus()
                )
        );

        application.setApplicationChannel(
                clean(request.getApplicationChannel())
        );


        Application savedApplication =
                applicationRepository.save(application);


        return convertToResponse(savedApplication);
    }


    // =========================================================
    // UPDATE STATUS
    // =========================================================

    @Override
    @Transactional
    public ApplicationResponse updateStatus(
            Long id,
            StatusUpdateRequest request
    ) {


        Application application =
                applicationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Application not found with id: "
                                                + id
                                )
                        );


        String newStatus =
                cleanStatus(request.getStatus());


        application.setApplicationStatus(newStatus);


        Application updatedApplication =
                applicationRepository.save(application);


        return convertToResponse(updatedApplication);
    }


    // =========================================================
    // SEARCH
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponse> searchApplications(
            String keyword
    ) {

        if (keyword == null || keyword.trim().isEmpty()) {

            return getAllApplications();
        }


        return applicationRepository
                .searchApplications(keyword.trim())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // FILTER BY STATUS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponse> filterByStatus(
            String status
    ) {

        if (status == null || status.trim().isEmpty()) {

            return getAllApplications();
        }


        return applicationRepository
                .findByApplicationStatus(
                        cleanStatus(status)
                )
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // FILTER BY COURSE
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponse> filterByCourse(
            String course
    ) {

        if (course == null || course.trim().isEmpty()) {

            return getAllApplications();
        }


        return applicationRepository
                .findByCourseName(course.trim())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // FILTER BY INSTITUTION
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponse> filterByInstitution(
            String institution
    ) {

        if (institution == null
                || institution.trim().isEmpty()) {

            return getAllApplications();
        }


        return applicationRepository
                .findByInstitutionName(
                        institution.trim()
                )
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // SORT
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponse> sortApplications(
            String field,
            String direction
    ) {


        // Only allow the fields required by assignment

        if (!field.equals("loanAmountRequestedInr")
                && !field.equals("creditScore")) {

            throw new IllegalArgumentException(
                    "Sorting is allowed only by "
                            + "loanAmountRequestedInr or creditScore"
            );
        }


        Sort.Direction sortDirection;


        if ("desc".equalsIgnoreCase(direction)) {

            sortDirection = Sort.Direction.DESC;

        } else {

            sortDirection = Sort.Direction.ASC;
        }


        Sort sort =
                Sort.by(sortDirection, field);


        return applicationRepository
                .findAll(sort)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // ENTITY → DTO
    // =========================================================

    private ApplicationResponse convertToResponse(
            Application application
    ) {

        return new ApplicationResponse(

                application.getId(),

                application.getApplicationId(),

                application.getStudentName(),

                application.getAge(),

                application.getStudentState(),

                application.getInstitutionId(),

                application.getInstitutionName(),

                application.getCourseId(),

                application.getCourseName(),

                application.getCourseDomain(),

                application.getCourseFeeInr(),

                application.getLoanAmountRequestedInr(),

                application.getParentMonthlyIncomeInr(),

                application.getExistingMonthlyObligationsInr(),

                application.getCreditScore(),

                application.getEmploymentType(),

                application.getApplicationDate(),

                application.getApplicationStatus(),

                application.getApplicationChannel()
        );
    }


    // =========================================================
    // CLEAN STRING
    // =========================================================

    private String clean(String value) {

        if (value == null) {
            return null;
        }


        value = value.trim();


        if (value.isEmpty()) {
            return null;
        }


        return value;
    }


    // =========================================================
    // CLEAN STATUS
    // =========================================================

    private String cleanStatus(String status) {

        status = clean(status);


        if (status == null) {

            return "Unknown";
        }


        // Handle typo

        if (status.equalsIgnoreCase("Aproved")) {

            return "Approved";
        }


        // Normalize known statuses

        if (status.equalsIgnoreCase("approved")) {

            return "Approved";
        }


        if (status.equalsIgnoreCase("rejected")) {

            return "Rejected";
        }


        if (status.equalsIgnoreCase("under review")) {

            return "Under Review";
        }


        if (status.equalsIgnoreCase("submitted")) {

            return "Submitted";
        }


        return status;
    }
}
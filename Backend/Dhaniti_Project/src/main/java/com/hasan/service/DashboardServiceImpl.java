package com.hasan.service;

import com.hasan.DTO.DashboardResponse;
import com.hasan.repository.ApplicationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {


    private final ApplicationRepository applicationRepository;


    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {


        // Total applications

        long totalApplications =
                applicationRepository.count();


        // Approved

        long approvedApplications =
                applicationRepository
                        .countByApplicationStatus(
                                "Approved"
                        );


        // Under Review

        long underReviewApplications =
                applicationRepository
                        .countByApplicationStatus(
                                "Under Review"
                        );


        // Rejected

        long rejectedApplications =
                applicationRepository
                        .countByApplicationStatus(
                                "Rejected"
                        );


        // Total loan amount requested

        BigDecimal totalLoanAmount =
                applicationRepository
                        .getTotalLoanAmount();


        if (totalLoanAmount == null) {

            totalLoanAmount = BigDecimal.ZERO;
        }


        return new DashboardResponse(

                totalApplications,

                approvedApplications,

                underReviewApplications,

                rejectedApplications,

                totalLoanAmount
        );
    }
}
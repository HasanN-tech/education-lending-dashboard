package com.hasan.DTO;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalApplications;

    private long approvedApplications;

    private long underReviewApplications;

    private long rejectedApplications;

    private BigDecimal totalLoanAmount;
}
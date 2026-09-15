package com.hasan.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {

    private Long id;

    private String applicationId;

    private String studentName;

    private Integer age;

    private String studentState;

    private String institutionId;

    private String institutionName;

    private String courseId;

    private String courseName;

    private String courseDomain;

    private BigDecimal courseFeeInr;

    private BigDecimal loanAmountRequestedInr;

    private BigDecimal parentMonthlyIncomeInr;

    private BigDecimal existingMonthlyObligationsInr;

    private BigDecimal creditScore;

    private String employmentType;

    private LocalDate applicationDate;

    private String applicationStatus;

    private String applicationChannel;
}
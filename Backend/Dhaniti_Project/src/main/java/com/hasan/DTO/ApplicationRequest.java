package com.hasan.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {

    @NotBlank
    private String applicationId;

    @NotBlank
    private String studentName;

    @NotNull
    private Integer age;

    private String studentState;

    private String institutionId;

    private String institutionName;

    private String courseId;

    private String courseName;

    private String courseDomain;

    @Positive
    private BigDecimal courseFeeInr;

    @Positive
    private BigDecimal loanAmountRequestedInr;

    @Positive
    private BigDecimal parentMonthlyIncomeInr;

    @Positive
    private BigDecimal existingMonthlyObligationsInr;

    @Min(300)
    @Max(900)
    private BigDecimal creditScore;

    private String employmentType;

    @NotNull
    private LocalDate applicationDate;

    private String applicationStatus;

    private String applicationChannel;
}
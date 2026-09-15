package com.hasan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "application_id", unique = true, nullable = false)
    private String applicationId;

    @Column(name = "student_name")
    private String studentName;

    private Integer age;

    @Column(name = "student_state")
    private String studentState;

    @Column(name = "institution_id")
    private String institutionId;

    @Column(name = "institution_name")
    private String institutionName;

    @Column(name = "course_id")
    private String courseId;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_domain")
    private String courseDomain;

    @Column(name = "course_fee_inr")
    private BigDecimal courseFeeInr;

    @Column(name = "loan_amount_requested_inr")
    private BigDecimal loanAmountRequestedInr;

    @Column(name = "parent_monthly_income_inr")
    private BigDecimal parentMonthlyIncomeInr;

    @Column(name = "existing_monthly_obligations_inr")
    private BigDecimal existingMonthlyObligationsInr;

    @Column(name = "credit_score")
    private BigDecimal creditScore;

    @Column(name = "employment_type")
    private String employmentType;

    @Column(name = "application_date")
    private LocalDate applicationDate;

    @Column(name = "application_status")
    private String applicationStatus;

    @Column(name = "application_channel")
    private String applicationChannel;
}
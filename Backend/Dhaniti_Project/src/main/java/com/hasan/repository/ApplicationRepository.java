package com.hasan.repository;

import com.hasan.entity.Application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {


    Optional<Application> findByApplicationId(
            String applicationId
    );


    boolean existsByApplicationId(
            String applicationId
    );


    List<Application> findByApplicationStatus(
            String applicationStatus
    );


    long countByApplicationStatus(
            String applicationStatus
    );


    List<Application> findByCourseName(
            String courseName
    );


    List<Application> findByInstitutionName(
            String institutionName
    );


    @Query("""
            SELECT a
            FROM Application a
            WHERE LOWER(a.applicationId)
                  LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(a.studentName)
                  LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<Application> searchApplications(
            @Param("keyword") String keyword
    );


    @Query("""
            SELECT COALESCE(SUM(a.loanAmountRequestedInr), 0)
            FROM Application a
            """)
    BigDecimal getTotalLoanAmount();
}
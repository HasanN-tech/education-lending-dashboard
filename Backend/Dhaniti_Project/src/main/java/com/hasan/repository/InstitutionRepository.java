package com.hasan.repository;

import com.hasan.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InstitutionRepository
        extends JpaRepository<Institution, Long> {

    Optional<Institution> findByInstitutionName(String institutionName);
}
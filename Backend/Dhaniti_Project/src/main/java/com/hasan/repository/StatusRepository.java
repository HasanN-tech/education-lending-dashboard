package com.hasan.repository;

import com.hasan.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatusRepository
        extends JpaRepository<Status, Long> {

    Optional<Status> findByStatusNameIgnoreCase(String statusName);
}
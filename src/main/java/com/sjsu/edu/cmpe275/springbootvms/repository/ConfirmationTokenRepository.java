package com.sjsu.edu.cmpe275.springbootvms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.edu.cmpe275.springbootvms.repository.model.ConfirmationToken;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Integer> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
}

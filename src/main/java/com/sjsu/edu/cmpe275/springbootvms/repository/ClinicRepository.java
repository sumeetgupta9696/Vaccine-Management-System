package com.sjsu.edu.cmpe275.springbootvms.repository;

import com.sjsu.edu.cmpe275.springbootvms.repository.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepository extends JpaRepository<Clinic, Integer> {
}

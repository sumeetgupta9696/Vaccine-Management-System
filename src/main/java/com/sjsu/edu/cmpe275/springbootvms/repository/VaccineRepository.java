package com.sjsu.edu.cmpe275.springbootvms.repository;

import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface VaccineRepository extends JpaRepository<Vaccine, String> {

}

package com.sjsu.edu.cmpe275.springbootvms.repository;

import com.sjsu.edu.cmpe275.springbootvms.repository.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface DiseaseRepository extends JpaRepository<Disease, String>  {

}

package com.sjsu.edu.cmpe275.springbootvms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sjsu.edu.cmpe275.springbootvms.repository.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

	@Query("select p from Patient p where p.email=?1 and p.password=?2 and p.loginType=?3")
	Patient checkLogin(String email, String password, String loginType);

	@Query("select p from Patient p where p.email=?1 and p.loginType=?2")
	Patient checkGoogleLogin(String email, String loginType);

	Patient findByEmailIgnoreCase(String email);

	Patient findByMrn(int mrn);

}

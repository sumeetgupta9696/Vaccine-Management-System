package com.sjsu.edu.cmpe275.springbootvms.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.edu.cmpe275.springbootvms.model.LoginRequest;
import com.sjsu.edu.cmpe275.springbootvms.repository.PatientRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Patient;

@Service
public class LoginSignupService implements LoginSignupServiceI {

	@Autowired
	private PatientRepository patientRepo;

	@Override
	public Patient validateLogin(LoginRequest loginReq) {
		try {
			Patient patient = patientRepo.checkLogin(loginReq.getEmail(), loginReq.getPassword(),
					loginReq.getLoginType());
			if (patient != null)
				return patient;
			if (loginReq.getLoginType().equalsIgnoreCase("Google")) {
				Patient oldPatient = patientRepo.checkGoogleLogin(loginReq.getEmail(),
						loginReq.getLoginType());
				if (oldPatient != null)
					return oldPatient;
				
				boolean isAdmin = loginReq.isAdmin();
				String[] emailSplit = loginReq.getEmail().split("@");
				if (emailSplit[1].equalsIgnoreCase("sjsu.edu"))
					isAdmin = true;
				Patient createPatient = new Patient();
				createPatient.setFirstName(loginReq.getFirstName());
				createPatient.setLastName(loginReq.getLastName());
				createPatient.setEmail(loginReq.getEmail());
				createPatient.setLoginType(loginReq.getLoginType());
				createPatient.setAdmin(isAdmin);
				createPatient.setCreatedDate(LocalDateTime.now());
				createPatient.setCreatedBy(loginReq.getFirstName());
				Patient createdPatient = patientRepo.save(createPatient);
				return createdPatient;

			}

		} catch (Exception e) {

		}
		return null;
	}

	@Override
	public Patient createPatient(Patient createPatient) {
		// TODO Auto-generated method stub
		return patientRepo.save(createPatient);
	}

}

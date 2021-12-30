package com.sjsu.edu.cmpe275.springbootvms.service;

import com.sjsu.edu.cmpe275.springbootvms.model.LoginRequest;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Patient;

public interface LoginSignupServiceI {

	Patient validateLogin(LoginRequest loginReq);

	Patient createPatient(Patient createPatient);

}

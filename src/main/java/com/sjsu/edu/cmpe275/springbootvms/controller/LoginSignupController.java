package com.sjsu.edu.cmpe275.springbootvms.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.sjsu.edu.cmpe275.springbootvms.model.ErrorResponse;
import com.sjsu.edu.cmpe275.springbootvms.model.LoginRequest;
import com.sjsu.edu.cmpe275.springbootvms.model.SignupRequest;
import com.sjsu.edu.cmpe275.springbootvms.repository.ConfirmationTokenRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.PatientRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.ConfirmationToken;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Patient;
import com.sjsu.edu.cmpe275.springbootvms.service.EmailSenderService;
import com.sjsu.edu.cmpe275.springbootvms.service.LoginSignupServiceI;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoginSignupController {

	@Autowired
	private LoginSignupServiceI loginSignupSvc;

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;

	@Autowired
	private EmailSenderService emailSenderService;

	@PostMapping(value = "/login")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginReq) {
		try {

			Patient patient = loginSignupSvc.validateLogin(loginReq);
			if (patient == null) {
				ErrorResponse errorResponse = new ErrorResponse("E01", "Invalid Email/Password");

				return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
			}

			else {
				// if (patient.isVerified() == false) {
				// return new ResponseEntity<>("User Not Verified", HttpStatus.OK);
				// }
				return new ResponseEntity<>(patient, HttpStatus.OK);
			}

		} catch (Exception e) {
		}
		return null;
	}

	@PostMapping(value = "/signup")
	public ResponseEntity<?> signup(@RequestBody SignupRequest signupReq) {
		try {
			boolean isAdmin = signupReq.getIsAdmin();
			String[] emailSplit = signupReq.getEmail().split("@");
			if (emailSplit[1].equalsIgnoreCase("sjsu.edu"))
				isAdmin = true;
			Patient createPatient = new Patient();
			createPatient.setFirstName(signupReq.getFirstName());
			createPatient.setLastName(signupReq.getLastName());
			createPatient.setEmail(signupReq.getEmail());
			createPatient.setPassword(signupReq.getPassword());
			createPatient.setStreet(signupReq.getStreet());
			createPatient.setCity(signupReq.getCity());
			createPatient.setState(signupReq.getState());
			createPatient.setCountry(signupReq.getCountry());
			createPatient.setZipcode(signupReq.getZip());
			createPatient.setLoginType("Portal");
			createPatient.setAdmin(isAdmin);
			createPatient.setCreatedDate(LocalDateTime.now());
			createPatient.setCreatedBy(signupReq.getFirstName());
			createPatient.setGender(signupReq.getGender());
//			DateTimeFormatter dtf=DateTimeFormatter.ofPattern("MM/dd/yyyy");
//			LocalDate dob=LocalDate.parse(signupReq.getDob(), dtf);
			createPatient.setDob(LocalDate.parse(signupReq.getDob()));

			Patient patient = loginSignupSvc.createPatient(createPatient);
			if (patient == null) {
				ErrorResponse errorResponse = new ErrorResponse("E02", "Unable to create patient/admin");

				return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			else {
				ConfirmationToken confirmationToken = new ConfirmationToken(patient);

				confirmationTokenRepository.save(confirmationToken);

				SimpleMailMessage mailMessage = new SimpleMailMessage();
				mailMessage.setTo(patient.getEmail());
				mailMessage.setSubject("Complete Registration!");
				mailMessage.setFrom("chand312902@gmail.com");
				mailMessage.setText("To confirm your account, please click here : "
						+ "http://localhost:8080/api/confirm-account?token="
						+ confirmationToken.getConfirmationToken());
				emailSenderService.sendEmail(mailMessage);
				return new ResponseEntity<>(patient, HttpStatus.OK);
			}

		} catch (Exception e) {
			e.printStackTrace() ;
		}
		return null;
	}

	@RequestMapping(value = "/confirm-account", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView confirmUserAccount(ModelAndView modelAndView, @RequestParam("token") String confirmationToken) {
		ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

		if (token != null) {
			Patient patient = patientRepository.findByEmailIgnoreCase(token.getPatient().getEmail());
			patient.setVerified(true);
			Patient newPatient = loginSignupSvc.createPatient(patient);
			System.out.println("confirmed " + newPatient.getFirstName() + "verification " + newPatient.isVerified());
			modelAndView.setViewName("accountVerified");
		} else {
			modelAndView.addObject("message", "The link is invalid or broken!");
			modelAndView.setViewName("error");
		}
		return modelAndView;
	}

}

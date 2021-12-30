package com.sjsu.edu.cmpe275.springbootvms.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.cmpe275.springbootvms.model.AppointmentTime;
import com.sjsu.edu.cmpe275.springbootvms.model.ApptResponse;
import com.sjsu.edu.cmpe275.springbootvms.model.CancelAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.ChangeAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.CreateAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.ErrorResponse;
import com.sjsu.edu.cmpe275.springbootvms.model.UpdateAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.VaccineHistory;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Appointment;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Clinic;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;
import com.sjsu.edu.cmpe275.springbootvms.service.AppointmentServiceI;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppointmentController {

	@Autowired
	private AppointmentServiceI apptmntSvc;

	@GetMapping(value = "/getFutureAppointments")
	public ResponseEntity<?> futureAppointments(@RequestParam("currentDate") String currDate,
			@RequestParam("currentTime") String currTime,@RequestParam("patientId") int patientId) {
		System.out.println("incontroler");
		try {
			List<Appointment> appointmentList = apptmntSvc.getFutureAppointments(currDate, currTime,patientId);
			if (appointmentList != null && appointmentList.size() > 0) {
				return new ResponseEntity<>(appointmentList, HttpStatus.OK);
			} else {
				ErrorResponse errorResponse = new ErrorResponse("E04", "No future Appointments Available");
				return new ResponseEntity<>(errorResponse, HttpStatus.OK);

			}
		} catch (Exception e) {
		}
		return null;
	}

	@GetMapping(value = "/getPastAppointments")
	public ResponseEntity<?> pastAppointments(@RequestParam("currentDate") String currDate,
			@RequestParam("currentTime") String currTime,@RequestParam("patientId") int patientId) {

		try {
			List<Appointment> appointmentList = apptmntSvc.getPastAppointments(currDate, currTime,patientId);
			if (appointmentList != null && appointmentList.size() > 0) {
				return new ResponseEntity<>(appointmentList, HttpStatus.OK);
			} else {
				ErrorResponse errorResponse = new ErrorResponse("E05", "No Past Appointments Available");
				return new ResponseEntity<>(errorResponse, HttpStatus.OK);

			}
		} catch (Exception e) {
		}
		return null;
	}

	@PutMapping(value = "/cancelAppointment")
	public ResponseEntity<?> cacncelAppointment(@RequestBody HashMap<String, Integer> obj) {
		CancelAppointment cancelAppointment = new CancelAppointment();
		System.out.println(obj.get("mrn"));
		cancelAppointment.setAppointmentId(obj.get("appointmentId"));
		cancelAppointment.setClinicId(obj.get("clinicId"));
		int mrn = obj.get("mrn");

		try {
			apptmntSvc.cancelAppointment(cancelAppointment, mrn);

			return new ResponseEntity<>(null, HttpStatus.OK);

		} catch (Exception e) {
		}
		return null;
	}

	@PutMapping(value = "/changeAppointment")
	public ResponseEntity<?> changeAppointment(@RequestBody ChangeAppointment changeAppointment) {

		try {
			apptmntSvc.changeAppointment(changeAppointment);

			return new ResponseEntity<>(null, HttpStatus.OK);

		} catch (Exception e) {
		}
		return null;
	}

	@PostMapping(value = "/createAppointment")
	public ResponseEntity<?> createAppointment(@RequestBody CreateAppointment createAppointment) {

		try {

			Appointment appt = apptmntSvc.createAppointment(createAppointment);

			if (appt != null)
				return new ResponseEntity<>(appt, HttpStatus.OK);
			else {
				ErrorResponse errorResponse = new ErrorResponse("E02",
						"Appointment is already booked for the timeslot or something went wrong");

				return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);

			}

		} catch (Exception e) {

		}
		return null;
	}

	/// getVaccineForAppointment

	@GetMapping(value = "/getVaccineForAppointment")
	public ResponseEntity<?> vaccineForAppointment(@RequestParam("patientId") int patientId) {

		try {
			List<Vaccine> vaccineList = apptmntSvc.vaccineForAppointment(patientId);
			if (vaccineList != null && vaccineList.size() > 0) {
				return new ResponseEntity<>(vaccineList, HttpStatus.OK);
			} else {
				ErrorResponse errorResponse = new ErrorResponse("E05", "No Vaccinations Available");
				return new ResponseEntity<>(errorResponse, HttpStatus.OK);

			}
		} catch (Exception e) {
		}
		return null;
	}

	@PostMapping(value = "/appointmentTimes")
	public ResponseEntity<?> getAppointmentTimes(@RequestBody AppointmentTime appointmentTime) {
		try {
			System.out.println(appointmentTime.getAppointmentDate());
			ApptResponse apptRes = apptmntSvc.getAppointmentTimes(appointmentTime);
			return new ResponseEntity<>(apptRes, HttpStatus.OK);

		} catch (Exception e) {
		}
		return null;
	}

	@GetMapping(value = "/clinics")
	public ResponseEntity<?> getClinics() {
		try {
			List<Clinic> clinicList = apptmntSvc.getClinics();
			return new ResponseEntity<>(clinicList, HttpStatus.OK);

		} catch (Exception e) {
		}
		return null;
	}

	@GetMapping(value = "/vaccines")
	public ResponseEntity<?> getVaccines() {
		try {
			List<Vaccine> vaccineList = apptmntSvc.getVaccines();
			return new ResponseEntity<>(vaccineList, HttpStatus.OK);

		} catch (Exception e) {
		}
		return null;
	}

	@PutMapping(value = "/updateAppointment")
	public ResponseEntity<?> updateAppointment(@RequestBody UpdateAppointment updateAppointment) {

		try {

			apptmntSvc.updateAppointment(updateAppointment);

			return new ResponseEntity<>(null, HttpStatus.OK);

		} catch (Exception e) {

		}
		return null;
	}
	
	@PutMapping(value="/checkin")
	public ResponseEntity<?> checkinAppointment(@RequestParam("appointmentId") int appointmentId) {
		
	
	try {
		apptmntSvc.checkinAppointment(appointmentId);
		return new ResponseEntity<>(null,HttpStatus.OK);
	}
	catch(Exception e) {
		
	}
	return null;
	}
	
	@GetMapping(value="/vaccinationHistory")
	public  ResponseEntity<?>  vaccineHistory(@RequestParam("patientId") int patientId)
	{
		try {
	List<Object> vaccineHistList=apptmntSvc.vaccineHistory(patientId);
//		if(vaccineList.size()>0)
		return new ResponseEntity<>(vaccineHistList,HttpStatus.OK);
		
		}
		catch(Exception e) {
			
		}
		return null;
	}
	
	@GetMapping(value="/vaccinationDue")
	public  ResponseEntity<?>  vaccineDue(@RequestParam("patientId") int patientId)
	{
		try {
	List<Object> vaccineDueList=apptmntSvc.vaccineDue(patientId);
//		if(vaccineList.size()>0)
		return new ResponseEntity<>(vaccineDueList,HttpStatus.OK);
		
		}
		catch(Exception e) {
			
		}
		return null;
	}
	

}

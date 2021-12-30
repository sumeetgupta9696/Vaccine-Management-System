package com.sjsu.edu.cmpe275.springbootvms.service;

import java.util.List;

import com.sjsu.edu.cmpe275.springbootvms.model.AppointmentTime;
import com.sjsu.edu.cmpe275.springbootvms.model.ApptResponse;
import com.sjsu.edu.cmpe275.springbootvms.model.CancelAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.ChangeAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.CreateAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.UpdateAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.VaccineHistory;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Appointment;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Clinic;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;

public interface AppointmentServiceI {

	List<Appointment> getFutureAppointments(String currDate, String currTime,int patientId);

	List<Appointment> getPastAppointments(String currDate, String currTime,int patientId);

	void cancelAppointment(CancelAppointment cancelAppointment, int mrn);

	List<Vaccine> vaccineForAppointment(int patientId);

	void changeAppointment(ChangeAppointment changeAppointment);

	Appointment createAppointment(CreateAppointment createAppointment);

	ApptResponse getAppointmentTimes(AppointmentTime appointmentTime);

	List<Clinic> getClinics();

	List<Vaccine> getVaccines();

	Appointment updateAppointment(UpdateAppointment updateAppointment);

	void checkinAppointment(int appointmentId);

	List<Object> vaccineHistory(int patientId);

	List<Object> vaccineDue(int patientId);

}

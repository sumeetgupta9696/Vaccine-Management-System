package com.sjsu.edu.cmpe275.springbootvms.model;

import java.util.List;

import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;

public class CreateAppointment {

	private int clinicId;
	private String appointmentDate;
	private String appointmentTime;
	private List<String> vaccines;
	private int patientId;
	public int getClinicId() {
		return clinicId;
	}
	public void setClinicId(int clinicId) {
		this.clinicId = clinicId;
	}
	public String getAppointmentDate() {
		return appointmentDate;
	}
	public void setAppointmentDate(String appointmentDate) {
		this.appointmentDate = appointmentDate;
	}
	public String getAppointmentTime() {
		return appointmentTime;
	}
	public void setAppointmentTime(String appointmentTime) {
		this.appointmentTime = appointmentTime;
	}
	public List<String> getVaccines() {
		return vaccines;
	}
	public void setVaccines(List<String> vaccines) {
		this.vaccines = vaccines;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	
	
	
}

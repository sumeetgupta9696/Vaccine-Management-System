package com.sjsu.edu.cmpe275.springbootvms.model;

import java.util.List;

public class ApptResponse {

	List<String> clinicAppt;
	List<String> bookedAppt;
	public List<String> getClinicAppt() {
		return clinicAppt;
	}
	public void setClinicAppt(List<String> clinicAppt) {
		this.clinicAppt = clinicAppt;
	}
	public List<String> getBookedAppt() {
		return bookedAppt;
	}
	public void setBookedAppt(List<String> bookedAppt) {
		this.bookedAppt = bookedAppt;
	}
	
	
}

package com.sjsu.edu.cmpe275.springbootvms.repository.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Appointment")
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "appointment_id")
	private int appointmentId;

	@Column(name = "appointment_date")
	private LocalDate appointmentDate;

	@Column(name = "appointment_status")
	private String appointmentStatus;
	@Column(name = "patient_id")
	private int patientId;

	@Column(nullable = false)
	@ElementCollection
	private List<String> vaccines;

	// @ManyToOne(cascade = CascadeType.ALL, optional = false)
	// @JoinColumn(name = "id")
	// private Clinic clinic;
	@Column(name = "appointment_time")
	private String appointmentTime;

	@Column(name = "clinic_id")
	private int clinicId;

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public LocalDate getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(LocalDate appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public String getAppointmentStatus() {
		return appointmentStatus;
	}

	public void setAppointmentStatus(String appointmentStatus) {
		this.appointmentStatus = appointmentStatus;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public List<String> getVaccines() {
		return vaccines;
	}

	public void setVaccines(List<String> vaccines) {
		this.vaccines = vaccines;
	}

	public int getClinicId() {
		return clinicId;
	}

	public void setClinicId(int clinicId) {
		this.clinicId = clinicId;
	}

	public String getAppointmentTime() {
		return appointmentTime;
	}

	public void setAppointmentTime(String appointmentTime) {
		this.appointmentTime = appointmentTime;
	}

}

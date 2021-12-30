package com.sjsu.edu.cmpe275.springbootvms.repository;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.sjsu.edu.cmpe275.springbootvms.model.VaccineHistory;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Appointment;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

	@Query(value = "select * from appointment where appointment_date>=?1 and patient_id=?2 order by appointment_date desc", nativeQuery = true)
	List<Appointment> getFutureAppointments(LocalDate currDate,int patientId);

	@Query(value = "select * from appointment where appointment_date<=?1 and patient_id=?2 order by appointment_date desc", nativeQuery = true)
	List<Appointment> getPastAppointments(LocalDate currDate,int patientId);

	@Query(value = "update appointment set appointment_status=?2 where appointment_id=?1", nativeQuery = true)
	@Modifying
	@Transactional
	void changeAppointmentStatus(int appointmentId, String status);

	@Query(value = "update Booking b1,Booking b2 set b1.available_slots=b2.available_slots+1 where clinic_id=?1 and b1.clinic_id=b2.clinic_id", nativeQuery = true)
	@Modifying
	@Transactional
	void updateBookingSlots(int clinicId);

	@Query(value = "select * from vaccine where vaccine_id not in (select vaccine_id from patient_vaccine where patient_id=?1 and vaccine_status=?2)", nativeQuery = true)
	List<Vaccine> vaccineForAppointment(int patientId, String vaccineStatus);

	@Query(value = "update appointment set appointment_date=?2,appointment_time=?3 where appointment_id=?1", nativeQuery = true)
	void changeAppointment(int appointmentId, LocalDate newApptDate, String appointmentTime);

	@Query(value = "select appointment_time from appointment where clinic_id=?1 and appointment_date=?2 and appointment_status='Confirmed' or appointment_status='Check-In'", nativeQuery = true)
	List<String> getTimesBookedForClinic(int clinicId, LocalDate appointmentDate);

	@Query(value="select * from appointment where patient_id=?1 and clinic_id=?2 and appointment_date=?3 and appointment_time=?4",nativeQuery = true)
	Appointment checkAppointmentBooked(int patientId, int clinicId, LocalDate apptDate, String appointmentTime);

	@Modifying
	@Transactional
	@Query(value="update appointment set appointment_date=?2,appointment_time= ?3,clinic_id=?1 where appointment_id=?4",nativeQuery  =true)
	void updateAppt(int clinicId, String appointmentDate, String appointmentTime, int apptId, int patientId);

	@Modifying
	@Transactional
	@Query(value="update appointment set appointment_status=?2 where appointment_id=?1",nativeQuery = true)
	void checkinApptmnt(int appointmentId, String status);

	//@Query(value="select v.*,c.name as clinicName,appt.* from appointment appt inner join appointment_vaccines apptv on apptv.appointment_appointment_id=appt.appointment_id inner join vaccine v on v.name=apptv.vaccines inner join clinic c on c.id=appt.clinic_id where appt.patient_id=?1 and appt.appointment_status='Completed'",nativeQuery = true)
	@Query(value="select v.name,c.name as clinicName,appt.appointment_date,appt.appointment_id,v.number_of_shots from appointment appt inner join appointment_vaccines apptv on apptv.appointment_appointment_id=appt.appointment_id inner join vaccine v on v.name=apptv.vaccines inner join clinic c on c.id=appt.clinic_id where appt.patient_id=?1 and appt.appointment_status='Completed'",nativeQuery = true)
	List<Object> vaccineHistoryForPatient(int patientId);

	@Query(value="select v.name,c.name as clinicName,appt.appointment_date,appt.appointment_id,v.number_of_shots from appointment appt inner join appointment_vaccines apptv on apptv.appointment_appointment_id=appt.appointment_id inner join vaccine v on v.name=apptv.vaccines inner join clinic c on c.id=appt.clinic_id where appt.patient_id=?1 and appt.appointment_status!='Completed' and appt.appointment_status!='Cancelled'",nativeQuery = true)
	List<Object> vaccineDueForPatient(int patientId);

}

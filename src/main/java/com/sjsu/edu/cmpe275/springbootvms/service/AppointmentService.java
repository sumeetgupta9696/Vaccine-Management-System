package com.sjsu.edu.cmpe275.springbootvms.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.sjsu.edu.cmpe275.springbootvms.model.AppointmentTime;
import com.sjsu.edu.cmpe275.springbootvms.model.ApptResponse;
import com.sjsu.edu.cmpe275.springbootvms.model.CancelAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.ChangeAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.CreateAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.UpdateAppointment;
import com.sjsu.edu.cmpe275.springbootvms.model.VaccineHistory;
import com.sjsu.edu.cmpe275.springbootvms.repository.AppointmentRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.ClinicRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.PatientRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.VaccineRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Appointment;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Clinic;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Patient;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;

@Service
public class AppointmentService implements AppointmentServiceI {

	@Autowired
	private AppointmentRepository appointmentRepo;

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private ClinicRepository clinicRepo;

	@Autowired
	private VaccineRepository vaccRepo;

	@Autowired
	private EmailSenderService emailSenderService;

	@Override
	public List<Appointment> getFutureAppointments(String currDate, String currTime, int patientId) {
		System.out.println("inget");
		try {
			List<Appointment> apptmntList = appointmentRepo.getFutureAppointments(LocalDate.parse(currDate), patientId);

			List<Appointment> apptList = new ArrayList<>();
			DateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
			Date date1 = sdf1.parse(currTime);
			for (Appointment appt : apptmntList) {

				if (appt.getAppointmentDate().isEqual(LocalDate.parse(currDate))) {

					Date date = sdf1.parse(appt.getAppointmentTime());
					Calendar calendar = GregorianCalendar.getInstance();
					calendar.setTime(date1);

					if (calendar.getTime().before(date)) {
						apptList.add(appt);
					}
				} else
					apptList.add(appt);

			}
			return apptList;
		} catch (Exception e) {

		}
		return null;
	}

	@Override
	public List<Appointment> getPastAppointments(String currDate, String currTime, int patientId) {
		try {
			List<Appointment> apptmntList = appointmentRepo.getPastAppointments(LocalDate.parse(currDate), patientId);
			System.out.println(apptmntList.size());
			List<Appointment> apptList = new ArrayList<>();
			DateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
			Date date1 = sdf1.parse(currTime);
			for (Appointment appt : apptmntList) {

				if (appt.getAppointmentDate().isEqual(LocalDate.parse(currDate))) {
					Date date = sdf1.parse(appt.getAppointmentTime());
					Calendar calendar = GregorianCalendar.getInstance();
					calendar.setTime(date1);

					if (calendar.getTime().after(date)) {
						apptList.add(appt);
					}

				} else
					apptList.add(appt);
			}
			return apptList;

		} catch (Exception e) {

		}
		return null;
	}

	@Override
	public void cancelAppointment(CancelAppointment cancelAppointment, int mrn) {

		try {
			appointmentRepo.changeAppointmentStatus(cancelAppointment.getAppointmentId(), "Cancelled");
			Patient patient = patientRepository.findByMrn(mrn);
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setTo(patient.getEmail());
			mailMessage.setSubject("Appointment Cancelled!");
			mailMessage.setFrom("chand312902@gmail.com");
			mailMessage.setText(patient.getFirstName() + ", your appointment has been cancelled!!");
			emailSenderService.sendEmail(mailMessage);
			appointmentRepo.updateBookingSlots(cancelAppointment.getClinicId());
		} catch (Exception e) {
		}

	}

	@Override
	public List<Vaccine> vaccineForAppointment(int patientId) {
		try {
			List<Vaccine> vaccineList = appointmentRepo.vaccineForAppointment(patientId, "Completed");
			return vaccineList;
		} catch (Exception e) {

		}
		return null;
	}

	@Override
	public void changeAppointment(ChangeAppointment changeAppointment) {
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("YYYY-MM-dd");
			LocalDate newApptDate = LocalDate.parse(changeAppointment.getAppointmentDate(), dtf);
			appointmentRepo.changeAppointment(changeAppointment.getAppointmentId(), newApptDate,
					changeAppointment.getAppointmentTime());
		} catch (Exception e) {
		}

	}

	@Override
	public Appointment createAppointment(CreateAppointment createAppointment) {
		try {
			Patient patient = patientRepository.findByMrn(createAppointment.getPatientId());

			Appointment apptBooked = appointmentRepo.checkAppointmentBooked(createAppointment.getPatientId(),
					createAppointment.getClinicId(), LocalDate.parse(createAppointment.getAppointmentDate()),
					createAppointment.getAppointmentTime());
			if (apptBooked != null) {
				return null;
			}

			Appointment appt = new Appointment();

			appt.setClinicId(createAppointment.getClinicId());
			appt.setPatientId(createAppointment.getPatientId());
			appt.setAppointmentTime(createAppointment.getAppointmentTime());
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("YYYY-MM-dd");
			// LocalDate newApptDate=
			// LocalDate.parse(createAppointment.getAppointmentDate(),dtf);
			appt.setAppointmentDate(LocalDate.parse(createAppointment.getAppointmentDate()));
			appt.setVaccines(createAppointment.getVaccines());
			appt.setAppointmentStatus("Confirmed");
			Appointment createdAppt = appointmentRepo.save(appt);
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setTo(patient.getEmail());
			mailMessage.setSubject("Appointment Created!");
			mailMessage.setFrom("chand312902@gmail.com");
			mailMessage.setText(patient.getFirstName() + ", your appointment has been created for date: "
					+ createAppointment.getAppointmentDate()
					+ " and at time: " + createAppointment.getAppointmentTime() + " for vaccines: "
					+ createAppointment.getVaccines());
			emailSenderService.sendEmail(mailMessage);
			return createdAppt;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public ApptResponse getAppointmentTimes(AppointmentTime appointmentTime) {
		try {
			Clinic clinic = clinicRepo.findById(appointmentTime.getClinicId()).orElse(null);
			if (clinic != null) {
				DateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");

				Date date = sdf1.parse(clinic.getBusinessStartTime());
				System.out.println("Date and Time: " + date);

				Date date1 = sdf1.parse(clinic.getBusinessEndTime());
				System.out.println("Date and Time1: " + date1);

				ArrayList<String> times = new ArrayList<String>();

				SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
				Calendar calendar = GregorianCalendar.getInstance();
				calendar.setTime(date);

				if (calendar.getTime().before(date1)) {
					times.add(sdf.format(calendar.getTime()));
					System.out.println("Initial time:  " + times);

					while (calendar.getTime().before(date1)) {

						calendar.add(Calendar.MINUTE, 15);
						times.add(sdf.format(calendar.getTime()));
						System.out.println(times);
					}
				}
				System.out.println(appointmentTime.getAppointmentDate());
				// DateTimeFormatter dtf=DateTimeFormatter.ofPattern("yyyy-MM-DD");
				// LocalDate newApptDate=
				// LocalDate.parse(appointmentTime.getAppointmentDate(),dtf);

				List<String> cnfrmedAppts = appointmentRepo.getTimesBookedForClinic(appointmentTime.getClinicId(),
						LocalDate.parse(appointmentTime.getAppointmentDate()));

				ApptResponse apptRes = new ApptResponse();
				apptRes.setClinicAppt(times);
				if (cnfrmedAppts.size() > 0)
					apptRes.setBookedAppt(cnfrmedAppts);
				return apptRes;
			} else {

			}
		}

		catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Clinic> getClinics() {
		try {
			List<Clinic> clinicList = clinicRepo.findAll();
			return clinicList;
		} catch (Exception e) {

		}
		return null;
	}

	@Override
	public List<Vaccine> getVaccines() {
		try {
			List<Vaccine> vaccList = vaccRepo.findAll();
			return vaccList;
		} catch (Exception e) {
		}
		return null;
	}

	@Override
	public Appointment updateAppointment(UpdateAppointment updateAppointment) {
		try {
			Appointment appt = new Appointment();

			appt.setClinicId(updateAppointment.getClinicId());
			appt.setPatientId(updateAppointment.getPatientId());
			appt.setAppointmentTime(updateAppointment.getAppointmentTime());
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("YYYY-MM-dd");
			// LocalDate newApptDate=
			// LocalDate.parse(createAppointment.getAppointmentDate(),dtf);
			appt.setAppointmentDate(LocalDate.parse(updateAppointment.getAppointmentDate()));
			appt.setAppointmentId(0);

			appointmentRepo.updateAppt(updateAppointment.getClinicId(), updateAppointment.getAppointmentDate(),
					updateAppointment.getAppointmentTime(), updateAppointment.getApptId(),
					updateAppointment.getPatientId());
			Patient patient = patientRepository.findByMrn(updateAppointment.getPatientId());
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setTo(patient.getEmail());
			mailMessage.setSubject("Appointment Changed!");
			mailMessage.setFrom("chand312902@gmail.com");
			mailMessage.setText(
					patient.getFirstName() + ", your appointment has been modified with updated date: "
							+ updateAppointment.getAppointmentDate()
							+ " and updated time: " + updateAppointment.getAppointmentTime());
			emailSenderService.sendEmail(mailMessage);

			return null;
		} catch (Exception e) {

		}
		return null;
	}

	@Override
	public void checkinAppointment(int appointmentId) {
		try {
			appointmentRepo.checkinApptmnt(appointmentId, "Check-In");
		} catch (Exception e) {

		}

	}

	@Override
	public List<Object> vaccineHistory(int patientId) {
		try {

			// System.out.println("Patient id::"+patientId);
			// System.out.println(appointmentRepo.vaccineHistoryForPatient(patientId).size());
			List<Object> vaccHistList = appointmentRepo.vaccineHistoryForPatient(patientId);
			return vaccHistList;

		} catch (Exception e) {

		}
		return null;
	}

	@Override
	public List<Object> vaccineDue(int patientId) {
		try {
			// System.out.println(appointmentRepo.vaccineHistoryForPatient(patientId).size());
			List<Object> vaccDueList = appointmentRepo.vaccineDueForPatient(patientId);
			return vaccDueList;
		} catch (Exception e) {
		}
		return null;
	}

}

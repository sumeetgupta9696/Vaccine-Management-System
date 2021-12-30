package com.sjsu.edu.cmpe275.springbootvms.service.impl;

import com.sjsu.edu.cmpe275.springbootvms.model.ClinicRequest;
import com.sjsu.edu.cmpe275.springbootvms.model.DiseaseRequest;
import com.sjsu.edu.cmpe275.springbootvms.model.VaccineRequest;
import com.sjsu.edu.cmpe275.springbootvms.repository.ClinicRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.DiseaseRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.VaccineRepository;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Clinic;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Disease;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;
import com.sjsu.edu.cmpe275.springbootvms.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private VaccineRepository vaccineRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public Disease addDisease(DiseaseRequest diseaseRequest) {

        Disease disease = new Disease(diseaseRequest.getName(), diseaseRequest.getDescription());
        return diseaseRepository.save(disease);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Vaccine addVaccine(VaccineRequest vaccineRequest) {

        Vaccine vaccine = new Vaccine();
        vaccine.setManufacturer(vaccineRequest.getManufacturer());
        vaccine.setName(vaccineRequest.getName());
        vaccine.setDiseases(vaccineRequest.getDiseases());
        vaccine.setDuration(vaccineRequest.getDuration());
        vaccine.setNumberOfShots(vaccineRequest.getNumberOfShots());
        vaccine.setShotInternalVal(vaccineRequest.getShotInternalVal());
        return vaccineRepository.save(vaccine);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Clinic addClinic(ClinicRequest clinicRequest) {

        Clinic clinic = new Clinic();
        clinic.setName(clinicRequest.getName());
        clinic.setStreetNo(clinicRequest.getStreetNo());
        clinic.setState(clinicRequest.getState());
        clinic.setCity(clinicRequest.getCity());
        clinic.setCountry(clinicRequest.getCountry());
        clinic.setZipCode(clinicRequest.getZipCode());
        clinic.setBusinessStartTime(clinicRequest.getBusinessStartTime());
        clinic.setBusinessEndTime(clinicRequest.getBusinessEndTime());
        clinic.setNumberOfPhysicians(clinicRequest.getNumberOfPhysicians());
        return  clinicRepository.save(clinic);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Disease> getAllDiseases() {

        return diseaseRepository.findAll();
    }
    
    @Transactional(propagation = Propagation.REQUIRED)
    public List<Vaccine> getAllVaccine() {

        return vaccineRepository.findAll();
    }
    
    @Transactional(propagation = Propagation.REQUIRED)
    public List<Clinic> getAllClinic() {

        return clinicRepository.findAll();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Vaccine updateVaccine(VaccineRequest vaccineRequest) {

        Vaccine vaccine = new Vaccine();
        vaccine.setManufacturer(vaccineRequest.getManufacturer());
        vaccine.setName(vaccineRequest.getName());
        vaccine.setDiseases(vaccineRequest.getDiseases());
        vaccine.setDuration(vaccineRequest.getDuration());
        vaccine.setNumberOfShots(vaccineRequest.getNumberOfShots());
        vaccine.setShotInternalVal(vaccineRequest.getShotInternalVal());
        return vaccineRepository.save(vaccine);
    }

}

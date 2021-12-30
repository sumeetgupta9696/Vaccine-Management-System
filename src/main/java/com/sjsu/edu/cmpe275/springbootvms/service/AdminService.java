package com.sjsu.edu.cmpe275.springbootvms.service;

import com.sjsu.edu.cmpe275.springbootvms.model.ClinicRequest;
import com.sjsu.edu.cmpe275.springbootvms.model.DiseaseRequest;
import com.sjsu.edu.cmpe275.springbootvms.model.VaccineRequest;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Clinic;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Disease;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;

import java.util.List;

public interface AdminService {

    public Disease addDisease(DiseaseRequest diseaseRequest);

    public Vaccine addVaccine(VaccineRequest vaccineRequest);
    
    public Vaccine updateVaccine(VaccineRequest vaccineRequest);

    public Clinic addClinic(ClinicRequest clinicRequest);

    public List<Disease> getAllDiseases();
    
    public List<Vaccine> getAllVaccine();
    
    public List<Clinic> getAllClinic();

}

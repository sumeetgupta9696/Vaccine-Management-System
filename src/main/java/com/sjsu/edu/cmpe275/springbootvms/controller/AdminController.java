package com.sjsu.edu.cmpe275.springbootvms.controller;

import com.sjsu.edu.cmpe275.springbootvms.model.ClinicRequest;
import com.sjsu.edu.cmpe275.springbootvms.model.DiseaseRequest;
import com.sjsu.edu.cmpe275.springbootvms.model.ErrorResponse;
import com.sjsu.edu.cmpe275.springbootvms.model.VaccineRequest;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Clinic;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Disease;
import com.sjsu.edu.cmpe275.springbootvms.repository.model.Vaccine;
import com.sjsu.edu.cmpe275.springbootvms.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/addDisease")
    public ResponseEntity<?> addDisease(@RequestBody DiseaseRequest diseaseReq) {
    		System.out.println("Check req body : ");

            Disease disease = adminService.addDisease(diseaseReq);
            ErrorResponse errorResponse = new ErrorResponse("500", "Error occurred while adding new disease");
            if (Objects.isNull(disease)) {
                return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(disease, HttpStatus.OK);
    }

    @PostMapping("/addVaccine")
    public ResponseEntity<?> addVaccine(@RequestBody VaccineRequest vaccineRequest) {

        Vaccine vaccine = adminService.addVaccine(vaccineRequest);
        ErrorResponse errorResponse = new ErrorResponse("500", "Error occurred while adding new vaccine details");
        if (Objects.isNull(vaccine)) {
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(vaccine, HttpStatus.OK);
    }
    
    @PostMapping("/updateVaccine")
    public ResponseEntity<?> updateVaccine(@RequestBody VaccineRequest vaccineRequest) {

        Vaccine vaccine = adminService.addVaccine(vaccineRequest);
        ErrorResponse errorResponse = new ErrorResponse("500", "Error occurred while adding new vaccine details");
        if (Objects.isNull(vaccine)) {
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(vaccine, HttpStatus.OK);
    }

    @PostMapping("/addClinic")
    public ResponseEntity<?> addClinic(@RequestBody ClinicRequest clinicRequest) {

        Clinic clinic = adminService.addClinic(clinicRequest);
        ErrorResponse errorResponse = new ErrorResponse("500", "Error occurred while adding new clinic details");
        if (Objects.isNull(clinic)) {
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(clinic, HttpStatus.OK);
    }

    @GetMapping("/getAllDiseases")
    public ResponseEntity<?> getAllDiseases() {

        List<Disease> diseaseList = adminService.getAllDiseases();
        ErrorResponse errorResponse = new ErrorResponse("500", "Error occurred while fetching diseases");
        if(diseaseList.size() == 0) {
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(diseaseList, HttpStatus.OK);
    }
    
    @GetMapping("/getAllVaccine")
    public ResponseEntity<?> getAllVaccine() {

        List<Vaccine> vaccineList = adminService.getAllVaccine();
        ErrorResponse errorResponse = new ErrorResponse("500", "Error occurred while fetching vaccine");
        if(vaccineList.size() == 0) {
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(vaccineList, HttpStatus.OK);
    }
    
    @GetMapping("/getAllClinic")
    public ResponseEntity<?> getAllClinic() {

        List<Clinic> clinicList = adminService.getAllClinic();
        ErrorResponse errorResponse = new ErrorResponse("500", "Error occurred while fetching clinic");
        if(clinicList.size() == 0) {
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(clinicList, HttpStatus.OK);
    }
}
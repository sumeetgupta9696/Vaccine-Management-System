package com.sjsu.edu.cmpe275.springbootvms.model;

import java.util.List;

public class VaccineRequest {

    private String name;

    private List<String> diseases;

    private String manufacturer;

    private Integer numberOfShots;

    private Integer shotInternalVal;

    private Integer duration;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getDiseases() {
        return diseases;
    }

    public void setDiseases(List<String> diseases) {
        this.diseases = diseases;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getNumberOfShots() {
        return numberOfShots;
    }

    public void setNumberOfShots(Integer numberOfShots) {
        this.numberOfShots = numberOfShots;
    }

    public Integer getShotInternalVal() {
        return shotInternalVal;
    }

    public void setShotInternalVal(Integer shotInternalVal) {
        this.shotInternalVal = shotInternalVal;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}
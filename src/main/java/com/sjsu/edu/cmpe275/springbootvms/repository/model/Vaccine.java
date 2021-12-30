package com.sjsu.edu.cmpe275.springbootvms.repository.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Vaccine {

    public Vaccine() {

    }

    public Vaccine(Integer id, String name, List<String> diseases, String manufacturer, Integer numberOfShots,
            Integer shotInternalVal, Integer duration) {
        this.id = id;
        this.name = name;
        this.diseases = diseases;
        this.manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotInternalVal = shotInternalVal;
        this.duration = duration;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    @ElementCollection
    private List<String> diseases;

    @Column(nullable = false)
    private String manufacturer;

    @Column(nullable = false)
    private Integer numberOfShots;

    @Column
    private Integer shotInternalVal;

    @Column(nullable = false)
    private Integer duration;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

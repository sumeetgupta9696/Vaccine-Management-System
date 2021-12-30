package com.sjsu.edu.cmpe275.springbootvms.model;

public class DiseaseRequest {

    public DiseaseRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }

    private String name;

    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Disease{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
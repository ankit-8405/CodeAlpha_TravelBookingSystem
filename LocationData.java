package com.codealpha.travel;

import com.google.gson.annotations.SerializedName;

public class LocationData {
    // Fields match the JSON response from ipinfo.io
    private String ip;
    private String city;
    private String region;
    private String country;
    private String loc; // Contains "Latitude,Longitude"
    private String org; // ISP Organization

    // Getters
    public String getIp() { return ip; }
    public String getCity() { return city; }
    public String getRegion() { return region; }
    public String getCountry() { return country; }
    public String getLoc() { return loc; }
    public String getOrg() { return org; }

    @Override
    public String toString() {
        return "IP: " + ip + "\n" +
               "City: " + city + "\n" +
               "Region: " + region + "\n" +
               "Country: " + country + "\n" +
               "Coordinates: " + loc + "\n" +
               "ISP: " + org;
    }
}
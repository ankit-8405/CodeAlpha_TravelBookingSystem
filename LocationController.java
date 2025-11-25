package com.codealpha.travel;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/location")
public class LocationController {
    
    private final IpService ipService;
    
    public LocationController(IpService ipService) {
        this.ipService = ipService;
    }
    
    @GetMapping("/ip")
    public LocationData getLocationByIp() {
        return ipService.getLocation();
    }
    
    @GetMapping("/info")
    public String getLocationInfo() {
        LocationData data = ipService.getLocation();
        if (data != null) {
            return data.toString();
        }
        return "Unable to retrieve location information";
    }
}
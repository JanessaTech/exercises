package com.sso.example.gatewayservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
This is a test controller to test if gateway-service can successfully connect to eureka-service
How to do the test:
1. Run EurekaServiceApplication in eureka-service project
2. Run GatewayServiceApplication
4. Once EurekaServiceApplication is up, check http://localhost:8761/ to make sure that GATEWAY-SERVICE is found by eureka-service
5. In postman, sent http://127.0.0.1:8762/service-instances/GATEWAY-SERVICE (GET)
If you could see response like below, it means gateway-service can successfully connect to eureka-service:

[
    {
        "scheme": "http",
        "host": "192.168.33.1",
        "port": 8762,
        "secure": false,
        "metadata": {
            "management.port": "8762"
        },
        "instanceId": "localhost:gateway-service:8762",
        "uri": "http://192.168.33.1:8762",
        "serviceId": "GATEWAY-SERVICE",
        "instanceInfo": {
            "instanceId": "localhost:gateway-service:8762",
            "app": "GATEWAY-SERVICE",
            "appGroupName": null,
            "ipAddr": "192.168.33.1",
            "sid": "na",
            "homePageUrl": "http://192.168.33.1:8762/",
            "statusPageUrl": "http://192.168.33.1:8762/actuator/info",
            "healthCheckUrl": "http://192.168.33.1:8762/actuator/health",
            "secureHealthCheckUrl": null,
            "vipAddress": "gateway-service",
            "secureVipAddress": "gateway-service",
            "countryId": 1,
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            },
            "hostName": "192.168.33.1",
            "status": "UP",
            "overriddenStatus": "UNKNOWN",
            "leaseInfo": {
                "renewalIntervalInSecs": 30,
                "durationInSecs": 90,
                "registrationTimestamp": 1664787991561,
                "lastRenewalTimestamp": 1664787991561,
                "evictionTimestamp": 0,
                "serviceUpTimestamp": 1664787991561
            },
            "isCoordinatingDiscoveryServer": false,
            "metadata": {
                "management.port": "8762"
            },
            "lastUpdatedTimestamp": 1664787991561,
            "lastDirtyTimestamp": 1664787991535,
            "actionType": "ADDED",
            "asgName": null
        }
    }
]
*/
@RestController
public class ServiceInstanceRestController {
    @Autowired
    private DiscoveryClient discoveryClient;

    @GetMapping("/service-instances/{applicationName}")
    public List<ServiceInstance> serviceInstancesByApplicationName(
            @PathVariable String applicationName) {
        return this.discoveryClient.getInstances(applicationName);
    }
}

package com.example.adilfuelconsumption;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AdilFuelConsumptionApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdilFuelConsumptionApplication.class, args);
    }

}

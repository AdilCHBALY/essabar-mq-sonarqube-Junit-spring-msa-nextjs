package com.example.adilfuelconsumption;

import com.example.adilfuelconsumption.service.FuelConsumptionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class AdilFuelConsumptionApplicationTests {

    @Autowired
    private FuelConsumptionService fuelConsumptionService;

    @Test
    void contextLoads() {
        assertNotNull(fuelConsumptionService);
    }

}

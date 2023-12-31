package com.example.adilfuelconsumption.repository;

import com.example.adilfuelconsumption.entities.FuelConsumption;
import com.example.adilfuelconsumption.service.FuelConsumptionService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class FuelConsumptionRepositoryTest {
    @Mock
    private FuelConsumptionRepository fuelConsumptionRepository;

    @InjectMocks
    private FuelConsumptionService fuelConsumptionService;

    private FuelConsumption fuelConsumption1;
    private FuelConsumption fuelConsumption2;
    private List<FuelConsumption> expectedFuelConsumptions;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        FuelConsumption fuelConsumption1 = FuelConsumption.builder()
                .client_id(1L)
                .price(150F)
                .createdAt(new Date())
                .gazPerLiter(10F)
                .car_id(1L)
                .build();
        FuelConsumption fuelConsumption2 = FuelConsumption.builder()
                .client_id(1L)
                .price(100F)
                .createdAt(new Date())
                .gazPerLiter(9F)
                .car_id(1L)
                .build();
        List<FuelConsumption> expectedFuelConsumptions = List.of(
                fuelConsumption1,
                fuelConsumption2
        );
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getFuelConsumptionsByClient_id() {
        Long clientId = 1L;
        when(fuelConsumptionRepository.getFuelConsumptionsByClient_id(clientId)).thenReturn(expectedFuelConsumptions);
        List<FuelConsumption> result = fuelConsumptionService.fuelConsumptionsByClientId(clientId);
        verify(fuelConsumptionRepository, times(1)).getFuelConsumptionsByClient_id(clientId);
        assertEquals(expectedFuelConsumptions, result);
    }
}
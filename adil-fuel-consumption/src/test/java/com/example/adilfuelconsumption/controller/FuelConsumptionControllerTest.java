package com.example.adilfuelconsumption.controller;

import com.example.adilfuelconsumption.entities.FuelConsumption;
import com.example.adilfuelconsumption.service.FuelConsumptionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FuelConsumptionControllerTest {

    @Mock
    private FuelConsumptionService fuelConsumptionService;

    @InjectMocks
    private FuelConsumptionController fuelConsumptionController;

    private MockMvc mockMvc;
    private FuelConsumption fuelConsumption;
    private List<FuelConsumption> expectedFuelConsumptions;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(fuelConsumptionController).build();

        fuelConsumption = FuelConsumption.builder()
                .id(1L)
                .client_id(1L)
                .price(100F)
                .createdAt(new Date())
                .gazPerLiter(9F)
                .car_id(1L)
                .build();
        expectedFuelConsumptions = List.of(
            fuelConsumption
        );

    }

    @Test
    void fuelConsumptionsByClient() throws Exception {
        Long clientId = 1L;
        Mockito.when(fuelConsumptionService.fuelConsumptionsByClientId(clientId)).thenReturn(expectedFuelConsumptions);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/consumption/client/{id}", clientId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(expectedFuelConsumptions.size()));
        verify(fuelConsumptionService, times(1)).fuelConsumptionsByClientId(clientId);
    }

    @Test
    void fuelConsumptions() throws Exception{
        when(fuelConsumptionService.fuelConsumptions()).thenReturn(expectedFuelConsumptions);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/consumption"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(expectedFuelConsumptions.size()));
        verify(fuelConsumptionService, times(1)).fuelConsumptions();
    }

    @Test
    void fuelConsumption() throws Exception {
        Long consumptionId = 1L;
        when(fuelConsumptionService.fuelConsumption(consumptionId)).thenReturn(fuelConsumption);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/consumption/{id}", consumptionId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(consumptionId));

        verify(fuelConsumptionService, times(1)).fuelConsumption(consumptionId);
    }

    @Test
    void save() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/api/consumption")
                        .content(asJsonString(fuelConsumption))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(fuelConsumptionService, times(1)).save(fuelConsumption);
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
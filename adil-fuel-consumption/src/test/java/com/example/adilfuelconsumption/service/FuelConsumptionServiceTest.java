package com.example.adilfuelconsumption.service;

import com.example.adilfuelconsumption.entities.FuelConsumption;
import com.example.adilfuelconsumption.external.CarRestClient;
import com.example.adilfuelconsumption.external.ClientRestClient;
import com.example.adilfuelconsumption.model.Car;
import com.example.adilfuelconsumption.model.Client;
import com.example.adilfuelconsumption.model.FuelType;
import com.example.adilfuelconsumption.repository.FuelConsumptionRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FuelConsumptionServiceTest {
    @Mock
    private FuelConsumptionRepository fuelConsumptionRepository;
    @Mock
    private ClientRestClient clientRestClient;
    @Mock
    private CarRestClient carRestClient;
    @InjectMocks
    private FuelConsumptionService fuelConsumptionService;
    private FuelConsumption fuelConsumption1;
    private FuelConsumption fuelConsumption2;
    private List<FuelConsumption> expectedFuelConsumptions;
    private Car car;
    private Client client;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        car = Car.builder()
                .brand("Audi")
                .consumptionPerKm(10F)
                .description("Audi A3 2020")
                .fuelType(FuelType.ESSENCE)
                .picture("https://uploads.audi-mediacenter.com/system/production/media/90567/images/72391bd2d21a80a761f0df1bd5bff197d5804daa/A201895_web_1920.jpg?1698421086")
                .tankSize(50F)
                .model("A3")
                .build();
        client = Client.builder()
                    .email("adil.chbaly@gmail.com")
                    .fullName("CHBALY Adil")
                    .build();
        FuelConsumption fuelConsumption1 = FuelConsumption.builder()
                .id(2L)
                .client_id(1L)
                .price(150F)
                .createdAt(new Date())
                .gazPerLiter(10F)
                .car_id(1L)
                .build();
        FuelConsumption expectedFuelConsumption = FuelConsumption.builder()
                .id(1L)
                .client_id(1L)
                .price(30F)
                .createdAt(new Date())
                .gazPerLiter(10F)
                .car_id(1L)
                .build();
        FuelConsumption fuelConsumption2 = FuelConsumption.builder()
                .id(3L)
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
    void fuelConsumptionsByClientId() {
        Long clientId = 1L;
        when(fuelConsumptionRepository.getFuelConsumptionsByClient_id(clientId)).thenReturn(expectedFuelConsumptions);
        List<FuelConsumption> result = fuelConsumptionService.fuelConsumptionsByClientId(clientId);
        verify(fuelConsumptionRepository, times(1)).getFuelConsumptionsByClient_id(clientId);
        assertEquals(expectedFuelConsumptions, result);
    }

    @Test
    void fuelConsumptions() {
        expectedFuelConsumptions = List.of(
                FuelConsumption.builder()
                        .id(2L)
                        .client_id(1L)
                        .price(150F)
                        .createdAt(new Date())
                        .gazPerLiter(10F)
                        .car_id(1L)
                        .build()
        );
        when(fuelConsumptionRepository.findAll()).thenReturn(expectedFuelConsumptions);
        when(carRestClient.car(anyLong())).thenReturn(car);
        when(clientRestClient.client(anyLong())).thenReturn(client);
        List<FuelConsumption> result = fuelConsumptionService.fuelConsumptions();
        verify(fuelConsumptionRepository, times(1)).findAll();
        verify(carRestClient, times(expectedFuelConsumptions.size())).car(anyLong());
        verify(clientRestClient, times(expectedFuelConsumptions.size())).client(anyLong());
        assertEquals(expectedFuelConsumptions, result);
    }

    @Test
    void fuelConsumption() {
        Long consumptionId = 1L;
        FuelConsumption expectedFuelConsumption = new FuelConsumption(consumptionId,1l,1L,3F,5F,new Date(),null,null);
        when(fuelConsumptionRepository.findById(consumptionId)).thenReturn(Optional.of(expectedFuelConsumption));
        when(carRestClient.car(anyLong())).thenReturn(expectedFuelConsumption.getCar());
        when(clientRestClient.client(anyLong())).thenReturn(expectedFuelConsumption.getClient());
        FuelConsumption result = fuelConsumptionService.fuelConsumption(consumptionId);
        verify(fuelConsumptionRepository, times(1)).findById(consumptionId);
        verify(carRestClient, times(1)).car(anyLong());
        verify(clientRestClient, times(1)).client(anyLong());
        assertEquals(expectedFuelConsumption, result);
    }

    @Test
    void save() {
        FuelConsumption expectedFuelConsumption = new FuelConsumption(1L,1l,1L,3F,5F,new Date(),null,null);
        fuelConsumptionService.save(expectedFuelConsumption);
        verify(fuelConsumptionRepository, times(1)).save(expectedFuelConsumption);
    }
}
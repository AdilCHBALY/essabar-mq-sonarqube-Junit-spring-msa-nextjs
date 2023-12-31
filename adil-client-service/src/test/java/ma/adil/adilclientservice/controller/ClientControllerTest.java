package ma.adil.adilclientservice.controller;

import ma.adil.adilclientservice.dto.ClientResponse;
import ma.adil.adilclientservice.entities.Car;
import ma.adil.adilclientservice.entities.Client;
import ma.adil.adilclientservice.model.CarModel;
import ma.adil.adilclientservice.model.FuelType;
import ma.adil.adilclientservice.service.ClientService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;


class ClientControllerTest {

    @Mock
    private ClientService clientService;

    @InjectMocks
    private ClientController clientController;

    @Autowired
    private MockMvc mockMvc;
    private Car car;
    private List<Car> cars;
    private Client client;
    private CarModel carModel;
    private List<CarModel> carModels = new ArrayList<>();
    private List<Client> clients = new ArrayList<>();
    private ClientResponse clientResponse;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(clientController).build();
        car = Car.builder()
                .id(1L)
                .card_id(1L)
                .status(false)
                .currentTankSize(20F)
                .build();
        cars = List.of(
                car
        );
        client = new Client(1L,"CHBALY Adil","adil.chbaly10@gmail.com",null,cars);
        clients=List.of(
                client,
                Client.builder()
                        .id(2L)
                        .fullName("OHLALE Badr")
                        .email("badr.ohlale@gmail.com")
                        .cars(null)
                        .car_ids(cars)
                        .build()
        );
        carModel =CarModel.builder()
                .id(1L)
                .brand("Audi")
                .consumptionPerKm(10F)
                .description("Audi A3 2020")
                .fuelType(FuelType.ESSENCE)
                .picture("https://uploads.audi-mediacenter.com/system/production/media/90567/images/72391bd2d21a80a761f0df1bd5bff197d5804daa/A201895_web_1920.jpg?1698421086")
                .tankSize(50F)
                .model("A3")
                .build();
        carModels = List.of(
                carModel
        );
        clientResponse = ClientResponse.builder()
                .id(1L)
                .fullName("CHBALY Adil")
                .email("adil.chbaly10@gmail.com")
                .cars(carModels)
                .build();
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void clients() throws Exception {
        when(clientService.findAll()).thenReturn(Collections.singletonList(client));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/client"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(clientService, times(1)).findAll();
    }

    @Test
    void client() throws Exception{
        Long clientId = 1L;
        when(clientService.findById(clientId)).thenReturn(clientResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/client/{id}", clientId))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(clientService, times(1)).findById(clientId);
    }

    @Test
    void save() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/client")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(clientService, times(1)).save(any(Client.class));
    }

    @Test
    void power() throws Exception{
        Long carId = 1L;

        mockMvc.perform(MockMvcRequestBuilders.get("/api/client/power/{id}", carId))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(clientService, times(1)).power(carId);
    }

    @Test
    void trash() throws Exception{
        Long carId = 1L;

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/client/trash/{id}", carId))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(clientService, times(1)).trash(carId);
    }

    @Test
    void affect() throws Exception {
        Long carId = 1L;

        mockMvc.perform(MockMvcRequestBuilders.get("/api/client/affect/{id}", carId))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(clientService, times(1)).affect(carId);
    }

    @Test
    void fuel() throws Exception {
        Long carId = 1L;
        Float liters = 5.0f;

        mockMvc.perform(MockMvcRequestBuilders.put("/api/client/fuel/{id}/{liters}", carId, liters))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(clientService, times(1)).fuel(carId, liters);
    }
}
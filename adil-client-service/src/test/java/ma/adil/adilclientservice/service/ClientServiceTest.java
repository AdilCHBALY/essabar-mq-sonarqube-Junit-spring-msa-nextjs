package ma.adil.adilclientservice.service;

import ma.adil.adilclientservice.dto.ClientResponse;
import ma.adil.adilclientservice.entities.Car;
import ma.adil.adilclientservice.entities.Client;
import ma.adil.adilclientservice.external.CarRestClient;
import ma.adil.adilclientservice.model.CarModel;
import ma.adil.adilclientservice.model.FuelType;
import ma.adil.adilclientservice.repository.CarRepository;
import ma.adil.adilclientservice.repository.ClientRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private CarRepository carRepository;

    @Mock
    private CarRestClient carRestClient;

    @InjectMocks
    private ClientService clientService;

    private Car car;
    private List<Car> cars;
    private Client client;
    private CarModel carModel;
    private List<Client> clients = new ArrayList<>();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        car = Car.builder()
                .id(1L)
                .card_id(1L)
                .status(true)
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
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findAll() {
        Mockito.when(clientRepository.findAll()).thenReturn(clients);
        Mockito.when(carRestClient.car(ArgumentMatchers.anyLong())).thenReturn(carModel);
        List<Client> result = clientService.findAll();
        assertEquals(clients, result);
    }

    @Test
    void findById() {
        Mockito.when(clientRepository.findById(ArgumentMatchers.anyLong())).thenReturn(java.util.Optional.of(client));
        Mockito.when(carRestClient.car(ArgumentMatchers.anyLong())).thenReturn(carModel);
        ClientResponse result = clientService.findById(1L);
        assertEquals(client.getFullName(), result.getFullName());
    }

    @Test
    void save() {
        clientService.save(client);
        verify(clientRepository, times(1)).save(client);
    }

    @Test
    void power() {
        Long carId = 1L;
        when(clientRepository.findById(anyLong())).thenReturn(java.util.Optional.of(client));
        when(carRestClient.car(anyLong())).thenReturn(carModel);
        clientService.power(carId);
        verify(clientRepository, times(1)).save(client);
    }


    @Test
    void trash() {
        Long carId = 1L;
        when(clientRepository.findById(anyLong())).thenReturn(java.util.Optional.of(client));
        when(carRepository.findById(anyLong())).thenReturn(java.util.Optional.of(car));
        clientService.trash(carId);
        verify(clientRepository, times(1)).save(client);
    }

    @Test
    void affect() {
        Long carId = 1L;
        when(clientRepository.findById(anyLong())).thenReturn(java.util.Optional.of(client));
        when(carRestClient.car(anyLong())).thenReturn(carModel);
        clientService.affect(carId);
        verify(clientRepository, times(1)).save(client);
    }

    @Test
    void fuel() {
        Long carId = 1L;
        float liters = 5.0f;
        when(carRepository.findById(anyLong())).thenReturn(java.util.Optional.of(car));
        when(carRestClient.car(anyLong())).thenReturn(carModel);
        clientService.fuel(carId, liters);
        verify(carRepository, times(1)).save(any());
    }

    @Test
    void fuelLitersExceedMaxTankSize(){
        Long carId = 1L;
        float liters = 31F;
        when(carRepository.findById(anyLong())).thenReturn(java.util.Optional.of(car));
        when(carRestClient.car(anyLong())).thenReturn(carModel);
        clientService.fuel(carId, liters);
        verify(carRepository, times(1)).save(any());
    }
}
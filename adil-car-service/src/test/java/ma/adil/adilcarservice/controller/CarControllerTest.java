package ma.adil.adilcarservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.ws.rs.core.MediaType;
import ma.adil.adilcarservice.entities.Car;
import ma.adil.adilcarservice.entities.FuelType;
import ma.adil.adilcarservice.service.CarService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;


@WebMvcTest(CarController.class)
class CarControllerTest {
    private static final String END_POINT_PATH="/api/car";
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private CarService carService;
    private Car car;
    private List<Car> carList;

    @BeforeEach
    void setUp() {
        car = Car.builder()
                .brand("Mercedes")
                .consumptionPerKm(6F)
                .description("Mercedes Class E 2018")
                .fuelType(FuelType.ESSENCE)
                .picture("https://i.gaw.to/content/photos/42/62/426286-mercedes-classe-e-2021-au-tour-du-coupe-et-du-cabriolet.jpg?460x287")
                .tankSize(50F)
                .model("Class E")
                .build();
        carList=List.of(
                car,
                Car.builder()
                    .brand("BMW")
                    .consumptionPerKm(9F)
                    .description("BMW Serie 2")
                    .fuelType(FuelType.ESSENCE)
                    .picture("https://www.bmw.ma/content/dam/bmw/common/all-models/2-series/series-overview/bmw-2-series-overview-page-ms-coupe.jpg/jcr:content/renditions/cq5dam.resized.img.585.low.time1627455118737.jpg")
                    .tankSize(50F)
                    .model("Serie 2")
                    .build()
        );
    }

    @Test
    void cars() throws Exception {
        Mockito.when(carService.cars()).thenReturn(carList);

        mockMvc.perform(MockMvcRequestBuilders.get(END_POINT_PATH)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(new ObjectMapper().writeValueAsString(carList)));
    }

    @Test
    void car() throws Exception {
        Long carId = 1L;
        Mockito.when(carService.car(carId)).thenReturn(car);

        mockMvc.perform(MockMvcRequestBuilders.get(END_POINT_PATH+"/{id}", carId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(new ObjectMapper().writeValueAsString(car)));
    }

}
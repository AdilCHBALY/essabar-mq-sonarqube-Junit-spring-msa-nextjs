package ma.adil.adilcarservice;

import ma.adil.adilcarservice.service.CarService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class AdilCarServiceApplicationTests {

    @Autowired
    private CarService carService;

    @Test
    void contextLoads() {
        assertNotNull(carService);
    }

}

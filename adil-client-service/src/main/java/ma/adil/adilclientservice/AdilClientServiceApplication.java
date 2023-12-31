package ma.adil.adilclientservice;

import ma.adil.adilclientservice.entities.Car;
import ma.adil.adilclientservice.entities.Client;
import ma.adil.adilclientservice.repository.CarRepository;
import ma.adil.adilclientservice.repository.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class AdilClientServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdilClientServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ClientRepository clientRepository, CarRepository carRepository){
        return args -> {

            clientRepository.save(
                    Client.builder()
                            .email("adil.chbaly@gmail.com")
                            .fullName("CHBALY Adil")
                            .build()
            );
        };
    }
}

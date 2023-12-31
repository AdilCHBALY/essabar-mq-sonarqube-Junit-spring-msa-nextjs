package ma.adil.adilcarservice;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;



@SpringBootApplication
@EnableFeignClients
public class AdilCarServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdilCarServiceApplication.class, args);
    }


}

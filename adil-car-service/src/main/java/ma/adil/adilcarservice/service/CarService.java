package ma.adil.adilcarservice.service;


import ma.adil.adilcarservice.entities.Car;
import ma.adil.adilcarservice.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository clientRepository;
    public List<Car> cars(){
        return clientRepository.findAll();
    }
    public Car car(Long id){
        return clientRepository.findById(id).orElse(null);
    }
    public void save(Car car){clientRepository.save(car);}
}

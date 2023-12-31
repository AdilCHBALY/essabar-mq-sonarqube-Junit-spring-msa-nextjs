package ma.adil.adilcarservice.controller;


import ma.adil.adilcarservice.entities.Car;
import ma.adil.adilcarservice.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/car")
public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping
    public List<Car> cars(){return carService.cars();}
    @GetMapping("/{id}")
    public Car car(@PathVariable("id") Long id){return carService.car(id);}

}

package com.example.adilfuelconsumption.controller;


import com.example.adilfuelconsumption.entities.FuelConsumption;
import com.example.adilfuelconsumption.service.FuelConsumptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consumption")
public class FuelConsumptionController {

    private final FuelConsumptionService fuelConsumptionService;

    public FuelConsumptionController(FuelConsumptionService fuelConsumptionService) {
        this.fuelConsumptionService = fuelConsumptionService;
    }

    @GetMapping("/client/{id}")
    public List<FuelConsumption> fuelConsumptionsByClient(@PathVariable("id") Long id){return fuelConsumptionService.fuelConsumptionsByClientId(id);}
    @GetMapping
    public List<FuelConsumption> fuelConsumptions(){return fuelConsumptionService.fuelConsumptions();}
    @GetMapping("/{id}")
    public FuelConsumption fuelConsumption(@PathVariable("id") Long id){return fuelConsumptionService.fuelConsumption(id);}
    @PostMapping
    public void save(@RequestBody FuelConsumption fuelConsumption){fuelConsumptionService.save(fuelConsumption);}
}

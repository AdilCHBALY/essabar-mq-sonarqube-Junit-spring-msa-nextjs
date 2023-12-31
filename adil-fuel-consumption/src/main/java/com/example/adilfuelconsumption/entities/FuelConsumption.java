package com.example.adilfuelconsumption.entities;


import com.example.adilfuelconsumption.model.Car;
import com.example.adilfuelconsumption.model.Client;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Objects;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class FuelConsumption {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long client_id;
    private Long car_id;
    private Float price;
    private Float gazPerLiter;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Transient
    private Client client;
    @Transient
    private Car car;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FuelConsumption that = (FuelConsumption) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

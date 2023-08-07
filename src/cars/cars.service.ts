import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'

import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {

    private carros: Car[] = [
        { id: uuid(), modelo: 'Civic', marca: 'Honda' },
        { id: uuid(), modelo: 'Corolla', marca: 'Toyota' },
        { id: uuid(), modelo: 'Mustang', marca: 'Ford' },
        { id: uuid(), modelo: 'Camry', marca: 'Toyota' },
        { id: uuid(), modelo: 'Accord', marca: 'Honda' }
    ];

    findAll() {
        return this.carros;
    }

    findOneById(id: string) {
        const car = this.carros.find(car => car.id == id);
        if (!car) throw new NotFoundException(`Car with ID '${id}' not fund`);
        return car;
    }
    create(CreateCarDto: CreateCarDto) {
        const car: Car = {
            id: uuid(),
            //  marca: CreateCarDto.marca, modelo: CreateCarDto.modelo
            ...CreateCarDto
        }
        this.carros.push(car)
        return car
    }
    update(id: string, UpdateCarDto: UpdateCarDto) {

        let carDB = this.findOneById(id);
        if (UpdateCarDto.id && UpdateCarDto.id !== id) {
            throw new BadRequestException(`Car id is not valid inside body`)
        }
        this.carros = this.carros.map(carro => {
            if (carro.id === id) {
                carDB = {
                    ...carDB,
                    ...UpdateCarDto,
                    id
                }
                return carDB;
            } return carro;
        })
        return carDB;
    }
    delete(id: string) {
        console.log(this.carros);

        this.findOneById(id);
        this.carros = this.carros.filter(carro => carro.id !== id);
    }
}

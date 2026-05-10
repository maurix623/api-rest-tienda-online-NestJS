import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepo: Repository<Orden>,
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ){};

  async create(createOrdenDto: CreateOrdenDto){
    const cliente = await this.clienteRepo.findOne({
      where: { idCliente: createOrdenDto.idCliente },
    });
    if(!cliente) throw new NotFoundException('Cliente no encontrado');
    const orden = this.ordenRepo.create({
      ...createOrdenDto,
      idCliente: createOrdenDto.idCliente,
    })
    return await this.ordenRepo.save(orden);
  }

  async findAll() {
    return await this.ordenRepo.find();
  }

  async findOne(id: number) {
    const orden = await this.ordenRepo.findOneBy({ idOrden: id });
    if (!orden) throw new NotFoundException('Orden no encontrada');
    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto) {
    const orden = await this.findOne(id);
    if (!orden) throw new NotFoundException('Orden no encontrada');
    Object.assign(orden, updateOrdenDto);
    return await this.ordenRepo.save(orden);
  }

  async remove(id: number) {
    const orden = await this.ordenRepo.findOneBy({ idOrden: id });
    if(!orden) throw new NotFoundException('Orden no encontrada');
    return await this.ordenRepo.softDelete(id);
  }
}

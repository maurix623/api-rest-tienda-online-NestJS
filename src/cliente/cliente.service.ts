import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ idCliente: id });

    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  //findOneBy es un metodo de typeorm que busca por una columna especifica, en este caso idCliente
  //findOne es un metodo de typeorm que busca por el id, en este caso idCliente
  //la diferencia entre ambos es que findOneBy permite buscar por cualquier columna, mientras que findOne solo busca por el id

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  remove(id: number) {
    const cliente = this.clienteRepository.findOneBy({ idCliente: id });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return this.clienteRepository.softDelete(id);
  }
}

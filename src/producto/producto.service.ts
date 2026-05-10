import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const categoria = await this.categoriaRepository.findOne({
      where: { idCategoria: createProductoDto.idCategoria },
    });
    if (!categoria) {
      throw new NotFoundException('Categoria no encontrada');
    }
    const producto = this.productoRepository.create({
      ...createProductoDto,
      idCategoria: createProductoDto.idCategoria,
    });
    return await this.productoRepository.save(producto);
  }

  async findAll() {
    return await this.productoRepository.find();
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: {idProducto: id},
      relations: ['categoria']  
    });
    if(!producto) throw new NotFoundException('Producto no encontrado')
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return await this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.productoRepository.findOneBy({idProducto: id});
    if(!producto) throw new NotFoundException('Producto no encontrado');

    return await this.productoRepository.softDelete(id);
  }
}

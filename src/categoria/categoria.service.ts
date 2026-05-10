import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
    // select * from categoria
  }

  async findOne(id: number) {
    //mandar junto a sus productos
    const categoria = await this.categoriaRepository.findOne({
      where: { idCategoria: id },
      relations: ['producto'],
    });
    if (!categoria) {
      throw new NotFoundException('Categoria no encontrada');
    }
    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.findOne(id);

    Object.assign(categoria, updateCategoriaDto);

    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({
      idCategoria: id,
    });
    if (!categoria) {
      throw new NotFoundException('Categoria no encontrada');
    }

    return await this.categoriaRepository.softDelete(id);
    // softdelete borrado logico
  }
}

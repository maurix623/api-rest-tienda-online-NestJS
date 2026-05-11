import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { OrdenProducto } from 'src/orden_producto/entities/orden_producto.entity';

@Entity()
export class Orden {
  @PrimaryGeneratedColumn()
  idOrden: number;

  @Column()
  idCliente: number;

  @Column()
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.orden)
  @JoinColumn({ name: 'idCliente'})
  cliente: Cliente;

  @OneToMany(() => OrdenProducto, (ordenProducto) => ordenProducto.orden)
  ordenProductos: OrdenProducto[];


}

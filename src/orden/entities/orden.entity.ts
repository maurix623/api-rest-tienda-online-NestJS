import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';

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
}

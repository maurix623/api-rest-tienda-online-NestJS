import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Producto } from "src/producto/entities/producto.entity";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    idCategoria: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @CreateDateColumn()
    creadoEn: Date;

    @UpdateDateColumn()
    actualizadoEn: Date;    

    @DeleteDateColumn()
    eliminadoEn: Date;  

    @OneToMany(() => Producto, (producto) => producto.categoria, {onDelete: "CASCADE"})
    producto: Producto[];
}

import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"

@Entity({
    name: "users"
}) //Esta entity es lo que va a crear la tabla. Usemos plural para los nombres de las tablas y todo minuscula
export class User {
    @PrimaryGeneratedColumn() //esto significa que id es primary key
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    birthdate: Date

    @Column()
    nDni: number

    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]
}

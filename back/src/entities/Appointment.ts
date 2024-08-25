import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity({
    name: "appointments"
}) //Esta entity es lo que va a crear la tabla. Usemos plural para los nombres de las tablas
export class Appointment {
    @PrimaryGeneratedColumn() //esto significa que id es primary key
    id: number

    @Column()
    date: Date

    @Column()
    time: string

    @Column({default:"active"})
    status: string

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.appointments)
    user: User
}



interface IAppointment {
    id: number,
    date: Date,
    time: string,
    userId: number,
    status: "Active" | "Cancelled",
    description: string
}

export default IAppointment;
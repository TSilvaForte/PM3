interface IAppointmentDto {
    date: Date,
    time: string,
    userId: number,
    status: "Active" | "Cancelled",
    description: string
}

export default IAppointmentDto;
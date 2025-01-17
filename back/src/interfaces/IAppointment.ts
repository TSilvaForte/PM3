interface IAppointment {
    id: number,
    date: Date,
    time: string,
    userId: number,
    status: "Active" | "Cancelled",
    description: string
}

export default IAppointment;
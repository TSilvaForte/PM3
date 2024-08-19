interface IAppointment {
    id: number,
    date: Date,
    time: string,
    status: "Active" | "Cancelled",
    description: string
}

export default IAppointment;
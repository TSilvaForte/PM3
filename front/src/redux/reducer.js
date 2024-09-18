import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userActive: {},
    userAppointments: []
}

export const userSlice = createSlice({
    name: "userData",
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.userActive = action.payload;
        },
        addUserAppointments: (state, action) => {
            state.userAppointments = action.payload;
        },
        cancelAppointmentAction: (state, action) => {
            state.userAppointment = state.userAppointments.map(appointment => {
                if(appointment.id === action.payload) {
                    return {...appointment, status:"cancelled"}
                }
                return appointment;
            })
        }
    }
})

export const {addUser, addUserAppointments, cancelAppointmentAction} = userSlice.actions;


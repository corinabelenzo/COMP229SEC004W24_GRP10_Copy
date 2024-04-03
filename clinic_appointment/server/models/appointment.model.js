import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'First Name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last Name is required'
    },
    date: {
        type: String//,required: 'Date is required'
    },
    time: {
        type: String,
        trim: true//,required: 'Time is required'
    },
    procedure: {
        type: String,
        trim: true,
        required: 'Procedure is required'
    },
    dentist: {
        type: String,
        trim: true,
        required: 'Dentist is required'
    },
    status: {
        type: String,
        trim: true//,required: 'Status is required'
    }
});

export default mongoose.model('Appointment', AppointmentSchema);

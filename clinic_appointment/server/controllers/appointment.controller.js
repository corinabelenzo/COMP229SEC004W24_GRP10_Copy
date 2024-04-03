import Appointment from '../models/appointment.model.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => { 
    const appointment = new Appointment(req.body); 
    try {
        await appointment.save();
        return res.status(200).json({ 
            message: "Successfully Added!",
            Appointment: appointment
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
};

const list = async (req, res) => { 
    try {
        let appointment = await Appointment.find().select('firstName lastName date time procedure dentist status'); 
        res.json(appointment);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
};

const deleteAppointmentById = async (req, res) => {
    const appointmentId = req.params.id;
  
    try {
      const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
  
      if (!deletedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const updateAppointmentById = async (req, res) => {
    const appointmentId = req.params.id;
    const { firstName, lastName, date, time, procedure, dentist } = req.body;
  
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId,
          {  firstName, lastName, date, time, procedure, dentist  },
          { new: true }
        );
    
        if (!updatedAppointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }
    
        res.json(updatedAppointment);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
export default { create, list, deleteAppointmentById, updateAppointmentById };

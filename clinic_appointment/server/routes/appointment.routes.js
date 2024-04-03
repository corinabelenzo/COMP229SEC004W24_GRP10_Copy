import express from 'express'
import appointmentCtrl from '../controllers/appointment.controller.js';

 const router = express.Router()

 router.route('/api/appointments').post(appointmentCtrl.create)
 router.route('/api/appointments').get(appointmentCtrl.list);
 router.route('/api/appointments/:id').delete(appointmentCtrl.deleteAppointmentById);
 router.route('/api/appointments/:id').put(appointmentCtrl.updateAppointmentById)

 export default router

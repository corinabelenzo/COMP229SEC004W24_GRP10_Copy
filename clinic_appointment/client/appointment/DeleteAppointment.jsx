import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from '../signin/auth-helper.js'
import { remove } from './api-appointment.js'


export default function DeleteAppointment(props) {
    const [open, setOpen] = useState(false)

    const jwt = auth.isAuthenticated()
    const clickButton = () => {
        setOpen(true)
    }
    const deleteAppointment = () => {
        remove({
            appointmentId: props.appointment._id
        }, { t: jwt.token }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOpen(false)
                props.onRemove(props.appointment)
            }
        })
    }
    const handleRequestClose = () => {
        setOpen(false)
    }
    return (<span>
        <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
            <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleRequestClose}>
            <DialogTitle>{"Delete " + props.appointment.firstName}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Confirm to delete appointment for {props.appointment.firstName}.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRequestClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteAppointment} color="secondary" autoFocus="autoFocus">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </span>)
}
DeleteAppointment.propTypes = {
    appointment: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}
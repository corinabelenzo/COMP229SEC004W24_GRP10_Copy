import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

function UpdateButton({ appointment, onUpdateAppointment }) {
  const onClickUpdate = () => {
    onUpdateAppointment(appointment);
  }

  return (
    <span>
      <IconButton aria-label="Update" onClick={onClickUpdate} color="secondary">
        <EditIcon />
      </IconButton>
    </span>
  );
}

export default UpdateButton;
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  onSubmit,
}) {
  const { id, name, email, phone, dob } = data;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id ? "Update User" : "Create New User"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(event) => onChange(event)}
              label="Name"
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => onChange(event)}
              label="Email"
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="phone"
              placeholder="Enter phone no"
              value={phone}
              onChange={(event) => onChange(event)}
              label="Phone no"
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="dob"
              placeholder="Enter DOB"
              value={dob}
              onChange={(event) => onChange(event)}
              label="Date of birth"
              fullWidth
              variant="outlined"
              margin="dense"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onSubmit()}
          >
            {id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

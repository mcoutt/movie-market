import React from 'react';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import 'date-fns';
import './item-modal-delete.scss';

function rand() {
  return Math.round(0.2198524788701166 * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    height: 800,
    backgroundColor: '#232323',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ItemDelete() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <form>
      <div style={modalStyle} className={classes.paper}>
        <div className='del'>
          <label>DELETE MOVIE</label>
        </div>
        <div>
          <label>
            <p className='titles'>TITLE</p>
            <input type='text' name='title' className='input-data-area placeholders' placeholder='Moana'/>
          </label>
        </div>
      </div>
    </form>
  );

  return (
    <div>
      <button type="button" className='header-button' onClick={handleOpen}>
        - DELETE MOVIE
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

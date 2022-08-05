import React from 'react';
import ReactDOM from 'react-dom';
import classes from './DeletePostModal.module.css';

const DeletePostModal = (props) => {
  
  const content =  (<div className={classes.modalContainer}>
                    <div className={classes.modal}>
                      <div className={classes.modal__header}>
                        <h2>"Delete Post"</h2>
                      </div>
                      <div className={classes.modal__content}>
                        <p>Are you sure you want to delete this item?</p>
                      </div>
                      <footer className={classes.modal__footer}>
                        <button onClick={props.onDelete} className={classes.btn}>Delete</button>
                        <button onClick={props.onClear} className={classes.btn}>Cancel</button>
                      </footer>
                    </div>
                    </div>
    )
   

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

export default DeletePostModal;

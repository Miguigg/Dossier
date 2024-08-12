import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const AlertaEstandar = ({ show, setShow, message, variant }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000); // Alert will disappear after 3 seconds
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [show, setShow]);

  if (!show) return null;

  return (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      {message}
    </Alert>
  );
};
export default AlertaEstandar;
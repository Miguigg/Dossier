/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const AlertaEstandar = ({ show, setShow, message, variant }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000); 
      return () => clearTimeout(timer); 
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
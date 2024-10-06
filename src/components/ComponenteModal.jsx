import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react'

const ComponenteModal = ({ show, handleClose, msg }) => {

  const {t, i18n} = useTranslation();

  useEffect(() => {
      i18n.changeLanguage(navigator.language)
  }, [])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("importante")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("aceptar")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComponenteModal;
import Modal from 'react-modal'

import styles from './modal-delete-list-item.module.css'

type Props = {
  isOpen: boolean
  onRequestClose: () => void
  confirmDeleteItem: () => void
  cancelDeleteItem: () => void
}

const ModalDeleteItemList = (props: Props) => {
  return (
    <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="Modal de exemplo"
        className={styles.container}
      >
        <div className={styles.contant}>
          <h2 className={styles.message}>Tem certeza que deseja remover essa tarefa?</h2>
          <div className={styles.buttons}>
            <button className={`${styles.button_confirm} ${styles.button}`} onClick={props.confirmDeleteItem}>Confirmar</button>
            <button className={`${styles.button_cancel} ${styles.button}`} onClick={props.cancelDeleteItem}>Cancelar</button>
          </div>
        </div>
      </Modal>
  )
}

export default ModalDeleteItemList
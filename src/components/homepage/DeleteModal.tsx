import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import {
  selectContacts,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import { deleteContact } from '../../redux/slices/contacts';
import Button from '../Button';

function DeleteModal(props: ModalProps) {
  const dispatch = useAppDispatch();
  const { isOpen, setIsOpen, reFetchContacts, selectedContact } = props;
  const contactsState = useAppSelector(selectContacts);

  const onCloseClick = () => {
    setIsOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(deleteContact(selectedContact.id)).then((action) => {
      if (deleteContact.fulfilled.match(action)) {
        reFetchContacts();
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onClose={onCloseClick}>
      <DialogTitle>
        Are you sure you want to delete "{selectedContact?.first_name}"
      </DialogTitle>

      <DialogActions sx={{ mt: 5 }}>
        <Button
          onClick={onDeleteBtnClick}
          isLoading={contactsState.status === 'loading'}
          variant='text'
          color='error'
        >
          Delete
        </Button>

        <Button onClick={onCloseClick} variant='contained'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;

import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  selectContacts,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import { updateContact } from '../../redux/slices/contacts';
import Button from '../Button';

function EditModal(props: ModalProps) {
  const dispatch = useAppDispatch();
  const { isOpen, setIsOpen, selectedContact, reFetchContacts } = props;
  const contactsState = useAppSelector(selectContacts);

  const [formData, setFormData] = useState(selectedContact);

  useEffect(() => {
    setFormData(selectedContact);
  }, [isOpen]);

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onCloseClick = () => {
    setIsOpen(false);
  };

  const onEditClick = () => {
    dispatch(updateContact(formData)).then((action) => {
      if (updateContact.fulfilled.match(action)) {
        reFetchContacts();
        setIsOpen(false);
      }
    });
  };

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(updateContact(formData)).then((action) => {
      if (updateContact.fulfilled.match(action)) {
        reFetchContacts();
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onClose={onCloseClick} maxWidth='xs'>
      <form onSubmit={onFormSubmit}>
        <DialogContent>
          <TextField
            margin='normal'
            required
            fullWidth
            name='first_name'
            label='First Name'
            type='text'
            value={formData?.first_name}
            onChange={onInputChange}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            name='last_name'
            label='Last Name'
            type='text'
            value={formData?.last_name}
            onChange={onInputChange}
          />

          <TextField
            required
            margin='normal'
            fullWidth
            label='Email Address'
            name='email'
            autoComplete='email'
            value={formData?.email}
            autoFocus
            onChange={onInputChange}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            name='phone'
            label='Phone'
            type='tel'
            value={formData?.phone}
            onChange={onInputChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseClick} variant='text'>
            Cancel
          </Button>

          <Button
            onClick={onEditClick}
            isLoading={contactsState.status === 'loading'}
            variant='contained'
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditModal;

/// <reference types="vite/client" />
/// <reference types="@material-ui/core" />

// Local Storage
type LocalStorageKeys = 'refreshToken' | 'accessToken';

type LocalStorageKeysObject = {
  [key in LocalStorageKeys]: string;
};

// Button Component
interface CustomButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

// Redux state
type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface RequestState<T = null> {
  data: T;
  status: RequestStatus;
  error: SerializedError;
}

interface ResponseError {
  detail: string;
}

// Contacts Init State
interface ContactInitState extends RequestState<ContactsResponse> {
  selectedContact: ContactItem | null;
}

// Login page
interface LoginResponse {
  refresh: string;
  access: string;
  first_name: string;
  last_name: string;
  email: string;
  is_superuser: boolean;
  is_staff: boolean;
}

interface LoginBodyState {
  email: string;
  password: string;
}

// Homepage
interface ContactItem {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface ContactsResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  results: ContactItem[];
}

interface GetContactsQueryParams {
  [key: string]: string | number | MRT_SortingState;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reFetchContacts: () => void;
  selectedContact: ContactItem;
}

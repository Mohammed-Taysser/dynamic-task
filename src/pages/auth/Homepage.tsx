import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import MaterialReactTable, {
  MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_Row,
  type MRT_SortingState,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import CreateModal from '../../components/homepage/CreateModal';
import DeleteModal from '../../components/homepage/DeleteModal';
import EditModal from '../../components/homepage/EditModal';
import usePageTitle from '../../hooks/usePageTitle';
import {
  selectContacts,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import { getContacts } from '../../redux/slices/contacts';

function Homepage() {
  usePageTitle('Homepage');
  const dispatch = useAppDispatch();
  const contactsState = useAppSelector(selectContacts);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem>(
    contactsState.data.results[0]
  );

  //data and fetching state
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(true);

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [searchQuery, setQuerySearch] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters,
    searchQuery,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ]);

  const fetchData = async () => {
    if (!contactsState.data.results.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const params: GetContactsQueryParams = {
      page:
        contactsState.data.results.length === 1
          ? pagination.pageIndex
          : pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      query: searchQuery,
      sort: sorting,
    };

    columnFilters.forEach((item) => {
      params[item.id] = item.value as string;
    });

    dispatch(getContacts(params)).then((action) => {
      if (getContacts.fulfilled.match(action)) {
        setIsLoading(false);
        setIsRefetching(false);
      }
    });
  };

  const onDeleteBtnClick = (row: MRT_Row<ContactItem>) => {
    setSelectedContact(row.original);
    setIsDeleteModalOpen(true);
  };

  const onEditBtnClick = (row: MRT_Row<ContactItem>) => {
    setSelectedContact(row.original);
    setIsEditModalOpen(true);
  };

  const columns = useMemo<MRT_ColumnDef<ContactItem>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        size: 100,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 100,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 100,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 100,
      },
    ],
    []
  );

  const reFetchContacts = () => {
    fetchData();
  };

  return (
    <Container>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        reFetchContacts={reFetchContacts}
        selectedContact={selectedContact}
      />

      <EditModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        reFetchContacts={reFetchContacts}
        selectedContact={selectedContact}
      />

      <CreateModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        reFetchContacts={reFetchContacts}
        selectedContact={selectedContact}
      />

      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ minHeight: '100vh' }}
      >
        <Grid item md={8}>
          <MaterialReactTable
            columns={columns}
            data={contactsState.data.results}
            initialState={{ density: 'compact' }}
            manualFiltering
            manualPagination
            enableEditing
            manualSorting
            muiToolbarAlertBannerProps={
              contactsState.error
                ? {
                    color: 'error',
                    children: contactsState.error,
                  }
                : undefined
            }
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setQuerySearch}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            rowCount={contactsState.data.count}
            state={{
              columnFilters,
              globalFilter: searchQuery,
              isLoading,
              pagination,
              showAlertBanner: Boolean(contactsState.error),
              showProgressBars: isRefetching,
              sorting,
            }}
            muiTablePaperProps={{
              elevation: 0,
              sx: {
                boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
                padding: '10px',
              },
            }}
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip placement='top' arrow title='Edit'>
                  <IconButton onClick={() => onEditBtnClick(row)}>
                    <BiEditAlt />
                  </IconButton>
                </Tooltip>

                <Tooltip placement='top' arrow title='Delete'>
                  <IconButton
                    color='error'
                    onClick={() => onDeleteBtnClick(row)}
                  >
                    <AiOutlineDelete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                variant='contained'
              >
                Create New Contact
              </Button>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;

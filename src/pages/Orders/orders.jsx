import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { id: 'select', label: '', minWidth: 50 },
  { id: 'order', label: 'Order', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 120 },
  { id: 'customer', label: 'Customer', minWidth: 170 },
  { id: 'status', label: 'Payment Status', minWidth: 150 },
  { id: 'orderStatus', label: 'Order Status', minWidth: 150 },
  { id: 'total', label: 'Total', minWidth: 100 },
];

function createData(order, date, customer, status, orderStatus, total) {
  return { order, date, customer, status, orderStatus, total };
}

const sampleRows = [
  createData('#12512B', 'May 5, 4:20 PM', 'Tom Anderson', 'Paid', 'Ready', '$49.90'),
  createData('#12523C', 'May 5, 4:15 PM', 'Jayden Walker', 'Paid', 'Ready', '$34.36'),
  createData('#51232A', 'May 5, 4:15 PM', 'Inez Kim', 'Paid', 'Ready', '$5.51'),
  createData('#23534D', 'May 5, 4:12 PM', 'Francisco Henry', 'Paid', 'Shipped', '$29.74'),
  createData('#51323C', 'May 5, 4:11 PM', 'Violet Phillips', 'Paid', 'Shipped', '$23.06'),
  createData('#35622A', 'May 5, 4:10 PM', 'Rosetta Becker', 'Paid', 'Shipped', '$87.44'),
  createData('#34232D', 'May 5, 4:10 PM', 'Dean Love', 'Paid', 'Ready', '$44.55'),
  createData('#56212D', 'May 5, 4:08 PM', 'Nettie Tyler', 'Paid', 'Ready', '$36.79'),
  createData('#23534D', 'May 5, 4:04 PM', 'Miguel Harris', 'Pending', 'Ready', '$50.54'),
  createData('#12523C', 'May 5, 4:04 PM', 'Angel Conner', 'Pending', 'Ready', '$63.47'),
  createData('#51232A', 'May 5, 4:03 PM', 'Rosalie Singleton', 'Pending', 'Received', '$91.63'),
];

const badgeStyle = (status, type) => {
  const base = {
    fontSize: '16px',
    fontWeight: 500,
    px: 1.5,
    py: 0.5,
    borderRadius: '5px',
    display: 'inline-block',
    width: 'fit-content',
  };

  const statusColors = {
    Paid: { backgroundColor: '#C6F6D5', color: '#22543D' },
    Pending: { backgroundColor: '#E2E8F0', color: '#4A5568' },
  };

  const orderColors = {
    Ready: { backgroundColor: '#F6AD55', color: '#7B341E' },
    Shipped: { backgroundColor: '#A0AEC0', color: '#2D3748' },
    Received: { backgroundColor: '#63B3ED', color: '#1A365D' },
  };

  return {
    ...base,
    ...(type === 'status' ? statusColors[status] : orderColors[status] || {}),
  };
};

const Orders = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [selected, setSelected] = React.useState([]);

  const handleSelect = (row) => {
    setSelected((prev) =>
      prev.includes(row.order)
        ? prev.filter((id) => id !== row.order)
        : [...prev, row.order]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelected(sampleRows.map((row) => row.order));
    } else {
      setSelected([]);
    }
  };

  return (
    <div>
      <Button className='h-[6vh] absolute left-[88%] bottom-[70px]' variant="contained" startIcon={<AddIcon/>}>Add order</Button>
      <div className='my-[20px] flex flex-col justify-between md:flex-row'>
        <div className='flex flex-col w-[80%] md:flex-row gap-[30px]'>
          <div>
            <TextField
              id="outlined-suffix-shrink"
              label="Search..."
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        opacity: 0,
                        pointerEvents: 'none',
                        [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                          opacity: 1,
                        },
                      }}
                    >
                      <SearchIcon/>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div className='w-[80%] md:w-[13%]'>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-select-currency-native"
              select
              label="Filter"
              defaultValue="#"
              slotProps={{
                select: {
                  native: true,
                },
              }}
            >
              <option selected value="#">Newest</option>
              <option selected value="#00">Anonim</option>
            </TextField>
          </div>
        </div>
        <div className='flex flex-row gap-[20px]'>
          <Button variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
          <Button variant="outlined" startIcon={<EditIcon />}>Edit</Button>
        </div>
      </div>
      <div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: '91vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'select' ? (
                        <Checkbox
                          checked={selected.length === sampleRows.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.order}>
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(row.order)}
                          onChange={() => handleSelect(row)}
                        />
                      </TableCell>
                      <TableCell>{row.order}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.customer}</TableCell>
                      <TableCell>
                        <Box sx={badgeStyle(row.status, 'status')}>{row.status}</Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={badgeStyle(row.orderStatus, 'orderStatus')}>
                          {row.orderStatus}
                        </Box>
                      </TableCell>
                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={sampleRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Orders;

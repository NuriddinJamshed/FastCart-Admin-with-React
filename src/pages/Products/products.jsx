import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../entitis/reducers/getQuery";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { deleteProduct } from "../../entitis/reducers/deleteQuery";
import CloseIcon from '@mui/icons-material/Close';

const API = import.meta.env.VITE_API;

const Products = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [delModal, setDelModal] = useState(false)
  const [idx, setIdx] = useState(null)

  let rows = useSelector((store) => store.get.products)

  let navigate = useNavigate()
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [])

  function openDelModal(el) {
    setDelModal(!delModal)
    setIdx(el.id)
  }

  function sendIdProduct() {
    dispatch(deleteProduct(idx))
    setDelModal(!delModal)
  }

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const paginatedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return <div>
    <Button onClick={() => navigate("/home/products/add")} className='h-[6vh] absolute left-[88%] bottom-[70px]' variant="contained" startIcon={<AddIcon />}>Add order</Button>
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
                    <SearchIcon />
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
        <Button variant="outlined" onClick={() => setIsEdit(!isEdit)} startIcon={<BorderColorIcon />}>Edit</Button>
      </div>
    </div>
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {isEdit && (<TableCell align="left" className="w-[30px]"><Checkbox /></TableCell>)}
              <TableCell align="left">Product</TableCell>
              <TableCell align="center">Inventory</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {isEdit && (<TableCell>
                  <Checkbox />
                </TableCell>)}
                <TableCell>
                  <div className="flex items-center gap-[15px]">
                    <img className="w-[60px] bg-[#B4CCD1] rounded-[5px] h-[60px]" src={`${API}/images/${row.image}`} alt="" />
                    <p>{row.productName}</p>
                  </div>
                </TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.categoryName}</TableCell>
                <TableCell align="center">${row.price}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-[5px]">
                    <BorderColorIcon sx={{ color: "#1E5EFF" }} />
                    <DeleteIcon onClick={() => openDelModal(row)} sx={{ color: "#F04438" }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="left" mt={2}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          showFirstButton
          showLastButton
        />
      </Box>
    </div>
    {
      delModal && (
        <div className="bg-[#fff] top-[30vh] left-[40%] z-10 fixed border-[1px] flex flex-col gap-y-[10px] rounded-[5px] w-[40%] p-[20px]">
          <div className="flex flex-row justify-between w-[100%]">
            <p className="font-[600] text-[24px]">Delete brand</p>
            <button onClick={() => setDelModal(!delModal)}><CloseIcon sx={{ color: "gray" }} /></button>
          </div>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex flex-row justify-end gap-x-[20px]">
            <Button onClick={() => {
              setDelModal(!delModal)
            }} variant="contained">Cancel</Button>
            <Button color="error" onClick={() => sendIdProduct()} variant="outlined">Delete</Button>
          </div>
        </div>
      )
    }
  </div>;
};

export default Products;

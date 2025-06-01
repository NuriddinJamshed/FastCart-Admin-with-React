import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getBrands, getCategories, getSubCategories } from "../../entitis/reducers/getQuery";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, MenuItem, TextField } from "@mui/material";
import { addBrand, addSubCategory } from "../../entitis/reducers/postQuery";
import { z } from "zod";
import { editBrand, editSubCategory } from "../../entitis/reducers/putQuery";
import CloseIcon from '@mui/icons-material/Close';
import { deleteBrand, deleteSubCategory } from "../../entitis/reducers/deleteQuery";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SubCategories = () => {
  const data = useSelector((store) => store.get.subCategories);
  const category = useSelector((store) => store.get.categories);
  const [Subcategory, setSubcategory] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [modal, setModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [idx, setIdx] = useState(null);

  const [delModal, setDelModal] = useState(false);

  const dispatch = useDispatch();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  useEffect(() => {
    dispatch(getSubCategories());
    dispatch(getCategories());
  }, [dispatch]);

  function sendAddBrand() {
    if (!Subcategory.trim() || !categoryId) {
      setSnackMessage("Please fill in all fields");
      setSnackSeverity("warning");
      setSnackOpen(true);
      return;
    }

    dispatch(addSubCategory({ id: categoryId, name: Subcategory }));
    setSnackMessage("Subcategory added successfully");
    setSnackSeverity("success");
    setSnackOpen(true);

    setSubcategory("");
    setCategoryId("");
  }

  function sendEditBrand() {
    if (!editName.trim() || !categoryId) {
      setSnackMessage("Please fill in all fields");
      setSnackSeverity("warning");
      setSnackOpen(true);
      return;
    }

    dispatch(editSubCategory({ id: idx, name: editName, categoryId }));
    setSnackMessage("Subcategory updated successfully");
    setSnackSeverity("success");
    setSnackOpen(true);

    setEditName("");
    setCategoryId("");
    setModal(false);
  }


  function putEditInp(el) {
    setEditName(el.subCategoryName);
    setCategoryId(el.categoryId);
    setIdx(el.id);
    setModal(true);
  }

  function openDelModal(el) {
    setIdx(el.id);
    setDelModal(true);
  }

  function sendIdBrand() {
    dispatch(deleteSubCategory(idx));
    setSnackMessage("Subcategory deleted");
    setSnackSeverity("info");
    setSnackOpen(true);

    setDelModal(false);
  }


  return (
    <div>
      <div className="flex flex-row items-center gap-[30px]">
        <Link to={"/home/other"} className="p-[10px] text-[16px] font-[500]">
          Categories
        </Link>
        <Link to={"/home/other/brands"} className="px-[10px] py-[5px] text-[16px] font-[500]">
          Brands
        </Link>
        <Link to={"/home/other/banners"} className="p-[10px] text-[16px] font-[500]">
          Banners
        </Link>
        <Link
          to={"/home/other/subCategories"}
          className="px-[10px] py-[5px] rounded-[5px] text-[16px] font-[600] text-[#1D4ED8] bg-[#DBEAFE]"
        >
          Sub Categories
        </Link>
      </div>

      <div className="my-[30px] flex flex-col md:flex-row justify-between items-start">
        <TableContainer sx={{ width: "45%" }} component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#5A607F", fontSize: "16px" }} align="left">
                  Sub Categories
                </TableCell>
                <TableCell sx={{ color: "#5A607F", fontSize: "16px" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    sx={{ fontSize: "16px", fontWeight: "600" }}
                    component="th"
                    scope="row"
                  >
                    {row.subCategoryName}
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex justify-end gap-[5px]">
                      <BorderColorIcon onClick={() => putEditInp(row)} sx={{ color: "#1E5EFF" }} />
                      <DeleteIcon
                        onClick={() => {
                          openDelModal(row);
                        }}
                        sx={{ color: "#F04438" }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex flex-col w-[50%] gap-y-[30px]">
          <div className="w-[100%] relative pb-[100px] border-[1px] p-[15px] gap-y-[25px] flex flex-col items-start border-[#ccc] rounded-[5px]">
            <h1 className="font-[700] text-[20px]">Add new Sub Category</h1>

            <TextField
              value={Subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="SubCategory name"
              variant="outlined"
            />

            <TextField
              sx={{ width: "100%" }}
              id="outlined-select-category"
              select
              label="Select Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {category.map((el) => (
                <MenuItem value={el.id} key={el.id}>
                  {el.categoryName}
                </MenuItem>
              ))}
            </TextField>

            <div className="absolute bottom-8 right-5">
              <Button onClick={sendAddBrand} variant="contained">
                Create
              </Button>
            </div>
          </div>

          {modal && (
            <div className="w-[100%] relative pb-[100px] border-[1px] p-[15px] gap-y-[25px] flex flex-col items-start border-[#ccc] rounded-[5px]">
              <h1 className="font-[700] text-[20px]">Edit Sub Category</h1>

              <TextField
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Edit SubCategory name"
                variant="outlined"
              />

              <TextField
                sx={{ width: "100%" }}
                id="outlined-select-category-edit"
                select
                label="Select Category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {category.map((el) => (
                  <MenuItem value={el.id} key={el.id}>
                    {el.categoryName}
                  </MenuItem>
                ))}
              </TextField>

              <div className="absolute bottom-8 gap-[20px] flex right-5">
                <Button onClick={() => setModal(false)} variant="outlined">
                  Cancel
                </Button>
                <Button onClick={sendEditBrand} variant="contained">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {delModal && (
        <div className="bg-[#fff] top-[30vh] left-[40%] z-10 fixed border-[1px] flex flex-col gap-y-[10px] rounded-[5px] w-[40%] p-[20px]">
          <div className="flex flex-row justify-between w-[100%]">
            <p className="font-[600] text-[24px]">Delete Sub Category</p>
            <button onClick={() => setDelModal(false)}>
              <CloseIcon sx={{ color: "gray" }} />
            </button>
          </div>
          <p>Are you sure you want to delete this sub category?</p>
          <div className="flex flex-row justify-end gap-x-[20px]">
            <Button onClick={() => setDelModal(false)} variant="contained">
              Cancel
            </Button>
            <Button color="error" onClick={() => sendIdBrand()} variant="outlined">
              Delete
            </Button>
          </div>
        </div>
      )}
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackClose} severity={snackSeverity} sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default SubCategories;

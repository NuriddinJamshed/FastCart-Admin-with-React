import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField, InputAdornment, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { inputBaseClasses } from "@mui/material/InputBase";
import { getCategories } from "../../entitis/reducers/getQuery";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Pagination from "@mui/material/Pagination";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { addCategory } from "../../entitis/reducers/postQuery";
import { editCategory } from "../../entitis/reducers/putQuery";
import { z } from "zod";

const API = import.meta.env.VITE_API;

const categorySchema = z.object({
  CategoryName: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Category name must be at most 100 characters"),
  CategoryImage: z
    .instanceof(File, "You must upload an image file")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/svg+xml", "image/gif"].includes(file.type),
      "Allowed formats: SVG, JPG, PNG, or GIF"
    )
    .refine((file) => file.size <= 900 * 400, "Max file size is 360 000 bytes"),
});

const Other = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((store) => store.get.categories);

  const [addModal, setAddModal] = useState(false);
  const [addImg, setAddImg] = useState(null);
  const [addName, setAddName] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [editImg, setEditImg] = useState(null);
  const [editName, setEditName] = useState("");
  const [idx, setIdx] = useState(null);

  const [errors, setErrors] = useState({ name: null, image: null });

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedData = data?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");
  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function sendData() {
    setErrors({ name: null, image: null });

    const toValidate = {
      CategoryName: addName,
      CategoryImage: addImg,
    };

    const result = categorySchema.safeParse(toValidate);
    if (!result.success) {
      const fieldErrors = { name: null, image: null };
      for (const issue of result.error.issues) {
        if (issue.path[0] === "CategoryName") {
          fieldErrors.name = issue.message;
        }
        if (issue.path[0] === "CategoryImage") {
          fieldErrors.image = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    const formData = new FormData();
    formData.append("CategoryImage", addImg);
    formData.append("CategoryName", addName);

    dispatch(addCategory(formData))
      .unwrap()
      .then(() => {
        setSnackMessage("Category added successfully");
        setSnackSeverity("success");
        setSnackOpen(true);

        setAddName("");
        setAddImg(null);
        setAddModal(false);
        dispatch(getCategories());
      })
      .catch((err) => {
        console.error("Failed to create category:", err);
        setSnackMessage("Failed to create category");
        setSnackSeverity("error");
        setSnackOpen(true);
      });
  }

  function putEditInp(el) {
    setEditModal(true);
    setEditName(el.categoryName);
    setIdx(el.id);
    setEditImg(null); 
  }

  function sendEditCategory() {
    setErrors({ name: null, image: null });

    const toValidate = {
      CategoryName: editName,
      CategoryImage: editImg instanceof File ? editImg : undefined,
    };

    const shape = {
      CategoryName: categorySchema.shape.CategoryName,
    };
    if (editImg instanceof File) {
      shape.CategoryImage = categorySchema.shape.CategoryImage;
    }
    const editSchema = z.object(shape);

    const result = editSchema.safeParse(toValidate);
    if (!result.success) {
      const fieldErrors = { name: null, image: null };
      for (const issue of result.error.issues) {
        if (issue.path[0] === "CategoryName") {
          fieldErrors.name = issue.message;
        }
        if (issue.path[0] === "CategoryImage") {
          fieldErrors.image = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    const formData = new FormData();
    if (editImg instanceof File) {
      formData.append("CategoryImage", editImg);
    }
    formData.append("CategoryName", editName);
    formData.append("Id", idx);

    dispatch(editCategory(formData))
      .unwrap()
      .then(() => {
        setSnackMessage("Category updated successfully");
        setSnackSeverity("success");
        setSnackOpen(true);

        setEditName("");
        setEditImg(null);
        setIdx(null);
        setEditModal(false);
        dispatch(getCategories());
      })
      .catch((err) => {
        console.error("Failed to update category:", err);
        setSnackMessage("Failed to update category");
        setSnackSeverity("error");
        setSnackOpen(true);
      });
  }

  return (
    <div>
      <div className="flex mb-[30px] w-[100%] flex-col md:flex-row justify-between">
        <div className="flex flex-row items-center gap-[30px]">
          <Link
            to={"/home/other"}
            className="px-[10px] py-[5px] text-[16px] rounded-[5px] font-[600] text-[#1D4ED8] bg-[#DBEAFE]"
          >
            Categories
          </Link>
          <Link to={"/home/other/brands"} className="p-[10px] text-[16px] font-[500]">
            Brands
          </Link>
          <Link to={"/home/other/banners"} className="p-[10px] text-[16px] font-[500]">
            Banners
          </Link>
          <Link
            to={"/home/other/subCategories"}
            className="px-[10px] py-[5px] text-[16px] font-[500]"
          >
            Sub Categories
          </Link>
        </div>
        <Button onClick={() => setAddModal(true)} variant="contained">
          <AddIcon />
          Add new
        </Button>
      </div>

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
                  pointerEvents: "none",
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

      <div className="flex flex-col my-[30px] md:flex-row flex-wrap gap-[13px]">
        {paginatedData?.map((el) => (
          <div
            className="flex w-[19%] border-[1px] rounded-[5px] p-[20px] h-[23vh] flex-row gap-[10px]"
            key={el.id}
          >
            <div className="flex flex-col gap-y-[10px] w-[80%]">
              <img
                src={`${API}/images/${el.categoryImage}`}
                alt="Photo"
                className="w-[80%] h-[15vh] rounded-[10px]"
              />
              <p>{el.categoryName}</p>
            </div>
            <BorderColorIcon
              onClick={() => putEditInp(el)}
              sx={{ color: "blue", cursor: "pointer" }}
            />
          </div>
        ))}
      </div>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        color="primary"
        shape="rounded"
        className="flex justify-center mt-4"
      />

      {addModal && (
        <div
          className="w-[90%] rounded-[5px] m-auto md:w-[50%] p-[30px]
                 fixed flex flex-col gap-y-[20px] top-[15vh] left-[30%] z-10 bg-[#fff]"
          style={{ boxShadow: "1px 1px 5px 2px #ccc" }}
        >
          <div className="flex flex-row items-center justify-between w-[100%]">
            <p className="text-[22px] font-[700]">Add category</p>
            <CloseIcon
              className="text-[#7E84A3] cursor-pointer"
              onClick={() => {
                setAddModal(false);
                setErrors({ name: null, image: null });
                setAddImg(null);
                setAddName("");
              }}
            />
          </div>

          <TextField
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
            sx={{ width: "100%" }}
            label="Category name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name || ""}
          />

          <label
            className="w-[100%] p-[20px] gap-y-[10px]
                   flex flex-col items-center justify-between
                   border-dashed border-[#959595] border-[2px]
                   rounded-[5px] cursor-pointer"
          >
            <input
              type="file"
              accept=".svg,.jpg,.jpeg,.png,.gif"
              className="hidden"
              onChange={(e) => setAddImg(e.target.files[0])}
            />
            <div className="p-[10px] my-[10px] flex justify-center items-center rounded-[50%] bg-[#E5E7EB]">
              <FileUploadIcon sx={{ color: "#000000", fontSize: "36px" }} />
            </div>
            <p className="text-[18px] font-[600]">Click to upload or drag and drop</p>
            <p className="text-[#6C737F]">(SVG, JPG, PNG, or GIF max 900×400)</p>
          </label>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

          {addImg && typeof addImg !== "string" && (
            <img
              src={URL.createObjectURL(addImg)}
              alt="preview"
              className="h-auto relative w-[20%] mt-2"
            />
          )}

          <div>
            <div className="flex w-[100%] justify-end flex-row gap-[20px]">
              <Button
                onClick={() => {
                  setAddModal(false);
                  setErrors({ name: null, image: null });
                  setAddImg(null);
                  setAddName("");
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button onClick={sendData} variant="contained">
                Create
              </Button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div
          className="w-[90%] rounded-[5px] m-auto md:w-[50%] p-[30px]
                 fixed flex flex-col gap-y-[20px] top-[15vh] left-[30%] z-10 bg-[#fff]"
          style={{ boxShadow: "1px 1px 5px 2px #ccc" }}
        >
          <div className="flex flex-row items-center justify-between w-[100%]">
            <p className="text-[22px] font-[700]">Edit category</p>
            <CloseIcon
              className="text-[#7E84A3] cursor-pointer"
              onClick={() => {
                setEditModal(false);
                setErrors({ name: null, image: null });
                setEditImg(null);
                setEditName("");
                setIdx(null);
              }}
            />
          </div>

          <TextField
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ width: "100%" }}
            label="Category name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name || ""}
          />

          <label
            className="w-[100%] p-[20px] gap-y-[10px]
                   flex flex-col items-center justify-between
                   border-dashed border-[#959595] border-[2px]
                   rounded-[5px] cursor-pointer"
          >
            <input
              type="file"
              accept=".svg,.jpg,.jpeg,.png,.gif"
              className="hidden"
              onChange={(e) => setEditImg(e.target.files[0])}
            />
            <div className="p-[10px] my-[10px] flex justify-center items-center rounded-[50%] bg-[#E5E7EB]">
              <FileUploadIcon sx={{ color: "#000000", fontSize: "36px" }} />
            </div>
            <p className="text-[18px] font-[600]">Click to upload or drag and drop</p>
            <p className="text-[#6C737F]">(SVG, JPG, PNG, or GIF max 900×400)</p>
          </label>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

          {!editImg && idx && (
            <img
              src={`${API}/images/${data.find((c) => c.id === idx)?.categoryImage}`}
              alt="current"
              className="h-[100px] w-auto mt-2 rounded-md"
            />
          )}

          {editImg && typeof editImg !== "string" && (
            <img
              src={URL.createObjectURL(editImg)}
              alt="preview"
              className="h-auto relative w-[20%] mt-2"
            />
          )}

          <div>
            <div className="flex w-[100%] justify-end flex-row gap-[20px]">
              <Button
                onClick={() => {
                  setEditModal(false);
                  setErrors({ name: null, image: null });
                  setEditImg(null);
                  setEditName("");
                  setIdx(null);
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button onClick={sendEditCategory} variant="contained">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar */}
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

export default Other;

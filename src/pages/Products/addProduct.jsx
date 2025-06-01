import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBrands,
  getColors,
  getSubCategories,
} from '../../entitis/reducers/getQuery'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import {
  addColor,
  addProduct,
  clearAddProductState,
} from '../../entitis/reducers/postQuery'
import { GridCloseIcon } from '@mui/x-data-grid'
import { useSnackbar } from 'notistack';
import { deleteColor } from '../../entitis/reducers/deleteQuery'


const AddProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();


  const categories = useSelector((store) => store.get.subCategories)
  const brands = useSelector((store) => store.get.brands)
  const colors = useSelector((store) => store.get.colors)

  const {
    loading: addLoading,
    success: addSuccess,
    error: addError,
  } = useSelector((store) => store.post.addProduct)

  const [addImg, setAddImg] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [BrandId, setBrandId] = useState(null)
  const [ProductName, setProductName] = useState('')
  const [ColorId, setColorId] = useState(null)
  const [Description, setDescription] = useState('')
  const [Quantity, setQuantity] = useState(null)
  const [Weight, setWeight] = useState(null)
  const [Size, setSize] = useState(null)
  const [Code, setCode] = useState(null)
  const [Price, setPrice] = useState(null)
  const [DiscountPrice, setDiscountPrice] = useState(null)
  const [SubCategoryId, setSubCategoryId] = useState(null)

  const [openLoadingSnackbar, setOpenLoadingSnackbar] = useState(false)
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

  const [colorModal, setColorModal] = useState(false)
  const [colorName, setColorName] = useState("")
  const [colorCode, setColorCode] = useState("")

  useEffect(() => {
    dispatch(getSubCategories())
    dispatch(getBrands())
    dispatch(getColors())
  }, [dispatch])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAddImg(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleChange = (value) => {
    const plainText =
      new DOMParser().parseFromString(value, 'text/html').body.textContent || ''
    setDescription(plainText)
  }

  const sendProduct = () => {
    const formData = new FormData()
    formData.append('Images', addImg)
    formData.append('BrandId', BrandId)
    formData.append('ColorId', ColorId)
    formData.append('ProductName', ProductName)
    formData.append('Description', Description)
    formData.append('Quantity', Quantity)
    formData.append('Weight', Weight)
    formData.append('Size', Size)
    formData.append('Code', Code)
    formData.append('Price', Price)
    formData.append('HasDiscount', DiscountPrice != null)
    formData.append('DiscountPrice', DiscountPrice)
    formData.append('SubCategoryId', SubCategoryId)

    dispatch(addProduct(formData))
  }

  useEffect(() => {
    if (addLoading) {
      setOpenLoadingSnackbar(true)
    } else {
      setOpenLoadingSnackbar(false)
    }

    if (addSuccess) {
      setOpenSuccessSnackbar(true)
    }

    if (addError) {
      setOpenErrorSnackbar(true)
    }
  }, [addLoading, addSuccess, addError])

  const handleCloseLoading = () => {
    setOpenLoadingSnackbar(false)
  }

  const handleCloseSuccess = () => {
    setOpenSuccessSnackbar(false)
    dispatch(clearAddProductState())
    navigate('/home/products')
  }

  const handleCloseError = () => {
    setOpenErrorSnackbar(false)
    dispatch(clearAddProductState())
  }

  const createColor = () => {
    dispatch(addColor(colorName))
      .unwrap()
      .then(() => {
        setColorModal(false);
        enqueueSnackbar('Цвет успешно добавлен', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Ошибка при добавлении цвета', { variant: 'error' });
        console.error('Ошибка:', err);
      });
  };

  useEffect(() => {
    try {
      const color = new Option().style;
      color.color = colorCode;
      document.body.appendChild(color);
    } catch { }
  }, [colorCode]);

  useEffect(() => {
    const s = new Option().style;
    s.color = colorName;
    if (s.color !== "") {
      const temp = document.createElement("div");
      temp.style.color = colorName;
      document.body.appendChild(temp);
      const computed = getComputedStyle(temp).color;
      document.body.removeChild(temp);
      const rgbMatch = computed.match(/\d+/g);
      if (rgbMatch) {
        const [r, g, b] = rgbMatch.map(Number);
        const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
        setColorCode(hex);
      }
    }
  }, [colorName]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <button
          onClick={() => {
            navigate('/home/products')
          }}
          className="text-[24px] font-[700]"
        >
          <ArrowBackIcon /> Products / Add new
        </button>
        <div className="flex flex-row h-[6vh] gap-[20px]">
          <Button
            onClick={() => {
              navigate('/home/products')
            }}
            sx={{ width: '150px' }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={sendProduct} sx={{ width: '150px' }} variant="contained">
            Save
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-[55%] flex flex-col my-[30px] gap-y-[20px]">
          <p className="font-[700]">Information</p>
          <div className="flex w-[100%] gap-[10px]">
            <TextField
              onInput={(e) => setProductName(e.target.value)}
              sx={{ width: '85%' }}
              label="Product name"
            />
            <TextField
              onInput={(e) => setCode(e.target.value)}
              sx={{ width: '15%' }}
              label="Code"
            />
          </div>
          <div>
            <ReactQuill
              className="h-[25vh]"
              value={Description}
              onChange={handleChange}
            />
          </div>
          <div className="mt-[50px] flex flex-row justify-between gap-[25px]">
            <FormControl fullWidth>
              <InputLabel id="sub-cat-label">Sub Categories</InputLabel>
              <Select
                labelId="sub-cat-label"
                id="sub-cat-select"
                label="Sub Categories"
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                {categories?.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.subCategoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="brand-label">Brands</InputLabel>
              <Select
                labelId="brand-label"
                id="brand-select"
                label="Brands"
                onChange={(e) => setBrandId(e.target.value)}
              >
                {brands?.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.brandName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <p className="font-[700]">Price</p>
          <div className="w-[100%] flex gap-[10px]">
            <TextField
              onInput={(e) => setPrice(e.target.value)}
              label="Product price"
              type="number"
              variant="outlined"
            />
            <TextField
              onInput={(e) => setDiscountPrice(e.target.value)}
              label="Discount"
              type="number"
              variant="outlined"
            />
            <TextField
              onInput={(e) => setQuantity(e.target.value)}
              label="Count"
              type="number"
              variant="outlined"
            />
          </div>
          <p className="font-[700]">Options</p>
          <div className="flex gap-[25px]">
            <FormControl fullWidth>
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                id="size-select"
                label="Size"
                onChange={(e) => setSize(e.target.value)}
              >
                <MenuItem value={10}>S X</MenuItem>
                <MenuItem value={20}>M X</MenuItem>
                <MenuItem value={30}>L X</MenuItem>
                <MenuItem value={40}>XL X</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="weight-label">Weight</InputLabel>
              <Select
                labelId="weight-label"
                id="weight-select"
                label="Weight"
                onChange={(e) => setWeight(e.target.value)}
              >
                <MenuItem value={10}>Light</MenuItem>
                <MenuItem value={20}>Medium</MenuItem>
                <MenuItem value={30}>Heavy</MenuItem>
                <MenuItem value={40}>Extra Heavy</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="w-[40%] my-[30px] flex flex-col gap-y-[50px]">
          <div className="w-[100%] border-[#E2E8F0] border-[1px] rounded-[5px] flex-col gap-[20px]">
            <div className="flex p-[20px] w-[100%] flex-row justify-between items-center">
              <p className="font-[700]">Colour:</p>
              <button onClick={() => setColorModal(!colorModal)} className="text-[#2563EB]">Create new</button>
            </div>
            <div className="flex flex-row gap-y-[2vh] p-[20px] flex-wrap w-[100%] gap-[3%]">
              {colors?.map((el) => (
                <div
                  key={el.id}
                  className="relative w-[58px] h-[58px] rounded-full cursor-pointer"
                  onClick={() => setColorId(el.id)}

                  style={{
                    background: el.colorName,
                    border: el.id === ColorId ? '5px solid #1E5EFF' : '1px solid #000',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteColor(el.id))
                    }}
                    className="absolute top-[-6px] right-[-6px] w-[18px] h-[18px] bg-red-500 text-white rounded-full text-[12px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    style={{ zIndex: 10 }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

          </div>
          <div className="w-[100%] p-[20px] flex border-[#E2E8F0] border-[1px] rounded-[5px] flex-col gap-y-[30px]">
            <p className="font-[700]">Tags:</p>
            <div className="my-[20px] flex flex-row w-[100%] justify-between">
              <TextField sx={{ width: '80%' }} label="Tags name" />
              <div className="flex items-center justify-center border-[2px] rounded-[5px] w-[15%] border-[#2563EB]">
                <DoneOutlineIcon sx={{ color: '#2563EB' }} />
              </div>
            </div>
          </div>
          <p className="font-[700]">Images</p>
          <label className="w-[100%] p-[20px] gap-y-[10px] flex flex-col items-center justify-between border-dashed border-[#959595] border-[2px] rounded-[5px] cursor-pointer">
            <input
              type="file"
              accept=".svg,.jpg,.jpeg,.png,.gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="p-[10px] my-[10px] flex justify-between items-center rounded-[50%] bg-[#E5E7EB]">
              <FileUploadIcon sx={{ color: '#000000', fontSize: '36px' }} />
            </div>
            <p className="text-[18px] font-[600]">Click to upload or drag and drop</p>
            <p className="text-[#6C737F]">(SVG, JPG, PNG, or GIF max 900x400)</p>
          </label>
          {previewUrl && (
            <img
              src={previewUrl}
              className="w-[100%] border-[1px] rounded-[5px] h-auto mt-[10px]"
              alt="Uploaded preview"
            />
          )}
        </div>
      </div>

      <Snackbar
        open={openLoadingSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseLoading}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ width: '100%' }}>
          Uploading product…
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Product added successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {addError}
        </Alert>
      </Snackbar>
      {colorModal && (
        <div className="bg-[#fff] top-[30vh] left-[40%] z-10 fixed border-[1px] flex flex-col gap-y-[10px] rounded-[5px] w-[40%] p-[20px]">
          <div className="flex flex-row justify-between w-[100%]">
            <p className="font-[600] text-[24px]">New color</p>
            <button onClick={() => setColorModal(!colorModal)}>
              <GridCloseIcon sx={{ color: "gray" }} />
            </button>
          </div>
          <div className='w-[100%] my-[15px] flex gap-[10px]'>
            <TextField
              sx={{ width: "80%" }}
              onChange={(e) => setColorName(e.target.value)}
              value={colorName}
              label="Color name"
            />
            <TextField
              sx={{ width: "17%" }}
              onChange={(e) => setColorCode(e.target.value)}
              value={colorCode}
              type='color'
            />
          </div>
          <div className="flex flex-row justify-end gap-x-[20px]">
            <Button onClick={() => setColorModal(false)} variant="outlined">Cancel</Button>
            <Button onClick={createColor} variant="contained">Create</Button>
          </div>
        </div>
      )}

    </div>
  )
}

export default AddProduct

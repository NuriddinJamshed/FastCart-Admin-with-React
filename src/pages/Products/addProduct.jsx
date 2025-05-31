import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getCategories, getColors, getSubCategories } from '../../entitis/reducers/getQuery';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { addProduct } from '../../entitis/reducers/postQuery';

const AddProduct = () => {
  let naviagte = useNavigate()
  let categories = useSelector((store) => store.get.subCategories)
  let brands = useSelector((store) => store.get.brands)
  let colors = useSelector((store) => store.get.colors)
  console.log("categories:", categories, "Brands:", brands, "Colors:0", colors);

  let [addImg, setAddImg] = useState("")
  console.log(addImg);

  let [BrandId, setBrandId] = useState(null)
  let [ProductName, setProductName] = useState("")
  let [ColorId, setColorId] = useState(null)
  let [Description, setDescription] = useState("")
  console.log(Description);

  let [Quantity, setQuantity] = useState(null)
  let [Weight, setWeight] = useState(null)
  let [Size, setSize] = useState(null)
  let [Code, setCode] = useState(null)
  let [Price, setPrice] = useState(null)
  let [HasDiscount, setHasDiscount] = useState(null)
  let [DiscountPrice, setDiscountPrice] = useState(null)
  let [SubCategoryId, setSubCategoryId] = useState(null)

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSubCategories())
    dispatch(getBrands())
    dispatch(getColors())
  }, [])
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (value) => {
    const plainText = new DOMParser().parseFromString(value, "text/html").body.textContent || "";
    setDescription(plainText);
  };

  function sendProduct(){
    let formData = new FormData()
    formData.append("Images",addImg)
    formData.append("BrandId",BrandId)
    formData.append("ColorId",ColorId)
    formData.append("ProductName",ProductName)
    formData.append("Description",Description)
    formData.append("Quantity",Quantity)
    formData.append("Weight",Weight)
    formData.append("Size",Size)
    formData.append("Code",Code)
    formData.append("Price",Price)
    formData.append("HasDiscount",DiscountPrice!=null)
    formData.append("DiscountPrice",DiscountPrice)
    formData.append("SubCategoryId",SubCategoryId)
    console.log(formData);
    dispatch(addProduct(formData))
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <button onClick={() => {
          naviagte("/home/products")
        }} className="text-[24px] font-[700]"> <ArrowBackIcon /> Products / Add new</button>
        <div className="flex flex-row h-[6vh] gap-[20px]" >
          <Button onClick={() => {
            naviagte("/home/products")
          }} sx={{ width: "150px" }} variant="outlined">Cancel</Button>
          <Button onClick={sendProduct} sx={{ width: "150px" }} variant="contained">Save</Button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='w-[55%] flex flex-col my-[30px] gap-y-[20px]'>
          <p className='font-[700]'>Information</p>
          <div className='flex w-[100%] gap-[10px]'>
            <TextField onInput={(e) => setProductName(e.target.value)} sx={{ width: "85%" }} label="Product name" />
            <TextField onInput={(e) => setCode(e.target.value)} sx={{ width: "15%" }} label="Code" />
          </div>
          <div>
            <ReactQuill className='h-[25vh]' value={Description} onChange={(value) => handleChange(value)} />
          </div>
          <div className='mt-[50px] flex flex-row justify-between gap-[25px]'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sub Categories"
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                {
                  categories && categories.map((el) => (
                    <MenuItem key={el.id} value={el.id} >{el.subCategoryName}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brands</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Brands"
                onChange={(e) => setBrandId(e.target.value)}
              >
                {
                  brands && brands.map((el) => (
                    <MenuItem key={el.id} value={el.id} >{el.brandName}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <p className='font-[700]'>Price</p>
          <div className='w-[100%] flex gap-[10px]'>
            <TextField onInput={(e) => { setPrice(e.target.value) }} label="Product price" type='number' variant='outlined' />
            <TextField onInput={(e) => { setDiscountPrice(e.target.value) }} label="Discount" type='number' variant='outlined' />
            <TextField onInput={(e) => { setQuantity(e.target.value) }} label="Count" type='number' variant='outlined' />
          </div>
          <p className='font-[700]'>Options</p>
          <div className='flex gap-[25px]'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
              <InputLabel id="demo-simple-select-label">Weight</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Weight"
                onChange={(e) => setWeight(e.target.value)}
              >
                <MenuItem value={10}>S X</MenuItem>
                <MenuItem value={20}>M X</MenuItem>
                <MenuItem value={30}>L X</MenuItem>
                <MenuItem value={40}>XL X</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='w-[40%] my-[30px] flex flex-col gap-y-[50px]'>
          <div className='w-[100%] border-[#E2E8F0] border-[1px] rounded-[5px] flex-col gap-[20px]'>
            <div className='flex p-[20px] w-[100%] flex-row justify-between items-center'>
              <p className='font-[700]'>Colour:</p>
              <p className='text-[#2563EB]'>Create new</p>
            </div>
            <div className='flex flex-row gap-y-[2vh] p-[20px] flex-wrap w-[100%] gap-[3%]'>
              {
                colors && colors.map((el) => (
                  <i onClick={() => setColorId(el.id)} className='w-[58px] h-[58px] text-center rounded-[50%]' style={{ background: el.colorName, color: el.colorName, border: el.id == ColorId ? "5px solid #1E5EFF" : "1px solid #000" }}></i>
                ))
              }
            </div>
          </div>
          <div className='w-[100%] p-[20px] flex border-[#E2E8F0] border-[1px] rounded-[5px] flex-col gap-y-[30px]'>
            <p className='font-[700]'>Tags:</p>
            <div className='my-[20px] flex flex-row w-[100%] justify-between'>
              <TextField sx={{ width: "80%" }} label="Tags name" />
              <div className='flex items-center justify-center border-[2px] rounded-[5px] w-[15%] border-[#2563EB]'>
                <DoneOutlineIcon sx={{ color: "#2563EB" }} />
              </div>
            </div>
          </div>
          <p className='font-[700]'>Images</p>
          <label className="w-[100%] p-[20px] gap-y-[10px] flex flex-col items-center justify-between border-dashed border-[#959595] border-[2px] rounded-[5px] cursor-pointer">
            <input
              type="file"
              accept=".svg,.jpg,.jpeg,.png,.gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="p-[10px] my-[10px] flex justify-between items-center rounded-[50%] bg-[#E5E7EB]">
              <FileUploadIcon sx={{ color: "#000000", fontSize: "36px" }} />
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
    </div>
  )
}

export default AddProduct
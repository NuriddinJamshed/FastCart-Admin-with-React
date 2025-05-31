import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getBrands } from "../../entitis/reducers/getQuery";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, TextField } from "@mui/material";
import { addBrand } from "../../entitis/reducers/postQuery";
import { z } from "zod";
import { editBrand } from "../../entitis/reducers/putQuery";
import CloseIcon from '@mui/icons-material/Close';
import { deleteBrand } from "../../entitis/reducers/deleteQuery";

const brandSchema = z.object({
    name: z
        .string()
        .min(1, "Brand name is required")
        .max(50, "Brand name must be at most 50 characters"),
});

const Brands = () => {
    let data = useSelector((store) => store.get.brands)
    let [brandName, setBrandName] = useState("")
    const [error, setError] = useState(null);
    const [editError, seteditError] = useState(null);

    const [modal, setModal] = useState(false)
    const [editName, setEditName] = useState("")
    const [idx, setIdx] = useState(null)

    const [delModal, setDelModal] = useState(false)

    function sendAddBrand() {
        const result = brandSchema.safeParse({ name: brandName });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setError(null);
        dispatch(addBrand(brandName));
        setBrandName("");
    }

    function sendEditBrand() {
        const result = brandSchema.safeParse({ name: editName });

        if (!result.success) {
            seteditError(result.error.issues[0].message);
            return;
        }

        setError(null);
        dispatch(editBrand({id:idx, name:editName}));
        setEditName("");
        setModal(!modal)
    }

    function putEditInp(el){
        setEditName(el.brandName)
        setIdx(el.id)
        setModal(!modal)
    }

    function openDelModal(el){
        setDelModal(!delModal)
        setIdx(el.id)
    }

    function sendIdBrand(){
        dispatch(deleteBrand(idx))
        setDelModal(!delModal)
    }

    let navigate = useNavigate()
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBrands())
    }, [])
    return (
        <div>
            <div className="flex flex-row items-center gap-[30px]">
                <Link to={"/home/other"} className="p-[10px] text-[16px] font-[500]">Categories</Link>
                <Link to={"/home/other/brands"} className="px-[10px] py-[5px] text-[16px] rounded-[5px] font-[600] text-[#1D4ED8] bg-[#DBEAFE]">Brands</Link>
                <Link to={"/home/other/banners"} className="p-[10px] text-[16px] font-[500]">Banners</Link>
            </div>
            <div className="my-[30px] flex flex-col md:flex-row justify-between items-start">
                <TableContainer sx={{ width: "45%" }} component={Paper}>
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#5A607F", fontSize: "16px" }} align="left">Brands</TableCell>
                                <TableCell sx={{ color: "#5A607F", fontSize: "16px" }} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ fontSize: "16px", fontWeight: "600" }} component="th" scope="row">
                                        {row.brandName}
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className="flex justify-end gap-[5px]">
                                            <BorderColorIcon onClick={() => putEditInp(row)} sx={{ color: "#1E5EFF" }} />
                                            <DeleteIcon onClick={() =>{
                                                openDelModal(row)
                                            }} sx={{ color: "#F04438" }} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex flex-col w-[50%] gap-y-[30px]">
                    <div className="w-[100%] relative pb-[100px] border-[1px] p-[15px] gap-y-[25px] flex flex-col items-start border-[#ccc] rounded-[5px]">
                        <h1 className="font-[700] text-[20px]">Add new brand</h1>

                        <TextField
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            sx={{ width: "100%" }}
                            id="outlined-basic"
                            label="Brand name"
                            variant="outlined"
                            error={!!error}
                            helperText={error || ""}
                        />

                        <div className="absolute bottom-8 right-5">
                            <Button onClick={sendAddBrand} variant="contained">
                                Create
                            </Button>
                        </div>
                    </div>
                    {
                        modal && (
                            <div className="w-[100%] relative pb-[100px] border-[1px] p-[15px] gap-y-[25px] flex flex-col items-start border-[#ccc] rounded-[5px]">
                                <h1 className="font-[700] text-[20px]">Edit brand</h1>

                                <TextField
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    sx={{ width: "100%" }}
                                    id="outlined-basic"
                                    label="Edit Brand name"
                                    variant="outlined"
                                    error={!!editError}
                                    helperText={editError || ""}
                                />
                                <div className="absolute bottom-8 gap-[20px] flex right-5">
                                    <Button onClick={()=>setModal(!modal)} variant="outlined">
                                        Cancel
                                    </Button>
                                    <Button onClick={sendEditBrand} variant="contained">
                                        SaveChanges
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                delModal && (
                    <div className="bg-[#fff] top-[30vh] left-[40%] z-10 fixed border-[1px] flex flex-col gap-y-[10px] rounded-[5px] w-[40%] p-[20px]">
                        <div className="flex flex-row justify-between w-[100%]">
                            <p className="font-[600] text-[24px]">Delete brand</p>
                            <button onClick={()=>setDelModal(!delModal)}><CloseIcon sx={{color:"gray"}} /></button>
                        </div>
                        <p>Are you sure you want to delete this brand?</p>
                        <div className="flex flex-row justify-end gap-x-[20px]">
                            <Button onClick={()=>{
                                setDelModal(!delModal)
                            }} variant="contained">Cancel</Button>
                            <Button color="error" onClick={()=>sendIdBrand()} variant="outlined">Delete</Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Brands
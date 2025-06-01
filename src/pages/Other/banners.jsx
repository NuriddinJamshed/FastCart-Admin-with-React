import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getCategories } from "../../entitis/reducers/getQuery";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

import img from "../../shared/imgs/dc40ba897215f42e5883a64157f0aa3a4d1a866a.jpg"
import img2 from "../../shared/imgs/3cc943ca7e210f637fc0504b7d93cd207df744c2.png"
import { Button, MenuItem, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories) {
    return { name };
}

const rows = [
    createData('Healthcare_Erbology.png'),
    createData('Healthcare_Erbology.png'),
    createData('Healthcare_Erbology.png'),
];

const row2 = [
    createData('Healthcare_Erbology.png')
]

const Banners = () => {
    let data = useSelector((store) => store.get.categories)

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <div>
            <div className="flex flex-row items-center gap-[30px]">
                <Link to={"/home/other"} className="p-[10px] text-[16px] font-[500]">Categories</Link>
                <Link to={"/home/other/brands"} className="p-[10px] text-[16px] font-[500]">Brands</Link>
                <Link to={"/home/other/banners"} className="px-[10px] py-[5px] text-[16px] rounded-[5px] font-[600] text-[#1D4ED8] bg-[#DBEAFE]">Banners</Link>
                <Link to={"/home/other/subCategories"} className="px-[10px] py-[5px] text-[16px] font-[500]"> Sub Categories</Link>
            </div>
            <div className="flex flex-col gap-y-[30px] md:flex-row my-[30px] justify-between">
                <div className="flex flex-col gap-[10px] w-[48%]">
                    <p className="text-[20px] font-[700]">Main sliders</p>
                    <div className="w-[100%] p-[20px] gap-y-[10px] flex flex-col items-center justify-between border-dashed border-[#959595] border-[2px] rounded-[5px]">
                        <div className="p-[10px] my-[10px] flex justify-between items-center rounded-[50%] bg-[#E5E7EB]">
                            <FileUploadIcon sx={{ color: "#000000", fontSize: "36px" }} />
                        </div>
                        <p className="text-[18px] font-[600]">Click to upload or drag and drop</p>
                        <p className="text-[#6C737F]">(SVG, JPG, PNG, or gif maximum 900x400)</p>
                    </div>
                    <div><TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ width: "25%" }}>Image</StyledTableCell>
                                    <StyledTableCell align="left">File name</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            <div>
                                                <img className="w-[80%] rounded-[5px]" src={img} alt="" />
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                                        <StyledTableCell align="right"><DeleteIcon /></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></div>
                    <div className="w-[100%] items-end p-[30px] border-[#F2F2F2] my-[10px] rounded-[5px] border-[3px] gap-y-[20px] flex flex-col ">
                        <TextField sx={{ width: "100%" }} id="outlined-basic" label="Subtitle" value="Enhance Your Music Experience" variant="outlined" />
                        <TextField sx={{ width: "100%" }} id="outlined-basic" label="Title" value="Enhance Your Music Experience" variant="outlined" />
                        <Button variant="contained">Save</Button>
                    </div>
                </div>
                <div className="flex flex-col gap-[10px] w-[48%]">
                    <p className="text-[20px] font-[700]">Banner</p>
                    <div className="w-[100%] p-[20px] gap-y-[10px] flex flex-col items-center justify-between border-dashed border-[#959595] border-[2px] rounded-[5px]">
                        <div className="p-[10px] my-[10px] flex justify-between items-center rounded-[50%] bg-[#E5E7EB]">
                            <FileUploadIcon sx={{ color: "#000000", fontSize: "36px" }} />
                        </div>
                        <p className="text-[18px] font-[600]">Click to upload or drag and drop</p>
                        <p className="text-[#6C737F]">(SVG, JPG, PNG, or gif maximum 900x400)</p>
                    </div>
                    <div><TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ width: "25%" }}>Image</StyledTableCell>
                                    <StyledTableCell align="left">File name</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row2.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            <div>
                                                <img className="w-[80%] bg-[#000] rounded-[5px]" src={img2} alt="" />
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                                        <StyledTableCell align="right"><DeleteIcon /></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></div>
                    <div className="w-[100%] items-end p-[30px] border-[#F2F2F2] my-[10px] rounded-[5px] border-[3px] gap-y-[20px] flex flex-col ">
                        <TextField
                            sx={{ width: "100%" }}
                            id="outlined-select-currency"
                            select
                            label="Categories"
                            defaultValue="EUR"
                        >
                            <MenuItem>Categories</MenuItem>
                        </TextField>
                        <TextField sx={{ width: "100%" }} id="outlined-basic" label="Title" value="Enhance Your Music Experience" variant="outlined" />
                        <TextField sx={{ width: "100%" }} id="outlined-basic" label="Title" value="Enhance Your Music Experience" variant="outlined" />
                        <Button variant="contained">Save</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banners
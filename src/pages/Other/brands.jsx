import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getBrands } from "../../entitis/reducers/getQuery";
import { addBrand } from "../../entitis/reducers/postQuery";
import { editBrand } from "../../entitis/reducers/putQuery";
import { resetStatus as resetDeleteStatus, deleteBrand } from "../../entitis/reducers/deleteQuery";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Snackbar,
    Alert,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloseIcon from "@mui/icons-material/Close";

import { z } from "zod";

const brandSchema = z.object({
    name: z
        .string()
        .min(1, "Brand name is required")
        .max(50, "Brand name must be at most 50 characters"),
});

const Brands = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ── Redux state ────────────────────────────────────────────────────────────
    const brands = useSelector((store) => store.get.brands);
    const addBrandState = useSelector((store) =>
        store.post?.addBrand ?? { loading: false, success: false, error: null }
    );
    const editBrandState = useSelector((store) =>
        store.put?.editBrand ?? { loading: false, success: false, error: null }
    );
    const deleteState = useSelector((store) =>
        store.delete ?? { loading: false, success: false, error: null }
    );

    const [deleteSnackOpen, setDeleteSnackOpen] = useState(false);
    const [deleteSnackMessage, setDeleteSnackMessage] = useState("");
    const [deleteSnackSeverity, setDeleteSnackSeverity] = useState("success");

    // ── Local state ─────────────────────────────────────────────────────────────
    const [brandName, setBrandName] = useState("");
    const [error, setError] = useState(null);

    const [modal, setModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [idx, setIdx] = useState(null);
    const [editError, setEditError] = useState(null);

    const [delModal, setDelModal] = useState(false);

    // Snackbar states
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");

    // ── Load brands on mount ─────────────────────────────────────────────────────
    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    // ── Add brand handler ───────────────────────────────────────────────────────
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

    // ── Edit brand handler ──────────────────────────────────────────────────────
    function sendEditBrand() {
        const result = brandSchema.safeParse({ name: editName });
        if (!result.success) {
            setEditError(result.error.issues[0].message);
            return;
        }
        setEditError(null);
        dispatch(editBrand({ id: idx, name: editName }));
        setEditName("");
        setModal(false);
    }

    function putEditInp(el) {
        setEditName(el.brandName);
        setIdx(el.id);
        setModal(true);
    }

    // ── Delete brand handler ────────────────────────────────────────────────────
    function openDelModal(el) {
        setIdx(el.id);
        setDelModal(true);
    }

    function sendIdBrand() {
        dispatch(deleteBrand(idx));
        setDelModal(false);
    }

    // ── Show Snackbars when operations succeed or fail ──────────────────────────
    useEffect(() => {
        if (addBrandState.success) {
            setSnackMessage("Brand added successfully!");
            setSnackSeverity("success");
            setSnackOpen(true);
            dispatch(getBrands());
        } else if (addBrandState.error) {
            setSnackMessage(addBrandState.error);
            setSnackSeverity("error");
            setSnackOpen(true);
        }

        if (editBrandState.success) {
            setSnackMessage("Brand updated successfully!");
            setSnackSeverity("success");
            setSnackOpen(true);
            dispatch(getBrands());
        } else if (editBrandState.error) {
            setSnackMessage(editBrandState.error);
            setSnackSeverity("error");
            setSnackOpen(true);
        }

        if (deleteState.success) {
            setSnackMessage("Brand deleted successfully!");
            setSnackSeverity("success");
            setSnackOpen(true);
            dispatch(resetDeleteStatus());
            dispatch(getBrands());
        } else if (deleteState.error) {
            setSnackMessage(deleteState.error);
            setSnackSeverity("error");
            setSnackOpen(true);
            dispatch(resetDeleteStatus());
        }
    }, [
        addBrandState.success,
        addBrandState.error,
        editBrandState.success,
        editBrandState.error,
        deleteState.success,
        deleteState.error,
        dispatch,
    ]);

    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackOpen(false);
    };

    return (
        <div>
            {/* ── Navigation ─────────────────────────────────────────────────────────── */}
            <div className="flex flex-row items-center gap-[30px]">
                <Link to={"/home/other"} className="p-[10px] text-[16px] font-[500]">
                    Categories
                </Link>
                <Link
                    to={"/home/other/brands"}
                    className="px-[10px] py-[5px] text-[16px] rounded-[5px] font-[600] text-[#1D4ED8] bg-[#DBEAFE]"
                >
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

            {/* ── Table & Add/Edit Form ────────────────────────────────────────────────── */}
            <div className="my-[30px] flex flex-col md:flex-row justify-between items-start">
                {/* ── Brands Table ─────────────────────────────────────────────────────── */}
                <TableContainer sx={{ width: "45%" }} component={Paper}>
                    <Table sx={{ width: "100%" }} aria-label="brands table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#5A607F", fontSize: "16px" }} align="left">
                                    Brands
                                </TableCell>
                                <TableCell sx={{ color: "#5A607F", fontSize: "16px" }} align="right">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands.map((row) => (
                                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell
                                        sx={{ fontSize: "16px", fontWeight: "600" }}
                                        component="th"
                                        scope="row"
                                    >
                                        {row.brandName}
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className="flex justify-end gap-[5px]">
                                            <BorderColorIcon
                                                onClick={() => putEditInp(row)}
                                                sx={{ color: "#1E5EFF", cursor: "pointer" }}
                                            />
                                            <DeleteIcon
                                                onClick={() => openDelModal(row)}
                                                sx={{ color: "#F04438", cursor: "pointer" }}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* ── Add / Edit Form ──────────────────────────────────────────────────── */}
                <div className="flex flex-col w-[50%] gap-y-[30px]">
                    {/* ── Add Brand ───────────────────────────────────────────────────────── */}
                    <div className="w-[100%] relative pb-[100px] border-[1px] p-[15px] gap-y-[25px] flex flex-col items-start border-[#ccc] rounded-[5px]">
                        <h1 className="font-[700] text-[20px]">Add new brand</h1>

                        <TextField
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            sx={{ width: "100%" }}
                            label="Brand name"
                            variant="outlined"
                            error={!!error}
                            helperText={error || ""}
                        />

                        <div className="absolute bottom-8 right-5">
                            <Button
                                onClick={sendAddBrand}
                                variant="contained"
                                disabled={addBrandState.loading}
                            >
                                {addBrandState.loading ? "Creating…" : "Create"}
                            </Button>
                        </div>
                    </div>

                    {/* ── Edit Brand Modal ────────────────────────────────────────────────── */}
                    {modal && (
                        <div className="w-[100%] relative pb-[100px] border-[1px] p-[15px] gap-y-[25px] flex flex-col items-start border-[#ccc] rounded-[5px]">
                            <h1 className="font-[700] text-[20px]">Edit brand</h1>

                            <TextField
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                sx={{ width: "100%" }}
                                label="Edit Brand name"
                                variant="outlined"
                                error={!!editError}
                                helperText={editError || ""}
                            />

                            <div className="absolute bottom-8 gap-[20px] flex right-5">
                                <Button onClick={() => setModal(false)} variant="outlined">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={sendEditBrand}
                                    variant="contained"
                                    disabled={editBrandState.loading}
                                >
                                    {editBrandState.loading ? "Saving…" : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Delete Confirmation Modal ──────────────────────────────────────────── */}
            {delModal && (
                <div className="bg-[#fff] top-[30vh] left-[40%] z-10 fixed border-[1px] flex flex-col gap-y-[10px] rounded-[5px] w-[40%] p-[20px]">
                    <div className="flex flex-row justify-between w-[100%]">
                        <p className="font-[600] text-[24px]">Delete brand</p>
                        <button onClick={() => setDelModal(false)}>
                            <CloseIcon sx={{ color: "gray" }} />
                        </button>
                    </div>
                    <p>Are you sure you want to delete this brand?</p>
                    <div className="flex flex-row justify-end gap-x-[20px]">
                        <Button onClick={() => setDelModal(false)} variant="contained">
                            Cancel
                        </Button>
                        <Button
                            color="error"
                            onClick={sendIdBrand}
                            variant="outlined"
                            disabled={deleteState.loading}
                        >
                            {deleteState.loading ? "Deleting…" : "Delete"}
                        </Button>
                    </div>
                </div>
            )}

            {/* ── Snackbar for Add/Edit/Delete ────────────────────────────────────────── */}
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackClose}
                    severity={snackSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackMessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={deleteSnackOpen}
                autoHideDuration={4000}
                onClose={() => setDeleteSnackOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setDeleteSnackOpen(false)}
                    severity={deleteSnackSeverity}
                    sx={{ width: "100%" }}
                >
                    {deleteSnackMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Brands;

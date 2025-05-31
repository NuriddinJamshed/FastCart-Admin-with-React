import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import img1 from "../../shared/imgs/img1.png"
import img2 from "../../shared/imgs/iconly-glass-discount.svg fill.png"
import img3 from "../../shared/imgs/div.MuiBox-root.png"
import img4 from "../../shared/imgs/div.MuiBox-root (2).png"

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Jagarnath S.', "24.05.2023", "$124.97", "Paid"),
  createData('Anand G.', "24.05.2023", "$124.97", "Pending"),
  createData('Kartik S.', "24.05.2023", "$124.97", "Paid"),
  createData('Rakesh S.', "24.05.2023", "$124.97", "Pending"),
  createData('Anup S.', "24.05.2023", "$124.97", "Paid"),
  createData('Jimmy P.', "24.05.2023", "$124.97", "Paid"),
];

const rows2 = [
  createData('Men Grey Hoodie', "24.05.2023", "$49.90", "204"),
  createData('Women Striped T-Shirt', "24.05.2023", "$34.90", "155"),
  createData('Wome White T-Shirt', "24.05.2023", "$40.90", "120"),
  createData('Men White T-Shirt', "24.05.2023", "$49.90", "204"),
  createData('Women Red T-Shirt', "24.05.2023", "$34.90", "155"),
];

const Dashboard = () => {
  let lins = [1,2,3,4,5]
  return <div>
    <div className='w-[100%] flex justify-between gap-y-[30px] flex-col md:flex-row'>
      <div className='w-[100% ] flex flex-col gap-y-[30px] md:w-[65%]'>
        <div className='w-[100%] gap-y-[10px] flex justify-between flex-col md:flex-row'>
          <div className='bg-[#FEF3F2] items-center flex justify-between w-[100%] md:w-[31%] rounded-[5px] p-[15px]'>
            <img src={img3} alt="" />
            <div className='w-[50%]'>
              <p className='text-[#6C737F] font-[400] text-[14px]'>Sales</p>
              <p className='text-[#111927] font-[700] text-[24px]'>$152k</p>
            </div>
          </div>
          <div className='bg-[#FFFAEB] items-center flex justify-between w-[100%] md:w-[31%] rounded-[5px] p-[15px]'>
            <img src={img2} alt="" />
            <div className='w-[50%]'>
              <p className='text-[#6C737F] font-[400] text-[14px]'>Sales</p>
              <p className='text-[#111927] font-[700] text-[24px]'>$152k</p>
            </div>
          </div>
          <div className='bg-[#F0FDF9] items-center flex justify-between w-[100%] md:w-[31%] rounded-[5px] p-[15px]'>
            <img src={img1} alt="" />
            <div className='w-[50%]'>
              <p className='text-[#6C737F] font-[400] text-[14px]'>Sales</p>
              <p className='text-[#111927] font-[700] text-[24px]'>$152k</p>
            </div>
          </div>
        </div>
        <div className='rounded-[5px]' style={{ boxShadow: "1px 1px 2px 1px #ccc" }}>
          <h1 className='pl-[30px] font-[600] text-[16px] pt-[30px]'>Sales Revenue</h1>
          <LineChart
            xAxis={[{ data: [0, 10, 20, 30, 40, 50] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={300}
          />
        </div>
      </div>
      <div className='w-[100%] md:w-[33%] rounded-[5px] p-[10px]' style={{ boxShadow: "1px 1px 2px 1px #ccc" }}>
        <div className='flex flex-row mb-[20px] justify-between pr-[10px]'>
          <p className='text-[#111927] font-[600] text-[16px]'>Top selling products</p>
          <p className='flex flex-row items-center gap-x-[10px] text-[13px] text-[#111927] font-[600] cursor-pointer'>See All <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></p>
        </div>
        <div className='flex flex-col justify-between h-[54vh] w-[100%] gap-x-[5px]'>
            {lins.map((el)=>(
              <div key={el} className='w-[100%] flex flex-row gap-[5px] items-center'>
                <img src={img4} className='rounded-[10px] w-[20%] h-[10vh]' alt="" />
                <div className='flex flex-col w-[60%]'>
                  <p className='text-[#111927] text-[14px] font-[500]'>Healthcare Erbology</p>
                  <p className='text-[#6C737F] text-[14px] font-[400]'>in Accessories</p>
                </div>
                <div className='flex flex-col w-[20%]'>
                  <p className='text-[#10B981] font-[500]'>13.153</p>
                  <p className='text-[#6C737F] text-[14px] font-[400]'>in sales</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    <div className='flex mt-[30px] flex-col md:flex-row gap-y-[30px] w-[100%] justify-between gap-y-[30px]'>
      <div className='rounded-[5px] w-[100%] m-auto md:w-[48%] p-[10px]' style={{ boxShadow: "1px 1px 2px 1px #ccc" }}>
        <p className='text-[#131523] mb-[15px] text-[16px] font-[600]'>Recent Transactions</p>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">
                <p className='p-[5px] rounded-[5px] text-[16px] text-center' style={{background:row.carbs=="Paid"?"#C4F8E2":"#E6E9F4"}}>{row.carbs}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      <div className='rounded-[5px] w-[100%] m-auto md:w-[48%] p-[10px]' style={{ boxShadow: "1px 1px 2px 1px #ccc" }}>
        <p className='text-[#131523] mb-[15px] text-[16px] font-[600]'>Top Products by Units Sold</p>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Units</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className='flex flex-row items-center gap-[10px]'>
                  <i className='text-[#ECF2FF] bg-[#ECF2FF] h-[6.2vh] w-[45px] rounded-[5px]'>.</i>
                  <p>{row.name}</p>
                </div>
              </TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      
    </div>
  </div>;
};

export default Dashboard;

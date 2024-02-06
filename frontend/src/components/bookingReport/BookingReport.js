import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BookingReport.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Button from '@mui/material/Button'
import axios from '../../axios'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import * as dayjs from 'dayjs'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({}))

const BookingReport = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('schedule')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])
  console.log(data)

  return (
    <div className='background___page'>
      <div className='BOX'>
        <TableContainer component={Paper}>
          <Table aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ชื่อผู้จอง</StyledTableCell>
                <StyledTableCell align='right'>แผนก</StyledTableCell>
                <StyledTableCell align='right'>ประเภท</StyledTableCell>
                <StyledTableCell align='right'>วัดถุประสงค์</StyledTableCell>
                <StyledTableCell align='right'>จุดหมายปลายทาง</StyledTableCell>
                <StyledTableCell align='right'>วันที่เริ่ม</StyledTableCell>
                <StyledTableCell align='right'>วันที่สิ้นสุด</StyledTableCell>
                <StyledTableCell align='right'>เวลาเริ่ม</StyledTableCell>
                <StyledTableCell align='right'>เวลาสิ้นสุด</StyledTableCell>
                <StyledTableCell align='right'>สถานะคำร้อง</StyledTableCell>
                <StyledTableCell align='right'>ผู้อนุมัติ</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component='th' scope='row'>
                    {item.surname}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.department}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{item.type}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.objective}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{item.place}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {dayjs(item.startDate).format('DD-MM-YYYY')}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {dayjs(item.endDate).format('DD-MM-YYYY')}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.startTime}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.endTime}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{item.status}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.approve}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Link to='/'>
        <div className='Btn__back'>
          <Button variant='contained' startIcon={<ArrowBackIosIcon />}>
            ย้อนกลับ
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default BookingReport

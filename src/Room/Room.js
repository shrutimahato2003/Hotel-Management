import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableFooter, TablePagination, TableRow, Paper,
  IconButton, TableHead
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createRoom(number, type, bed, price, desc, capacity, status) {
  return { number, type, bed, price, desc, capacity, status };
}

const rooms = [
  createRoom(101, 'Deluxe', 'King', 2500, 'Sea view room', 2, 'Available'),
  createRoom(102, 'Standard', 'Queen', 1800, 'Budget-friendly', 2, 'Booked'),
  createRoom(103, 'Suite', 'King', 4000, 'Private balcony', 4, 'Available'),
  createRoom(104, 'Standard', 'Twin', 1700, 'Mountain view', 2, 'Available'),
  createRoom(105, 'Deluxe', 'Queen', 2300, 'City view', 3, 'Booked'),
  createRoom(106, 'Suite', 'King', 4200, 'Luxury suite', 4, 'Available'),
  createRoom(107, 'Standard', 'Twin', 1500, 'Basic amenities', 2, 'Maintenance'),
].sort((a, b) => a.number - b.number);

export default function HotelRoomsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rooms.length) : 0;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="hotel rooms table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
            <TableCell>Room Number</TableCell>
            <TableCell>Room Type</TableCell>
            <TableCell>Bed Type</TableCell>
            <TableCell>Price/Night</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rooms
          ).map((room) => (
            <TableRow key={room.number}>
              <TableCell>{room.number}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>{room.bed}</TableCell>
              <TableCell>₹{room.price}</TableCell>
              <TableCell>{room.desc}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.status}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="view" color="info">
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="edit" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={rooms.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
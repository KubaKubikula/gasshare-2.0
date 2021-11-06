import { useState, useEffect } from 'react';
import { API_URL } from "../config/const";
import axios from "axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const Drives = (props:any) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const columns = [
        { id: 'time', label: 'Time', minWidth: 170 },
        { id: 'drive_from', label: 'From', minWidth: 100 },
        {
          id: 'drive_to',
          label: 'To',
          minWidth: 170
        },
      ];

    useEffect(() => {
        getDrives();
    });

    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event:any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function getDrives() {
        axios
            .get(
                API_URL + "/drives/",
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            .then(data => {
                setRows(data.data);
            });
    }
    
    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} >
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                <TableCell key={column.id} >
                                    <a style={{color:'white'}} href="/chat">
                                    {value}
                                    </a>
                                </TableCell>
                                );
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Paper>
            {/*drives.map((drive) => {
                return <li>{drive.created}</li>
            })*/}
        </div>
    );
}

export default Drives;
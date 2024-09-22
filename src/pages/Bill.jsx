// src/pages/Bill.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { DataGrid } from '@mui/x-data-grid';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported


const Bill = () => {
  const rows = [
    { id: 1, item: 'Product A', quantity: 2, price: 30, total: 60 },
    { id: 2, item: 'Product B', quantity: 1, price: 50, total: 50 },
    { id: 3, item: 'Service C', quantity: 1, price: 100, total: 100 },
  ];

  const columns = [
    { field: 'item', headerName: 'Item', width: 300 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'price', headerName: 'Price (VND)', width: 150 },
    { field: 'total', headerName: 'Total (VND)', width: 150 },
  ];
  
  return (
    <div style={{fontFamily:'Time new Romance'}} className="dashboard-container">
      <Navbar />
    <div className="container mt-4">
      
      <div className="card">
        <div className="card-header">
          <h2>Hóa đơn</h2>
        </div>
        <div className="card-body">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              autoHeight
              className="data-grid"
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
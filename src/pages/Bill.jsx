// src/pages/Bill.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { DataGrid } from '@mui/x-data-grid';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import axios from 'axios'; // Import axios for API call

const Bill = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend.codingfs.com/api/bookings-bills');
        const billsData = response.data.data.map((bill, index) => ({
          id: bill.id,
          customer_name: bill.customer_name,
          email: bill.email,
          phone: bill.phone || 'N/A', // Fallback if phone is null
          address: bill.address || 'N/A', // Fallback if address is null
          total: bill.detail.reduce((acc, detail) => acc + (detail.price - (detail.price * detail.discount) / 100), 0), // Calculate total price after discount
          status: bill.status === 1 ? 'Paid' : 'Unpaid', // Convert status to text
        }));
        setRows(billsData);
      } catch (error) {
        console.error('Error fetching bills data:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'customer_name', headerName: 'Customer Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'total', headerName: 'Total (VND)', width: 150 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  return (
    <div style={{ fontFamily: 'Time new Romance' }} className="dashboard-container">
      <Navbar />
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h2>Hóa đơn</h2>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;

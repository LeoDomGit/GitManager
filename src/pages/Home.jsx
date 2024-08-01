import React from 'react';
import { VictoryPie } from 'victory';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import Navbar from '../components/Navbar';
import './DashboardPage.css';

const data = [
  { name: 'Tháng 1', donhang: 110500, doanhthu: 105000 },
  { name: 'Tháng 2', donhang: 500000, doanhthu: 120000 },
  { name: 'Tháng 3', donhang: 300000, doanhthu: 140000 },
  { name: 'Tháng 4', donhang: 80000, doanhthu: 130000 },
  { name: 'Tháng 5', donhang: 550000, doanhthu: 150000 },
  { name: 'Tháng 6', donhang: 450000, doanhthu: 110000 },
  { name: 'Tháng 7', donhang: 45000, doanhthu: 125000 },
  { name: 'Tháng 9', donhang: 100000, doanhthu: 145000 },
  { name: 'Tháng 10', donhang: 450000, doanhthu: 155000 },
  { name: 'Tháng 11', donhang: 480000, doanhthu: 165000 },
  { name: 'Tháng 12', donhang: 123300, doanhthu: 175000 }
];

const totalRevenue = data.reduce((acc, cur) => acc + cur.doanhthu, 0);

function Home() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
        <header className="main-header">
          <h2>Tổng quan</h2>
        </header>
        <div className="metrics-section">
          <div className="metric-card">
            <h5>Tổng đơn hàng</h5>
            <h4>280</h4>
            <p>Tổng đơn hàng trong 1 năm</p>
          </div>
          <div className="metric-card">
            <h5>Tổng doanh thu</h5>
            <h4>{totalRevenue.toLocaleString()} VND</h4>
            <p>Tổng doanh thu trong 1 năm</p>
          </div>
          <div className="metric-card">
            <h5>Tổng số người dùng</h5>
            <h4>560,410</h4>
            <p>24% so với 7 ngày qua</p>
          </div>
        </div>
        <div className="charts-section">
          <div className="chart-container">
            <h3>Đơn hàng</h3>
            <div className="container my-5">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                      <XAxis dataKey="name" tickSize={10} tickLine={{ strokeWidth: 2 }} />
                      <YAxis tickSize={10} tickLine={{ strokeWidth: 2 }} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="donhang" fill="#7884d8" barSize={20} />
                      <Bar dataKey="doanhthu" fill="#82ca9d" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

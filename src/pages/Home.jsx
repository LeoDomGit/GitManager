import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Chart } from "react-google-charts";
import './DashboardPage.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF667F'];

function Home() {
  const [data, setData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [weeklyRevenueData, setWeeklyRevenueData] = useState([]);
  const [totalWeeklyRevenue, setTotalWeeklyRevenue] = useState(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'revenue/product')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'revenue/services')
      .then(response => response.json())
      .then(data => setServiceData(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'revenue/services/weekly-monthly?id_customer=2&date1=2024-07-01&date2=2024-08-31')
      .then(response => response.json())
      .then(data => {
        const revenueData = data.reduce((acc, item) => {
          const week = `Tuần ${item.week} Tháng ${item.month}`;
          const revenue = item.service_price * item.total_bookings;
          if (!acc[week]) {
            acc[week] = { week, revenue };
          } else {
            acc[week].revenue += revenue;
          }
          return acc;
        }, {});
        setWeeklyRevenueData(Object.values(revenueData));
        
        const totalRevenue = Object.values(revenueData).reduce((sum, item) => sum + item.revenue, 0);
        setTotalWeeklyRevenue(totalRevenue);
      })
      .catch(error => console.error(error));
  }, []);

  const totalRevenue = data.reduce((accumulator, item) => {
    const revenue = parseFloat(item.total_revenue) || 0;
    return accumulator + revenue;
  }, 0);

  const totalServiceRevenue = serviceData.reduce((accumulator, item) => {
    const revenue = item.service_price * item.total_bookings || 0;
    return accumulator + revenue;
  }, 0);

  const productPieData = [
    ['Sản phẩm', 'Doanh thu'],
    ...data.map(item => [item.product_name, parseFloat(item.total_revenue)])
  ];

  const servicePieData = [
    ['Dịch vụ', 'Doanh thu'],
    ...serviceData.map(item => [item.service_name, item.service_price * item.total_bookings])
  ];

  const weeklyBarData = [
    ['Tuần', 'Doanh thu'],
    ...weeklyRevenueData.map(item => [item.week, item.revenue])
  ];

  const pieOptions = {
    pieHole: 0.4,
    colors: COLORS
  };

  const barOptions = {
    legend: { position: 'none' },
    colors: ['#82ca9d'],
    hAxis: { title: 'Tuần' },
    vAxis: { title: 'Doanh thu (VND)' },
    chartArea: { width: '70%', height: '70%' },
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
        <header className="main-header">
          <h2>Tổng quan</h2>
        </header>
        <div className="metrics-section">
        <div className="metric-card">
            <h5>Tổng doanh thu hàng tuần</h5>
            <h4>{totalWeeklyRevenue.toLocaleString()} VND</h4>
            <p>Doanh thu theo tuần từ 01/07/2024 đến 31/08/2024</p>
          </div>
          <div className="metric-card">
            <h5>Tổng doanh thu sản phẩm</h5>
            <h4>{totalRevenue.toLocaleString()} VND</h4>
            <p></p>
          </div>
          <div className="metric-card">
            <h5>Tổng doanh thu dịch vụ</h5>
            <h4>{totalServiceRevenue.toLocaleString()} VND</h4>
            <p></p>
          </div>
          
        </div>
        <div className="charts-section">
          <div className="chart-container">
            <h3>Đơn hàng</h3>
            <Chart
              chartType="ColumnChart"
              data={weeklyBarData}
              options={barOptions}
              width="100%"
              height="400px"
            />
          </div>
          <div className="chart-container">
            <h3>Tổng doanh thu sản phẩm</h3>
            <Chart
              chartType="PieChart"
              data={productPieData}
              options={pieOptions}
              width="100%"
              height="400px"
            />
          </div>
          <div className="chart-container">
            <h3>Tổng doanh thu dịch vụ</h3>
            <Chart
              chartType="PieChart"
              data={servicePieData}
              options={pieOptions}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

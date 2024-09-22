/*eslint-disable*/ 
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Chart } from "react-google-charts";
import './DashboardPage.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF667F'];

function Home() {
  const [data, setData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [weeklyProductRevenueData, setWeeklyProductRevenueData] = useState([]);
  const [weeklyServiceRevenueData, setWeeklyServiceRevenueData] = useState([]);
  const [totalWeeklyProductRevenue, setTotalWeeklyProductRevenue] = useState(0);
  const [totalWeeklyServiceRevenue, setTotalWeeklyServiceRevenue] = useState(0);
  const [totalServiceRevenue, setTotalServiceRevenue] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: '2024-07-01',
    endDate: '2024-08-30',
  });
  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const [serviceDailyRevenueData, setServiceDailyRevenueData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'revenue/product')
      .then(response => response.json())
      .then(data => {
        setData(data);
        calculateWeeklyProductRevenue(data); // Added call to calculateWeeklyProductRevenue
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'revenue/services')
      .then(response => response.json())
      .then(data => {
        setServiceData(data);
        const totalRevenue = data.reduce((acc, item) => {
          return acc + (item.service_price * item.total_bookings);
        }, 0);
        setTotalServiceRevenue(totalRevenue);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + `revenue/products/weekly-monthly?id_customer=2&date1=${dateRange.startDate}&date2=${dateRange.endDate}`)
      .then(response => response.json())
      .then(data => {
        const revenueData = data.reduce((acc, item) => {
          const week = `Tuần ${item.week} Tháng ${item.month}`;
          const revenue = parseFloat(item.total_revenue) || 0;
          if (!acc[week]) {
            acc[week] = { week, revenue };
          } else {
            acc[week].revenue += revenue;
          }
          return acc;
        }, {});
        setWeeklyProductRevenueData(Object.values(revenueData));
        
        const totalRevenue = Object.values(revenueData).reduce((sum, item) => sum + item.revenue, 0);
        setTotalWeeklyProductRevenue(totalRevenue);
      })
      .catch(error => console.error(error));
  }, [dateRange]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + `revenue/services/weekly-monthly?id_customer=2&date1=${dateRange.startDate}&date2=${dateRange.endDate}`)
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
        setWeeklyServiceRevenueData(Object.values(revenueData));
        
        const totalRevenue = Object.values(revenueData).reduce((sum, item) => sum + item.revenue, 0);
        setTotalWeeklyServiceRevenue(totalRevenue);
      })
      .catch(error => console.error(error));
  }, [dateRange]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}revenue/products/daily?date1=${dateRange.startDate}&date2=${dateRange.endDate}`)
      .then(response => response.json())
      .then(data => {
        const dailyData = data.map(item => [new Date(item.min_created_at).toLocaleDateString(), parseFloat(item.total_revenue)]);
        setDailyRevenueData([
          ['Ngày', 'Doanh thu'],
          ...dailyData
        ]);
      })
      .catch(error => console.error(error));
  }, [dateRange]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}revenue/services/daily?date1=${dateRange.startDate}&date2=${dateRange.endDate}`)
      .then(response => response.json())
      .then(data => {
        const dailyRevenue = data.reduce((acc, item) => {
          const date = new Date(item.date).toLocaleDateString();
          const revenue = item.service_price * item.total_bookings;
          if (!acc[date]) {
            acc[date] = revenue;
          } else {
            acc[date] += revenue;
          }
          return acc;
        }, {});
        const formattedData = Object.entries(dailyRevenue).map(([date, revenue]) => [date, revenue]);
        setServiceDailyRevenueData([
          ['Ngày', 'Doanh thu'],
          ...formattedData
        ]);
      })
      .catch(error => console.error(error));
  }, [dateRange]);

  const calculateWeeklyProductRevenue = (data) => {
    const revenueData = data.reduce((acc, item) => {
      const date = new Date(item.min_created_at);
      const weekNumber = getWeekNumber(date);
      const year = date.getFullYear();
      const weekKey = `Tuần ${weekNumber} Năm ${year}`;
      const revenue = parseFloat(item.total_revenue) || 0;
      if (!acc[weekKey]) {
        acc[weekKey] = { week: weekKey, revenue };
      } else {
        acc[weekKey].revenue += revenue;
      }
      return acc;
    }, {});

    setWeeklyProductRevenueData(Object.values(revenueData));

    const totalRevenue = Object.values(revenueData).reduce((sum, item) => sum + item.revenue, 0);
    setTotalWeeklyProductRevenue(totalRevenue);
  };

  const getWeekNumber = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - start) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + start.getDay() + 1) / 7);
  };

  const totalRevenue = data.reduce((accumulator, item) => {
    const revenue = parseFloat(item.total_revenue) || 0;
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

  const weeklyProductBarData = [
    ['Tuần', 'Doanh thu'],
    ...weeklyProductRevenueData.map(item => [item.week, item.revenue])
  ];

  const weeklyServiceBarData = [
    ['Tuần', 'Doanh thu'],
    ...weeklyServiceRevenueData.map(item => [item.week, item.revenue])
  ];

  const pieOptions = {
    pieHole: 0.4,
    colors: COLORS
  };

  const barOptions = {
    colors: COLORS,
    hAxis: { title: 'Tuần' },
    vAxis: { title: 'Doanh thu' },
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange(prevRange => ({
      ...prevRange,
      [name]: value,
    }));
  };

  return (
    <div style={{fontFamily:'Time new Romance'}} className="dashboard-container">
      <Navbar />
      <main className="main-content">
        <header className="main-header">
          <h2>Tổng quan</h2>
        </header>
        <div className="metrics-section">
          <div className="metric-card">
            <h5>Tổng doanh thu sản phẩm</h5>
            <h4>{totalRevenue.toLocaleString()} VND</h4>
          </div>
          <div className="metric-card">
            <h5>Tổng doanh thu dịch vụ</h5>
            <h4>{totalServiceRevenue.toLocaleString()} VND</h4>
          </div>
          <div className="metric-card">
            <h5>Tổng doanh thu hàng tuần sản phẩm</h5>
            <h4>{totalWeeklyProductRevenue.toLocaleString()} VND</h4>
          </div>
          <div className="metric-card">
            <h5>Tổng doanh thu hàng tuần dịch vụ</h5>
            <h4>{totalWeeklyServiceRevenue.toLocaleString()} VND</h4>
          </div>
          
        </div>

        <div className="w-100">
        <div className="row">
          <div className="col-md-6">
          <div className="">
            <h3>Tổng doanh thu sản phẩm</h3>
            <Chart
              chartType="PieChart"
              data={productPieData}
              options={pieOptions}
              width="100%"
              height="400px"
            />
          </div>
          </div>
          <div className="col-md-6">
          <div className="">
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
        </div>
 

          <div className="row">
            <div className="col-md">
            <div className="w-100">
            <h3>Doanh thu hàng ngày sản phẩm</h3>
            <div className="date-range-selector">
              <label>
                Ngày bắt đầu:
                <input
                  type="date"
                  name="startDate"
                  className='form-control'
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                />
              </label>
              <label>
                Ngày kết thúc:
                <input
                  type="date"
                  name="endDate"
                  className='form-control'

                  value={dateRange.endDate}
                  onChange={handleDateChange}
                />
              </label>
            </div>
            <Chart
              chartType="Bar"
              data={dailyRevenueData}
              options={barOptions}
              width="100%"
              height="400px"
            />
          </div>
            </div>
<div className="col-md">
<div className="">
            <h3>Doanh thu hàng ngày dịch vụ</h3>
            <Chart
              chartType="Bar"
              data={serviceDailyRevenueData}
              options={barOptions}
              width="100%"
              height="400px"
            />
          </div>
</div>

          </div>
         
        </div>
      </main>
    </div>
  );
}

export default Home;

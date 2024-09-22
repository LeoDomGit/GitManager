/*eslint-disable*/ 
import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
  const Logout =()=>{
    localStorage.clear();
    window.location.replace('/');
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src="https://frontend.codingfs.com/assets/images/codevui_shop.png" className='rounded-circle' style={{height:'50px'}} alt="" />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Trang chủ
          </a>
        </li>
        {localStorage.getItem('role') && localStorage.getItem('role')=='manager' && (
          <>
           <li className="nav-item">
           <a className="nav-link active" aria-current="page" href="/thanh-toan">
            Thanh toán
           </a>
         </li>
        <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/bao-cao">
         Báo cáo
        </a>
      </li>
        <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/bill">
         Hóa đơn
        </a>
      </li>
          </>
        )}

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#" onClick={(e)=>Logout()}>
            Đăng xuất
          </a>
        </li>
      </ul>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
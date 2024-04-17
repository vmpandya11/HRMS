import React from 'react'
import './Dashbord.css'
import Home from '../Home/Home'

export default function Dashbord() {
    return (
        <div className='App'>
            <Home />


            <div className='dashboard-title'>
                <h1>Dashboard</h1>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>150</h3>
                                    <p>Employees</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag" />
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                                    <p>New Employee</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars" />
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>44</h3>
                                    <p>New Request</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add" />
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>65</h3>
                                    <p>Employee Resign</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph" />
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                    </div>
                </div></section>



        </div >
    )
}

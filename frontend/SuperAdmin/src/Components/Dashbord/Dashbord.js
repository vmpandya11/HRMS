import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from '../Home/Home';
import './Dashbord.css';

const Dashbord = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    // Function to handle language selection
    const handleLanguageSelect = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className='App'>
            <Home />

            <div className='dashboard-title'>
                <h1>{t('dashboard')}</h1>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>150</h3>
                                    <p>{t('employees')}</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag" />
                                </div>
                                <a href="#" className="small-box-footer">{t('more_info')} <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                                    <p>{t('new_employee')}</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars" />
                                </div>
                                <a href="#" className="small-box-footer">{t('more_info')} <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>44</h3>
                                    <p>{t('new_request')}</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add" />
                                </div>
                                <a href="#" className="small-box-footer">{t('more_info')} <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>65</h3>
                                    <p>{t('employee_resign')}</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph" />
                                </div>
                                <a href="#" className="small-box-footer">{t('more_info')} <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashbord;


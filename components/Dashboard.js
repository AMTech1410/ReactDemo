import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import  { Path } from '../services/Path';
class Dashboard extends Component {
  render() {
    return (

        <div className="wrapper">

            <Header/>

            <Menu/>
                <div className="content-wrapper">
                <div className="content-header">
                  <div className="container-fluid">
                    <div className="row mb-2">
                      <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Dashboard</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-3 col-6">
                        <div className="small-box bg-info">
                          <div className="inner">
                            <h3>150</h3>
                            <p>New Orders</p>
                          </div>
                          <div className="icon">
                            <i className="ion ion-bag" />
                          </div>
                         <Link to={ Path.dashboard } className="small-box-footer"> Dashboard <i className="fas fa-arrow-circle-right" /> </Link>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="small-box bg-success">
                          <div className="inner">
                            <h3>53<sup style={{fontSize: '20px'}}>%</sup></h3>
                            <p>Bounce Rate</p>
                          </div>
                          <div className="icon">
                            <i className="ion ion-stats-bars" />
                          </div>
                           <Link to={ Path.categoryList } className="small-box-footer"> Category! <i className="fas fa-arrow-circle-right" /> </Link>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="small-box bg-warning">
                          <div className="inner">
                            <h3>44</h3>
                            <p>User Registrations</p>
                          </div>
                          <div className="icon">
                            <i className="ion ion-person-add" />
                          </div>
                         <Link to={ Path.products } className="small-box-footer"> Products  <i className="fas fa-arrow-circle-right" /> </Link>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="small-box bg-danger">
                          <div className="inner">
                            <h3>65</h3>
                            <p>Unique Visitors</p>
                          </div>
                          <div className="icon">
                            <i className="ion ion-pie-graph" />
                          </div>
                           <Link to={ Path.logOut } className="small-box-footer"> Logout  <i className="fas fa-arrow-circle-right" /> </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
   <Footer/>
        </div>
        
      );
  }
}

export default Dashboard;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import Product from './Product';
import CategoryList from './CategoryList';
import  { Path } from '../services/Path';
export default class Menu extends Component{
  render()
  {
    return(
          <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
              <a href="index3.html" className="brand-link">
                <img src="" alt="logo-img" className="brand-image" />
                
              </a>

              <div className="sidebar">
                
                {/* Sidebar Menu */}
                <nav className="mt-2">


                  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* Add icons to the links using the .nav-icon class
                   with font-awesome or any other icon font library */}

                   
                    <li className="nav-item has-treeview menu-open">

                    <Link to={ Path.dashboard }>
                      <a href="#" className="nav-link active">
                        <i className="nav-icon fas fa-tachometer-alt" />
                        <p>
                          Dashboard
                        </p>
                      </a>
                    </Link>

                    </li>

                    <li className="nav-item">

                    <Link to={ Path.categoryList }>
                      <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Category
                        </p>
                      </a>
                    </Link>

                    </li>

                    <li className="nav-item has-treeview">

                    <Link to={ Path.products }>
                      <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-copy" />
                        <p>
                          Products
                        </p>
                      </a>
                    </Link>

                    </li>


                     <li className="nav-item">

                    <Link to={ Path.logOut }>
                      <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Logout
                        </p>
                      </a>
                    </Link>

                    </li>

                  </ul>    
                </nav>
              </div>
           
        
              {/* /.sidebar */}
            </aside>
          </div>
      )
  }
}

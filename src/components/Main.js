import React from 'react';
import { Switch,Route } from 'react-router-dom';



import LoadMore from './LoadMore';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import Login from './Login';
import Product from './Product';
import Category from './Category';
import CategoryList from './CategoryList';
import Logout from './LogOut.js';
import  { Path } from '../services/Path';


const Main = () => (
<main>
<switch>
 <Route exact path={Path.HOME} component= {Login}  />

<Route exact path={ Path.dashboard } component= {Dashboard} />
<Route exact path={ Path.products } component= {ProductList} />
<Route exact path={ Path.product } component= {Product} />
<Route exact path={ Path.category } component= {Category} />
<Route exact path={ Path.logOut } component= {Logout} />
<Route exact path={ Path.categoryList } component= {CategoryList} />

 	</switch>
 </main>

)

export default Main;
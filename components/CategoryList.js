import React, { Component } from 'react';
import  { PostData } from '../services/PostData';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import  { Path } from '../services/Path';
export default class CategoryList extends Component
{

	 constructor(props) {
       super(props);
        this.fetchCategoryData=this.fetchCategoryData.bind(this);
        this.fetchCategoryData();
        this.remove=this.remove.bind(this);
        this.state = {
          data: [],
          loading: false,
          id:'',
          pages: 0
       };

       this.deleteData=this.deleteData.bind(this);

   }
   
 

    fetchCategoryData(){

    	 PostData('fetchCategoryData',this.state).then((result)=>{

                    let responseJSON=result;
                  
                     if(responseJSON.success == 1){

                     	 this.setState({data:responseJSON.result});

                     }else{
                       
                     }
                });

    }



	componentDidMount(){
		const script=document.createElement("script");
		script.src="js/content.js";
		script.async=true;
		document.body.appendChild(script);
		

	}

    async remove(e){

        await  this.setState({'id':e});
        this.deleteData();

         

    }


  deleteData(){

    PostData('deletCategoryData',this.state).then((result)=>{

                    let responseJSON=result;
                    
                     if(responseJSON.success == 1){
                        this.fetchCategoryData();
                     }else{
                       
                     }
                });

  }

	render(){

  		
  		return(

	  			<div>

	  				<div className="wrapper">
	        
	       				<Header/>
	       				<Menu/>
	       				<div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Categories</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={Path.category}>Add New</Link></li>
                
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="card">
              { /*  <div className="card-header">
                  <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
                </div> */}
                {/* /.card-header */}
                <div className="card-body">
               
                	
                  <table id="example2" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>CategoryId</th>
                        <th>Name</th>
                       
                        <th>Meta Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    	{this.state.data.map(data => (

                    		<tr>

                    		<td>{data.key}</td>
                    		<td>
                         <Link to={`${Path.category}?id=${data.id}`}>
                        {data.name}</Link></td>
                    		
                    		<td>{data.meta_title}</td>
                    		<td> <a href="#" onClick={() => this.remove(data.id)}><i className="fa fa-trash"></i></a> 
</td>
                    		</tr>
                    	 ))}

                     
                    </tbody></table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </section>
        {/* /.content */}
      </div>
	       			</div>
	        
	  			</div>

  			)
  	}
}
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import  { PostData } from '../services/PostData';
import queryString from 'query-string';
import  { Redirect } from 'react-router-dom';
import  { Path } from '../services/Path';

export default class Category extends Component{
  constructor(props){
    super(props);
    this.state={
        title: '',
        description: '',
        status: '', 
        id: (queryString.parse(this.props.location.search)).id,
        redirect:false,
        categoryData:[],
        parent_id:''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.categoryValue = this.categoryValue.bind(this);
    this.categoryValue();
    this.onSubmit = this.onSubmit.bind(this);
    

  }
  handleCategoryChange(e){
    this.setState({parent_id: e.target.value})
  }
    categoryValue(e){
     PostData('category',this.state).then((result)=>{

            let responseJSON=result;
            if(responseJSON.success == 1){
                   this.setState({categoryData:responseJSON.result});

            }
            else{
                this.setState({errorMessage:responseJSON.message});
            }
            
          });

  }


  handleTitleChange(e) {
      this.setState({title: e.target.value})
  }
  handleDescriptionChange(e){
    this.setState({description: e.target.value})
  }
   
  handleStatusChange(e){
    this.setState({status: e.target.value})
  }

  
  onSubmit(e){
      if(this.state.id){

          PostData('updateCategory',this.state).then((result)=>{
          let responseJSON=result;
          if(responseJSON.success == 1){
                  this.setState({redirect:true});
            }
            else{
                this.setState({errorMessage:responseJSON.message});
            }
            
          });
          

      }
      else{
          PostData('addCategory',this.state).then((result)=>{

            let responseJSON=result;
            if(responseJSON.success == 1){
                   this.setState({redirect:true});
            }
            else
            {
                this.setState({errorMessage:responseJSON.message});
            }
            
          });
      }
  }

  componentWillMount()
  {
      this.getCategory();
  }

  getCategory()
  {

            
      if(this.state.id)
      {
              
            PostData('fetchCategory',this.state).then((result)=>{
                    let responseJSON=result;
                    if(responseJSON.success){
                        this.setState({'title':responseJSON.result.title,'description':responseJSON.result.description, 'status':responseJSON.result.status,'parent_id':responseJSON.result.parent_id});

                    }
                    else{
                        this.setState({  errorMessage: responseJSON.message  });
                    }

                });
      }     
  }


  render(){
      let arrayOfData=this.state.categoryData;
      let options ='';
      if(arrayOfData.length > 0){
         options = arrayOfData.map((data) =>
          <option 
                  
                    value={data.id}
                >
                {data.name}
                </option>
               
);
}

     if(this.state.redirect){
        return (<Redirect to={Path.categoryList} />)
        
    }
    return(

        <div>

          <div className="wrapper">
          {/* Navbar */}
       
          <Header/>

          <Menu/>

        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1></h1>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-6">
                  {/* general form elements */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Category</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form role="form">
                     <div className="card-body">
                        <div className="form-group">
                          <label>Parent Category</label>
                          <select name="parent_id" className="form-control" onChange={this.handleCategoryChange}  value={this.state.parent_id}  >
                          
                            <option>Select.....</option>

                            if(arrayOfData.length > 0){



       arrayOfData.map((data) =>

       
          <option 
                  
                    value={data.id}
                >
                    {data.name}
                </option>
               
)
}

                           
                           
                          </select>
                        </div>


                     
                        <div className="form-group">
                          <label htmlFor="exampleInputTitle">Title</label>
                          <input type="text" name="title" value={this.state.title} className="form-control" id="exampleInputTitle" onChange={this.handleTitleChange} placeholder="Enter Title"  />
                        </div>
                       
                        <div className="form-group">
                          <label htmlFor="exampleInputDescription">Description</label>
                          <textarea className="form-control" name="description" rows="3" onChange={this.handleDescriptionChange} placeholder="Enter ..." value={this.state.description}></textarea>
                        </div>

                        <div className="form-group">
                          <label>Status</label>
                          <select className="form-control" name="status" onChange={this.handleStatusChange} value={this.state.status}>
                            <option>Select.....</option>
                            <option value={1}>Enabled</option>
                            <option value={0}>Disabled</option>
                          </select>
                        </div>

                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                      </div>
                    </form>
                  </div>
                  {/* /.card */}
                  {/* Form Element sizes */}
                </div>
                {/*/.col (left) */}
                {/* right column */}
                {/*/.col (right) */}
              </div>
              {/* /.row */}
            </div>{/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
    

        <Footer/>

        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
      </div>
          
        </div>
      )
  }
}

import React, { Component } from 'react';
import Header from './Header';

import Menu from './Menu';
import Footer from './Footer';

import axios from 'axios';
import  { PostData } from '../services/PostData';
import queryString from 'query-string';
import  { Redirect } from 'react-router-dom';
import  { Path } from '../services/Path';
export default class Product extends Component
{

    fileObj = [];
    fileArray = [];


  constructor(props) {

      super(props);
      this.displayData = [];
      this.state = {
        showdata : this.displayData,
        postVal : "",
        categoryData:[],
        name: "",
        category: "",
        price: "",
        description: "",
        file: null,
        message:'',
        id: (queryString.parse(this.props.location.search)).id,
        image:'',
        oldimage:'',
         redirect:false

      }



      this.state.counter=0;

      this.appendData = this.appendData.bind(this);

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleCategoryChange = this.handleCategoryChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handleImageChange = this.handleImageChange.bind(this);
       this.categoryValue = this.categoryValue.bind(this);

      this.onSubmit = this.onSubmit.bind(this);
        this.categoryValue();
     

  };
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
  appendData() {

    this.setState({ counter: this.state.counter + 1 });
     
         this.displayData.push(<div id={this.state.counter}><pre><input type="file" name="file[]" onChange={this.handleImageChange} className="form-control" id="file" /><input  type="button" onClick={this.handleChange(this.state.counter)}  className="button" value="delete"/></pre></div>);
         this.setState({
            showdata : this.displayData,
            postVal : ""
         });
  }

  handleChange = param => e => {

    var elem = document.getElementById(param);
    elem.remove();
    
    
  };


  handleNameChange(e) 
  {
      this.setState({name: e.target.value})
  }
  handleCategoryChange(e)
  {
    this.setState({category: e.target.value})
  }
  handlePriceChange(e)
  {
    this.setState({price: e.target.value})
  }
  handleDescriptionChange(e)
  {
    
    this.setState({description: e.target.value})
  }
  handleImageChange(e){

     // this.fileObj.push(e.target.files);
     // for (let i = 0; i < this.fileObj[0].length; i++) {
     //        this.fileArray.push(URL.createObjectURL(this.fileObj[0][i].files))
     //    }
     //    this.setState({ file: this.fileArray })
   // alert(e.target.value);
   this.setState({file: [e.target.files[0]]})
  }

   componentWillMount()
  {
      this.getProduct();
  }

  getProduct()
  {

            
      if(this.state.id)
      {
            PostData('fetchProduct',this.state).then((result)=>{

                    let responseJSON=result;
                    if(responseJSON.success)
                    {
                        console.log(responseJSON);
                        this.setState({
                            'oldimage':responseJSON.result.oldimage,'name':responseJSON.result.name,'description':responseJSON.result.description, 'status':responseJSON.result.status,'parent_id':responseJSON.result.parent_id,'price':responseJSON.result.price,'category':responseJSON.result.category_id,'image':responseJSON.result.image});

                    }
                    else
                    {
                        this.setState({  errorMessage: responseJSON.message  });
                    }

                });
      }     
  }

  
  onSubmit(e){
      


        let formData = new FormData();
       const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        formData.append('name', this.state.name);
        formData.append('category', this.state.category);
        formData.append('price', this.state.price);
        formData.append('description', this.state.description);

        if(this.state.file !== null){
          formData.append('file', this.state.file[0]);
        }

        if(this.state.id){

        formData.append('id', this.state.id);
        formData.append('oldImg', this.state.oldimage);
        const url='Provide url which update product Data';
        
        axios.post(url, formData, config)
        .then(response => {
            console.log(response);

            if(response.data.success == 1){
                    this.setState({redirect:true});
                    this.setState({message: response.data.message});

            }else{
               this.setState({message: response.data.message});
            }
        })
        .catch(error => {
            console.log(error);
        });

      }else{
         const url='Provide url which insert product Data';
         axios.post(url, formData, config)
        .then(response => {
            if(response.data.success == 1){

               this.setState({message: response.data.message});
                 this.setState({redirect:true});
              

            }else{
               this.setState({message: response.data.message});
            }
        })
        .catch(error => {
            console.log(error);
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
                >{data.name}</option>
               
);
}

    if(this.state.redirect){
        return (<Redirect to={ Path.products } />)
    }
    return(
        <div>

          <div className="wrapper">
        {/* Navbar */}
       
        <Header/>
        <Menu/>

        {/* /.navbar */}
        {/* Main Sidebar Container */}

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
                      <h3 className="card-title">Product</h3>
                    </div>
                    
                    <form role="form" >
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputName">Name</label>
                          <input type="text" name="name" value={this.state.name}  onChange={this.handleNameChange} className="form-control" id="exampleInputName" placeholder="Enter name" />
                        </div>

                        <div className="form-group">
                          <label>Category</label>
                          <select name="category" className="form-control" onChange={this.handleCategoryChange} value={this.state.category} >
                          
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
                          <label htmlFor="exampleInputPrice">Price</label>
                          <input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange} className="form-control" id="exampleInputPrice" placeholder="Enter Price" />
                        </div>
                       
                        <div className="form-group">
                          <label htmlFor="exampleInputDescription">Description</label>
                          <textarea className="form-control" value={this.state.description} name="description" onChange={this.handleDescriptionChange} rows="3" placeholder="Enter ..."></textarea>
                        </div>

                        
                        <div className="form-group">
                          <label htmlFor="file">Image</label>
                          <input type="file" name="file[]" onChange={this.handleImageChange} className="form-control" id="file" placeholder="Enter file" multiple />
                          
                          <input  type="button" className="button" onClick={this.appendData}  value="+"/>
                           <input  type="hidden" className="button" name="oldImg" id="oldImg" value={this.state.oldimage} />
                          <img src={this.state.image} />
                        </div>

                        <div id="display-data-Container">
                         {this.displayData}
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

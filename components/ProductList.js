import React, { Component } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import  { PostData } from '../services/PostData';
import  { Path } from '../services/Path';
export default class ProductList extends Component
{

	 constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            loading: false,
            admin_id:sessionStorage.getItem('userId'),
            pages: 0,
            id: '',
       };
        this.remove=this.remove.bind(this);

   

   }

      async remove(e){

        await  this.setState({'id':e});

        PostData('deletProductData',this.state).then((result)=>{

                    let responseJSON=result;
                     if(responseJSON.success == 1){

                     }else{
                     }
        });


      }
   
    render() {

          const { data } = this.state;
          return (

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
                <h1>Product List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={ Path.product }>Add New</Link></li>
                
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
               
                  
                   <ReactTable
                       data={data}
                       pages={this.state.pages}
                       columns={[
                             {
                               Header: "Id",
                               accessor: "id"
                             },
                             {
                               Header: "Name",
                               accessor: "name"
                             },
                             {
                               Header: "Image",
                               accessor: "image",
                                Cell: props => {
                                     
                                        return( <img src={props.row.image} width="40px"/>  )
                                    },


                              },
                              {
                               Header: "Model",
                               accessor: "model"
                              },
                              {
                               Header: "Price",
                               accessor: "price"
                              },
                               {
                               Header: "Quantity",
                               accessor: "quantity"
                              },
                               {
                               Header: "Status",
                               accessor: "status"
                              },
                              {
                              Header:"Edit",
                              Cell: props => {
                                return(
                                    <Link to={`${Path.product}?id=${props.row.id}`}><i className="fa fa-edit"></i></Link>
                                  )
                                },
                                 accessor: 'id'
                                },
                                {
                                    Header:"Actions",
                                    Cell: props => {
                                     
                                        return( <a href="#" onClick={() => this.remove(props.row.id)}><i className="fa fa-trash"></i></a>  )
                                    },
                                    accessor: 'id'
                                }
                         ]}
                     defaultPageSize={10}
                     className="-striped -highlight"
                     loading={this.state.loading}
                     showPagination={true}
                     showPaginationTop={true}
                     showPaginationBottom={true}
                       showPageJump={true}
                     pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                     manual // this would indicate that server side pagination has been enabled 
                     onFetchData={(state, instance) => {
                             this.setState({loading: true});
                             this.getTestData(state.page, state.pageSize, state.sorted, state.filtered, (res) => {


                              console.log(res);
                             this.setState({
                                    data: res.data.data,
                                    pages: res.data.recordsTotal,
                                    loading: false
                             })
                     });
                     }}
                     />
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

         );
     }

     getTestData(page, pageSize, sorted, filtered, handleRetrievedData) {
    let url = "URL WHich Provide product list";
    let postObject = {
        page: page,
        pageSize: pageSize,
        sorted: sorted,
        filtered: filtered,
    }; 


    console.log("Here is your postOBject");
    console.log(postObject);

    return this.post(url, postObject).then(response => handleRetrievedData(response)).catch(response => console.log(response));
}

post(url, params = {}) { return axios.post(url, params) }
}

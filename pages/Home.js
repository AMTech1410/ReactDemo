import React, { Component } from 'react';
class Home extends Component {

	addMeetup(newMeetup){

		console.log(newMeetup);
		
	}


	onSubmit(e){
		console.log(this.refs.name.value);
		const newwMeetup={
			name:this.refs.name.value,
			age:this.refs.age.value,
			address:this.refs.address.value,
		}
		this.addMeetup(newwMeetup);
		e.preventDefault();
	}
  render() {
    return (
    	
       <div>
       <h2>ADD Product</h2>
       <form onSubmit={this.onSubmit.bind(this)}>
       <div className="input-field">
        <label htmlFor="name">Name</label>
       <input type="text" name="name" ref="name"/>
      
       </div>
          <div className="input-field">
          <label htmlFor="name">age</label>
       <input type="text" name="age" ref="age"/>
       
       </div>
          <div className="input-field">
          <label htmlFor="name">address</label>
       <input type="text" name="address" ref="address"/>
       
       </div>
       <input type="submit" value="submit" className="btn"/>
       </form>
      </div>
     
    );
  }
}

export default Home;
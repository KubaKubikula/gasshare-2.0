import React from 'react';
import '../../css/App.css';
import { useForm } from "react-hook-form";

const Driver = (props) => {
    return (
      <div>
        <br /><br />
        <br /><br />
      <h2>Where are you going ?</h2>
        <DriverForm />
        <br /><br />
        <br /><br />
      </div>
    );
}

const DriverForm = (props) => {
    const { drive, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
  
    // handleSubmit(event) {
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ 
    //       drive_from: this.state.from, 
    //       drive_to : this.state.to, 
    //       time: this.state.when 
    //     })
    //   };
      
    //   event.preventDefault();

    //   fetch('http://localhost:8000/drives/', requestOptions)
    //       .then(response => {
    //         window.location.href = '/drives'; 
    //       })    
    // }
  
    return (
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input {...drive("from")} type="text" className="form-control" />
        </div>
        <div className="form-group">
          <input {...drive("to")} />
        </div>
        <div className="form-group">
          <input {...drive("when")} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    );
    
  }

  export default Driver;
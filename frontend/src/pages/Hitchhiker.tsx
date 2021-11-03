const Hitchhiker = (props:any) => {

    return ( 
        <div>
            <br /><br />
            <br /><br />
            <h2>Where are you going ?</h2>
            <input type="text" value="From address" />
            <br />
            <input type="text" value="Address" />
            <br />
            <input type="text" value="Time" />
            <br />
            <input className="btn btn-primary" type="button" value="Submit" />
            <br /><br />
            <br /><br />
        </div>
    );

}

export default Hitchhiker;
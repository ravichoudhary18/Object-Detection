import axios from 'axios';
import React, { Component } from 'react';

export class UpdateData extends Component {
    constructor(){
        super();
        this.state = {
            selectedFile:'',
            errorText:'',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }    
    submit(){
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        console.warn(this.state.selectedFile);
        let url = "http://localhost:8000/api/file/";
        
        axios.post(url, data, { 
        })
        .then(res => { // then print response status
            console.warn(res);
        })
        .this.reload()    
    }

    render() {
        return (
            <>
                    <form onSubmit={()=>this.submit()}>
                    <label className="fs-3" htmlFor="file-input">Upload Your CSV File</label>
                    <br />
                    <input type="file" 
                        name="file" 
                        accept=".csv" 
                        required='required' 
                        className="form-control" 
                        id="file-input" 
                        onChange={this.handleInputChange}
                    />
                    <p className="alert-danger mt-1">{this.state.errorText}</p>
                    <div className="mt-4">
                        <button type='submit' className="btn btn-primary">Submit</button>
                    </div>
                </form><br />
                
            </>

        );
    }
}

export default UpdateData;
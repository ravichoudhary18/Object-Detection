import React, { Component } from 'react'
import axios from 'axios';
var fileDownload = require('js-file-download');

export class DataList extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            minDate: '',
            maxDate: '',
            DataisLoaded: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event, field) => {
        this.setState({ [field]: event.target.value });
      }
    componentDidMount() {
        fetch(
            "http://localhost:8000/api/data/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    submit = (event) => {
        event.preventDefault();
        const data = new FormData();
        let x = this.state.minDate
        let y =this.state.maxDate
        data.append('start_date', x)
        data.append('end_date', y)
        let url = "http://localhost:8000/api/result/";
            axios.post(url, data,{
                responseType: 'blob',
            }).then(res => {
                fileDownload(res.data, 'report.csv');
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    };
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) {
            return (
                <>
                <h1>Please wait fatching Data Reload page in some typme if not fatch data</h1>
                </>
            )
        }
        return (
            <>
                <form onSubmit={this.submit}>
                    <p className="fs-5" htmlFor="startdata">Starting Date</p>
                    <input type="date" className="form-control mb-2" name="data"onChange={(event) =>this.handleChange(event, "minDate")} value={this.state.minDate} required='required' id="startdata" />
                    <p className="fs-5" htmlFor="startdata">End Date</p>
                    <input type="date" className="form-control" required='required' onChange={(event) =>this.handleChange(event, "maxDate")} value={this.state.maxDate}  name="data" id="startdata" />
                    <button type="submit" className="btn btn-dark mt-3" >Fatch Data And Generate Report</button>
                </form> 
                {(this.state.minDate ==='') && (this.state.maxDate==='') ? null :
                <div className='mt-4'>
                    <p className='fs-3 fw-normal'>List</p>
                    <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Image Name</th>
                                <th>Objects Detected</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.filter((item) => (Date.parse(item.timestamp)) >= (Date.parse(this.state.minDate)) && (Date.parse(item.timestamp)) <= (Date.parse(this.state.maxDate))).map((item) => (
                                <tr key={item.id}>
                                    <>
                                        <td>{item.image_name}</td>
                                        <td>{item.objects_detected}</td>
                                        <td><img src={require (`../assets/image/${item.image_name}`)} alt={item.image_name} style={{width:'150px'}} /></td>
                                    </>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                } 
            </>
        )
    }
}

export default DataList

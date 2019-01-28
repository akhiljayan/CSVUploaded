import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import axios from "axios";

class ShowData extends React.Component {

  changePage(page) {
	let url = "http://localhost:8080/employees/"+page;
    axios.get(url).then(
      res => {
		  console.log(res);
        alert("Received Successful response from server!" + res);
      },
      err => {
        alert("Server rejected response with: " + err);
      }
    );
  };

  render() {
    return (
       <div>
         <div className="container">
           <div className="text-center">
             <table className="table table-hover table-border">
               <thead>
                 <tr>
                   <th scope="col">#</th>
                   <th scope="col">Name</th>
                   <th scope="col">Department</th>
                   <th scope="col">Designation</th>
                   <th scope="col">Salary</th>
                   <th scope="col">Joining Date</th>
                   <th scope="col">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {this.props.data.Employees.map(item => (
                   <tr key={item.Id} className={(item.HasError ? 'table-danger' : '')}>
                     <th scope="row">{item.Id}</th>
                     <td>{item.Name}</td>
                     <td>{item.Department}</td>
                     <td>{item.Designation}</td>
                     <td>{item.Salary}</td>
                     <td>{item.JoiningDate}</td>
                     <td><a href="#"><FontAwesomeIcon icon="edit" /></a></td>
                   </tr>
                 ))}
               </tbody>
             </table>
			 <Pagination className="ant-pagination" defaultCurrent={this.props.currentPage} total={this.props.totalCount} onChange={this.props.pageChange}/>
           </div>
         </div>
         <hr />
       </div>
    );
  }
}

export default ShowData;

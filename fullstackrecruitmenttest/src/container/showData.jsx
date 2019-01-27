import React from "react";
//import { connect } from "react-redux";
import { Table, Pagination } from "react-bootstrap";

class ShowData extends React.Component {
  constructor() {
    super();
    var exampleItems = [...Array(150).keys()].map(i => ({
      id: i + 1,
      name: "Item " + (i + 1)
    }));
    this.state = {
      exampleItems: exampleItems,
      pageOfItems: []
    };
    //this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  changePage(page) {
    //this.props.dispatch(push('/?page=' + page));
  }

  render() {
    const per_page = 10;
    const pages = Math.ceil(this.props.data.length / per_page);
    const start_offset = (this.props.page - 1) * per_page;
    let start_count = 0;

    return (
      <div>
        <table className="table table-hover">
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
            {this.props.data.map((item, index) => {
              if (index >= start_offset && start_count < per_page) {
                start_count++;
                return (
                  <tr key={item.Id}>
                    <th scope="row">{item.Id}</th>
                    <td>{item.Name}</td>
                    <td>{item.Department}</td>
                    <td>{item.Designation}</td>
                    <td>{item.Salary}</td>
                    <td>{item.JoiningDate}</td>
                    <td />
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        <Pagination
          className="users-pagination pull-right"
          bsSize="medium"
          first="true"
          last="true"
          next="true"
          prev="true"
          //boundaryLinks="true"
          items={pages}
          //activePage={this.props.page}
          onSelect={this.changePage}
        />
      </div>

      // <div>
      //   <div className="container">
      //     <div className="text-center">
      //       <table className="table table-hover">
      //         <thead>
      //           <tr>
      //             <th scope="col">#</th>
      //             <th scope="col">Name</th>
      //             <th scope="col">Department</th>
      //             <th scope="col">Designation</th>
      //             <th scope="col">Salary</th>
      //             <th scope="col">Joining Date</th>
      //             <th scope="col">Actions</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           {this.props.data.map(item => (
      //             <tr key={item.Id}>
      //               <th scope="row">{item.Id}</th>
      //               <td>{item.Name}</td>
      //               <td>{item.Department}</td>
      //               <td>{item.Designation}</td>
      //               <td>{item.Salary}</td>
      //               <td>{item.JoiningDate}</td>
      //               <td></td>
      //             </tr>
      //           ))}
      //         </tbody>
      //       </table>
      //     </div>
      //   </div>
      //   <hr />
      // </div>
    );
  }
}

export default ShowData;

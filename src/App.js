import React, { Component } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { getInitialScores } from "./DataProvider";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getInitialScores(),
    };

    this.columns = [
      {
        Header: "Match",
        accessor: "match",
      },
    ];
    this.eventSource = new EventSource("http://localhost:8080/kafka/double");
  }

  componentDidMount() {
    this.eventSource.onmessage = (e) =>
      this.setState({ data: [...this.state.data, { match: e.data }] });
  }

  render() {
    return (
      <div className="App">
        <ReactTable data={this.state.data} columns={this.columns} />
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import MapContainer from './components/MapContainer.jsx'
import List from './components/List.jsx'
import Modal from './components/Modal.jsx'


const url = `/snow/report`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      resorts: [],
      expanded: false,
      id: null
    }
    this.expand = this.expand.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: url,
      success: (data) => {
        this.setState({resorts: data});
      },
      error: (err) => {
        console.log(err.message);
      }
  });
  }

  expand(e) {
    if (!this.state.expanded) {
      this.setState({expanded: true, id: e.target.id});
    } else {
      this.setState({expanded: false, id: null});
    }
  }
  
  render () {
    const ListDiv = styled.div`
      float: right;
      position: sticky;
      top: 0;
      right: 15%;
      color: #fff;
      width: 23%;
    `
    if (this.state.expanded) {
      var rendered = <Modal expand={this.expand} resort={this.state.resorts[this.state.id]} />
    } else {
      var rendered = <div><div><MapContainer resorts={this.state.resorts}/></div><ListDiv><List expand={this.expand} resorts={this.state.resorts} /></ListDiv></div>;
    }

    return (
      <div>
        {rendered}
      </div>
      )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

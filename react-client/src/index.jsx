import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MapContainer from './components/MapContainer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  
  render () {
    return (
      <div>
        <MapContainer />
      </div>
      )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts.css';
import colors from './colors.json';

function header() {
  return <h3 class="head">timeline · · ·</h3>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score : 0,
      events : [],
    };
  }

  handleClick(app) {
    this.setState({
      score: 0,
    });
  }

  render() {
    return (
      <div>
        {header()}

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

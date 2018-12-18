import React, { Component } from 'react'

import ExampleComponent from 'react-hover-image-reveal'

export default class App extends Component {
  render () {
    return <div>
        <ExampleComponent>
          <div onMouseEnter={e => console.log(e.nativeEvent)}>dff</div>
        </ExampleComponent>
        <ExampleComponent>
          <div onMouseEnter={e => console.log(e.nativeEvent)}>ee</div>
        </ExampleComponent>
      </div>;
  }
}

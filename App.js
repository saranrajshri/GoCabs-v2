import React from 'react';

// native base components
import {Container} from 'native-base';

// context
import FireBaseContext from './context/firebaseContext';

// Screens
import Home from './screens/Home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTabIndex: 0,
    };
  }

  // sets the index when a different tab is chosen in the footer
  setTabIndex = (index) => {
    this.setState({
      currentTabIndex: index,
    });
  };

  render() {
    return (
      <FireBaseContext.Provider
        value={{...this.state, setTabIndex: this.setTabIndex}}>
        <Container>
          <Home />
        </Container>
      </FireBaseContext.Provider>
    );
  }
}
export default App;

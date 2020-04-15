import React from 'react';

// native base components
import {Container} from 'native-base';

// context
import FireBaseContext from './context/firebaseContext';

// Screens
import Home from './screens/Home';

// firebase notifications
import messaging from '@react-native-firebase/messaging';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTabIndex: 2,
      userID: 'Hy0EkRkKZyW8xIsYqQOTLN20Apy1',
      userData: {},
    };
  }

  // sets the index when a different tab is chosen in the footer
  setTabIndex = (index) => {
    this.setState({
      currentTabIndex: index,
    });
  };

  // set user data
  setUserData = (data) => {
    this.setState({
      userData: data,
    });
  };

  // get permission for notiications
  getPermission = async () => {
    const settings = await messaging().requestPermission();

    if (settings) {
      console.log('Permission settings:', settings);
    }
  };

  //
  registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
  };
  // get fcm token
  getFCMToken = () => {
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });
  };

  componentDidMount() {
    this.registerAppWithFCM();
    this.getPermission();
    this.getFCMToken();
  }
  render() {
    return (
      <FireBaseContext.Provider
        value={{
          ...this.state,
          setTabIndex: this.setTabIndex,
          setUserData: this.setUserData,
        }}>
        <Container>
          <Home />
        </Container>
      </FireBaseContext.Provider>
    );
  }
}
export default App;

import React from 'react';

// nativebase componets
import {Container} from 'native-base';

// react native components
import {ScrollView} from 'react-native';

// components
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

// context
import FirebaseContext from '../context/firebaseContext';

// tabs
import BookRide from './Tabs/BookRide';
import MyRides from './Tabs/MyRides';
import More from './Tabs/More';

import ConfirmRide from '../screens/ConfirmRide';
import MainRide from '../screens/MainRide';

// firestore
import firestore from '@react-native-firebase/firestore';

// date time picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BookMarks from './Tabs/BookMarks';

// Navigator
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class Home extends React.Component {
  // get user details (real time)
  getUserDetails = () => {
    firestore()
      .collection('users')
      .doc(this.context.userID)
      .onSnapshot((snapshot) => {
        this.context.setUserData(snapshot.data());
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <Container>
        {this.context.currentTabIndex !== 0 ? <Header /> : null}
        <ScrollView>
          {this.context.currentTabIndex === 0 ? (
            <BookRide navigation={this.props.navigation} />
          ) : this.context.currentTabIndex === 1 ? (
            <MyRides />
          ) : this.context.currentTabIndex === 2 ? (
            <BookMarks />
          ) : this.context.currentTabIndex === 3 ? (
            <More />
          ) : null}
        </ScrollView>
        <Footer />
      </Container>
    );
  }
}
Home.contextType = FirebaseContext;

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    ConfirmRide: {
      screen: ConfirmRide,
    },
    MainRide: {
      screen: MainRide,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AppContainer = createAppContainer(AppStack);

export default AppContainer;

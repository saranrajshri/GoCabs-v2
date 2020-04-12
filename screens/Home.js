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
import Explore from './Tabs/Explore';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <ScrollView>
          {this.context.currentTabIndex === 0 ? (
            <BookRide />
          ) : this.context.currentTabIndex === 1 ? (
            <Explore />
          ) : null}
        </ScrollView>
        <Footer />
      </Container>
    );
  }
}
Home.contextType = FirebaseContext;
export default Home;

import React from 'react';

// react native components
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';

// native base
import {Card, CardItem, Body, Icon, Button} from 'native-base';

// context
import FirebaseContext from '../../context/firebaseContext';

// components
import RideHistory from './RideHistory';
import ScheduledRides from './ScheduledRides';

class MyRides extends React.Component {
  constructor() {
    super();
    this.state = {
      isScheduledRidesVisible: false,
    };
  }
  // get all ride details

  componentDidMount() {
    // this.getRideDetails();
  }

  showScheduledRides = () => {
    this.setState({
      isScheduledRidesVisible: true,
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headingText}>
            {this.state.isScheduledRidesVisible
              ? 'Scheduled Rides'
              : 'My Ride History'}
          </Text>
          {this.state.isScheduledRidesVisible ? (
            <Button
              onPress={() => this.setState({isScheduledRidesVisible: false})}
              style={{
                width: 170,
                justifyContent: 'center',
                marginTop: 10,
                marginLeft: 15,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff'}}>Show Ride History</Text>
            </Button>
          ) : (
            <Button
              onPress={this.showScheduledRides}
              style={{
                width: 170,
                justifyContent: 'center',
                marginTop: 10,
                marginLeft: 15,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff'}}>Show Scheduled Rides</Text>
            </Button>
          )}
        </View>
        {this.state.isScheduledRidesVisible ? (
          <ScheduledRides />
        ) : (
          <RideHistory />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 17,
  },
});

MyRides.contextType = FirebaseContext;
export default MyRides;

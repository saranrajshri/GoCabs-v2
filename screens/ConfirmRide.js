import React from 'react';

import {Linking} from 'react-native';

import {View, Card, CardItem, Text, Icon, Button} from 'native-base';

import Header from '../components/Header/Header';

import {triggerNotification} from '../actions/notificationsActions';

import FirebaseContext from '../context/firebaseContext';

class ConfirmRide extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: '1235566',
    };
  }

  confirmBooking = () => {
    triggerNotification(
      'Ride Confirmed',
      'Your ride is on the way',
      this.context.fcmToken,
    );
    this.props.navigation.push('MainRide');
  };
  render() {
    return (
      <View>
        <Header />
        <Text style={{fontSize: 20, marginLeft: 20, marginTop: 20}}>
          Confirm Booking
        </Text>
        {/* Driver Details */}
        <View style={{margin: 10}}>
          <Card>
            <CardItem header>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Driver Details
              </Text>
            </CardItem>

            <CardItem>
              <View style={{flexDirection: 'column'}}>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Driver Name : </Text>Ram
                  Kumar
                </Text>
                <Text style={{marginTop: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Vechile No : </Text>
                  ABC1234
                </Text>
                <Text style={{marginTop: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Driver ID : </Text>
                  #123
                </Text>
                <View style={{marginTop: 10, flexDirection: 'row'}}>
                  <Icon name="star" style={{color: '#f1c40f'}}></Icon>
                  <Icon name="star" style={{color: '#f1c40f'}}></Icon>
                  <Icon name="star" style={{color: '#f1c40f'}}></Icon>
                  <Icon name="star" style={{color: '#f1c40f'}}></Icon>
                </View>
              </View>
            </CardItem>

            <CardItem header>
              <Button
                style={{borderRadius: 15}}
                onPress={() => {
                  Linking.openURL(`tel:${this.state.phoneNumber}`);
                }}>
                <Icon name="call"></Icon>
                <Text style={{marginLeft: -15}}>Call</Text>
              </Button>
            </CardItem>
          </Card>
        </View>
        <View style={{marginLeft: 10, marginRight: 10}}>
          <Card>
            <CardItem header>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Trip Details
              </Text>
            </CardItem>

            <CardItem>
              <View style={{flexDirection: 'column'}}>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>From : </Text>Chennai,
                  TamilNadu
                </Text>
                <Text style={{marginTop: 10}}>
                  <Text style={{fontWeight: 'bold'}}>To: </Text>
                  Nellore, Andhra Pradhesh
                </Text>
                <Text style={{marginTop: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Distance: </Text>
                  185 KM
                </Text>
                <Text style={{marginTop: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Estimated Time: </Text>2
                  HRS (in current traffic)
                </Text>
              </View>
            </CardItem>
          </Card>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 10,
            position: 'absolute',
            bottom: -70,
            left: 0,
          }}>
          <Button
            onPress={this.confirmBooking}
            style={{
              backgroundColor: '#16a085',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text>CONFIRM BOOKING</Text>
          </Button>
        </View>
      </View>
    );
  }
}
ConfirmRide.contextType = FirebaseContext;
export default ConfirmRide;

import React from 'react';

// react native
import {View, TouchableOpacity, Share, Alert, ToastAndroid} from 'react-native';

// native base
import {Text, Card, CardItem, Body, Icon, Button} from 'native-base';

// context
import FirebaseContext from '../../context/firebaseContext';

// Firestore
import firestore from '@react-native-firebase/firestore';

class ScheduledRides extends React.Component {
  constructor() {
    super();
    this.state = {
      rides: {},
    };
  }

  // show toast
  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Settings changed successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      20,
      120,
    );
  };

  // showWeatherDetails
  showWeatherDetails = (index) => {
    Alert.alert(
      'Weather Report',
      'Overall : Overcast. Chilly \n Temperature: 5.61 \n Visibility : 16.09 \n WindSpeed: 14.83',
      [
        {
          text: 'Notify me',
          onPress: () => {
            this.showToast();
          },
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };
  //   share details
  shareDetails = (index) => {
    var data = this.state.rides[index];
    var messageText =
      'RIDE DETAILS \n' +
      'Date :' +
      data.date +
      ', From :' +
      data.fromLocationName +
      ', To : ' +
      data.toLocationName +
      ', distance : ' +
      '80 KM' +
      ', Departed Time :' +
      data.departureTime +
      ', Status : ' +
      data.status;

    Share.share({
      message: messageText,
    })
      //after successful share return result
      .then((result) => console.log(result))
      //If any thing goes wrong it comes here
      .catch((errorMsg) => console.log(errorMsg));
  };

  getScheduledRides = () => {
    var rides = [];

    firestore()
      .collection('waitingOrders')
      .get()
      .then((snapshot) => {
        snapshot.docs.filter((item) => {
          item.data().userID === this.context.userID
            ? rides.push(item.data())
            : null;
        });
        this.setState({
          rides: rides,
        });
      });
  };

  componentDidMount() {
    this.getScheduledRides();
  }
  render() {
    return (
      <View>
        {this.state.rides[0] !== undefined
          ? this.state.rides.map((val, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 20,
                  }}>
                  {/* <CardItem header>
                          <Text>NativeBase</Text>
                        </CardItem> */}
                  <CardItem>
                    <Body>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{width: 180, fontSize: 15}}>
                          From : {val.fromLocationName}
                        </Text>
                        <Text style={{fontSize: 15}}>
                          To : {val.toLocationName}
                        </Text>
                      </View>
                      <View style={{marginTop: 10, flexDirection: 'row'}}>
                        <Text style={{fontSize: 15}}>Date: {val.date}</Text>

                        <Text style={{marginLeft: 60, fontSize: 15}}>
                          Distance : {val.distance}
                        </Text>
                      </View>
                      <View style={{marginTop: 10, flexDirection: 'row'}}>
                        <Text style={{fontSize: 15}}>
                          Departure Time: {val.time}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#e74c3c',
                            marginTop: 10,
                            fontSize: 15,
                          }}>
                          Status : {val.status}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 70,
                            marginTop: 10,
                            fontSize: 15,
                          }}>
                          Distance : {150 + 'KM'}
                        </Text>
                      </View>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Button style={{borderRadius: 20}}>
                      <Text style={{fontSize: 12, color: '#fff'}}>
                        Show In Map
                      </Text>
                    </Button>

                    <View style={{flexDirection: 'row', marginLeft: 100}}>
                      <TouchableOpacity
                        onPress={() => this.showWeatherDetails(index)}>
                        <Icon name="umbrella" style={{fontSize: 20}}></Icon>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{marginLeft: 10}}
                        onPress={() => this.shareDetails(index)}>
                        <Icon name="share" style={{fontSize: 20}}></Icon>
                      </TouchableOpacity>
                    </View>
                  </CardItem>
                </Card>
              );
            })
          : null}
      </View>
    );
  }
}
ScheduledRides.contextType = FirebaseContext;
export default ScheduledRides;

import 'react-native-get-random-values';
import React from 'react';

// nativebase components
import {Item, Input, Icon, Button, Card, CardItem, Right} from 'native-base';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

// react native components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

// webview for map
import WebView from 'react-native-webview';

import {
  getPlacesSuggestions,
  geoCoder,
  calculateTripDetails,
} from '../../actions/mapActions';

// Firestore
import firestore from '@react-native-firebase/firestore';

class BookRide extends React.Component {
  constructor() {
    super();
    this.state = {
      pickupLocation: '',
      dropLocation: '',
      isSuggestionListFromOpen: false,
      isSuggestionListToOpen: false,
      fromSuggestionsList: [],
      toSuggestionsList: [],
      fromLocationLat: '',
      fromLocationLon: '',
      toLocationLat: '',
      toLocationLon: '',
      isDatePickerVisible: false,
      isTimePickerVisible: false,
    };
  }

  // to show alert
  showAlert = () =>
    Alert.alert(
      'Searching For Drivers',
      'Please Wait...',
      [
        {
          text: 'OK',
          onPress: () => {
            // to be implemented
            setTimeout(this.props.navigation.push('ConfirmRide'), 3000);
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

  showRideLaterAlert = () =>
    Alert.alert(
      'Your ride has been scheduled.',
      'We will notify you when we find the driver to you',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

  // sends data to firebase
  requestDrivers = () => {
    this.showAlert();
    // firestore()
    //   .collection('waitingOrders')
    //   .add({
    //     userID: 'Hy0EkRkKZyW8xIsYqQOTLN20Apy1',
    //     fromLat: this.state.fromLocationLat,
    //     fromLon: this.state.fromLocationLon,
    //     toLocationLat: this.state.toLocationLat,
    //     toLocationLon: this.state.toLocationLon,
    //     distance: this.state.distance,
    //     type: 'rideNow',
    //   })
    //   .then(() => {
    //     console.log('Order added!');
    //   });
  };

  // schedule order
  scheduleOrder = () => {
    this.showRideLaterAlert();
    firestore()
      .collection('waitingOrders')
      .add({
        userID: 'Hy0EkRkKZyW8xIsYqQOTLN20Apy1',
        fromLat: this.state.fromLocationLat,
        fromLon: this.state.fromLocationLon,
        toLocationLat: this.state.toLocationLat,
        toLocationLon: this.state.toLocationLon,
        type: 'rideLater',
        time: this.state.selectedTime,
        date: this.state.selectedDate,
        distance: this.state.distance,
      })
      .then(() => {
        console.log('Order added!');
      });
  };

  rideLater = () => {
    this.showDatePicker();
  };

  showTimePicker = () => {
    this.setState({
      isTimePickerVisible: true,
    });
  };

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };

  handleDateConfirm = (date) => {
    this.setState({
      selectedDate: date.toString(),
    });
    this.showTimePicker();
  };
  handleTimeConfirm = (time) => {
    this.setState({
      selectedTime: time.toString(),
    });
    this.scheduleOrder();
  };

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
      isTimePickerVisible: false,
    });
  };

  getTripDetails = () => {
    var data = {
      fromCoordinatesLat: this.state.fromLocationLat,
      fromCoordinatesLon: this.state.fromLocationLon,
      toCoordinatesLat: this.state.toLocationLat,
      toCoordinatesLon: this.state.toLocationLon,
      driverCost: 0,
      vechileCost: 0,
    };
    calculateTripDetails(data).then((res) => {
      this.setState({
        distance: (res.summary.distance / 1000).toFixed(0),
        time: (res.summary.baseTime / 3600).toFixed(0),
      });
    });
  };
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Item>
            <Icon active name="home" style={{color: '#16a085'}} />
            <Input
              placeholder="Enter Pickup Location"
              value={this.state.pickupLocation}
              onChangeText={(text) => {
                getPlacesSuggestions(text).then((res) => {
                  if (res.status) {
                    this.setState({
                      fromSuggestionsList: res.data,
                    });
                  }
                });
                this.setState({
                  pickupLocation: text,
                  isSuggestionListFromOpen: true,
                  isSuggestionListToOpen: false,
                });
              }}
            />
          </Item>
          {/* Suggestion list for pickup */}
          {this.state.isSuggestionListFromOpen
            ? this.state.fromSuggestionsList.slice(0, 3).map((val, index) => {
                return (
                  <Card key={index}>
                    <TouchableOpacity
                      style={{marginTop: -10}}
                      onPress={() => {
                        this.setState({
                          isSuggestionListFromOpen: false,
                          pickupLocation: val,
                        });
                        geoCoder(this.state.pickupLocation).then((res) => {
                          this.setState({
                            fromLocationLat: res.data.lat,
                            fromLocationLon: res.data.lon,
                          });
                        });
                      }}>
                      <CardItem>
                        <Icon active name="pin" />
                        <Text>{val}</Text>
                      </CardItem>
                    </TouchableOpacity>
                  </Card>
                );
              })
            : null}

          <Item>
            <Icon active name="navigate" style={{color: '#16a085'}} />
            <Input
              placeholder="Enter Drop Location"
              value={this.state.dropLocation}
              onChangeText={(text) => {
                getPlacesSuggestions(text).then((res) => {
                  if (res.status) {
                    this.setState({
                      toSuggestionsList: res.data,
                    });
                  }
                });
                this.setState({
                  dropLocation: text,
                  isSuggestionListToOpen: true,
                  isSuggestionListFromOpen: false,
                });
              }}
            />
          </Item>
          {/* Suggestion list for drop */}
          {this.state.isSuggestionListToOpen
            ? this.state.toSuggestionsList.slice(0, 3).map((val, index) => {
                return (
                  <Card key={index} style={{marginTop: -10}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          isSuggestionListToOpen: false,
                          dropLocation: val,
                        });
                        geoCoder(this.state.dropLocation).then((res) => {
                          this.setState({
                            toLocationLat: res.data.lat,
                            toLocationLon: res.data.lon,
                          });
                          this.getTripDetails();
                        });
                      }}>
                      <CardItem>
                        <Icon active name="pin" />
                        <Text>{val}</Text>
                      </CardItem>
                    </TouchableOpacity>
                  </Card>
                );
              })
            : null}
        </View>
        {/* Body */}

        {/* Date time pciker */}
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleDateConfirm}
          onCancel={this.hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={this.state.isTimePickerVisible}
          mode="time"
          onConfirm={this.handleTimeConfirm}
          onCancel={this.hideDatePicker}
        />
        {/* <View>
          
        </View> */}
        <WebView
          style={{marginTop: -8}}
          source={{
            uri: `http://locationservices.rf.gd/showRoute.html?originLat=${this.state.fromLocationLat}&originLon=${this.state.fromLocationLon}&destinationLat=${this.state.toLocationLat}&destinationLon=${this.state.toLocationLon}`,
          }}
        />
        {this.state.pickupLocation !== '' && this.state.dropLocation !== '' ? (
          <View style={styles.footer}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.footerPrice}>
                Total :
                <Text style={styles.priceAmount}>
                  {' '}
                  {this.state.distance * 6} RS
                </Text>
              </Text>
              <Text style={{marginLeft: 5}}>
                Distance :{' '}
                <Text style={{color: 'green', fontWeight: 'bold'}}>
                  {this.state.distance} KM
                </Text>
              </Text>
            </View>
            <View style={{marginLeft: 15, flexDirection: 'row'}}>
              <Button style={styles.rideLaterButton} onPress={this.rideLater}>
                <Text style={styles.rideNowButtonText}>RIDE LATER</Text>
              </Button>
              <Button style={styles.rideNowButton} onPress={this.showAlert}>
                <Text style={styles.rideNowButtonText}>RIDE NOW</Text>
              </Button>
            </View>
          </View>
        ) : (
          // Choose vechile type
          <View style={styles.footer}>
            <Text
              style={{
                fontSize: 15,
                marginRight: 20,
                marginTop: 8,
                color: '#8e44ad',
              }}>
              Explore Nearby
            </Text>
            <TouchableOpacity>
              <Icon
                name="cafe"
                style={{marginRight: 30, marginTop: 5, color: '#16a085'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="cash"
                style={{marginRight: 30, marginTop: 5, color: '#c0392b'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="heart"
                style={{marginRight: 30, marginTop: 5, color: '#8e44ad'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="restaurant"
                style={{marginRight: 30, marginTop: 5, color: '#34495e'}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default BookRide;

var styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 670,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    elevation: 5.0,
    width: '95%',
    height: 60,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
  },
  header: {
    // position: 'absolute',
    top: 0,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5.0,
    width: '95%',
    height: 120,
    margin: 10,
    borderColor: 'grey',
  },
  optionIcons: {
    fontSize: 40,
  },
  footerPrice: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  priceAmount: {
    color: 'green',
  },
  rideNowButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  rideLaterButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  rideNowButtonText: {
    color: '#fff',
  },
  suggestionListFrom: {
    position: 'absolute',
    top: 70,
    backgroundColor: '#fff',
    elevation: 5.0,
    width: '105%',
    padding: 10,
  },
  suggestionListTo: {
    position: 'absolute',
    top: 120,
    backgroundColor: '#fff',
    elevation: 5.0,
    width: '105%',
    padding: 10,
  },
  suggestionTile: {
    padding: 10,
    width: '100%',
    height: 80,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
});

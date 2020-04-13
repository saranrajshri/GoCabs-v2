import 'react-native-get-random-values';
import React from 'react';

// nativebase components
import {Item, Input, Icon, Button, Card, CardItem, Right} from 'native-base';

// react native components
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

// webview for map
import WebView from 'react-native-webview';

import {getPlacesSuggestions, geoCoder} from '../../actions/mapActions';

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
    };
  }
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
            <Icon name="car" style={styles.optionIcons} />
            <Text style={styles.footerPrice}>
              Total :<Text style={styles.priceAmount}> 580 RS</Text>
            </Text>

            <Button style={styles.rideNowButton}>
              <Text style={styles.rideNowButtonText}>RIDE NOW</Text>
            </Button>
          </View>
        ) : null}
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
    fontSize: 20,
    marginLeft: 20,
    marginTop: 5,
    fontWeight: 'bold',
  },
  priceAmount: {
    color: 'green',
  },
  rideNowButton: {
    padding: 10,
    position: 'absolute',
    right: 5,
    top: 8,
    borderRadius: 10,
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

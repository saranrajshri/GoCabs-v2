import React from 'react';

import {View, Text, Button, Card, CardItem} from 'native-base';

// components
import Header from '../components/Header/Header';

// webview
import WebView from 'react-native-webview';

class MainRide extends React.Component {
  render() {
    return (
      <View>
        <Header />
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text style={{fontSize: 20, marginBottom: 10}}>Enjoy Your ride</Text>
          <Text style={{fontSize: 12}}>
            Your cab is on the way. The below map shows the driver's location
          </Text>
        </View>

        <View
          style={{
            height: 300,
            width: '97%',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <WebView
            style={{marginTop: -8}}
            source={{
              uri: `http://locationservices.rf.gd/basicMap.html`,
            }}
          />
        </View>
        <Card style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
          <CardItem>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>From : </Text>Chennai,
                TamilNadu
              </Text>
              <Text style={{marginTop: 10}}>
                <Text style={{fontWeight: 'bold'}}>To: </Text>
                Nellore, Andhra Pradhesh
              </Text>
            </View>
          </CardItem>
        </Card>
        <View style={{marginLeft: 10, flexDirection: 'row', marginRight: 20}}>
          <Button
            style={{
              width: '50%',
              marginBottom: 10,
              marginRight: 10,
              justifyContent: 'center',
            }}>
            <Text>Add More Stops</Text>
          </Button>
          <Button warning style={{justifyContent: 'center', width: '50%'}}>
            <Text>Share Ride</Text>
          </Button>
        </View>
        <View style={{marginLeft: 10, flexDirection: 'row', marginRight: 20}}>
          <Button
            danger
            style={{
              width: '50%',
              marginBottom: 10,
              marginRight: 10,
              justifyContent: 'center',
            }}>
            <Text>Panic Button</Text>
          </Button>
          <Button success style={{justifyContent: 'center', width: '50%'}}>
            <Text>PAY NOW</Text>
          </Button>
        </View>
        <Button success style={{justifyContent: 'center', marginBottom: 10}}>
          <Text>END TRIP</Text>
        </Button>
      </View>
    );
  }
}
export default MainRide;

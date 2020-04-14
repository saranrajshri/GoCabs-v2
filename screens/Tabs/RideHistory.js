import React from 'react';

import {View, TouchableOpacity} from 'react-native';

// context
import FirebaseContext from '../../context/firebaseContext';

// native base
import {Card, CardItem, Body, Icon, Button, Text} from 'native-base';

class RideHistory extends React.Component {
  render() {
    return (
      <View>
        {this.context.userData.rides !== undefined
          ? this.context.userData.rides.map((val, index) => {
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
                          Departed At: {val.departureTime}
                        </Text>

                        <Text style={{marginLeft: 60, fontSize: 15}}>
                          Arrived At : {val.reachTime}
                        </Text>
                      </View>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Text style={{fontSize: 15}}>
                      Fare : {val.price + ' RS'}
                    </Text>
                    <View style={{flexDirection: 'row', marginLeft: 180}}>
                      <TouchableOpacity
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
RideHistory.contextType = FirebaseContext;
export default RideHistory;

import React from 'react';

// react native components
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// native base
import {Card, CardItem, Body} from 'native-base';

// context
import FirebaseContext from '../../context/firebaseContext';

class MyRides extends React.Component {
  // get all ride details

  componentDidMount() {
    // this.getRideDetails();
  }
  render() {
    return (
      <ScrollView>
        <Text style={styles.headingText}>My Ride History</Text>
        {this.context.userData.rides !== undefined
          ? this.context.userData.rides.map((val, index) => {
              return (
                <Card key={index} style={styles.card}>
                  {/* <CardItem header>
                    <Text>NativeBase</Text>
                  </CardItem> */}
                  <CardItem>
                    <Body>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{width: 180}}>
                          From : {val.fromLocationName}
                        </Text>
                        <Text>To : {val.toLocationName}</Text>
                      </View>
                      <View style={{marginTop: 10, flexDirection: 'row'}}>
                        <Text>Date: {val.date}</Text>

                        <Text style={{marginLeft: 60}}>
                          Distance : {val.distance}
                        </Text>
                      </View>
                      <View style={{marginTop: 10, flexDirection: 'row'}}>
                        <Text>Departed At: {val.departureTime}</Text>

                        <Text style={{marginLeft: 60}}>
                          Arrived At : {val.reachTime}
                        </Text>
                      </View>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Text>Fare : {val.price + ' RS'}</Text>
                  </CardItem>
                </Card>
              );
            })
          : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
});

MyRides.contextType = FirebaseContext;
export default MyRides;

import React from 'react';

// nativebase components
import {Item, Input, Icon} from 'native-base';

// react native components
import {View, StyleSheet} from 'react-native';

class BookRide extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        {/* Body */}
        <Item>
          <Icon active name="home" />
          <Input placeholder="Enter Pickup Location" />
        </Item>

        <Item>
          <Icon active name="navigate" />
          <Input placeholder="Enter Drop Location" />
        </Item>
      </View>
    );
  }
}
export default BookRide;

var styles = StyleSheet.create({
  root: {
    margin: 10,
  },
});

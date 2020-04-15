import React from 'react';

import Dialog from 'react-native-dialog';

import {View, StyleSheet, Alert} from 'react-native';

import FirebaseContext from '../../context/firebaseContext';

import firestore from '@react-native-firebase/firestore';

class AlertDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      pickupLocation: '',
      dropLocation: '',
    };
  }

  addNewBookMark = () => {
    var data = {
      title: this.state.title,
      pickupLocation: this.state.pickupLocation,
      dropLocation: this.state.dropLocation,
    };
    var tempData = this.context.userData;
    tempData['bookMarks'].push(data);
    // to be implemented
  };
  render() {
    return (
      <Dialog.Container visible={this.props.isOpen}>
        <Dialog.Title>Add a new bookmark</Dialog.Title>
        <View style={{marginTop: 10}}>
          <Dialog.Input
            placeholder="Enter Title"
            style={styles.input}
            onChangeText={(text) => {
              this.setState({
                title: text,
              });
            }}></Dialog.Input>
          <Dialog.Input
            placeholder="PickUp Location"
            style={styles.input}
            onChangeText={(text) => {
              this.setState({
                pickupLocation: text,
              });
            }}></Dialog.Input>
          <Dialog.Input
            placeholder="Drop Location"
            style={styles.input}
            onChangeText={(text) => {
              this.setState({
                dropLocation: text,
              });
            }}></Dialog.Input>
        </View>
        <Dialog.Button label="Cancel" onPress={this.props.handleClose} />
        <Dialog.Button label="Add" onPress={this.addNewBookMark} />
      </Dialog.Container>
    );
  }
}
const styles = StyleSheet.create({
  input: {borderColor: '#34495e', borderBottomWidth: 2},
});
AlertDialog.contextType = FirebaseContext;
export default AlertDialog;

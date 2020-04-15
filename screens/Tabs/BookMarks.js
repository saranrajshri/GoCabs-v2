import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {Button, Fab, Icon, Container, Card, CardItem, Body} from 'native-base';

// firbasecontext
import FirebaseContext from '../../context/firebaseContext';
import AlertDialog from '../components/Alert';
class BookMarks extends React.Component {
  constructor() {
    super();
    this.state = {
      isAlertDialogOpen: false,
    };
  }

  addNewBookMark = () => {
    this.setState({
      isAlertDialogOpen: true,
    });
  };
  render() {
    return (
      <Container>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', margin: 15}}>
            <Text style={{fontSize: 20}}>Bookmarks</Text>
          </View>
          {/* Body */}
          {this.context.userData.bookMarks !== undefined
            ? this.context.userData.bookMarks.map((val, index) => {
                return (
                  <Card
                    style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}
                    key={index}>
                    <CardItem header>
                      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {val.title}
                      </Text>
                      <TouchableOpacity
                        style={{position: 'absolute', right: 20}}>
                        <Icon name="trash" />
                      </TouchableOpacity>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={{fontSize: 15}}>
                            From : {val.fromLocationName}
                          </Text>
                          <Text style={{fontSize: 15, marginTop: 10}}>
                            To : {val.toLocationName}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={{marginTop: 10, fontSize: 15}}>
                            Distance : {val.distance}
                          </Text>
                          <Text
                            style={{
                              marginTop: 10,
                              fontSize: 15,
                              color: '#c0392b',
                            }}>
                            Current traffic rate: {val.trafficRate}
                          </Text>
                        </View>
                      </Body>
                    </CardItem>
                    <CardItem footer>
                      <Button style={{borderRadius: 10}}>
                        <Text style={{color: '#fff', padding: 10}}>
                          RIDE NOW
                        </Text>
                      </Button>
                    </CardItem>
                  </Card>
                );
              })
            : null}

          {/* Fab */}
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{
              position: 'absolute',
              bottom: 120,
              right: 0,
              backgroundColor: '#5067FF',
            }}
            position="bottomRight"
            onPress={this.addNewBookMark}>
            <Icon name="add" />
          </Fab>

          <AlertDialog
            isOpen={this.state.isAlertDialogOpen}
            handleClose={() => {
              this.setState({
                isAlertDialogOpen: false,
              });
            }}
          />
        </View>
      </Container>
    );
  }
}

BookMarks.contextType = FirebaseContext;
export default BookMarks;

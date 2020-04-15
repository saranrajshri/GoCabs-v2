import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {Button, Fab, Icon, Container, Card, CardItem, Body} from 'native-base';

class BookMarks extends React.Component {
  render() {
    return (
      <Container>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', margin: 15}}>
            <Text style={{fontSize: 20}}>Bookmarks</Text>
          </View>
          {/* Body */}
          <Card style={{marginLeft: 10, marginRight: 10}}>
            <CardItem header>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Office</Text>
              <TouchableOpacity style={{position: 'absolute', right: 20}}>
                <Icon name="trash" />
              </TouchableOpacity>
            </CardItem>
            <CardItem>
              <Body>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 15}}>
                    From : {'val.fromLocationName'}
                  </Text>
                  <Text style={{fontSize: 15, marginTop: 10}}>
                    To : {'val.toLocationName'}
                  </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{marginTop: 10, fontSize: 15}}>
                    Distance : {'val.distance'}
                  </Text>
                  <Text style={{marginTop: 10, fontSize: 15, color: '#c0392b'}}>
                    Current traffic rate: {'HIGH'}
                  </Text>
                </View>
              </Body>
            </CardItem>
            <CardItem footer>
              <Button style={{borderRadius: 10}}>
                <Text style={{color: '#fff', padding: 10}}>RIDE NOW</Text>
              </Button>
            </CardItem>
          </Card>

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
        </View>
      </Container>
    );
  }
}

export default BookMarks;

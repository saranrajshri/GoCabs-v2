import React from 'react';

import {View, TouchableOpacity} from 'react-native';

import {Card, CardItem, Icon, Text, Right} from 'native-base';

import ExpenseTracker from './ExpenseTracker';

class More extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpenseTrackerVisible: false,
      isNormalViewVisible: true,
    };
  }

  showExpenseTracker = () => {
    this.setState({
      isExpenseTrackerVisible: true,
      isNormalViewVisible: false,
    });
  };

  showNormalView = () => {
    this.setState({
      isNormalViewVisible: true,
      isExpenseTrackerVisible: false,
    });
  };
  render() {
    return (
      <View>
        {this.state.isNormalViewVisible ? (
          <Text
            style={{
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
              fontSize: 20,
            }}>
            More Options
          </Text>
        ) : this.state.isExpenseTrackerVisible ? (
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
            }}>
            <TouchableOpacity onPress={this.showNormalView}>
              <Icon name="arrow-back"></Icon>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 15,
              }}>
              Expense Tracker
            </Text>
          </View>
        ) : null}

        <View style={{marginLeft: 10, marginRight: 10}}>
          {this.state.isNormalViewVisible ? (
            <Card>
              <CardItem>
                <Icon active name="cash" />
                <Text>Expense Tracker</Text>
                <Right>
                  <TouchableOpacity onPress={this.showExpenseTracker}>
                    <Icon name="arrow-forward" />
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
          ) : this.state.isExpenseTrackerVisible ? (
            <ExpenseTracker />
          ) : null}
        </View>
      </View>
    );
  }
}
export default More;

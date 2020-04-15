import React from 'react';

import {View, ScrollView} from 'react-native';

import {Card, CardItem, Body, Text, Button} from 'native-base';
class ExpenseTracker extends React.Component {
  constructor() {
    super();
    this.state = {
      isSuggestionsOpen: false,
    };
  }

  showSuggestions = () => {
    this.setState({
      isSuggestionsOpen: true,
    });
  };
  render() {
    return (
      <ScrollView>
        <Card>
          <CardItem>
            <Body>
              <Text style={{marginTop: 10}}>
                Total Expense : <Text style={{color: '#e74c3c'}}>5500 RS</Text>{' '}
              </Text>
              <Text style={{marginTop: 20}}>
                Expenses in this week :{' '}
                <Text style={{color: '#e74c3c'}}>780 RS</Text>
              </Text>
              <Text style={{marginTop: 20}}>
                Total Savings : <Text style={{color: '#27ae60'}}>80 RS</Text>
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Button style={{borderRadius: 20}} onPress={this.showSuggestions}>
              <Text>Show graph</Text>
            </Button>
          </CardItem>
        </Card>
        <Text
          style={{
            marginLeft: 5,
            marginTop: 10,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          Suggestions
        </Text>
        <Card>
          <CardItem>
            <Body>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Use Bicyle{' '}
                <Text style={{color: '#16a085'}}>
                  (Faster, Less congestion)
                </Text>
              </Text>
              <Text style={{marginTop: 10}}>
                From : 10, Kappal Polu Street, Chennai
              </Text>
              <Text style={{marginTop: 10}}>To : Saligram ,Chennai</Text>
              <Text style={{marginTop: 10}}>
                Distance : 10 KM{' '}
                <Text style={{fontSize: 12}}>(2KM more than normal route)</Text>
              </Text>
              <Text style={{marginTop: 10}}>
                Estimated Time : 25 Mins{' '}
                <Text style={{fontSize: 12}}>(3 mins faster )</Text>
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Use Train{'  '}
                <Text style={{color: '#16a085'}}>(Less congestion)</Text>
              </Text>
              <Text style={{marginTop: 10}}>From : Chennai Fort</Text>
              <Text style={{marginTop: 10}}>To : Tambaram</Text>
              <Text style={{marginTop: 10}}>
                Distance : 28 KM{' '}
                <Text style={{fontSize: 12}}>(7KM less than normal route)</Text>
              </Text>
              <Text style={{marginTop: 10}}>
                Estimated Time : 50 Mins{' '}
                <Text style={{fontSize: 12}}>(10 mins faster )</Text>
              </Text>
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}
export default ExpenseTracker;

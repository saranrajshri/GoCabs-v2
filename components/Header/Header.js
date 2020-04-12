import React from 'react';

// Nativebase components
import {
  Container,
  Left,
  Right,
  Header,
  Body,
  Button,
  Icon,
  Title,
} from 'native-base';

class NavBar extends React.Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Book A Ride</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search" />
          </Button>
          <Button transparent>
            <Icon name="heart" />
          </Button>
          <Button transparent>
            <Icon name="more" />
          </Button>
        </Right>
      </Header>
    );
  }
}
export default NavBar;

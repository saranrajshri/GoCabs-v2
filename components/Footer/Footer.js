import React from 'react';

// Nativebase components
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
} from 'native-base';

// context
import FirebaseContext from '../../context/firebaseContext';

class BottomNavigation extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active vertical onPress={() => this.context.setTabIndex(0)}>
            <Icon name="car" />
            <Text>Ride Now</Text>
          </Button>
          <Button vertical onPress={() => this.context.setTabIndex(1)}>
            <Icon name="compass" />
            <Text>Explore</Text>
          </Button>
          <Button vertical onPress={() => this.context.setTabIndex(2)}>
            <Icon active name="bookmark" />
            <Text style={{fontSize: 8}}>BookMarks</Text>
          </Button>
          <Button vertical>
            <Icon name="more" />
            <Text>More</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

BottomNavigation.contextType = FirebaseContext;
export default BottomNavigation;

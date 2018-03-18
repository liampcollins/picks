import React, { Component } from "react";
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { API } from "aws-amplify";
import uniqueId from "react-native-unique-id";
import { userGetCompetitions } from "../actions";

class HomeView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: "Home",
      headerLeft: (
        <TouchableHighlight
          style={{ paddingLeft: 10, width: 60, height: 30 }}
          underlayColor="transparent"
          onPress={() => {
            navigation.state.params.burger();
          }}
        >
          <FAIcon name={"bars"} size={20} />
        </TouchableHighlight>
      ),
      drawerIcon: ({ tintColor, focused }) => (
        <FAIcon name={"home"} size={20} color={tintColor} />
      )
    };
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({ burger: this.onBurger.bind(this) });
    let apiName = "CompetitionsCRUD";
    let path = "/Competitions/User/user1234";
    console.log("GETTING COMPETITIONS");
    API.get(apiName, path)
      .then(response => {
        console.log("API GET COMPS RESPONSE", response);
        // this.props.userGetCompetitions;
      })
      .catch(err => {
        console.log("API ERROR", err);
      });
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ paddingTop: 50 }}>HOMEPAGE!</Text>
      </View>
    );
  }

  onBurger() {
    this.props.navigation.navigate("DrawerOpen");
  }
}

const mapStateToProps = ({ user, competitions }) => ({ user, competitions });

export default connect(mapStateToProps, { userGetCompetitions })(HomeView);

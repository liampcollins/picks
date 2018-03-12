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
  }

  addTeam() {
    let apiName = "TeamCRUD"; // replace this with your api name.
    let path = "/Team"; //replace this with the path you have configured on your API

    uniqueId().then(id => {
      let myInit = {
        response: true,
        body: {
          teamId: id,
          name: "Limerick",
          country: "IRL",
          crest: "test",
          region: "test",
          sports: ["hurling", "football"]
        }, // replace this with attributes you need
        headers: {} // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then(response => {
          console.log("API RESPONSE", response);
          // Add your code here
        })
        .catch(err => {
          console.log("API ERROR", err);
        });
    });
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ paddingTop: 50 }}>HOMEPAGE!</Text>
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="Add Team"
          onPress={() => this.addTeam()}
        />
      </View>
    );
  }

  onBurger() {
    this.props.navigation.navigate("DrawerOpen");
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, {})(HomeView);

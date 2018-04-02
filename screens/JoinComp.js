import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import {
  Button,
  Card,
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from "aws-amplify";
import EIcon from "react-native-vector-icons/Entypo";
import FAIcon from "react-native-vector-icons/FontAwesome";

class JoinComp extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Join Competition",
    drawerIcon: ({ tintColor, focused }) => (
      <EIcon name={"add-to-list"} size={20} color={tintColor} />
    ),
    headerLeft: (
      <TouchableHighlight
        style={{ paddingLeft: 10, width: 60, height: 30 }}
        underlayColor="transparent"
        onPress={() => navigation.navigate("DrawerOpen")}
      >
        <FAIcon name={"bars"} size={20} />
      </TouchableHighlight>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      code: "",
      codeValidationError: "",
      error: "",
      loading: false
    };
  }

  setFieldState(name, value) {
    const setValidate = () => {
      const state = {};
      state[`${name}ValidationError`] = null;
      if (value === "") {
        state[`${name}ValidationError`] = "Required";
        this.setState(state);
      } else {
        state[`${name}ValidationError`] = "";
        this.setState(state);
      }
    };

    if (name === "code") {
      this.setState({ code: value }, () => {
        setValidate();
      });
    }
  }

  getButtonState() {
    if (this.state.code.length === 0 || this.state.loading) {
      return false;
    }
    return true;
  }

  getErrorDisplay() {
    if (this.state.error) {
      return <Text>{this.state.error}</Text>;
    }
    return null;
  }

  joinCompetition() {
    let myInit = {
      response: true,
      body: {
        code: this.state.code,
        user: "me" //use userId
      },
      headers: {}
    };
    let apiName = "CompetitionsCRUD";
    let path = "/Competitions/Join";
    API.post(apiName, path, myInit)
      .then(response => {
        const action = {
          type: "Navigation/RESET",
          index: 0,
          actions: [
            {
              type: "Navigate",
              routeName: "Comp",
              params: this.state.name
            }
          ]
        };
        this.props.navigation.dispatch(action);
      })
      .catch(err => {
        console.log("API ERROR", err);
        this.setState({ loading: false, error: err.message }, () => {
          this.render();
        });
      });
  }

  render() {
    const { errorStyle } = styles;
    return (
      <KeyboardAwareScrollView
        style={{ paddingVertical: 30, backgroundColor: "#06dddb" }}
      >
        {this.getErrorDisplay() && (
          <View style={{ alignItems: "center" }}>
            <Text style={errorStyle}>{this.getErrorDisplay()}</Text>
          </View>
        )}
        <Card>
          <FormLabel>Competition code</FormLabel>
          <FormInput
            placeholder="Competition code..."
            autoCapitalize="none"
            value={this.state.code}
            onChangeText={text => this.setFieldState("code", text)}
          />
          <Button
            disabled={!this.getButtonState()}
            buttonStyle={{ marginTop: 10 }}
            backgroundColor="#03A9F4"
            title="Join Competition"
            loading={this.state.loading}
            onPress={() => this.joinCompetition()}
          />
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  errorStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    color: "red",
    fontSize: 16,
    fontWeight: "bold"
  }
};

export default JoinComp;

import React, { Component } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import {
  Button,
  Card,
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from "aws-amplify";
import uniqueId from "react-native-unique-id";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { userAddCompetition } from "../actions";
import commonStyles from "../assets/styles/common";

class AddComp extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Add Competition",
    drawerIcon: ({ tintColor, focused }) => (
      <FAIcon name={"plus"} size={20} color={tintColor} />
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
      name: "",
      nameValidationError: "",
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

    if (name === "name") {
      this.setState({ name: value }, () => {
        setValidate();
      });
    }
  }

  getButtonState() {
    if (this.state.name.length === 0 || this.state.loading) {
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

  addCompetition() {
    const participants = {};
    participants[this.props.user.id] = {
      name: this.props.user.username,
      score: 0,
      rounds: []
    };
    let myInit = {
      response: true,
      body: {
        name: this.state.name,
        status: "1",
        participantIds: [this.props.user.id],
        owner: this.props.user.id
      },
      headers: {}
    };
    uniqueId()
      .then(id => {
        myInit.body.id = id;
        return uniqueId().then(id => {
          myInit.body.accessToken = id.split("-")[0];
        });
      })
      .then(() => {
        let apiName = "CompetitionsCRUD";
        let path = "/Competitions";
        API.post(apiName, path, myInit)
          .then(response => {
            this.props.userAddCompetition(response);
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
      });
  }

  render() {
    const { errorStyle, containerStyle } = styles;
    return (
      <KeyboardAwareScrollView style={containerStyle}>
        {this.getErrorDisplay() && (
          <View style={{ alignItems: "center" }}>
            <Text style={errorStyle}>{this.getErrorDisplay()}</Text>
          </View>
        )}
        <Card>
          <FormLabel>Competition name</FormLabel>
          <FormInput
            placeholder="Competition name..."
            value={this.state.name}
            onChangeText={text => this.setFieldState("name", text)}
          />
          <Button
            disabled={!this.getButtonState()}
            buttonStyle={{ marginTop: 10 }}
            disabledStyle={commonStyles.buttonStyles.disabledStyle}
            disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
            backgroundColor={commonStyles.buttonStyles.backgound}
            color={commonStyles.buttonStyles.color}
            title="Add + "
            loading={this.state.loading}
            onPress={() => this.addCompetition()}
          />
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 30,
    backgroundColor: commonStyles.mainColor
  },
  errorStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    color: "red",
    fontSize: 16,
    fontWeight: "bold"
  }
});

const mapStateToProps = ({ competitions }) => ({ competitions });

export default connect(mapStateToProps, { userAddCompetition })(AddComp);

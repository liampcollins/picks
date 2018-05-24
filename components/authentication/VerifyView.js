import React from "react";
import { Image, Text, View } from "react-native";
import {
  Button,
  Card,
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Auth } from "aws-amplify";
import commonStyles from "../../assets/styles/common";

class VerifyView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.state.params,
      usernameValidationError: "",
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

    if (name === "username") {
      this.setState({ username: value }, () => {
        setValidate();
      });
    }

    if (name === "code") {
      this.setState({ code: value }, () => {
        setValidate();
      });
    }
  }

  getButtonState() {
    if (
      this.state.usernameValidationError ||
      this.state.codeValidationError ||
      (this.state.username && this.state.username.length === 0) ||
      this.state.code.length === 0 ||
      this.state.loading
    ) {
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

  goToSignIn() {
    const action = {
      type: "Navigation/RESET",
      index: 0,
      actions: [{ type: "Navigate", routeName: "loginScreen" }]
    };
    this.props.navigation.dispatch(action);
  }

  verifyUser() {
    Auth.confirmSignUp(this.state.username, this.state.code)
      .then(() => {
        const action = {
          type: "Navigation/RESET",
          index: 0,
          actions: [
            {
              type: "Navigate",
              routeName: "loginScreen",
              params: this.state.username
            }
          ]
        };
        this.props.navigation.dispatch(action);
      })
      .catch(err => {
        this.setState({ loading: false, error: err.message }, () => {
          this.render();
        });
      });
  }

  render() {
    const {
      authContainer,
      authFormContainer,
      authErrorStyle,
      buttonStyles
    } = commonStyles;
    const { confirmationMessageStyle } = styles;
    return (
      <View style={authContainer}>
        <KeyboardAwareScrollView>
          <View style={{ alignItems: "center", paddingTop: 30 }}>
            <Image
              source={require("../../assets/icons/app-icon.png")}
              style={{ width: 75, height: 75 }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={confirmationMessageStyle}>
              An email has been sent to you containing your confirmation code.
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            {this.getErrorDisplay() && (
              <Text style={authErrorStyle}>{this.getErrorDisplay()}</Text>
            )}
          </View>
          <View style={authFormContainer}>
            <FormLabel>Username</FormLabel>
            <FormInput
              placeholder="Username..."
              autoCapitalize="none"
              value={this.state.username}
              onChangeText={text => this.setFieldState("username", text)}
            />
            <FormValidationMessage>
              {this.state.usernameValidationError}
            </FormValidationMessage>
            <FormLabel>Code</FormLabel>
            <FormInput
              secureTextEntry
              placeholder="Code..."
              value={this.state.code}
              onChangeText={text => this.setFieldState("code", text)}
            />
            <FormValidationMessage>
              {this.state.codeValidationError}
            </FormValidationMessage>

            <Button
              disabled={!this.getButtonState()}
              buttonStyle={{ marginTop: 20 }}
              disabledStyle={buttonStyles.disabledStyle}
              disabledTextStyle={buttonStyles.disabledTextStyle}
              backgroundColor={buttonStyles.backgound}
              color={buttonStyles.color}
              title="Verify"
              loading={this.state.loading}
              onPress={() => this.verifyUser()}
            />
            <Button
              buttonStyle={{ marginTop: 25 }}
              disabledStyle={buttonStyles.disabledStyle}
              disabledTextStyle={buttonStyles.disabledTextStyle}
              backgroundColor={buttonStyles.backgound}
              color={buttonStyles.color}
              title="Sign In"
              onPress={() => this.goToSignIn()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = {
  confirmationMessageStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    fontSize: 16
  }
};
export default VerifyView;

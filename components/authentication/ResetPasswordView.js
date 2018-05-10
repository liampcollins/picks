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

class ResetPasswordView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValidationError: "",
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

    if (name === "email") {
      this.setState({ email: value.toLowerCase() }, () => {
        setValidate();
      });
    }
  }

  getButtonState() {
    if (
      this.state.emailValidationError ||
      this.state.email.length === 0 ||
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
      actions: [{ type: "Navigate", routeName: "SignIn" }]
    };
    this.props.navigation.dispatch(action);
  }

  resetPassword() {
    Auth.forgotPassword(this.state.email)
      .then(() => {
        const action = {
          type: "Navigation/RESET",
          index: 0,
          actions: [
            {
              type: "Navigate",
              routeName: "ChangePassword",
              params: this.state.email
            }
          ]
        };
        this.props.navigation.dispatch(action);
      })
      .catch(() => {
        this.setState({ loading: false, error: err.message }, () => {
          this.render();
        });
      });
  }

  render() {
    const { container } = styles;

    return (
      <KeyboardAwareScrollView style={container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/icons/app-icon.png")}
            style={{ width: 75, height: 75 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          {this.getErrorDisplay() && (
            <Text style={commonStyles.authErrorStyle}>
              {this.getErrorDisplay()}
            </Text>
          )}
        </View>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email address..."
            value={this.state.email}
            onChangeText={text => this.setFieldState("email", text)}
          />
          <FormValidationMessage>
            {this.state.emailValidationError}
          </FormValidationMessage>

          <Button
            disabled={!this.getButtonState()}
            buttonStyle={{ marginTop: 10 }}
            disabledStyle={commonStyles.buttonStyles.disabledStyle}
            disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
            backgroundColor={commonStyles.buttonStyles.backgound}
            color={commonStyles.buttonStyles.color}
            title="Reset Password"
            loading={this.state.loading}
            onPress={() => this.resetPassword()}
          />
          <Button
            buttonStyle={{ marginTop: 0 }}
            disabledStyle={commonStyles.buttonStyles.disabledStyle}
            disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
            backgroundColor={commonStyles.buttonStyles.backgound}
            color={commonStyles.buttonStyles.color}
            title="Sign In"
            onPress={() => this.goToSignIn()}
          />
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  container: {
    paddingVertical: 35,
    backgroundColor: commonStyles.mainColor
  }
};

export default ResetPasswordView;

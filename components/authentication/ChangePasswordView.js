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

class ChangePasswordView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      email: props.navigation.state.params,
      emailValidationError: "",
      code: "",
      codeValidationError: "",
      password: "",
      passwordValidationError: "",
      confirmPassword: "",
      confirmPasswordValidationError: "",
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

    if (name === "code") {
      this.setState({ code: value }, () => {
        setValidate();
      });
    }

    if (name === "password") {
      this.setState({ password: value }, () => {
        setValidate();
      });
    }

    if (name === "confirmPassword") {
      this.setState({ confirmPassword: value }, () => {
        setValidate();
        if (value !== this.state.password) {
          this.setState({
            confirmPasswordValidationError: "Passwords don't match",
            passwordValidationError: "Passwords don't match"
          });
        } else {
          this.setState({
            confirmPasswordValidationError: "",
            passwordValidationError: ""
          });
        }
      });
    }
  }

  getButtonState() {
    if (
      this.state.emailValidationError ||
      this.state.codeValidationError ||
      this.state.passwordValidationError ||
      this.state.confirmPasswordValidationError ||
      this.state.email.length === 0 ||
      this.state.email.code === 0 ||
      this.state.password.length === 0 ||
      this.state.confirmPassword.length === 0 ||
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

  changePassword() {
    this.setState({ loading: true });
    Auth.forgotPasswordSubmit(
      this.state.email,
      this.state.code,
      this.state.password
    )
      .then(() => {
        const action = {
          type: "Navigation/RESET",
          index: 0,
          actions: [
            {
              type: "Navigate",
              routeName: "SignIn",
              params: this.state.email
            }
          ]
        };
        this.props.navigation.dispatch(action);
      })
      .catch(err => {
        console.log("ERR", err);
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
        {this.getErrorDisplay() && (
          <View style={{ alignItems: "center" }}>
            <Text style={commonStyles.authErrorStyle}>
              {this.getErrorDisplay()}
            </Text>
          </View>
        )}
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
          <FormLabel>Code</FormLabel>
          <FormInput
            placeholder="Code..."
            value={this.state.code}
            onChangeText={text => this.setFieldState("code", text)}
          />
          <FormValidationMessage>
            {this.state.codeValidationError}
          </FormValidationMessage>
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Password..."
            value={this.state.password}
            onChangeText={text => this.setFieldState("password", text)}
          />
          <FormValidationMessage>
            {this.state.passwordValidationError}
          </FormValidationMessage>
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Confirm Password..."
            value={this.state.confirmPassword}
            onChangeText={text => this.setFieldState("confirmPassword", text)}
          />
          <FormValidationMessage>
            {this.state.confirmPasswordValidationError}
          </FormValidationMessage>

          <Button
            disabled={!this.getButtonState()}
            buttonStyle={{ marginTop: 10 }}
            backgroundColor="#03A9F4"
            title="Change Password"
            loading={this.state.loading}
            onPress={() => this.changePassword()}
          />
          <Button
            buttonStyle={{ marginTop: 0 }}
            backgroundColor="transparent"
            textStyle={{ color: "#03A9F4" }}
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
    paddingVertical: 30,
    backgroundColor: commonStyles.mainColor
  }
};

export default ChangePasswordView;

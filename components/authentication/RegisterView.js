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

class RegisterView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValidationError: "",
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

    if (name === "username") {
      this.setState({ username: value }, () => {
        setValidate();
      });
    }

    if (name === "email") {
      this.setState({ email: value.toLowerCase() }, () => {
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
      this.state.passwordValidationError ||
      this.state.confirmPasswordValidationError ||
      this.state.email.length === 0 ||
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

  goTo(location) {
    const action = {
      type: "Navigation/RESET",
      index: 0,
      actions: [{ type: "Navigate", routeName: location }]
    };
    this.props.navigation.dispatch(action);
  }

  registerUser() {
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        email: this.state.email
      }
    })
      .then(() => {
        console.log("success registering");
        const action = {
          type: "Navigation/RESET",
          index: 0,
          actions: [
            {
              type: "Navigate",
              routeName: "Verify",
              params: this.username
            }
          ]
        };
        this.props.navigation.dispatch(action);
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ loading: false, error: err.message }, () => {
          this.render();
        });
      });
  }

  render() {
    const { errorStyle } = styles;
    return (
      <KeyboardAwareScrollView style={{ paddingVertical: 30 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/icons/app-icon.png")}
            style={{ width: 75, height: 75 }}
          />
        </View>
        {this.getErrorDisplay() && (
          <View style={{ alignItems: "center" }}>
            <Text style={errorStyle}>{this.getErrorDisplay()}</Text>
          </View>
        )}
        <Card>
          <FormLabel>Username</FormLabel>
          <FormInput
            placeholder="Username..."
            autoCapitalize="none"
            value={this.state.username}
            onChangeText={text => this.setFieldState("username", text)}
          />
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email address..."
            value={this.state.email}
            onChangeText={text => this.setFieldState("email", text)}
          />
          <FormValidationMessage>
            {this.state.emailValidationError}
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
            title="Register"
            loading={this.state.loading}
            onPress={() => this.registerUser()}
          />
          <Button
            buttonStyle={{ marginTop: 0 }}
            backgroundColor="transparent"
            textStyle={{ color: "#03A9F4" }}
            title="Sign In"
            onPress={() => this.goTo("SignIn")}
          />
          <Button
            buttonStyle={{ marginTop: 0 }}
            backgroundColor="transparent"
            textStyle={{ color: "#03A9F4" }}
            title="Confirm Registration"
            onPress={() => this.goTo("Verify")}
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

export default RegisterView;

import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import {
  Button,
  Card,
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Auth } from "aws-amplify";
import { userLoggedIn } from "../../actions";
import commonStyles from "../../assets/styles/common";

export class SignInView extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      email: props.navigation.state.params ? props.navigation.state.params : "",
      emailValidationError: "",
      password: "",
      passwordValidationError: "",
      error: "",
      loading: false
    };

    if (props.signout) {
      this.props.userLoggedIn("");
    }
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
      this.setState({ email: value.trim().toLowerCase() }, () => {
        setValidate();
      });
    }

    if (name === "password") {
      this.setState({ password: value }, () => {
        setValidate();
      });
    }
  }

  getButtonState() {
    if (
      this.state.emailValidationError ||
      this.state.passwordValidationError ||
      this.state.email.length === 0 ||
      this.state.password.length === 0 ||
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

  goToRegister() {
    const action = {
      type: "Navigation/RESET",
      index: 0,
      actions: [{ type: "Navigate", routeName: "signupScreen" }]
    };
    this.props.navigation.dispatch(action);
  }

  goToForgotPassword() {
    const action = {
      type: "Navigation/RESET",
      index: 0,
      actions: [{ type: "Navigate", routeName: "Reset" }]
    };
    this.props.navigation.dispatch(action);
  }

  signInUser() {
    this.setState({ loading: true }, () => {
      // This call to setTimeout is required to give the view time to render
      const updateUser = this.props.userLoggedIn;
      setTimeout(() => {
        Auth.signIn("liampcollins@gmail.com", "Test123!")
          // Auth.signIn(this.state.email, this.state.password)
          .then(res => {
            Auth.currentUserInfo().then(user => {
              updateUser(user);
              this.props.navigation.navigate("drawerStack");
            });
          })
          .catch(err => {
            console.log("err", err);
            this.setState({ loading: false, error: err.message }, () => {
              this.render();
            });
          });
      }, 50);
    });
  }

  render() {
    const { container, formWrapperStyle } = styles;
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
        <View style={formWrapperStyle}>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email..."
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

          <Button
            disabled={!this.getButtonState()}
            buttonStyle={{ marginTop: 20 }}
            disabledStyle={commonStyles.buttonStyles.disabledStyle}
            disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
            backgroundColor={commonStyles.buttonStyles.backgound}
            color={commonStyles.buttonStyles.color}
            title="Sign In"
            loading={this.state.loading}
            onPress={() => this.signInUser()}
          />
          <Button
            buttonStyle={{ marginTop: 10 }}
            disabledStyle={commonStyles.buttonStyles.disabledStyle}
            disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
            backgroundColor={commonStyles.buttonStyles.backgound}
            color={commonStyles.buttonStyles.color}
            title="Register"
            onPress={() => this.goToRegister()}
          />
          <Button
            buttonStyle={{ marginTop: 10 }}
            disabledStyle={commonStyles.buttonStyles.disabledStyle}
            disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
            backgroundColor={commonStyles.buttonStyles.backgound}
            color={commonStyles.buttonStyles.color}
            title="Forgot Password"
            onPress={() => this.goToForgotPassword()}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  container: {
    paddingVertical: 50,
    backgroundColor: commonStyles.mainColor
  },
  formWrapperStyle: {
    width: "90%",
    paddingLeft: "5%"
  }
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { userLoggedIn })(SignInView);

import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  Button,
  Card,
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class AddComp extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
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
    if (
      this.state.name.length === 0 ||
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

  addCompetition() {
    console.log('add competition')
    // ADD COMP LOGIC
    // .then(() => {
    //     console.log("success adding comp");
    //     // GO TO COMP PAGE
    //     const action = {
    //       type: "Navigation/RESET",
    //       index: 0,
    //       actions: [
    //         {
    //           type: "Navigate",
    //           routeName: "Comp",
    //           params: this.state.name
    //         }
    //       ]
    //     };
    //     this.props.navigation.dispatch(action);
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //     this.setState({ loading: false, error: err.message }, () => {
    //       this.render();
    //     });
    //   });
  }

  render() {
    const { errorStyle } = styles;
    return (
      <KeyboardAwareScrollView style={{ paddingVertical: 30 }}>
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
            backgroundColor="#03A9F4"
            title="Add + "
            loading={this.state.loading}
            onPress={() => this.addCompetition()}
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

export default AddComp;

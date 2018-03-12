import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/index";
import createNav from "./navigation/PrimaryNav";
import Amplify, { Auth } from "aws-amplify";
import AWSConfig from "./aws-exports";
Amplify.configure(AWSConfig);

export default class App extends Component {
  constructor() {
    super();
    this.state = { ready: false };
  }

  componentDidMount() {
    this.setState({ signedIn: store.getState().user.isSignedIn, ready: true });
  }

  renderWaiting() {
    return null;
  }

  renderApplication() {
    const Drawer = createNav(this.state.signedIn);
    return (
      <Provider store={store}>
        <Drawer />
      </Provider>
    );
  }

  render() {
    if (this.state.ready) {
      return this.renderApplication();
    }
    return this.renderWaiting();
  }
}

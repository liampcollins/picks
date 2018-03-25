import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";

class CompetitionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card title="HELLO WORLD">
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          fontFamily="Lato"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="VIEW NOW"
          onPress={() => this.props.showComp(this.props.comp.id)}
        />
      </Card>
    );
  }
}

const mapStateToProps = ({ competitions }) => ({ competitions });

export default connect(mapStateToProps, {})(CompetitionCard);

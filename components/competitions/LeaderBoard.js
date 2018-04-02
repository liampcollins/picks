import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { rowStyle, headerStyle } = styles;
    return (
      <Card title="LEADERBOARD">
        <View style={rowStyle}>
          <Text style={headerStyle}>Player</Text>
          <Text style={headerStyle}>Score</Text>
        </View>

        {Object.keys(this.props.users).map((u, i) => {
          return (
            <View key={i} style={rowStyle}>
              <TouchableHighlight onPress={this.props.showRound}>
                <Text>{this.props.users[u].name}</Text>
              </TouchableHighlight>
              <Text>{this.props.users[u].score}</Text>
            </View>
          );
        })}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 40
  },
  headerStyle: {
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});

const mapStateToProps = ({ competitions }) => ({ competitions });

export default connect(mapStateToProps, {})(LeaderBoard);

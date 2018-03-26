import React, { Component } from "react";
import { View, Text, Button, TouchableHighlight } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card title="LEADERBOARD">
        {this.props.users.map((u, i) => {
          return (
            <View key={i} style={styles.user}>
              <TouchableHighlight onPress={this.props.showRound}>
                <Text style={styles.name}>{u.name}</Text>
              </TouchableHighlight>
              <Text style={styles.name}>{u.score}</Text>
            </View>
          );
        })}
      </Card>
    );
  }
}

const styles = {};

const mapStateToProps = ({ competitions }) => ({ competitions });

export default connect(mapStateToProps, {})(LeaderBoard);

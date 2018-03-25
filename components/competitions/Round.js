import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  TextInput
} from "react-native";
import { Card, Input } from "react-native-elements";
import { connect } from "react-redux";

class Round extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const round = this.props.rounds[0];
    return (
      <Card title={round.name}>
        {round.games.map((g, i) => {
          return (
            <View key={i} style={styles.user}>
              <Text style={styles.name}>{g.team1}</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                // onChangeText={text => this.onChanged(text)}
                // value={this.state.myNumber}
                maxLength={6} //setting limit of input
              />
              <Text style={styles.name}>{g.team2}</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                // onChangeText={text => this.onChanged(text)}
                // value={this.state.myNumber}
                maxLength={6} //setting limit of input
              />
            </View>
          );
        })}
      </Card>
    );
  }
}

const styles = {};

const mapStateToProps = ({ rounds }) => ({ rounds });

export default connect(mapStateToProps, {})(Round);

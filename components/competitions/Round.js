import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  TextInput,
  StyleSheet
} from "react-native";
import { Card, Input } from "react-native-elements";
import { connect } from "react-redux";

class Round extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: this.getBlankSelection(),
      loading: false,
      error: ""
    };
  }

  getBlankSelection() {
    return (selection = this.props.rounds[0].games.map(g => {
      return {};
    }));
  }

  allSelectionsMade() {
    var result = true;
    this.state.selection.forEach(g => {
      if (
        !g.team1 ||
        !g.team2 ||
        !g.team1.goals ||
        !g.team1.points ||
        !g.team2.goals ||
        !g.team2.points
      )
        result = false;
    });
    return result;
  }

  getErrorDisplay() {
    if (this.state.error) {
      return <Text>{this.state.error}</Text>;
    }
    return null;
  }

  getButtonState() {
    if ((!this.allSelectionsMade(), this.state.loading)) {
      return false;
    }
    return true;
  }

  updateSelection(id, team, valueType, value) {
    const selection = this.state.selection.map(game => {
      if (game.id === id) {
        game[team] = game[team] || {};
        game[team][valueType] = value;
      }
      return game;
    });
    this.setState({ selection });
  }

  submitSelection() {
    this.setState({ loading: true });
    let myInit = {
      response: true,
      body: {
        selection: this.state.selection,
        round: this.props.rounds[0].id,
        user: "1" //use userId
      },
      headers: {}
    };
    let apiName = "CompetitionsCRUD";
    let path = "/Competitions/AddSelection";
    API.post(apiName, path, myInit)
      .then(response => {
        this.setState({ loading: false }, () => {
          this.props.showRound();
        });
      })
      .catch(err => {
        console.log("API ERROR", err);
        this.setState({ loading: false, error: err.message }, () => {
          this.render();
        });
      });
  }

  render() {
    const { buttonStyle, errorStyle } = styles;
    const round = this.props.rounds[0];
    return (
      <Card title={round.name}>
        {this.getErrorDisplay() && (
          <View style={errorStyle}>
            <Text>{this.getErrorDisplay()}</Text>
          </View>
        )}
        {round.games.map((g, i) => {
          return (
            <View key={i} style={styles.user}>
              <Text style={styles.name}>{g.team1}</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={text =>
                  this.updateSelection(g.id, "team1", "goals", text)
                }
                // value={this.state.myNumber}
                maxLength={3} //setting limit of input
              />
              <Text style={styles.name}>{g.team2}</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={text =>
                  this.updateSelection(g.id, "team1", "goals", text)
                }
                // value={this.state.myNumber}
                maxLength={3} //setting limit of input
              />
            </View>
          );
        })}
        <Button
          loading={this.state.loading}
          disabled={!this.getButtonState()}
          icon={{ name: "code" }}
          fontFamily="Lato"
          buttonStyle={buttonStyle}
          title="SUBMIT SELECTION"
          onPress={() => this.submitSelection()}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "white",
    alignItems: "center"
  },
  errorStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    color: "red",
    fontSize: 16,
    fontWeight: "bold"
  }
});

const mapStateToProps = ({ rounds }) => ({ rounds });

export default connect(mapStateToProps, {})(Round);

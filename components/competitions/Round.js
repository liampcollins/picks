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
import { API } from "aws-amplify";

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
      return { id: g.id };
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
        roundId: this.props.rounds[0].id,
        userId: "eu-west-1:330709cc-51ac-4f11-99fd-f910d4fd045a", //use userId,
        compId: this.props.compId
      },
      headers: {}
    };
    let apiName = "CompetitionsCRUD";
    let path = "/Competitions/AddRound";
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
    const {
      buttonStyle,
      errorStyle,
      gameStyle,
      inputStyle,
      labelStyle,
      rightLabel
    } = styles;
    const round = this.props.rounds[0];
    return (
      <Card title={round.name}>
        {this.getErrorDisplay() && (
          <View style={{ alignItems: "center" }}>
            <Text style={errorStyle}>{this.getErrorDisplay()}</Text>
          </View>
        )}

        {round.games.map((g, i) => {
          return (
            <View key={i} style={gameStyle}>
              <Text style={labelStyle}>{g.team1}</Text>
              <TextInput
                style={inputStyle}
                keyboardType="numeric"
                onChangeText={text =>
                  this.updateSelection(g.id, g.team1, "goals", parseInt(text))
                }
                maxLength={2}
              />
              <Text> - </Text>
              <TextInput
                style={inputStyle}
                keyboardType="numeric"
                onChangeText={text =>
                  this.updateSelection(g.id, g.team1, "points", parseInt(text))
                }
                maxLength={2}
              />
              <Text> | </Text>
              <TextInput
                style={inputStyle}
                keyboardType="numeric"
                onChangeText={text =>
                  this.updateSelection(g.id, g.team2, "goals", parseInt(text))
                }
                maxLength={2}
              />
              <Text> - </Text>
              <TextInput
                style={inputStyle}
                keyboardType="numeric"
                onChangeText={text =>
                  this.updateSelection(g.id, g.team2, "points", parseInt(text))
                }
                maxLength={2}
              />
              <Text style={[labelStyle, rightLabel]}>{g.team2}</Text>
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
    backgroundColor: "#06dddb",
    color: "white",
    alignItems: "center"
  },
  gameStyle: {
    flexDirection: "row"
  },
  inputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#06dddb",
    width: 26
  },
  labelStyle: {
    width: 80
  },
  rightLabel: {
    textAlign: "right"
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

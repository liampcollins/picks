import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet
} from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import commonStyles from "../../assets/styles/common";

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
    // TEMPORARY
    var games = [
      {
        id: 1,
        team1: "limerick",
        team2: "sligo"
      }
    ];
    // return (selection = this.props.rounds[0].games.map(g => {
    return (selection = games.map(g => {
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
      inputRow,
      inputContainer,
      inputStyle,
      labelStyle,
      rightLabel
    } = styles;
    const { fontMainColor, thirdColor, secondaryColor } = commonStyles;

    // const round = this.props.rounds[0];
    const round = {
      name: "round1",
      games: [
        {
          id: 1,
          team1: "Limerick",
          team2: "Sligo"
        },
        {
          id: 2,
          team1: "Limerick",
          team2: "Sligo"
        }
      ]
    };
    return (
      <View style={{ flex: 1 }}>
        <Card
          title={round.name}
          titleStyle={{ color: fontMainColor, fontSize: 20 }}
          dividerStyle={{ backgroundColor: thirdColor }}
          containerStyle={{ backgroundColor: secondaryColor }}
        >
          {this.getErrorDisplay() && (
            <View style={{ alignItems: "center" }}>
              <Text style={errorStyle}>{this.getErrorDisplay()}</Text>
            </View>
          )}

          {round.games.map((g, i) => {
            return (
              <View key={i} style={gameStyle}>
                <Text style={labelStyle}>{g.team1}</Text>
                <View style={inputRow}>
                  <View style={inputContainer}>
                    <TextInput
                      style={inputStyle}
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                      onChangeText={text =>
                        this.updateSelection(
                          g.id,
                          g.team1,
                          "goals",
                          parseInt(text)
                        )
                      }
                      maxLength={2}
                    />
                  </View>
                  <View style={inputContainer}>
                    <TextInput
                      style={inputStyle}
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                      onChangeText={text =>
                        this.updateSelection(
                          g.id,
                          g.team1,
                          "points",
                          parseInt(text)
                        )
                      }
                      maxLength={2}
                    />
                  </View>
                </View>
                <Text style={{ textAlign: "center", color: "white" }}>vs</Text>
                <View style={inputRow}>
                  <View style={inputContainer}>
                    <TextInput
                      style={inputStyle}
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                      onChangeText={text =>
                        this.updateSelection(
                          g.id,
                          g.team2,
                          "goals",
                          parseInt(text)
                        )
                      }
                      maxLength={2}
                    />
                  </View>
                  <View style={inputContainer}>
                    <TextInput
                      style={inputStyle}
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                      onChangeText={text =>
                        this.updateSelection(
                          g.id,
                          g.team2,
                          "points",
                          parseInt(text)
                        )
                      }
                      maxLength={2}
                    />
                  </View>
                </View>
                <Text style={[labelStyle, rightLabel]}>{g.team2}</Text>
              </View>
            );
          })}
          <Button
            loading={this.state.loading}
            disabled={!this.getButtonState()}
            icon={{ name: "code" }}
            disabledStyle={commonStyles.buttonStyles.disabledStyle}
            disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
            backgroundColor={commonStyles.buttonStyles.backgound}
            color={commonStyles.buttonStyles.color}
            buttonStyle={buttonStyle}
            title="SUBMIT SELECTION"
            onPress={() => this.submitSelection()}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    // alignItems: "center"
  },
  gameStyle: {
    padding: 20
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  inputContainer: {
    margin: 5
  },
  inputStyle: {
    height: 40,
    width: 60,
    borderWidth: 1,
    borderColor: commonStyles.thirdColor,
    fontSize: 20,
    textAlign: "center",
    color: "white"
  },
  labelStyle: {
    textAlign: "center",
    fontSize: 20,
    color: commonStyles.fontMainColor
  },
  rightLabel: {
    // textAlign: "right"
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

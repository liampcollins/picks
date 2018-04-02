import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import {
  Button,
  Card,
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from "aws-amplify";
import uniqueId from "react-native-unique-id";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { addRound, userGetTeams } from "../actions";
import GameForm from "../components/rounds/GameForm";
import DatePicker from "react-native-datepicker";

class RoundForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Add Round",
    drawerIcon: ({ tintColor, focused }) => (
      <FAIcon name={"wpforms"} size={20} color={tintColor} />
    ),
    headerLeft: (
      <TouchableHighlight
        style={{ paddingLeft: 10, width: 60, height: 30 }}
        underlayColor="transparent"
        onPress={() => navigation.navigate("DrawerOpen")}
      >
        <FAIcon name={"bars"} size={20} />
      </TouchableHighlight>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      startDate: "",
      startDateValidationError: "",
      nameValidationError: "",
      games: [
        this.getBlankGame(0),
        this.getBlankGame(1),
        this.getBlankGame(2),
        this.getBlankGame(3),
        this.getBlankGame(4)
      ],
      gamesValidationError: "",
      error: "",
      success: "",
      loading: false,
      gameId: 1
    };
  }

  getTeams() {
    let apiName = "TeamCRUD";
    let path = "/Team";
    let teams = [];
    return API.get(apiName, path)
      .then(response => {
        teams = response;
        teams.map(t => {
          t.value = t.name;
          return t;
        });
        this.props.userGetTeams(teams);
      })
      .catch(err => {
        console.log("API ERROR", err);
      });
  }

  componentWillMount() {
    if (!this.props.teams.length) this.getTeams();
  }

  getBlankGame(id) {
    return {
      team1: "",
      team2: "",
      id
    };
  }

  setFieldState(name, value) {
    setValidate = () => {
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
    if (name === "startDate") {
      this.setState({ startDate: value }, () => {
        setValidate();
      });
    }
  }

  allGamesPopulated() {
    var result = true;
    this.state.games.forEach(g => {
      if (!g.team1 || !g.team2) result = false;
    });
    return result;
  }

  getButtonState() {
    if (
      !this.allGamesPopulated() ||
      this.state.name.length === 0 ||
      this.state.startDate === "" ||
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

  getSuccessDisplay() {
    if (this.state.success) {
      return <Text>{this.state.success}</Text>;
    }
    return null;
  }

  saveRound() {
    this.setState({ loading: true });
    let myInit = {
      response: true,
      body: {
        name: this.state.name,
        games: this.state.games,
        startDate: this.state.startDate,
        status: "1"
      },
      headers: {}
    };
    return uniqueId()
      .then(id => {
        myInit.body.id = id;
      })
      .then(() => {
        let apiName = "RoundsCRUD";
        let path = "/Rounds";
        return API.post(apiName, path, myInit)
          .then(response => {
            this.setState(
              {
                loading: false,
                success: "Round created"
              },
              () => {
                this.render();
              }
            );
          })
          .catch(err => {
            this.setState({ loading: false, error: err.message }, () => {
              this.render();
            });
          });
      });
  }

  updateGames(id, team, value) {
    const games = this.state.games.map(game => {
      if (game.id === id) game[team] = value;
      return game;
    });
    this.setState({ games });
  }

  render() {
    const updateGames = this.updateGames.bind(this);
    const {
      errorStyle,
      successStyle,
      gameContainer,
      gameStyle,
      cardStyle
    } = styles;
    var gamesElements = (
      <View style={gameContainer}>
        {this.state.games.map((g, i) => {
          return (
            <GameForm
              style={gameStyle}
              key={i}
              game={g}
              updateGames={updateGames}
            />
          );
        })}
      </View>
    );
    return (
      <KeyboardAwareScrollView
        style={{ paddingVertical: 30, backgroundColor: "#06dddb" }}
      >
        {this.getErrorDisplay() && (
          <View style={{ alignItems: "center" }}>
            <Text style={errorStyle}>{this.getErrorDisplay()}</Text>
          </View>
        )}
        {this.getSuccessDisplay() && (
          <View style={{ alignItems: "center" }}>
            <Text style={successStyle}>{this.getSuccessDisplay()}</Text>
          </View>
        )}
        <Card style={cardStyle}>
          <FormLabel>Round name{this.state.date}</FormLabel>
          <FormInput
            placeholder="Round name..."
            value={this.state.name}
            onChangeText={text => this.setFieldState("name", text)}
          />
          {gamesElements}
          <DatePicker
            style={{ width: "95%" }}
            date={this.state.startDate}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2018"
            maxDate="01-01-2028"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setFieldState("startDate", date);
            }}
          />
          <Button
            disabled={!this.getButtonState()}
            buttonStyle={{ marginTop: 10 }}
            backgroundColor="#03A9F4"
            title="Add + "
            loading={this.state.loading}
            onPress={() => this.saveRound()}
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
  },
  successStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    color: "green",
    fontSize: 16,
    fontWeight: "bold"
  },
  gameContainer: {},
  gameStyle: {
    paddingBottom: 40
  },
  cardStyle: {}
};

const mapStateToProps = ({ competitions, teams }) => ({ competitions, teams });

export default connect(mapStateToProps, { addRound, userGetTeams })(RoundForm);

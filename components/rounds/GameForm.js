import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Button, FormInput } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Dropdown
          label="Team 1..."
          onChangeText={text =>
            this.props.updateGames(this.props.game.id, "team1", text)
          }
          data={this.props.teams}
        />
        <Dropdown
          label="Team 2..."
          onChangeText={text =>
            this.props.updateGames(this.props.game.id, "team2", text)
          }
          data={this.props.teams}
        />

        {/* <FormInput
          placeholder="Team 1..."
          value={this.state.team1}
          onChangeText={text =>
            this.props.updateGames(this.props.game.id, "team1", text)
          }
        />
        <FormInput
          placeholder="Team 2..."
          value={this.state.team2}
          onChangeText={text =>
            this.props.updateGames(this.props.game.id, "team2", text)
          }
        /> */}
      </View>
    );
  }
}

const mapStateToProps = ({ teams }) => ({ teams });

export default connect(mapStateToProps, {})(GameForm);

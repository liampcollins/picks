import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";
import LeaderBoard from "./LeaderBoard";
import Round from "./Round";

class ViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competition: this.props.competitions.filter(
        c => c.id === this.props.compId
      )[0],
      showingRound: false
    };
  }
  showRound() {
    this.setState({ showingRound: !this.state.showingRound });
  }
  goToSelection() {}
  render() {
    const {
      containerStyle,
      headerStyle,
      leaderboardStyle,
      buttonStyle
    } = styles;
    const showRound = this.showRound.bind(this);
    const roundView = <Round showRound={showRound} />;
    const leaderBoardView = (
      <LeaderBoard
        style={leaderboardStyle}
        showRound={showRound}
        users={this.state.competition.participants}
      />
    );
    return (
      <View style={containerStyle}>
        <Text style={headerStyle}>{this.state.competition.name}</Text>
        {this.state.showingRound ? roundView : leaderBoardView}
        <Button
          icon={{ name: "code" }}
          fontFamily="Lato"
          buttonStyle={buttonStyle}
          title={this.state.showingRound ? "GO BACK" : "MAKE SELECTION"}
          onPress={() => this.showRound()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  headerStyle: {
    fontSize: 30,
    marginTop: 40,
    marginBottom: 30,
    color: "white",
    textAlign: "center"
  },
  leaderboardStyle: {},
  buttonStyle: {
    backgroundColor: "white"
  }
});

const mapStateToProps = ({ competitions }) => ({ competitions });

export default connect(mapStateToProps, {})(ViewComp);

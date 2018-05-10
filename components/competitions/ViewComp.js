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
    const { containerStyle, headerStyle } = styles;
    const showRound = this.showRound.bind(this);
    const roundView = (
      <Round compId={this.state.competition.id} showRound={showRound} />
    );
    const leaderBoardView = (
      <LeaderBoard
        style={leaderboardStyle}
        showRound={showRound}
        users={this.state.competition.participants}
      />
    );
    const codeInfo = <Text>Competition Code {this.state.competition.id}</Text>;
    return (
      <View style={containerStyle}>
        <Text style={headerStyle}>{this.state.competition.name}</Text>
        {this.props.user.admin && codeInfo}
        {this.state.showingRound ? roundView : leaderBoardView}
        <Button
          icon={{ name: "code" }}
          fontFamily="Lato"
          disabledStyle={commonStyles.buttonStyles.disabledStyle}
          disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
          backgroundColor={commonStyles.buttonStyles.backgound}
          color={commonStyles.buttonStyles.color}
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
  }
});

const mapStateToProps = ({ competitions, user }) => ({ competitions, user });

export default connect(mapStateToProps, {})(ViewComp);

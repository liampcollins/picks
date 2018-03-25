import React, { Component } from "react";
import { View } from "react-native";
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
  render() {
    var showRound = this.showRound.bind(this);
    var roundView = <Round showRound={showRound} />;
    var leaderBoardView = (
      <LeaderBoard
        showRound={showRound}
        users={this.state.competition.participants}
      />
    );
    return (
      <View>
        <Text style={{ paddingTop: 50 }} h2>
          {this.state.competition.name}
        </Text>
        {this.state.showingRound ? roundView : leaderBoardView}
      </View>
    );
  }
}

const mapStateToProps = ({ competitions }) => ({ competitions });

export default connect(mapStateToProps, {})(ViewComp);

import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import commonStyles from "../../assets/styles/common";

class CompetitionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { cardStyle, textStyle, buttonStyle } = styles;
    return (
      <Card style={cardStyle} title={this.props.comp.name}>
        <Text style={textStyle}>Created by: {this.props.comp.ownerName}</Text>
        <Text style={textStyle}>
          {this.props.comp.participantIds.length} players
        </Text>

        <Button
          icon={{ name: "code" }}
          fontFamily="Lato"
          buttonStyle={buttonStyle}
          title="VIEW COMPETITION"
          onPress={() => this.props.showComp(this.props.comp.id)}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1
  },
  textStyle: {
    marginBottom: 10
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: commonStyles.mainColor
  }
});

const mapStateToProps = ({ competitions }) => ({ competitions });

export default connect(mapStateToProps, {})(CompetitionCard);

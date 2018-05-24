import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import commonStyles from "../../assets/styles/common";

class CompetitionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { cardStyle, textStyle, buttonStyle } = styles;
    const {
      fontMainColor,
      thirdColor,
      secondaryColor,
      buttonStyles
    } = commonStyles;
    console.log("this.props", this.props);
    return (
      <Card
        style={cardStyle}
        title={this.props.comp.name}
        titleStyle={{ color: fontMainColor }}
        dividerStyle={{ backgroundColor: thirdColor }}
        containerStyle={{ backgroundColor: secondaryColor }}
      >
        <Text style={textStyle}>Created by: {this.props.comp.owner}</Text>
        <Text style={textStyle}>
          {this.props.comp.participantIds.length} players
        </Text>

        <Button
          icon={{ name: "visibility" }}
          disabledStyle={buttonStyles.disabledStyle}
          disabledTextStyle={buttonStyles.disabledTextStyle}
          backgroundColor={buttonStyles.backgound}
          color={buttonStyles.color}
          buttonStyle={buttonStyle}
          title="VIEW"
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
    marginBottom: 10,
    color: commonStyles.fontMainColor
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  }
});

const mapStateToProps = ({ competitions }) => ({ competitions });

export default connect(mapStateToProps, {})(CompetitionCard);

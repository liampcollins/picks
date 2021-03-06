import React, { Component } from "react";
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { API } from "aws-amplify";
import uniqueId from "react-native-unique-id";
import { getCompetitions, getRounds } from "../actions";
import { createLoadingSelector } from "../../api/selectors";
import CompView from "../components/competitions/ViewComp";
import CompetitionCard from "../components/competitions/CompetitionCard";
import commonStyles from "../assets/styles/common";

class HomeView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: "Home",
      headerLeft: (
        <TouchableHighlight
          style={{ paddingLeft: 10, width: 60, height: 30 }}
          underlayColor="transparent"
          onPress={() => {
            navigation.state.params.burger();
          }}
        >
          <FAIcon name={"bars"} size={20} />
        </TouchableHighlight>
      ),
      drawerIcon: ({ tintColor, focused }) => (
        <FAIcon name={"home"} size={20} color={tintColor} />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedComp: 1,
      loading: false
    };
  }

  getCompetitions() {
    return this.props.getCompetitions();
  }

  getRounds() {
    return this.props.getCompetitions();
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.navigation.setParams({ burger: this.onBurger.bind(this) });
    return this.getCompetitions()
      .then(() => {
        this.getRounds();
      })
      .catch(err => {
        console.log("API ERROR", err);
        this.setState({ loading: false });
      });
  }

  showComp(id) {
    this.setState({ selectedComp: id });
  }

  goTo(routeName) {
    this.props.navigation.navigate(routeName);
  }

  render() {
    const {
      homeContainer,
      noCompsContainer,
      noCompsText,
      noCompsButtons,
      noCompsTextContainer,
      compsListContainer,
      selectedCompContainer
    } = styles;
    var showComp = this.showComp.bind(this);
    var compsList = this.props.competitions.length ? (
      <View style={compsListContainer}>
        {this.props.competitions.map(function(comp, index) {
          return (
            <CompetitionCard key={comp.id} showComp={showComp} comp={comp} />
          );
        })}
      </View>
    ) : (
      <View />
    );
    var selectedCompComponent = (
      <View style={selectedCompContainer}>
        <CompView style={{}} compId={this.state.selectedComp} />
      </View>
    );

    const noCompsView = (
      <View style={noCompsContainer}>
        <View style={{ flex: 1 }}>
          <View style={noCompsTextContainer}>
            <Text style={noCompsText}>
              You currently have no active competitions. Create or join one to
              get started!
            </Text>
          </View>
          <View style={noCompsButtons}>
            <Button
              buttonStyle={{ marginTop: 10 }}
              disabledStyle={commonStyles.buttonStyles.disabledStyle}
              disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
              backgroundColor={commonStyles.buttonStyles.backgound}
              color={commonStyles.buttonStyles.color}
              title="CREATE + "
              onPress={() => this.goTo("AddCompView")}
            />
            <Button
              buttonStyle={{ marginTop: 10 }}
              disabledStyle={commonStyles.buttonStyles.disabledStyle}
              disabledTextStyle={commonStyles.buttonStyles.disabledTextStyle}
              backgroundColor={commonStyles.buttonStyles.backgound}
              color={commonStyles.buttonStyles.color}
              title="JOIN + "
              onPress={() => this.goTo("JoinCompView")}
            />
          </View>
        </View>
      </View>
    );
    const loadingView = <Text style={noCompsText}>Fetching your data....</Text>;
    return (
      <KeyboardAwareScrollView>
        <View style={homeContainer}>
          {/* {this.state.loading
          ? loadingView
          : this.props.competitions.length
            ? this.state.selectedComp
              ? selectedCompComponent
              : compsList
            : noCompsView} */}
          {this.state.loading ? loadingView : selectedCompComponent}
        </View>
      </KeyboardAwareScrollView>
    );
  }

  onBurger() {
    this.props.navigation.navigate("DrawerOpen");
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: commonStyles.mainColor,
    paddingLeft: 40,
    paddingRight: 40
  },
  noCompsContainer: {
    flex: 1
  },
  noCompsTextContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  noCompsText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  noCompsButtons: {
    flex: 1
  },
  compsListContainer: {
    alignItems: "stretch",
    flex: 1
  },
  selectedCompContainer: {
    alignItems: "stretch",
    flex: 1
  }
});

const loadingSelector = createLoadingSelector([
  "get_competitions",
  "get_rounds"
]);

const mapStateToProps = state => ({
  competitions: state.competitions,
  isFetching: loadingSelector(state)
});

export default connect(
  mapStateToProps,
  { getCompetitions, getRounds }
)(HomeView);

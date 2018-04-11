import React from "react";
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { Card, Button } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome";
import commonStyles from "../../assets/styles/common";

class AboutView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "About",
    drawerIcon: ({ tintColor, focused }) => (
      <FAIcon name={"info"} size={20} color={tintColor} />
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
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { homeContainer, container, textContainer, text } = styles;
    return (
      <View style={homeContainer}>
        <View style={container}>
          <View style={textContainer}>
            <Text style={text}>Lots of text about how to play!</Text>
          </View>
        </View>
      </View>
    );
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
  container: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  }
});

export default AboutView;

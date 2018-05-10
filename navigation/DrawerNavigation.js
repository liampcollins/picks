import { StackNavigator } from "react-navigation";
import DrawerStack from "./DrawerStack";
import commonStyles from "../assets/styles/common";

const createDrawerNavigation = admin =>
  StackNavigator(
    {
      DrawerStack: { screen: DrawerStack }
    },
    {
      headerMode: "float",
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: commonStyles.mainColor },
        title: "SUPERPIX!",
        headerTintColor: "white"
      })
    }
  );

export default createDrawerNavigation;

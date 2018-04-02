import { StackNavigator } from "react-navigation";
import DrawerStack from "./DrawerStack";

const createDrawerNavigation = admin =>
  StackNavigator(
    {
      DrawerStack: { screen: DrawerStack }
    },
    {
      headerMode: "float",
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: "#06dddb" },
        title: "PICKS!",
        headerTintColor: "white"
      })
    }
  );

export default createDrawerNavigation;

import { StackNavigator } from "react-navigation";
import LoginStack from "./LoginStack";
import DrawerNavigation from "./DrawerNavigation";

const createNav = signedIn =>
  // const PrimaryNav = StackNavigator(
  StackNavigator(
    {
      loginStack: { screen: LoginStack },
      drawerStack: { screen: DrawerNavigation }
    },
    {
      // Default config for all screens
      headerMode: "none",
      title: "Main",
      // initialRouteName: signedIn ? "drawerStack" : "loginStack"
      initialRouteName: "drawerStack"
    }
  );

export default createNav;
// export default PrimaryNav;

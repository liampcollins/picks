import { StackNavigator } from "react-navigation";
import LoginStack from "./LoginStack";
import createDrawerNavigation from "./DrawerNavigation";

const createNav = (signedIn, admin) =>
  StackNavigator(
    {
      loginStack: { screen: LoginStack },
      drawerStack: { screen: createDrawerNavigation(admin) }
    },
    {
      headerMode: "none",
      title: "Main",
      initialRouteName: signedIn ? "drawerStack" : "loginStack"
    }
  );

export default createNav;

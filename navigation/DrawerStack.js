import { DrawerNavigator } from "react-navigation";

import HomeView from "../screens/HomeView";
import AddCompView from "../screens/AddComp";
import AboutView from "../components/AboutView";
import JoinCompView from "../screens/JoinComp";
import RoundFormView from "../screens/RoundForm";
import commonStyles from "../assets/styles/common";

const { secondaryColor, thirdColor, fontMainColor } = commonStyles;
const DrawerStack = DrawerNavigator(
  {
    HomeView: { screen: HomeView },
    RoundFormView: { screen: RoundFormView },
    AddCompView: { screen: AddCompView },
    JoinCompView: { screen: JoinCompView },
    AboutView: { screen: AboutView }
  },
  {
    drawerBackgroundColor: secondaryColor,
    contentOptions: {
      inactiveTintColor: fontMainColor,
      activeTintColor: thirdColor
    }
  }
);

export default DrawerStack;

import { DrawerNavigator } from "react-navigation";

import HomeView from "../screens/HomeView";
import AddCompView from "../screens/AddComp";
import AboutView from "../components/AboutView";
import JoinCompView from "../screens/JoinComp";
import RoundFormView from "../screens/RoundForm";

const DrawerStack = DrawerNavigator({
  HomeView: { screen: HomeView },
  RoundFormView: { screen: RoundFormView },
  AddCompView: { screen: AddCompView },
  JoinCompView: { screen: JoinCompView },
  AboutView: { screen: AboutView }
});

export default DrawerStack;

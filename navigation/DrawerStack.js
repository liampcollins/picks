import { DrawerNavigator } from "react-navigation";

import HomeView from "../screens/HomeView";
import AddCompView from "../screens/AddComp";
import AboutView from "../components/AboutView";
import JoinCompView from "../screens/JoinComp";

const DrawerStack = DrawerNavigator({
  HomeView: { screen: HomeView },
  AddCompView: { screen: AddCompView },
  JoinCompView: { screen: JoinCompView },
  AboutView: { screen: AboutView }
});

export default DrawerStack;
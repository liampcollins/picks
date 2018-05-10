import { StackNavigator } from "react-navigation";
import SignInView from "../components/authentication/SignInView";
import RegisterView from "../components/authentication/RegisterView";
import VerifyView from "../components/authentication/VerifyView";
import ResetPasswordView from "../components/authentication/ResetPasswordView";
import ChangePasswordView from "../components/authentication/ChangePasswordView";

const LoginStack = StackNavigator(
  {
    // loginScreen: { screen: SignInView },
    signupScreen: { screen: RegisterView },
    verifyScreen: { screen: VerifyView },
    resetPasswordScreen: {
      screen: ResetPasswordView,
      navigationOptions: { title: "Forgot Password" }
    },
    changePasswordScreen: {
      screen: ChangePasswordView,
      navigationOptions: { title: "Forgot Password" }
    }
  },
  {
    headerMode: "float",
    navigationOptions: {
      headerStyle: { backgroundColor: "#E73536" },
      title: "You are not logged in",
      headerTintColor: "white"
    }
  }
);
export default LoginStack;

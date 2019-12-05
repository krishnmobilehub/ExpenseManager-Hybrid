import React from "react";
import { View, StatusBar, Text, Image,Platform } from "react-native";

import { StackNavigator } from "react-navigation";
import styles from "./styles";
import {strings} from "ExpenseManager/src/strings/AppString";
import { NativeModules } from 'react-native'

const appicon = "ExpenseManager/assets/app_icon.png";

class Splashscreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let locale=null;
    if (Platform.OS === "ios") {
      locale = NativeModules.SettingsManager.settings.AppleLocale
    }else {
      locale = NativeModules.I18nManager.localeIdentifier
    }
    strings.setLanguage(locale);

    console.log(locale);
    const { navigate } = this.props.navigation;
    setTimeout(function() {
      navigate("Expenselist");
    }, 1000);
    return (
      <View style={styles.viewStyle}>
        <Image source={require(appicon)} />
        <Text style={styles.textAppName}>{strings.splashTitle}</Text>
      </View>
    );
  }
}

export default Splashscreen;

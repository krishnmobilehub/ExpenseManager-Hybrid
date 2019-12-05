import { StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  fontFamily
} from "ExpenseManager/src/helper/appColor.js";
export default StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white
  },

  textAppName: {
    fontSize: fontSize.fontSizeHeadTwo,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: fontFamily.robotoBold,
    marginTop: 30,
    color: colors.appRed
  }
});

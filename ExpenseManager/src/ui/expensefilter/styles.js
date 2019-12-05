import { StyleSheet } from "react-native";
import {
  colors,
  grey,
  fontSize,
  fontFamily
} from "ExpenseManager/src/helper/appColor.js";
export default StyleSheet.create({

  range: {
    fontSize: fontSize.fontSizeMediumTwo,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: fontFamily.robotoBold,
    color: colors.black
  },
  Selectedrange: {
    fontSize: fontSize.fontSizeMediumTwo,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: fontFamily.robotoBold,
    color: colors.black
  },
  mainView: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.while
  },
  filterIcon: {
    padding: 10
  },
  slider: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40
  },
  viewContain: {
    flex: 0,
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  viewRow: {
    flex: 1
  },
  subItemsLeft: {
    padding: 10,
    fontSize: fontSize.fontSizeMediumTwo,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: fontFamily.robotoBold,
    color: colors.black
  },
  subItemsRight: {
    padding: 10,
    fontSize: fontSize.fontSizeMediumTwo,
    fontWeight: "bold",
    textAlign: "right",
    fontFamily: fontFamily.robotoBold,
    color: colors.black
  }
});

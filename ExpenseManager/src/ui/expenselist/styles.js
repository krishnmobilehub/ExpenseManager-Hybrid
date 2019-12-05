import { StyleSheet } from "react-native";
import {
  colors,
  grey,
  fontSize,
  fontFamily
} from "ExpenseManager/src/helper/appColor.js";
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: colors.white
  },
  buttonContainerLeft: {
    flex: 1,
    padding: 10
  },
  buttonContainerCenter: {
    flex: 3
  },
  buttonContainerRight: {
    flex: 2,
    padding: 10
  },
  textNameTag: {
    fontSize: fontSize.fontSizeLargeOne,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: fontFamily.robotoBold,
    color: colors.black
  },
  textName: {
    fontSize: fontSize.fontSizeMediumTwo,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: fontFamily.robotoBold,
    color: colors.black
  },
  textMerchant: {
    fontSize: fontSize.fontSizeRegular,
    textAlign: "left",
    fontFamily: fontFamily.robotoRegular,
    color: grey.black
  },
  textDate: {
    fontSize: fontSize.fontSizeRegular,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: fontFamily.robotoRegular,
    color: grey.lightGreyOne
  },
  amount: {
    fontSize: fontSize.fontSizeRegular,
    textAlign: "right",
    fontFamily: fontFamily.robotoRegular,
    color: colors.appRed
  },
  receipts: {
    fontSize: fontSize.fontSizeRegular,
    textAlign: "right",
    fontFamily: fontFamily.robotoRegular,
    color: colors.black
  },
  mainView: {
    flex: 1,
    backgroundColor: grey.lightGreyTwo
  },
  filterIcon: {
    padding: 10
  },
});

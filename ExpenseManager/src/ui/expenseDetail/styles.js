import { StyleSheet } from "react-native";
import {
  colors,
  grey,
  fontSize,
  fontFamily
} from "ExpenseManager/src/helper/appColor.js";
export default StyleSheet.create({
  mainView: {
    backgroundColor: colors.while
  },
  headerCircle: {
    alignSelf: "stretch",
    backgroundColor: colors.appRed,
    padding: 20,
    alignItems: "center"
  },
  CircleShapeView: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#00BCD4",
    justifyContent: "center",
    alignItems: "center"
  },
  textNameTag: {
    fontSize: fontSize.fontSizeHeadTwo,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: fontFamily.robotoBold,
    color: colors.white
  },
  textName: {
    marginTop: 20,
    fontSize: fontSize.fontSizeMediumTwo,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: fontFamily.robotoBold,
    color: colors.white
  },
  textEmail: {
    fontSize: fontSize.fontSizeMediumTwo,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: fontFamily.robotoBold,
    color: colors.white
  },
  viewContain: {
    flex: 0,
    flexDirection: "row",
    padding: 10
  },
  viewContainComment: {
    flex: 0,
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10
  },
  viewRowLeft: {
    flex: 1
  },
  viewRowRight: {
    flex: 2
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
    color: grey.mediumGrey
  },
  editButton: {
    padding: 10,
    fontSize: fontSize.fontSizeMediumTwo,
    fontWeight: "bold",
    textAlign: "right",
    fontFamily: fontFamily.robotoBold,
    color: colors.blue
  },
  rowLine: {
    height: 0.5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: grey.darkGreyOne
  },
  comment: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: fontSize.fontSizeMediumTwo,
    fontFamily: fontFamily.robotoBold,
    color: colors.black
  },
  imageList: {
    margin: 10,
    width: 100,
    height: 100,
    resizeMode: "stretch"
  },
  imageView: {
    padding: 10
  }
});

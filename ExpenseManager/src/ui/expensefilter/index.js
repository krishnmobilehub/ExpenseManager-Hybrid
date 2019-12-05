import React from "react";
import {
  Button,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableWithoutFeedback, Slider
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import styles from "./styles";
import { StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import {strings} from "ExpenseManager/src/strings/AppString";
import {
  colors,
  grey,
  fontSize,
  fontFamily
} from "ExpenseManager/src/helper/appColor.js";

let _this = null;

export default class index extends React.Component {
  static navigationOptions = {
    title: strings.expenseFilter,
    headerRight: (
      <Icon
        style={styles.filterIcon}
        name="check"
        size={30}
        color="#fff"
        onPress={() => _this.filter()}
      />
    ),
    headerStyle: {
      backgroundColor: colors.appRed
    },
    headerTintColor: colors.white
  };
  constructor(props) {
    super(props);
    this.receivedFilterValue = this.props.navigation.getParam(
      "receivedFilterValue",
      () => {}
    );
    this.state = { amountLow: 0, amountHigh: 10000, trackingValue: 10000 };
    this.applyFilterValue = this.props.navigation.getParam("applyFilter", 1000);
  }

  componentDidMount() {
    _this = this;
  }

  filter = () => {
    const { navigate } = this.props.navigation;
    this.receivedFilterValue(this.state.trackingValue);
    this.props.navigation.goBack();
  };

  componentWillUnmount() {}
  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.range}>{strings.priceRange}</Text>
        <View style={styles.viewContain}>
          <View style={styles.viewRow}>
            <Text style={styles.subItemsLeft}>0</Text>
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.subItemsRight}>10000</Text>
          </View>
        </View>
        <Slider
          style={styles.slider}
          onValueChange={val => this.setState({ trackingValue: val })}
          minimumValue={this.state.amountLow}
          maximumValue={this.state.amountHigh}
          value={this.state.amountHigh}
          minimumTrackTintColor="#DE0000"
          maximumTrackTintColor="#000000"
        />
        <Text style={styles.Selectedrange}>
          {strings.amount} :{this.state.trackingValue}
        </Text>
      </View>
    );
  }
}

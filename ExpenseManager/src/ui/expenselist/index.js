import React from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { SearchBar } from "react-native-elements";
import styles from "./styles";
import { StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  colors,
} from "ExpenseManager/src/helper/appColor.js";
import { formatedDate } from "ExpenseManager/src/helper/dateformat";
import {strings} from "ExpenseManager/src/strings/AppString";
import {rootURL} from "ExpenseManager/src/helper/constant";
let _this = null;
export default class index extends React.Component {
  static navigationOptions = {
    title: strings.expenses,
    headerRight: (
      <View>
        <Icon
          style={styles.filterIcon}
          name="filter"
          size={30}
          color="#fff"
          onPress={() => _this.filterList()}
        />
      </View>
    ),
    headerStyle: {
      backgroundColor: colors.appRed
    },
    headerTintColor: colors.white
  };
  constructor(props) {
    super(props);
    this.state = { isLoading: true, page: 0 };
    this.arrayholder = [];
  }

  filterList = () => {
    const { navigate } = this.props.navigation;
    navigate("ExpenseFilter", {
      applyFilter: 1000,
      receivedFilterValue: this.receivedFilterValue
    });
  };

  receivedFilterValue = value => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.amount.value}`;
      return itemData < value;
    });
    this.setState({
      dataSource: newData
    });
  };

  receivedValue = (value, position) => {
    let tempData = [...this.state.dataSource];
    tempData[position] = value;
    this.setState({ dataSource: tempData });
  };

  componentDidMount() {
    _this = this;
    this.loadList();
  }

  renderHeader = () => {
    return (
      <View style={{ backgroundColor: colors.appRed }}>
        <SearchBar
          placeholder={strings.searchBarHint}
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      </View>
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.amount.currency.toUpperCase()} ${item.merchant.toUpperCase()} ${item.user.first.toUpperCase()} ${item.user.last.toUpperCase()} ${item.user.email.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData
    });
  };

  circleShapeView() {
    var R = Math.floor(Math.random() * 255) + 1;
    var G = Math.floor(Math.random() * 255) + 1;
    var B = Math.floor(Math.random() * 255) + 1;

    return {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: `rgba(${R}, ${G}, ${B}, 0.5)`
    };
  }

  loadList = () => {
    this.setState({ isLoading: false });

    return fetch(
      `${rootURL.url}/expenses?limit=25&offset=${this.state.page}`
    )
      .then(response => response.json())
      .then(responseJson => {
        if (this.state.page == 0) {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson.expenses
            },
            function() {}
          );
        } else {
          this.setState(
            {
              isLoading: false,
              dataSource: [...this.state.dataSource, ...responseJson.expenses]
            },
            function() {}
          );
        }
        this.arrayholder = responseJson.expenses;
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.loadList();
      }
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.mainView}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigate("ExpenseDetail", {
                  item: item,
                  receivedValue: this.receivedValue,
                  position: index
                })
              }
            >
              <View style={styles.container}>
                <View style={styles.buttonContainerLeft}>
                  <View style={this.circleShapeView()}>
                    <Text style={styles.textNameTag}>
                      {item.user.first.substring(0, 1).toUpperCase()}
                      {item.user.last.substring(0, 1).toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainerCenter}>
                  <View>
                    <Text style={styles.textName}>
                      {item.user.first} {item.user.last}
                    </Text>
                    <Text style={styles.textMerchant}>{item.merchant}</Text>
                    <Text style={styles.textDate}>
                      {formatedDate(item.date)}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainerRight}>
                  <View>
                    <Text style={styles.amount}>
                      {getSymbolFromCurrency(item.amount.currency)}{" "}
                      {item.amount.value}
                    </Text>
                    <Text style={styles.receipts}>
                      {item.receipts.length} {strings.receipts}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={({ id }, index) => id}
          ListHeaderComponent={this.renderHeader}
          onEndReached={this.handleLoadMore}
        />
      </View>
    );
  }
}

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Splashscreen from "ExpenseManager/src/ui/splashscreen/index.js";
import Expenselist from "ExpenseManager/src/ui/expenselist/index.js";
import ExpenseDetail from "ExpenseManager/src/ui/expenseDetail/index.js";
import ExpenseFilter from "ExpenseManager/src/ui/expensefilter/index.js";

const MainNavigator = createStackNavigator({
  Splashscreen: { screen: Splashscreen },
  Expenselist: { screen: Expenselist },
  ExpenseDetail: { screen: ExpenseDetail },
  ExpenseFilter: { screen: ExpenseFilter }
});

const App = createAppContainer(MainNavigator);

export default App;

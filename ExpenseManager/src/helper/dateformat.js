import {dateFormats} from "ExpenseManager/src/helper/constant";
var dateFormat = require('dateformat');

export function formatedDate(date){
  return dateFormat(date, dateFormats.app)
}

import React from 'react';
import {Button,Alert, FlatList, TextInput,ActivityIndicator, Text, View,TouchableWithoutFeedback, SafeAreaView, ScrollView,Image, Platform, NativeModules, NativeEventEmitter} from 'react-native';
// import { ListItem, SearchBar } from 'react-native-elements';
import styles from "./styles";
import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import getSymbolFromCurrency from "currency-symbol-map";
import {formatedDate} from "ExpenseManager/src/helper/dateformat";
import {colors,grey,fontSize,fontFamily} from "ExpenseManager/src/helper/appColor.js"
import {strings} from "ExpenseManager/src/strings/AppString";
import {rootURL} from "ExpenseManager/src/helper/constant";
const { ImagePickers } = NativeModules;
const ManagersEmitter = new NativeEventEmitter(ImagePickers);
export default class index extends React.Component {

  static navigationOptions = {
    title: strings.expenseDetail,
    headerStyle: {
      backgroundColor: colors.appRed,
    },
    headerTintColor: colors.white,
  };
  constructor(props) {
    super(props);
    this.item =  this.props.navigation.getParam('item', 'nothing sent')
    this.position=this.props.navigation.getParam('position', '-1')
    this.state = {btnText:strings.edit, editText: this.item && this.item.comment || '', editable: false,filePath:'',imageList:this.item.receipts};
    this.receivedValue = this.props.navigation.getParam('receivedValue', () => {});
    this.listener = ManagersEmitter.addListener('onImagePath', (e) => {
       this.imageUpload(e.id,e.imageDatas)

   });
  }

  componentWillUnmount(){
    this.receivedValue(this.item,this.position)	
 	this.listener.remove();
   }

componentDidMount() {
   
}

  changeBtnTitle = (id) => {
    if(this.state.btnText==strings.edit){
      this.setState({ btnText: strings.save, editable: true})
    }else {
      if(this.state.editText==""){
        Alert.alert(strings.error,strings.errorComment,[{text: strings.ok,},],{cancelable: false},);
      }else {
        this.updateComment(id,this.state.editText)
      }
    }
  };

  addReceipts = (id) => {
if (Platform.OS === "ios") {
     NativeModules.ImagePickers.permissionCamera(id)
   }else{

    var options = {
     title: strings.selectImage,
     customButtons: [
       { name: 'customOptionKey', title: strings.customButton },
     ],
     storageOptions: {
       skipBackup: true,
       path: 'images',
     },
   };
   ImagePicker.showImagePicker(options, response => {
     if (response.didCancel) {
     } else if (response.error) {
     } else if (response.customButton) {
       alert(response.customButton);
     } else {
       let source = response.uri;
       this.setState({
         filePath: source,
       });
         this.imageUpload(id,this.state.filePath)
     }
   });
}
  };

  updateComment = (id,commentString) => {
    fetch(`${rootURL.url}/expenses/${id}`,{
       method: 'POST',
       headers: {Accept: 'application/json','Content-Type': 'application/json',},
       body: JSON.stringify({comment: commentString,})
    })
     .then((response) => response.json())
     .then((responseJson) => {
       this.item=responseJson
       this.setState({ btnText: strings.edit, editable: false, editText: responseJson && responseJson.comment || ''})
       })
     .catch((error) =>{
     });
}

imageUpload = (id,imagePath) => {
  let body = new FormData();
  body.append('receipt', {uri: imagePath,name: 'photo.png',filename :'imageName.png',type: 'image/png'});
  body.append('Content-Type', 'image/png');

  fetch(`${rootURL.url}/expenses/${id}/receipts`,{ method: 'POST',headers:{
       "Content-Type": "multipart/form-data",
       } , body :body} )
    .then((res) => res.json())
    .then((res) => {
      this.setState({ imageList:res.receipts})
    this.item=res;
     })
    .catch((e) => console.log(e))
    .done()
}


  render(){
    const {navigate} = this.props.navigation;
    const { editText } = this.state;
    return(
      <SafeAreaView>
     <ScrollView style={styles.scrollView}>
      <View style={styles.mainView}>
        <View style={styles.headerCircle}>
          <View style={styles.CircleShapeView}>
            <Text style={styles.textNameTag}>{this.item.user.first.substring(0,1).toUpperCase() }{this.item.user.last.substring(0,1).toUpperCase()}</Text>
          </View>
            <Text style={styles.textName}>{this.item.user.first} {this.item.user.last}</Text>
            <Text style={styles.textEmail}>{this.item.user.email}</Text>
        </View>
        <View style={styles.viewContain}>
            <View style={styles.viewRowLeft}>
            <Text style={styles.subItemsLeft}>{strings.price}</Text>
            </View>
            <View style={styles.viewRowRight}>
            <Text style={styles.subItemsRight}>{getSymbolFromCurrency(this.item.amount.currency)} {this.item.amount.value}</Text>
            </View>
        </View>
        <View style={styles.rowLine} />
        <View style={styles.viewContain}>
            <View style={styles.viewRowLeft}>
            <Text style={styles.subItemsLeft}>{strings.merchant}</Text>
            </View>
            <View style={styles.viewRowRight}>
            <Text style={styles.subItemsRight}>{this.item.merchant}</Text>
            </View>
        </View>
        <View style={styles.rowLine} />
        <View style={styles.viewContain}>
            <View style={styles.viewRowLeft}>
            <Text style={styles.subItemsLeft}>{strings.date}</Text>
            </View>
            <View style={styles.viewRowRight}>
            <Text style={styles.subItemsRight}>{formatedDate(this.item.date)}</Text>
            </View>
        </View>
        <View style={styles.rowLine} />
        <View style={styles.viewContainComment}>
            <View style={styles.viewRowLeft}>
            <Text style={styles.subItemsLeft}>{strings.comment}</Text>
            </View>
            <View style={styles.viewRowRight}>
            <Text style={styles.editButton} onPress={() => this.changeBtnTitle(this.item.id)}>{this.state.btnText}</Text>
            </View>
        </View>
        <TextInput
        multiline={true}
          style={styles.comment}
         editable={this.state.editable}
         placeholder={strings.commentHint}
         onChangeText={(text) => this.setState({editText:text})}
         value={editText}
         />
        <View style={styles.rowLine} />
        <View style={styles.viewContainComment}>
            <View style={styles.viewRowLeft}>
            <Text style={styles.subItemsLeft}>Receipts</Text>
            </View>
            <View style={styles.viewRowRight}>
            <Text style={styles.editButton} onPress={()=>this.addReceipts(this.item.id)}>{strings.addReceipt}</Text>
            </View>
        </View>
        <View style={styles.imageView}>
        <FlatList
               data={this.state.imageList}
               ItemSeparatorComponent={this.space}
               horizontal={true}
               renderItem={({item}) =>
               <Image
                  style={styles.imageList}
                  source={{uri:`${rootURL.url}${item.url}`}}
                />
               }
             />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
}

// Import the api module
import KpayMerchantApi from '../common/kpay_merchant_api/phone';
import { SUMMARY, TODAY, YESTERDAY } from '../common/kpay_merchant_api/common';

import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";

let API_KEY = "apiKey";

// Create the api object
// this is always needed to answer the device's requests
let kpayMerchantApi = new KpayMerchantApi();


if(settingsStorage.getItem("savedKey") != "" && settingsStorage.getItem("savedKey")!= null) {
  kpayMerchantApi.setApiKey(settingsStorage.getItem("savedKey"));
} else {
  kpayMerchantApi.setApiKey('');
}


// You can also fetch the sales data from the companion directly 
// The api is the same as the device's one


// Settings have been changed
settingsStorage.addEventListener("change", (evt) => {
  if(evt.key == "apikey"){
    let data = JSON.parse(evt.newValue);
    let apikey = data.name;
    settingsStorage.setItem("savedKey", apikey);
    kpayMerchantApi.setApiKey(apikey);
  } 
  
  sendValue(evt.key, evt.newValue);
});

if (companion.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendValue(API_KEY, settingsStorage.getItem(API_KEY));
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}
function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}
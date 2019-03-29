var scanningArea = document.getElementById("scanner");
var confirmationArea = document.getElementById("foodInfo");
var foodNameDisplay = document.getElementById("foodName");
var foodExpiryDisplay = document.getElementById("foodExpiry");
var foodQuantityDisplay = document.getElementById("foodQuantity");
var confirmFooter = document.getElementById("confirmFooter");
var scanFooter = document.getElementById("scanFooter");
var backtoScan = document.getElementById("returnToScan");
var submitButton = document.getElementById("btnSubmit");
var submitButtonDB = document.getElementById("btnSubmitDB");
var freezerRadio = document.getElementById("freezerRadio");
var fridgeRadio = document.getElementById("fridgeRadio");
var pantryRadio = document.getElementById("pantryRadio");
var barcodeVal = "";

var videoElement = document.querySelector("video");
var canvas = document.getElementById("pcCanvas");
var mobileCanvas = document.getElementById("mobileCanvas");
var ctx = canvas.getContext("2d");
var mobileCtx = mobileCanvas.getContext("2d");
var videoSelect = document.querySelector("select#videoSource");
var videoOption = document.getElementById("videoOption");
var buttonGo = document.getElementById("go");
var buttonManual = document.getElementById("manualAdd");
var barcode_result = document.getElementById("dbr");

var isPaused = false;
var videoWidth = 0,
  videoHeight = 0;
var mobileVideoWidth = 0,
  mobileVideoHeight = 0;
var isPC = true;
var ZXing = null;
var decodePtr = null;

resetScanEnv = function() {
  barcodeVal = "";
  foodNameDisplay.value = "";
  foodQuantityDisplay.value = "";
  foodExpiryDisplay.value = "";
  freezerRadio.checked = false;
  fridgeRadio.checked = false;
  pantryRadio.checked = false;
};

buttonManual.onclick = function() {
  scanningArea.style.display = "none";
  confirmationArea.style.display = "block";
  submitButton.style.display = "block";
  submitButtonDB.style.display = "none";
  scanFooter.style.display = "none";
  confirmFooter.style.display = "block";
  resetScanEnv();
};

submitButton.onclick = function() {
  //Food Object creation which will later be written to user's food database
  var foodObject = {};
  if (foodNameDisplay.value == "") {
    alert("boop name red");
  } else {
    foodObject.name = foodNameDisplay.value;
  }

  if (foodExpiryDisplay.value == "") {
    alert("boop expiry red");
  } else {
    foodObject.expiry = foodExpiryDisplay.value;
  }

  if (foodQuantityDisplay.value == "") {
    alert("boop quantity red");
  } else {
    foodObject.quantity = foodQuantityDisplay.value;
  }

  if (
    freezerRadio.checked == false &&
    fridgeRadio.checked == false &&
    pantryRadio.checked == false
  ) {
    alert("boop category red");
  }
    if ((freezerRadio.checked == true)) {
      foodObject.category = freezerRadio.value;
    }
    if ((fridgeRadio.checked == true)) {
      // alert("category changed");
      foodObject.category = "fridge";
      console.log("Value of fridge radio button: "+fridgeRadio.value);
      console.log("New val of foodObject:");
      console.log(foodObject);
    }
    if ((pantryRadio.checked == true)) {
      foodObject.category = pantryRadio.value;
    }
    // console.log("foodObj val:");
    // console.log(foodObj);


  if (writeFoodInvenData(foodObject)) {
    scanningArea.style.display = "block";
    confirmationArea.style.display = "none";
    scanFooter.style.display = "block";
    confirmFooter.style.display = "none";
    alert("Successfully added food item to your inventory");
    resetScanEnv();
  } else {
    alert("Oops, that didn't work, please try again in a few seconds");
  }
};

submitButtonDB.onclick = function() {
  var foodObj = {};
  if (foodNameDisplay.value == "") {
    alert("boop name red");
  } else {
    foodObj.name = foodNameDisplay.value;
  }

  if (foodExpiryDisplay.value == "") {
    alert("boop expiry red");
  } else {
    foodObj.expiry = foodExpiryDisplay.value;
  }

  if (foodQuantityDisplay.value == "") {
    alert("boop quantity red");
  } else {
    foodObj.quantity = foodQuantityDisplay.value;
  }

  if (
    freezerRadio.checked == false &&
    fridgeRadio.checked == false &&
    pantryRadio.checked == false
  ) {
    alert("boop category red");
  } else {
    if ((freezerRadio.checked == true)) {
      foodObj.category = freezerRadio.value;
    }
    if ((fridgeRadio.checked == true)) {
      foodObj.category = fridgeRadio.value;
    }
    if ((pantryRadio.checked == true)) {
      foodObj.category = pantryRadio.value;
    }
    // console.log("foodObj val:");
    // console.log(foodObj);
  }

  if (writeFoodDbData(foodObj, barcodeVal)) {
    alert(
      "Thanks for helping the community, this product has successfully been added to our database"
    );
    if (writeFoodInvenData(foodObj)) {
      scanningArea.style.display = "block";
      confirmationArea.style.display = "none";
      scanFooter.style.display = "block";
      confirmFooter.style.display = "none";
      alert("Successfully added food item to your inventory");
      resetScanEnv();
    } else {
      alert("Oops, that didn't work, please try again in a few seconds");
    }
  } else {
    alert("Oops, that didn't work, please try again in a few seconds");
  }
};

var tick = function() {
  if (window.ZXing) {
    ZXing = ZXing();
    decodePtr = ZXing.Runtime.addFunction(decodeCallback);
  } else {
    setTimeout(tick, 10);
  }
};
tick();

var decodeCallback = function(ptr, len, resultIndex, resultCount) {
  var result = new Uint8Array(ZXing.HEAPU8.buffer, ptr, len);
  console.log(String.fromCharCode.apply(null, result));
  // barcode_result.textContent = String.fromCharCode.apply(null, result);
  barcodeVal = String.fromCharCode.apply(null, result);
  buttonGo.disabled = false;
  if (barcodeVal != "") {
    var foodObj = readFoodDbData(barcodeVal);
    if (foodObj != null) {
      scanningArea.style.display = "none";
      confirmationArea.style.display = "block";
      submitButton.style.display = "block";
      submitButtonDB.style.display = "none";
      scanFooter.style.display = "none";
      confirmFooter.style.display = "block";
      console.log("val of foodObj in videojs: ");
      console.log(foodObj);
      foodNameDisplay.value = foodObj.name;
      foodExpiryDisplay.value = foodObj.expiry;
      foodQuantityDisplay.value = foodObj.quantity;
      switch (foodObj.category) {
        case "fridge":
          fridgeRadio.checked = true;
          break;
        case "freezer":
          fridgeRadio.checked = true;
          break;
        case "pantry":
          pantryRadio.checked = true;
          break;
      }
    } else {
      scanningArea.style.display = "none";
      confirmationArea.style.display = "block";
      submitButton.style.display = "none";
      submitButtonDB.style.display = "block";
      scanFooter.style.display = "none";
      confirmFooter.style.display = "block";
      alert(
        "Food Item unknown, please add it anyway so we can update our food database so this won't happen next time you scan this item"
      );
    }
  }
};

// check devices
function browserRedirect() {
  var deviceType;
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    deviceType = "phone";
  } else {
    deviceType = "pc";
  }
  return deviceType;
}

if (browserRedirect() == "pc") {
  isPC = true;
} else {
  isPC = false;
}

// stackoverflow: http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata/5100158
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {
    type: mimeString
  });
}

backtoScan.onclick = function() {
  scanningArea.style.display = "block";
  confirmationArea.style.display = "none";
  scanFooter.style.display = "block";
  confirmFooter.style.display = "none";
};

// add button event
buttonGo.onclick = function() {
  barcodeVal = "";
  if (isPC) {
    canvas.style.display = "none";
  } else {
    mobileCanvas.style.display = "none";
  }

  isPaused = false;
  scanBarcode();
  buttonGo.disabled = true;
};

// scan barcode
function scanBarcode() {
  barcodeVal = "";

  if (ZXing == null) {
    buttonGo.disabled = false;
    alert("Barcode Reader is not ready!");
    return;
  }

  var data = null,
    context = null,
    width = 0,
    height = 0,
    dbrCanvas = null;

  if (isPC) {
    context = ctx;
    width = videoWidth;
    height = videoHeight;
    dbrCanvas = canvas;
  } else {
    context = mobileCtx;
    width = mobileVideoWidth;
    height = mobileVideoHeight;
    dbrCanvas = mobileCanvas;
  }

  context.drawImage(videoElement, 0, 0, width, height);

  var vid = document.getElementById("video");
  console.log(
    "video width: " + vid.videoWidth + ", height: " + vid.videoHeight
  );
  var barcodeCanvas = document.createElement("canvas");
  barcodeCanvas.width = vid.videoWidth;
  barcodeCanvas.height = vid.videoHeight;
  var barcodeContext = barcodeCanvas.getContext("2d");
  var imageWidth = vid.videoWidth,
    imageHeight = vid.videoHeight;
  barcodeContext.drawImage(videoElement, 0, 0, imageWidth, imageHeight);

  // read barcode
  var imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
  var idd = imageData.data;
  var image = ZXing._resize(imageWidth, imageHeight);
  console.time("decode barcode");
  for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
    ZXing.HEAPU8[image + j] = idd[i];
  }
  var err = ZXing._decode_any(decodePtr);
  console.timeEnd("decode barcode");
  console.log("error code", err);
  if (err == -2) {
    setTimeout(scanBarcode, 30);
  }
}
// https://github.com/samdutton/simpl/tree/gh-pages/getusermedia/sources
var videoSelect = document.querySelector("select#videoSource");

navigator.mediaDevices
  .enumerateDevices()
  .then(gotDevices)
  .then(getStream)
  .catch(handleError);

videoSelect.onchange = getStream;

function gotDevices(deviceInfos) {
  for (var i = deviceInfos.length - 1; i >= 0; --i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement("option");
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "videoinput") {
      option.text = deviceInfo.label || "camera " + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      455;
      console.log("Found one other kind of source/device: ", deviceInfo);
    }
  }
}

function getStream() {
  buttonGo.disabled = false;
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  var constraints = {
    video: {
      deviceId: { exact: videoSelect.value }
    }
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
}

function handleError(error) {
  console.log("Error: ", error);
}

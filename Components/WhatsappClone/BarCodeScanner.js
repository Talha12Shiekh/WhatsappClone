import { Text, View, Button } from "react-native";
import {
  CHAT_BACKROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  STORAGE_KEY,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
} from "./WhatsappMainScreen";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";

const BarCodeScannerScreen = ({ navigation, route }) => {
  const { setisscanned } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (scanned) {
    setisscanned(true);
    navigation.navigate("LinkedDevices");
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          width: "100%",
          height: 100,
          backgroundColor: CHAT_BACKROUND_COLOR,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: CHAT_DATA_STATUS_COLOR,
            fontSize: 22,
            textAlign: "center",
            fontWeight: 300,
          }}
        >
          Open web.whatsapp.com, desktop app, or other devices
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: ACTIVE_TAB_GREEN_COLOR,
            width: "80%",
            aspectRatio: 1,
            overflow: "hidden",
            position:"relative"
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </View>
  );
};

export default BarCodeScannerScreen;

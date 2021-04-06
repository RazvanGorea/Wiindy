import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
  Image,
} from "react-native";
import colors from "../../constants/colors";
import LottieView from "lottie-react-native";
import getIcon from "../../assets/lottie/getIcon";
import IconButton from "../UI/IconButton";
import * as Haptics from "expo-haptics";

let Touchable = TouchableHighlight;
if (Platform.OS === "android" && Platform.Version >= 21) {
  Touchable = TouchableNativeFeedback;
}

const LocationItem = ({ location, onPress, currentForecast, onDelete }) => {
  const [isDeleteShow, setIsDeleteShow] = useState(false);

  const icon = getIcon(
    currentForecast.weather[0].icon,
    currentForecast.weather[0].id,
    true
  );

  const Icon = () =>
    icon.animate ? (
      <Image source={icon.icon} style={styles.icon} />
    ) : (
      <LottieView style={styles.icon} source={icon.icon} />
    );

  const onPressHandler = () => {
    if (isDeleteShow) {
      setIsDeleteShow(false);
    } else {
      onPress();
    }
  };

  const onLongPressHandler = async () => {
    setIsDeleteShow(true);
    await Haptics.impactAsync("light");
  };

  return (
    <View style={styles.wrapper}>
      <Touchable
        onPress={onPressHandler}
        onLongPress={onLongPressHandler}
        delayLongPress={500}
        useForeground
      >
        <View style={styles.item}>
          <Text style={styles.text}>{location}</Text>
          <View style={styles.iconTempContainer}>
            {isDeleteShow ? (
              <View style={styles.deleteWrapper}>
                <IconButton onPress={onDelete} name="delete" size={25} />
              </View>
            ) : (
              <React.Fragment>
                <Text style={styles.temperature}>
                  {currentForecast.temp.toFixed(0)}°c
                </Text>
                <Icon />
              </React.Fragment>
            )}
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
    minWidth: "100%",
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "lexend-regular",
    color: colors.mainTextColor,
    fontSize: 20,
    maxWidth: "60%",
    marginVertical: 6,
  },
  wrapper: {
    borderRadius: 7,
    overflow: "hidden",
    elevation: 7,
    marginVertical: 5,
    width: "93%",
    minWidth: "93%",
    backgroundColor: "white",
  },
  icon: {
    height: 60,
    width: 60,
  },
  iconTempContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  temperature: {
    fontFamily: "lexend-regular",
    fontSize: 20,
    color: colors.mainTextColor,
    marginRight: 10,
  },
  deleteWrapper: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 7,
  },
});

export default LocationItem;
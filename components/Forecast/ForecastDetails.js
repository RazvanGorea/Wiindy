import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";

const ForecastDetails = ({
  leftIconName,
  leftLabel,
  leftValue,
  centerLabel,
  centerIconName,
  centerValue,
  rightIconName,
  rightLabel,
  rightValue,
  isDark,
}) => (
  <View
    style={
      isDark
        ? { ...styles.main, backgroundColor: colors.cardColor }
        : styles.main
    }
  >
    <View style={styles.sideContainer}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.value}>
        {leftValue}
      </Text>
      <Icon
        name={leftIconName}
        size={35}
        color={isDark ? colors.whiteGray : colors.mainTextColor}
      />
      <Text style={isDark ? styles.labelDark : styles.label}>{leftLabel}</Text>
    </View>
    <View
      style={
        isDark
          ? {
              ...styles.centerContainer,
              borderColor: colors.backgroundColorDark,
            }
          : styles.centerContainer
      }
    >
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.value}>
        {centerValue}
      </Text>
      <Icon
        name={centerIconName}
        size={35}
        color={isDark ? colors.whiteGray : colors.mainTextColor}
      />
      <Text style={isDark ? styles.labelDark : styles.label}>
        {centerLabel}
      </Text>
    </View>
    <View style={styles.sideContainer}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.value}>
        {rightValue}
      </Text>
      <Icon
        name={rightIconName}
        size={35}
        color={isDark ? colors.whiteGray : colors.mainTextColor}
      />
      <Text style={isDark ? styles.labelDark : styles.label}>{rightLabel}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  main: {
    //flex: 1,
    backgroundColor: "white",
    minHeight: 150,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 10,
  },
  sideContainer: {
    height: 150,
    width: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
  centerContainer: {
    height: 150,
    width: "40%",
    borderColor: "#F8FAFF",
    borderRightWidth: 2,
    borderLeftWidth: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
  value: {
    fontSize: 40,
    color: "#A6D5FE",
    fontFamily: "lexend-semi-bold",
  },
  label: {
    fontFamily: "lexend-semi-bold",
    color: colors.mainTextColor,
    textAlign: "center",
  },
  labelDark: {
    fontFamily: "lexend-semi-bold",
    color: colors.whiteGray,
    maxWidth: 100,
    textAlign: "center",
  },
});

export default memo(ForecastDetails);

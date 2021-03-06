import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getForecast, setLocations } from "../store/actions/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";

import IconButton from "../components/UI/IconButton";
import SearchItem from "../components/Locations/SearchItem";
import Activity from "../components/UI/Activity";
import i18n from "i18n-js";

const SearchLocationScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [cities, setSities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isDark = useSelector((state) => state.settings.darkMode);

  const dispatch = useDispatch();

  const findCity = async () => {
    if (searchValue.trim() === "") {
      return;
    }
    setIsLoading(true);
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${searchValue}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "35c5504899msh98c20e1a35d0951p1c8bbejsn53fc0aef7cf0",
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();
    setSities(data.data);
    setIsLoading(false);
  };

  const addLocation = async (location) => {
    const value = await AsyncStorage.getItem("locations");
    if (value !== null) {
      const locationsArr = [...JSON.parse(value).data];
      const index = locationsArr.find((loc) => loc.city === location.city);
      if (index) {
        return;
      }
      const modValue = {
        data: [location, ...locationsArr],
      };
      await AsyncStorage.setItem("locations", JSON.stringify(modValue));
      dispatch(setLocations(modValue.data));
    } else {
      const newValue = { data: [location] };
      await AsyncStorage.setItem("locations", JSON.stringify(newValue));
      dispatch(setLocations(newValue.data));
    }
  };

  let list = useMemo(
    () => (
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={(item) => `${item.id}`}
        data={cities}
        renderItem={(itemData) => (
          <SearchItem
            location={`${itemData.item.city}, ${itemData.item.country}`}
            isDark={isDark}
            onPress={() => {
              addLocation(itemData.item);
              dispatch(getForecast(itemData.item));
              navigation.goBack();
            }}
          />
        )}
      />
    ),
    [cities, isDark]
  );

  if (cities === undefined || cities.length === 0) {
    list = (
      <Text
        style={
          isDark
            ? { ...styles.emptyText, color: colors.whiteGray }
            : styles.emptyText
        }
      >
        {i18n.t("searchLocations.emptyText")}
      </Text>
    );
  }

  if (isLoading) {
    list = <Activity />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={isDark ? styles.screenDark : styles.screen}>
        <View
          style={
            isDark
              ? { ...styles.searchWrapper, backgroundColor: colors.cardColor }
              : styles.searchWrapper
          }
        >
          <View
            style={
              isDark
                ? { ...styles.search, backgroundColor: "#474c54" }
                : styles.search
            }
          >
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={i18n.t("searchLocations.search")}
              style={
                isDark
                  ? { ...styles.headerSearch, color: "white" }
                  : styles.headerSearch
              }
              autoCorrect={false}
              placeholderTextColor={isDark ? "#d9d9d9" : "gray"}
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
              onSubmitEditing={findCity}
            />
            <IconButton
              name="magnify"
              size={20}
              color={isDark ? "white" : colors.mainTextColor}
              innerStyle={styles.searchIconInner}
              onPress={findCity}
            />
          </View>
        </View>
        {list}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: 70,
  },
  screenDark: {
    flex: 1,
    backgroundColor: colors.backgroundColorDark,
    paddingTop: 70,
  },
  headerSearch: {
    fontSize: 18,
    fontFamily: "lexend-regular",
    padding: 7,
    paddingLeft: 3,
    borderRadius: 3,
    width: "100%",
  },
  searchWrapper: {
    backgroundColor: "white",
    alignItems: "center",
    elevation: 4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  search: {
    width: "80%",
    maxWidth: 350,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    elevation: 4,
    paddingRight: 15,
    paddingLeft: 15,
    alignItems: "center",
    borderRadius: 3,
  },
  emptyText: {
    fontFamily: "lexend-regular",
    color: colors.mainTextColor,
    fontSize: 20,
    textAlign: "center",
    marginTop: 15,
  },
  list: {
    alignItems: "center",
    marginTop: 13,
    paddingBottom: 10,
  },
});

export default SearchLocationScreen;

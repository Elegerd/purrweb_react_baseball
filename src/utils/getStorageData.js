import AsyncStorage from "@react-native-community/async-storage";

export default async (key) => {
  try {
    const storageData = await AsyncStorage.getItem(key);
    if (storageData === null) {
      return undefined;
    }
    return JSON.parse(storageData);
  } catch (e) {
    return undefined;
  }
};

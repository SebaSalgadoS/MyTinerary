import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = async (data) => {
    try {
        await AsyncStorage.setItem(data.key, JSON.stringify(data.value))
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const getItem = async (key) => {
    try {
        const item = await AsyncStorage.getItem(key)
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.log(error)
        return null
    }
}

const removeItem = async(key) => {
    try {
        await AsyncStorage.removeItem(key)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default { setItem, getItem, removeItem}
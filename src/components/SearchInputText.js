import React from "react";
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from "react-native"

const SearchInputText = ({searchQuery, onSearch, onClear}) => {
    return (
        <View >
            <TextInput 
            style={styles.searchInput}
            placeholder="Search Cities"
            placeholderTextColor="#6e6969"
            value={searchQuery}
            onChangeText={onSearch}
            textContentType="none"
            importantForAutofill="no"
            autoCorrect={false}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={onClear} style={styles.clearButton}>
                    <Text style={styles.clearText}>X</Text>
                </TouchableOpacity>
            )}
        </View>
    )

    const styles = StyleSheet.create({
        searchContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            paddingHorizontal: 12,
            borderRadius: 8,
            marginBottom: 15,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        },
        searchInput: {
            flex: 1,
            paddingVertical: 10,
            fontSize: 16,
        },
        clearButton: {
            padding: 10,
        },
        clearText: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#999",
        },
    });
}

export default SearchInputText;
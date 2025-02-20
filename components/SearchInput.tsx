import React, { useState } from 'react';
import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native';

type Props = {
    onSubmit: (city: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<Props> = ({ onSubmit, placeholder=""}) => {
    const [text, setText] = useState<string>("");

    const handleChangeText = (inputText: string) => {
        setText(inputText);
    }

    const handleSubmitEditing = () => {
        if(!text) return;
        onSubmit(text);
        setText("");
    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCorrect={false}
                value={text}
                placeholder={placeholder}
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                style={styles.textInput}
                clearButtonMode="always"
                onChangeText={handleChangeText}
                onSubmitEditing={handleSubmitEditing}
            />
        </View>
    );
};

interface Style {
    textInput: TextStyle;
    container: ViewStyle;
};

const styles = StyleSheet.create<Style>({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: "#666",
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: "white",
    }
});

export default SearchInput;


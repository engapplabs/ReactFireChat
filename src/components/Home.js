import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import {
    Actions,
} from "react-native-router-flux";

class Home extends React.Component {

    state = {
        name: "",
    };

    render() {
        return(
            <View>
                <Text style={ style.title }>Enter your name: </Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ name: text }); }}
                    value={ this.state.name }
                    style={ style.nameInput }
                    placeholder="Ex: Linus Torvalds" />
                <TouchableOpacity
                    onPress={() => {
                        Actions.Chat({ value: this.state.name });
                    }}>
                    <Text style={ style.buttonText }>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    nameInput: {
        height: 40,
        borderWidth: 2,
        borderColor: "black",
        margin: 20,
    },
    buttonText: {
        marginLeft: 20,
        fontSize: 20,
    },
});

export default Home;

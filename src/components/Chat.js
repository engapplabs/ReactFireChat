import React from "react";
import { GiftedChat } from 'react-native-gifted-chat'

import { FirebaseMessager } from "../services";

class Chat extends React.Component {
    state = {
        messages: [],
    }

    componentWillMount() {

    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => { FirebaseMessager.sendMessage(message); }}
                user={{
                    _id: FirebaseMessager.getUid(),
                    name: this.props.value,
                }} />
        )
    }

    componentDidMount() {
        FirebaseMessager.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
        });
    }

    componentWillunmount() {
        FirebaseMessager.closeChat();
    }
}

export default Chat;

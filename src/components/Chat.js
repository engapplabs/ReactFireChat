import React from "react";
import { GiftedChat } from 'react-native-gifted-chat'

import Backend from "../services/Backend";

export default class Chat extends React.Component {
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
        onSend={(message) => { Backend.sendMessage(message); }}
        user={{
          _id: Backend.getUid(),
          name: this.props.value,
        }}
      />
    )
  }

  componentDidMount() {
      Backend.loadMessages((message) => {
          this.setState((previousState) => {
              return {
                  messages: GiftedChat.append(previousState.messages, message),
              };
          });
      });
  }
   componentWillunmount() {
       Backend.closeChat();
   }
}

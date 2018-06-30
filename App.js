import React, { Component } from 'react';

import Home from "./src/components/Home";
import Chat from "./src/components/Chat";

import {
    Platform
} from "react-native";

import {
    Router,
    Scene,
} from "react-native-router-flux";

export default class App extends Component {
    render() {
        return (
            <Router>
                <Scene
                    key="root"
                    style={{paddingTop: Platform.OS === "ios" ? 54 : 64 }}>
                    <Scene
                        key="home"
                        component={ Home }
                        title="Home"/>
                    <Scene
                        key="Chat"
                        component={ Chat }
                        title="Chat"/>
                </Scene>
             </Router>
         );
     }
}

import React from "react";
import { SafeAreaView } from 'react-native';
import ProgressCounter from "./app/progressCounter";

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ProgressCounter />
        </SafeAreaView>
    );
};

export default App;
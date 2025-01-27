import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NewApp from "./NewApp";
import Home from './pages/Home';
import SavedNotes from './pages/SavedNotes';
import ProfileButton from "./components/ProfileButton";
import Navbar from './components/NavBar';
import SignUp from './SignUp';
import Login from './Login';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
      <NavigationContainer>
        <Stack.Navigator initialRouteName="NewApp">
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="App" component={App} />
            <Stack.Screen name="NewApp" component={NewApp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SavedNotes" component={SavedNotes} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
  
  
);

import React, { useState } from "react";
import { connect } from 'react-redux'
import { StyleSheet, TextInput } from "react-native";
import { Button, Container, Form, Header, Text, Title } from "native-base";
import { userLogin } from "../redux/actions/Auth";

const Login = ({ Auth, userLogin, navigation }) => {

  const innitialState = {
    email: '',
    password: '',
  };
  const [state, setState] = useState(innitialState);
  const emailChanger = (text) => {
    setState(prevState => ({
      ...prevState,
      email: text
    }))
  }
  const passwordChanger = (text) => {
    setState(prevState => ({
      ...prevState,
      password: text
    }))
  }
  const submitHandler = () => {
    userLogin(state);
    navigation.navigate("Home")
  }
  const navigateRegister = () => {
    navigation.push("Register")
  }

  if (Auth.isLogin) {
    navigation.navigate("Home")
  }

  return (
    <Container>
      <Form>
        <TextInput style={styles.textInput} onChangeText={(text) => emailChanger(text)} value={state.email} placeholder="Email" />
        <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={(text) => passwordChanger(text)} value={state.password} placeholder="Password" />
        <Button onPress={submitHandler} style={styles.button}>
          <Text> Login </Text>
        </Button>
        <Button onPress={navigateRegister} style={styles.buttonDown}>
          <Text> Register </Text>
        </Button>
      </Form>
    </Container>
  )
};

const mapStateToProps = state => ({
  Auth: state.Auth
})

export default connect(mapStateToProps, { userLogin })(Login);

const styles = StyleSheet.create({
  button: {
    marginTop: 45,
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    height: 50,
    backgroundColor: "#2fc4b2",
    display: "flex",
    justifyContent: "center",
    borderRadius: 5
  },
  buttonDown: {
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    height: 50,
    backgroundColor: "#2fc4b2",
    display: "flex",
    justifyContent: "center",
    borderRadius: 5
  },
  textInput: {
    marginTop: 30,
    padding: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    fontSize: 18,
    backgroundColor: "rgb(218, 213, 213)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5
  },
  header: {
    backgroundColor: "#cbc5c5",
    paddingTop: 10
  }
});

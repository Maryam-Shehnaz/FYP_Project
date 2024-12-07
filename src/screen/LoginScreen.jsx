import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const LoginScreen = () => {
  const [secureEntery, setSecureEntery] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper}>
        <Ionicons name={"arrow-back-outline"} color={colors.primary}
        size={25}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
          <Text style={styles.headingText}>Hey,</Text>
          <Text style={styles.headingText}>Welcome</Text>
          <Text style={styles.headingText}>Back</Text>
        </View>

        {/* form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name={"mail-outline"} size={30} color={colors.secondary}/>
            <TextInput style={styles.textInput} 
            placeholder='Enter your Email'
            placeholderTextColor={colors.secondary}
            keyboardType='email-address'
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name={"lock"} size={30} color={colors.secondary}/>
            <TextInput style={styles.textInput} 
            placeholder='Enter your Password'
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntery}
            />
            <TouchableOpacity 
            onPress={() => {
              setSecureEntery((prev) => !prev);

            }}
            >
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>

          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Login</Text>
          </TouchableOpacity>

        </View>
      
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
    padding:20,
  },
  backButtonWrapper:{
    height:40,
    width:40,
    backgroundColor:colors.gray,
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
  },
  textContainer:{
    marginVertical:20,
  },
  headingText:{
    fontSize:32,
    color:colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer:{
    marginTop:20,

  },
  inputContainer:{
    borderWidth:1,
    borderColor:colors.secondary,
    borderRadius:100,
    paddingHorizontal:20,
    flexDirection:"row",
    alignItems:"center",
    padding:2,
    marginVertical:10,

  },
  textInput:{
    flex:1,
    paddingHorizontal:10,
    fontFamily:fonts.Light,
  },
  forgotPasswordText:{
    textAlign:"right",
    color:colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical:10,

  }
})
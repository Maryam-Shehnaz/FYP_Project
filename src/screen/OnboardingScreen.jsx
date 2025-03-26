import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'


const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };
 
  return (
    <View style={styles.container}>
       <Text style={styles.appName}>MediScript</Text>
      {/* <Image source={require("../assets/logo.png")} style={styles.logo}/> */}
      <Image source={require("../assets/bannerImage.png")} style={styles.bannerImage} />
      <Text style={styles.title}>Your Digital Prescription Assistant</Text>
      <Text style={styles.subTitle}>Transform your handwritten prescriptions into clear digital records. Scan, store, and understand your medications with confidence.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={[
        styles.loginButtonWrapper,
        {backgroundColor: colors.primary},

        ]}
        onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginButtonWrapper]}
        onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>
      
      </View>

    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: "center",

  },
  appName: {
    fontSize: 36,
    fontFamily: fonts.Bold,
    color: '#226062',
    marginVertical: 40,
    textAlign: "center",
  },
  // logo:{
  //   height: 120,
  //   width: 290,
  //   marginVertical:30,
  // },
  bannerImage:{
    marginVertical:20,
    height:250,
    width: 231,

  },
  title:{
    fontSize:30,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.primary,
    marginTop: 40,

  },
  subTitle:{
    fontSize: 18,
    textAlign: "center",
    color: colors.secondary,
    fontFamily: fonts.Medium,
    paddingHorizontal: 20,
    marginVertical: 20,

  },
  buttonContainer:{

    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    width: "80%",
    height:60,
    borderRadius:100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width:"50%",
    borderRadius: 98,
  },
  loginButtonText:{
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,

  },
  signupButtonText:{
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  }

});


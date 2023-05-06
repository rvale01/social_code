import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc } from "react-native-responsive-fontsize";
import { StyleSheet } from 'react-native'
export const bullet = {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(3) / 2,
    marginTop: hp(1),
    marginRight: wp(0.8)
}

export const buttons = {
    marginRight: wp(2),
    borderRadius: 8,
    backgroundColor: '#FEA82F'
}

export const styles = StyleSheet.create({
    button: {
        width: wp(70),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: hp(2.5),
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 6,
        borderRadius: 10
    },
    buttonTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#404040',
        fontSize: fontPerc(4.5)
    },
    welcomeTitle: {
        color: '#404040',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: fontPerc(4.5),
        marginLeft: wp(10),
        // marginLeft: wp(1),
        width: wp(80),
    },
    link: {
        width: wp(45),
        fontSize: fontPerc(4),
        color: '#A0A0A0',
        marginLeft: wp(30),
        textDecorationColor: '#A0A0A0',
        textDecorationLine: 'underline',
        marginTop: hp(2)
    },
    inputContainer: {
        width: wp(90),
        alignSelf: 'center',
        marginTop: hp(2),
        backgroundColor:'white',
        shadowColor: "#107CAF3A",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 6,
        borderRadius: 5
    },
    container:{
        borderBottomColor: 'transparent',
    },
    box:{
        backgroundColor: 'white',
        shadowColor: "#107CAF",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.20,
        shadowRadius: 6,
        borderRadius: 7,
        elevation: 7,
        marginBottom: hp(2), 
        marginTop: hp(1),
        width:wp(90)
    },
    arrowIconContainer:{
        backgroundColor: '#A0A0A0', 
        width: hp(5), 
        height: hp(5), 
        borderRadius: hp(5) / 2, 
        marginLeft: wp(23), 
        marginTop: hp(1), 
        marginRight: wp(2)
    },
    boxText:{
        color: '#404040', 
        marginLeft: wp(4), 
        marginTop: hp(1.4), 
        fontSize: fontPerc(3.3)
    },
    titleScreens:{
        fontSize:fontPerc(3.8),
        color:'#404040',
        textAlign:'left'
    },
    plusButton:{
        backgroundColor: '#39b6f6', 
        paddingTop: hp(0.5), 
        paddingBottom: hp(1), 
        paddingLeft: wp(3), 
        paddingRight: wp(3), 
        marginRight: wp(2), 
        borderRadius: wp(10)
    },
    linkText:{
        width: wp(45),
        fontSize: fontPerc(3.8),
        color: '#404040',
        marginTop:hp(1.2),
        fontWeight:'bold'
    }
})


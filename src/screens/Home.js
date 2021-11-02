import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from "../components/Button";
import { firebase } from '../Config';
const empRef = firebase.firestore().collection('employees')


const Home = ({navigation, route, user}) => {
    const [ checking, setChecking ] = useState(true);
    const [ employee, setEmployee ] = useState([])

    useEffect( ()=> {
        const subscriber = empRef.where("authorId", "==", user.uid)
        .onSnapshot( snapshot => {
         //creating an empty arreay to collect the notes from firestore    
         const newEmployee = []
             snapshot.forEach( doc => {
                 newEmployee.push({
                     id : doc.id,
                     ...doc.data()
                 })
             })
             setEmployee(newEmployee)
        })
        return subscriber
    }, [])
   
   
   
   
    const logout = ()=> {
        firebase.auth().signOut();
        navigation.navigate('Login')
    }

    const create = () => {
        navigation.navigate('Create')
    }

    const renderItem = ({item, index})=> {
        const {name, age, gender, day, image} = item;
        return (
            <View style={styles.employeeContainer}>
               <View style={styles.employeeImageContainer}> 
               {
                   image && 
                    <Image 
                        source = {{uri : image}}
                        style = {{ width : 50, height : 50, borderRadius : 25}}
                    />
               }
               </View>
               <View style={styles.infoContainer}> 
                    <View>
                        {/* <Text style={{ fontSize: 12, fontWeight: 'bold' }}> {name} </Text> */}
                        <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold', marginVertical: 5}}> {name}</Text>
                    </View>
                   <View> 
                       <Text style={{color: 'gray', fontSize: 10, marginVertical: 5}}> {gender} - {age}</Text>
                   </View>
                   <View style={styles.day}> 
                       <Text style={{fontSize : 8, color: '#fff'}}> {day} </Text>
                   </View>
               </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor : 'white'}}>
            <View>
                <TouchableOpacity onPress={logout}>
                   <Text> Logout </Text> 
                </TouchableOpacity>

                <View style = {styles.employee}>
                    <View>
                        <Text> MY EMPLOYEES </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress = {create} >
                            <Image 
                                source = {require('../../assets/plus.png')}
                                style = {styles.plus}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{marginVertical : 50}}>
                    {
                        employee.length === 0 ? (
                            <>
                            <Image 
                                source = {require('../../assets/blank.png')}
                                style = {styles.imageContainer}
                            />
                            <Text 
                                style={{
                                    fontSize : 12, 
                                    textAlign: 'center',
                                    marginVertical : 20,
                                    }}> Sorry you do not have employees 
                            </Text>
                            
                            <View style={{alignItems : 'center', justifyContent: 'center'}}>
                                <Button 
                                    title = 'Add an employee'
                                    onPress = {create}
                                />
                            </View>
                            
                            </>
                        ) : (
                        <FlatList 
                            data = {employee}
                            renderItem = {renderItem}
                            keyExtractor = { item => item.id}
                            contentContainerStyle ={{ paddingTop: 40, paddingHorizontal: 20, }}
                        />
                        )
                    }
                </View>
            </View>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    infoContainer : {
        flex: 1,
        borderBottomColor : '#333', 
        borderBottomWidth: 1,
        paddingVertical : 5, 
    },
    employee : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 20,
    },
    plus : {
        width : 20,
        height: 20, 
    },
    imageContainer : {
        width : '100%',
        height: undefined,
        aspectRatio : 16/9,
        alignSelf:'center'
    },
    employeeContainer : {
        flex : 1,
        flexDirection : 'row'
    },
    employeeImageContainer : {
        width : '20%',
        alignItems : 'center',
        justifyContent : 'center'
    },
    day : {
        width : 30,
        height : 30,
        borderRadius : 15,
        backgroundColor : '#000000',
        justifyContent : 'center',
        alignItems : 'center'
    },
    imageContainer : {
        width : '100%',
        height: undefined,
        aspectRatio : 16/9,
        alignSelf:'center'
    },
})

export default Home

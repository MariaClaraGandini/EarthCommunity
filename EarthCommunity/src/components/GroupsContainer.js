import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GroupsContainer = ({ group}) => {
  const [userId, setUserId] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      setUserId(user._id);
    };

    getUser();
  }, []);

  const handleAddUserGroup = async ({group, userId}) => {
    try {
      const response = await axios.post(
        `https://earth-community-backend-production.up.railway.app/api/group/add-member/${group._id}/${userId}`
      );
      console.log(response.data);
      console.log(userId);
      console.log(group);
      // setGroups(response.data.group);
      // console.log('Group ID:', group._id);
      // console.log('USER:', userId);
      updateGroups(); // Atualiza o estado groups através da função passada como prop


    } catch (error) {
      console.error(error);
      console.log('Group ID:', group._id);
      console.log('USER:', userId);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await axios.delete(
        `https://earth-community-backend-production.up.railway.app/api/group/delete/${group._id}/${userId}`
      );
      console.log(response.data);
            setIsDeleted(true); 
    } catch (error) {
      console.error(error);
    }
  };
  if (isDeleted) {
    return null;
  }

  return (
    <View style={styles.viewContainer} key={group._id}>
       <Avatar style={styles.avatar} image={{ uri: "https://media.gq-magazine.co.uk/photos/620529e268071f7ecff06fac/1:1/w_1080,h_1080,c_limit/100222_Bobba_hp.jpg" }} size={80} />
       <Text style={styles.title}>{group.name}</Text>
      <Text style={styles.subtitle}>{group.description}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddUserGroup(group, userId)}>
      <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeleteGroup}>
      <Text style={styles.buttonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: '4%',
    borderRadius: 23,
    marginLeft: '3%',
    marginRight: '3%',

  },
  avatar: {
    marginTop: '4%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#17B978',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4%',

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});


export default GroupsContainer;

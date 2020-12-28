import React from 'react';
import {
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Container from '../../components/common/Container';
import {SETTINGS} from '../../constants/routeNames';
import logoutUser from '../../context/actions/auth/logoutUser';
import styles from './styles';

const SideMenu = ({navigation, authDispatch}) => {
  const handleLogout = () => {
    navigation.toggleDrawer();
    Alert.alert('Logout!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },

      {
        text: 'OK',
        onPress: () => {
          logoutUser()(authDispatch);
        },
      },
    ]);
  };

  const menuItems = [
    {
      icon: <Text>T</Text>,
      name: 'Settings',
      onPress: () => {
        navigation.navigate(SETTINGS);
      },
    },
    {
      icon: <Text>T</Text>,
      name: 'Logout',
      onPress: handleLogout,
    },
  ];
  return (
    <SafeAreaView>
      <Container>
        <Image
          height={70}
          width={70}
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
        />

        <View style={{paddingHorizontal: 70}}>
          {menuItems.map(({name, icon, onPress}) => (
            <TouchableOpacity onPress={onPress} key={name} style={styles.item}>
              <View style={styles.icon}>{icon}</View>
              <Text style={styles.itemText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default SideMenu;

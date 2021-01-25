import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {s} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';
import {CONTACT_DETAIL, CREATE_CONTACT} from '../../constants/routeNames';
import Icon from '../common/Icon';
import Message from '../common/Message';
import styles from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ContactsComponent = ({sortBy, data, loading, setModalVisible}) => {
  const {navigate} = useNavigation();

  const swipeableItemRefs = useRef([]);
  // console.log('swipeableItemRefs', swipeableItemRefs);

  const toggleSwipeable = (key) => {
    swipeableItemRefs.current.forEach((ref, i) => {
      if (ref.id !== key) {
        swipeableItemRefs.current?.[i]?.swipeable?.close();
      }
    });
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <Message info message="No contacts to show" />
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {
      contact_picture,
      first_name,
      country_code,
      phone_number,
      last_name,
    } = item;

    const renderLeftActions = (progress, dragX) => {
      return (
        <View style={[{flexDirection: 'row', paddingRight: 5}]}>
          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Icon
              name="chat"
              type="material"
              size={s(22)}
              color={colors.white}
            />
            <Text style={styles.actionText} numberOfLines={1}>
              Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Icon
              name={'heart-outline'}
              type="materialCommunity"
              size={22}
              color={colors.white}
            />
            <Text numberOfLines={1} style={styles.actionText}>
              Favorite
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
    const {id} = item;
    return (
      <Swipeable
        ref={(ref) =>
          swipeableItemRefs.current.push({
            id,
            swipeable: ref,
          })
        }
        onSwipeableWillOpen={() => toggleSwipeable(id)}
        renderLeftActions={(progress, dragX) =>
          renderLeftActions(progress, dragX, item)
        }
        renderRightActions={(progress, dragX) =>
          renderLeftActions(progress, dragX, item)
        }>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            navigate(CONTACT_DETAIL, {item});
          }}>
          <View style={styles.item}>
            {contact_picture ? (
              <Image
                style={{width: 45, height: 45, borderRadius: 100}}
                source={{uri: contact_picture}}
              />
            ) : (
              <View
                style={{
                  width: 45,
                  height: 45,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.grey,
                  borderRadius: 100,
                }}>
                <Text style={[styles.name, {color: colors.white}]}>
                  {first_name[0]}
                </Text>
                <Text style={[styles.name, {color: colors.white}]}>
                  {last_name[0]}
                </Text>
              </View>
            )}

            <View style={{paddingLeft: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.name}>{first_name}</Text>

                <Text style={styles.name}> {last_name}</Text>
              </View>
              <Text
                style={
                  styles.phoneNumber
                }>{`${country_code} ${phone_number}`}</Text>
            </View>
          </View>
          <Icon name="right" type="ant" size={18} color={colors.grey} />
        </TouchableOpacity>
      </Swipeable>
    );
  };
  return (
    <>
      <View style={{backgroundColor: colors.white, flex: 1}}>
        {loading && (
          <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        )}

        {!loading && (
          <View style={[{paddingVertical: 20}]}>
            <FlatList
              renderItem={renderItem}
              data={
                sortBy
                  ? data.sort((a, b) => {
                      if (sortBy === 'First Name') {
                        if (b.first_name > a.first_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                      if (sortBy === 'Last Name') {
                        if (b.last_name > a.last_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                    })
                  : data
              }
              ItemSeparatorComponent={() => (
                <View
                  style={{height: 0.5, backgroundColor: colors.grey}}></View>
              )}
              keyExtractor={(item) => String(item.id)}
              ListEmptyComponent={ListEmptyComponent}
              ListFooterComponent={<View style={{height: 150}}></View>}
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigate(CREATE_CONTACT);
        }}>
        <Icon name="plus" size={21} color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

export default ContactsComponent;

import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},

  imageView: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },

  chooseText: {
    color: colors.primary,
    textAlign: 'center',
  },
});

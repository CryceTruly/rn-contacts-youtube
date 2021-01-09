import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  scrollView: {backgroundColor: colors.white},
  container: {flex: 1},
  loading: {paddingLeft: '35%', paddingTop: '5%'},
  imageContainer: {height: 300, width: '100%'},
  detailPhoto: {height: 300, width: '100%', resizeMode: 'cover'},
  names: {fontSize: 23},
  content: {padding: 20},

  hrLine: {
    height: 10,
    borderColor: colors.grey,
    borderBottomWidth: 0.4,
  },

  topCallOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  topCallOption: {
    alignItems: 'center',
  },

  middleText: {
    fontSize: 14,
    color: colors.primary,
    paddingVertical: 5,
  },

  middleCallOptions: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  phoneMobile: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  imageView: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },
});

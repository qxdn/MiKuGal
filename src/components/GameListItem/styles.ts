import {StyleSheet} from 'react-native';

const articleBgColor = 'rgba(230, 238, 232, 0.5)';
const articleBoxShadowColor = 'black';
const purple1 = 'rgb(107, 105, 214)';

const galBoxShadow = color => {
  return {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
    shadowColor: color, // 晚点可以放theme
    elevation: 4, // 对一些低版本的android
  };
};

const dataArticleMonthDay = () => {
  return {
    textAlign: 'center',
    display: 'block',
  };
};

const styles = StyleSheet.create({
  article: {
    marginBottom: 30,
    marginTop: 30,
  },
  articleBody: {
    backgroundColor: articleBgColor,
    ...galBoxShadow(articleBoxShadowColor),
  },
  dataArticle: {
    backgroundColor: purple1,
    borderColor: purple1,
    position: 'absolute',
    height: 70,
    width: 70,
    borderRadius: 100,
    left: -20,
    top: -20,
    paddingTop: 10,
  },
  dataClassMonth: {
    color: '#fff',
    textAlign: 'center',
    margin: 0,
  },
  dataClassDay: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -5,
  },
  articleContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 0,
  },
  articleTitle: {},
  imageContainerStyle: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
    marginTop: '-8%',
    marginBottom: '-4%',
  },
});

export default styles;

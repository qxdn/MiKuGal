import {Card, Text} from '@rneui/themed';
import {
  getGameDetail,
  getGameDetailComment,
  getImageUrl,
} from '@src/services/api';
import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, View, useWindowDimensions} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import GameLabel from '@components/GameLabel';
import Note from '@components/Note';
import RenderHTML from 'react-native-render-html';
import GameLink from '@components/GameLink';

/**
 * 游戏详情页面
 * @returns
 */
const GameDetail: React.FunctionComponent<GameDetailProps> = ({id, type}) => {
  const {width} = useWindowDimensions();
  const [detail, setDetail] = useState<API.GameDetail>();
  const [comment, setComment] =
    useState<API.PageWrapper<API.GameDetailComment[]>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageViewIndex, setImageViewIndex] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      let _detail: API.GameDetail = await getGameDetail(id, type);
      let _comment: API.PageWrapper<API.GameDetailComment[]> =
        await getGameDetailComment(id, type);
      setDetail(_detail);
      setComment(_comment);
      setLoading(false);
    }
    loadData();
  }, [id, type]);

  /**
   * zoom image view
   * @returns
   */
  const getImageViewUrls = () => {
    const imgs = [];
    for (let img of detail?.img) {
      imgs.push({url: getImageUrl(img.img_url)});
    }
    return imgs;
  };
  /**
   * card image
   * @returns
   */
  const getImageCardItem = () => {
    const imgs = [];
    for (let index in detail?.img) {
      let img = detail.img[index];
      imgs.push(
        <Card.Image
          source={{uri: getImageUrl(img.img_url)}}
          onPress={() => {
            setImageViewIndex(index), setShowModal(true);
          }}
          key={img.img_id}
          style={{marginVertical: '5%'}}
        />,
      );
    }
    return imgs;
  };

  // render

  if (loading) {
    return (
      <View>
        <Text>{loading}</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Card>
        <Card.Title h4 style={{textAlign: 'center'}}>
          {detail?.count.game_name}
        </Card.Title>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: '5%',
          }}>
          <GameLabel text={detail?.count.game_create_time} icon={'calendar'} />
          <GameLabel text={detail?.count.game_count} iconName="eye" />
        </View>
        <Card.Divider />
        <Note type="info" title={'游戏截图'} />
        {getImageCardItem()}
        <Modal visible={showModal} transparent={true}>
          <ImageViewer
            imageUrls={getImageViewUrls()}
            index={imageViewIndex}
            onClick={() => {
              setShowModal(false);
            }}
          />
        </Modal>
        <Note type="success" icon="lightbulb" title={'游戏介绍'}>
          <RenderHTML
            contentWidth={width}
            source={{html: detail?.count.game_introduce}}
          />
        </Note>
        <Card.Divider />
        <GameLink
          title="Onedrive链接"
          id={id}
          type={type}
          note={detail?.count.game_beizhu}
          split={detail?.count.game_pwd}
        />
      </Card>
    </ScrollView>
  );
};

export default GameDetail;

import {SearchBar, Icon} from '@rneui/themed';
import {getGameList} from '@services/api';
import logger from '@src/services/log';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import GameListSkeleton from '../GameListSkeleton';
import GameListItem from './GameListItem';

const mockdata: API.PageWrapper<API.GameListItem[]> = {
  obj: [
    {
      game_id: 2340,
      game_count: 51,
      game_label: '28',
      game_img: '/upload/2023-02-01_0017041675182058589.jpg',
      game_lys: 1,
      game_name: '转生之后成为只有产妇的村子的助产师这件事',
      game_introduce:
        '主人公会重生到一个只有孕妇的村庄。<br/><br/>成为村里唯一的助产师,辅助孕妇们分娩。<br/><br/>产妇们信任着你,会呼唤着"你的名字"。<br/>也有着对强烈的阵痛感到恐慌的产妇,请抚摸她的肚子安抚她吧。<br/><br/>也有身体娇小的产妇,胎头好像怎么也出不来。<br/>请辅助产妇顺利分娩哦。',
      game_create_time: '2023-02-01 00:23:39',
    },
    {
      game_id: 2339,
      game_count: 148,
      game_label: '32,8',
      game_img: '/uploadzio/2023-01-28_2241261674917334654.jpg',
      game_lys: 1,
      game_name: '拿破仑少女 ~ 字典里没有不可能三个字的少女',
      game_introduce:
        '——改变命运，我的字典里没有不可能三个字。<br/><br/>咲川将一是一个平平凡凡的高中二年级的学生，直到那一天他遭遇了交通事故。<br/>当他再次睁开双眼时，展现在他眼前的光景是正处于资产阶级革命白热化时期的19世纪的法国。<br/>在千钧一发之际从炮弹轰炸下把将一救出来的是一位带剑的少女。<br/>「——我是拿破仑·波拿巴。是未来的法国皇帝。」<br/>此后，受少女「拿破仑」救命之恩的将一决定与她同行。<br/>出乎意料的是这个世界并非「过去」，而是一个异世界。<br/>在这里，被神托付了伟人命运的“神谕”的少女们使用一种名为「天启」的异能展开激烈的交战。<br/><br/>究竟将一是否能够平安无事地回到原本的世界呢？<br/>他和拿破仑之间逐渐萌发的感情的未来又将如何呢——',
      game_create_time: '2023-01-28 22:50:53',
    },
    {
      game_id: 2338,
      game_count: 84,
      game_label: '25',
      game_img: '/uploadzio/2023-01-28_2243041674917086839.jpg',
      game_lys: 1,
      game_name: '幻想郷ふたなりバトルファック ～ 悪魔の妹VS無敗の剛欲同盟長',
      game_introduce: '扶她芙兰和扶她尤魔的击剑比赛',
      game_create_time: '2023-01-28 22:48:47',
    },
    {
      game_id: 2337,
      game_count: 183,
      game_label: '3,6',
      game_img: '/uploadzio/2023-01-24_1930401674561096324.jpg',
      game_lys: 1,
      game_name: '微笑的理由',
      game_introduce:
        '月，那是相遇的季节。<br/>老子，上阪瞬随着父亲的调动，离开了一直以来生活过的土地，从今年开始就读全新的学校。<br/>对在这个新环境中我，绝对要把心心念念的可爱女朋友泡到手！<br/><br/>要真能那么顺利就不用瞎折腾了但目标还是想摆高点。<br/>那么接下来就要开始的我的学园生活究竟会有怎样美妙的邂逅在等待着我呢？<br/><br/>胸中激荡着这样的思绪，我的新生活就此拉开了帷幕。<br/>',
      game_create_time: '2023-01-24 19:57:34',
    },
    {
      game_id: 2336,
      game_count: 118,
      game_label: '2,12',
      game_img: '/uploadzio/2023-01-24_1933351674560814685.jpg',
      game_lys: 1,
      game_name: '月之镜',
      game_introduce:
        '《月之镜》是一款带有克苏鲁元素的恐怖解谜游戏。一场突如其来的天文异象，让无数学生神秘失踪，紧急封闭的校园内一个神秘社团却突然崛起，他们似乎以情爱为乐，而你失踪的女友又与他们有何种联繫。<br/>为了寻找女友，你不得不深入夜晚校园的黑暗之中，探索埋藏在校园中的秘密，邂逅夜晚游荡的少女，遭遇不可名状的恐怖，探索……直到真相来临的那一刻',
      game_create_time: '2023-01-24 19:51:03',
    },
    {
      game_id: 2335,
      game_count: 130,
      game_label: '8,32',
      game_img: '/uploadzio/2023-01-22_2109221674394019393.jpg',
      game_lys: 1,
      game_name: 'CLANNAD 被光守望着的坡道',
      game_introduce:
        'Clannad外传(CLANNAD Side Stories)》是一款由VisualArts/Key制作，Sekai Project发行的视觉小说类游戏。<br/>《Clannad外传》于2021年5月20日登陆任天堂switch平台。<br/><br/>游戏讲述在某个小镇，主角冈崎朋也因为家庭的因素而丧失了生活在这个地方的希望;与春原阳平为朋友，在光坂高等学校过着潦倒的生活，在高三的一个早晨认识了一个名为“古河渚”的女孩后，他的生活开始有了重大的变化。',
      game_create_time: '2023-01-22 21:29:32',
    },
    {
      game_id: 2334,
      game_count: 102,
      game_label: '25,7',
      game_img: '/uploadzio/2023-01-21_2307381674319002863.jpg',
      game_lys: 1,
      game_name: '断章（Lost Chapter）',
      game_introduce:
        '无尽的冰冷与黑暗侵蚀着“你”的内心，就在要放弃之时出现了一束微弱的光芒并化作明<br/>灯。提起灯来，踏上寻找自我、脱离黑暗世界的道路。当然，也可在黑暗世界中继续彷徨，<br/>探寻人们背后的故事，以及这个世界本身的秘密。<br/>如前文所述，本作在世界观和叙事方式上都很有黑魂的风格，整体略黑暗、晦涩、沉重<br/>（好在不会像 black souls 那样搞些两难选择题）。主线（也就是一周目）可以认为和世界剧<br/>情背景完全没关系，什么也不管直接打 100 层都是没问题的。如果对这个世界产生了兴趣，<br/>则可以通过各个事件慢慢拼凑出真相，并在救赎之后打出真结局。当然，这就对运气有了更<br/>高的要求，遇到目标事件却缺少关键道具，或者有了道具却等不到事件都是有可能的。为了<br/>遇到目标事件，可能还要有意识地调节自身的德义心、信仰心两个数值，总之比起一周目通<br/>关又是难了许多吧（笑）。同时，除了伟大的救赎，也可以做一些缺德的选择，比如偷盗、<br/>欺骗、复仇、色诱，不一而足。',
      game_create_time: '2023-01-22 00:40:11',
    },
    {
      game_id: 2333,
      game_count: 111,
      game_label: '6,7',
      game_img: '/uploadzio/2023-01-21_2249031674313318138.jpg',
      game_lys: 1,
      game_name: '病房轶事～潜藏邪恶老鸟护士的住院生活',
      game_introduce:
        '超越最糟的邪恶老鸟护士们，即将把魔手伸向山田！<br/>■这些邪恶的老鸟们，据说连个性最糟的护士都要敬畏三分！<br/>厌恶感毫不保留的立花小姐。<br/>阴沉的黑川小姐，粗暴的山口小姐，懒惰的平松小姐。<br/>传闻说得没错，这间医院的护士，全都是「个性最糟」的护士。<br/><br/>可是，没想到还有比这更糟的！<br/>比起糟糕，那已经……是“邪恶”了……<br/><br/>山田口中抱怨的，就是这些老鸟护士。<br/>要么超级执着，要么超级黑心，要么超级反常。<br/>没在其他地方见过的异常角色，正是最大的魅力。<br/><br/>■开始加速的故事……！<br/>不不，我真的就只是因为骨折，才住院的。<br/>但大家却对我极度不友善……<br/>而且，最近我开始觉得可能不会只有这样。<br/>空气中似乎弥漫着险恶的气息……<br/><br/>本作以主角“山田”受到护士虐待为主轴推进。<br/>但光是这样的轮回，并不会迎来结束。背后还有一个故事，终于要从本作开始拉开序幕。',
      game_create_time: '2023-01-21 23:05:26',
    },
    {
      game_id: 2332,
      game_count: 144,
      game_label: '25',
      game_img: '/uploadzio/2023-01-18_2321301674056073112.jpg',
      game_lys: 1,
      game_name: '巨人的秘宝（GiantTreasure）',
      game_introduce:
        '你可以操作20名不同的魔法少女在“末世後”的日本城市間冒險<br/>初期可以操縱的角色較少,但隨著角色的成長,能到達的區域更多,就可以收集更多的同伴<br/>每個魔法少女都擁有獨一無二的戰鬥技能,總體技能分為“地、水、火、風、雷、光、暗”七種',
      game_create_time: '2023-01-18 23:37:48',
    },
    {
      game_id: 2331,
      game_count: 163,
      game_label: '16,8',
      game_img: '/uploadzio/2023-01-16_2348041673884279887.jpg',
      game_lys: 1,
      game_name: '雨后泥土的气息 -Petrichor',
      game_introduce:
        '「我喜欢的，雨的味道。潮土味——」<br/>那味道勾起了回忆。<br/>2年前的雨夜——<br/>「请和我H。……夺走我的初次」<br/>主人公「拓实」暗恋着青梅竹马绘里香。<br/>尽管如此，在偶然遇见的绘里香的朋友「灯里」恳求下，二人发生了关系。<br/>初尝禁果的二人此后每每越过雷池。<br/>然而这种日子随着灯里突然杳无音讯迎来了终结。<br/>仅有离别时的初吻残存。<br/>——2年后。<br/>升读大学的拓实，怀着沉重的负罪感与绘里香交往着。然而晚春初夏时分，在与绘里香约会的咖啡馆遇见了正在打<br/>工的灯里……<br/>「如何忘怀。那场雨……那罪恶的夜晚」',
      game_create_time: '2023-01-16 23:51:31',
    },
  ],
  wrap: 2247,
};

const GameLists = () => {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [gameList, setGameList] =
    useState<API.PageWrapper<API.GameListItem[]>>();

  // 初始请求数据
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      //let data = await getGameList(page);
      // logger.debug('get game data:', data);
      //setGameList(data);
      setLoading(false);
    }
    loadData();
  }, [page, setLoading, setGameList]);

  const updateSearch = (_search: string) => {
    setSearch(_search);
  };

  const onSubmitSearch = () => {
    // TODO: search
    logger.log(search);
  };
  return (
    <View>
      <SearchBar
        round
        placeholder="搜索"
        cancelButtonTitle="取消"
        showLoading={loading} // 晚点可以专门的searchLoading
        value={search}
        onChangeText={updateSearch}
        lightTheme
        searchIcon={<Icon name="search" />}
        onSubmitEditing={onSubmitSearch}
      />
      <GameListItem data={mockdata.obj} wrap={mockdata.wrap} />
    </View>
  );
};

export default GameLists;

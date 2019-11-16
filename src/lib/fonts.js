var yxmDetector = function(f) {
  if (typeof f != "string") {
    return false;
  }
  var h = "Arial";
  if (f.toLowerCase() == h.toLowerCase()) {
    return true;
  }
  var e = "a";
  var d = 100;
  var a = 100,
    i = 100;
  var c = document.createElement("canvas");
  var b = c.getContext("2d");
  c.width = a;
  c.height = i;
  b.textAlign = "center";
  b.fillStyle = "black";
  b.textBaseline = "middle";
  var g = function(j) {
    b.clearRect(0, 0, a, i);
    b.font = d + "px " + j + ", " + h;
    b.fillText(e, a / 2, i / 2);
    var k = b.getImageData(0, 0, a, i).data;
    return [].slice.call(k).filter(function(l) {
      return l != 0;
    });
  };
  return g(h).join("") !== g(f).join("");
};

var yxmDataFont = {
  windows: [
    {
      ch: "宋体",
      en: "SimSun"
    },
    {
      ch: "黑体",
      en: "SimHei"
    },
    {
      ch: "微软雅黑",
      en: "Microsoft Yahei"
    },
    {
      ch: "微软正黑体",
      en: "Microsoft JhengHei"
    },
    {
      ch: "楷体",
      en: "KaiTi"
    },
    {
      ch: "新宋体",
      en: "NSimSun"
    },
    {
      ch: "仿宋",
      en: "FangSong"
    }
  ],
  "OS X": [
    {
      ch: "苹方",
      en: "PingFang SC"
    },
    {
      ch: "华文黑体",
      en: "STHeiti"
    },
    {
      ch: "华文楷体",
      en: "STKaiti"
    },
    {
      ch: "华文宋体",
      en: "STSong"
    },
    {
      ch: "华文仿宋",
      en: "STFangsong"
    },
    {
      ch: "华文中宋",
      en: "STZhongsong"
    },
    {
      ch: "华文琥珀",
      en: "STHupo"
    },
    {
      ch: "华文新魏",
      en: "STXinwei"
    },
    {
      ch: "华文隶书",
      en: "STLiti"
    },
    {
      ch: "华文行楷",
      en: "STXingkai"
    },
    {
      ch: "冬青黑体简",
      en: "Hiragino Sans GB"
    },
    {
      ch: "兰亭黑-简",
      en: "Lantinghei SC"
    },
    {
      ch: "翩翩体-简",
      en: "Hanzipen SC"
    },
    {
      ch: "手札体-简",
      en: "Hannotate SC"
    },
    {
      ch: "宋体-简",
      en: "Songti SC"
    },
    {
      ch: "娃娃体-简",
      en: "Wawati SC"
    },
    {
      ch: "魏碑-简",
      en: "Weibei SC"
    },
    {
      ch: "行楷-简",
      en: "Xingkai SC"
    },
    {
      ch: "雅痞-简",
      en: "Yapi SC"
    },
    {
      ch: "圆体-简",
      en: "Yuanti SC"
    }
  ],
  office: [
    {
      ch: "幼圆",
      en: "YouYuan"
    },
    {
      ch: "隶书",
      en: "LiSu"
    },
    {
      ch: "华文细黑",
      en: "STXihei"
    },
    {
      ch: "华文楷体",
      en: "STKaiti"
    },
    {
      ch: "华文宋体",
      en: "STSong"
    },
    {
      ch: "华文仿宋",
      en: "STFangsong"
    },
    {
      ch: "华文中宋",
      en: "STZhongsong"
    },
    {
      ch: "华文彩云",
      en: "STCaiyun"
    },
    {
      ch: "华文琥珀",
      en: "STHupo"
    },
    {
      ch: "华文新魏",
      en: "STXinwei"
    },
    {
      ch: "华文隶书",
      en: "STLiti"
    },
    {
      ch: "华文行楷",
      en: "STXingkai"
    },
    {
      ch: "方正舒体",
      en: "FZShuTi"
    },
    {
      ch: "方正姚体",
      en: "FZYaoti"
    }
  ],
  open: [
    {
      ch: "思源黑体",
      en: "Source Han Sans CN"
    },
    {
      ch: "思源宋体",
      en: "Source Han Serif SC"
    },
    {
      ch: "文泉驿微米黑",
      en: "WenQuanYi Micro Hei"
    }
  ],
  hanyi: [
    {
      ch: "汉仪旗黑 40S",
      en: "HYQihei 40S"
    },
    {
      ch: "汉仪旗黑 50S",
      en: "HYQihei 50S"
    },
    {
      ch: "汉仪旗黑 60S",
      en: "HYQihei 60S"
    },
    {
      ch: "汉仪大宋简",
      en: "HYDaSongJ"
    },
    {
      ch: "汉仪楷体",
      en: "HYKaiti"
    },
    {
      ch: "汉仪家书简",
      en: "HYJiaShuJ"
    },
    {
      ch: "汉仪PP体简",
      en: "HYPPTiJ"
    },
    {
      ch: "汉仪乐喵体简",
      en: "HYLeMiaoTi"
    },
    {
      ch: "汉仪小麦体",
      en: "HYXiaoMaiTiJ"
    },
    {
      ch: "汉仪程行体",
      en: "HYChengXingJ"
    },
    {
      ch: "汉仪黑荔枝",
      en: "HYHeiLiZhiTiJ"
    },
    {
      ch: "汉仪雅酷黑W",
      en: "HYYaKuHeiW"
    },
    {
      ch: "汉仪大黑简",
      en: "HYDaHeiJ"
    },
    {
      ch: "汉仪尚魏手书W",
      en: "HYShangWeiShouShuW"
    }
  ],
  fangzheng: [
    {
      ch: "方正粗雅宋简体",
      en: "FZYaSongS-B-GB"
    },
    {
      ch: "方正报宋简体",
      en: "FZBaoSong-Z04S"
    },
    {
      ch: "方正粗圆简体",
      en: "FZCuYuan-M03S"
    },
    {
      ch: "方正大标宋简体",
      en: "FZDaBiaoSong-B06S"
    },
    {
      ch: "方正大黑简体",
      en: "FZDaHei-B02S"
    },
    {
      ch: "方正仿宋简体",
      en: "FZFangSong-Z02S"
    },
    {
      ch: "方正黑体简体",
      en: "FZHei-B01S"
    },
    {
      ch: "方正琥珀简体",
      en: "FZHuPo-M04S"
    },
    {
      ch: "方正楷体简体",
      en: "FZKai-Z03S"
    },
    {
      ch: "方正隶变简体",
      en: "FZLiBian-S02S"
    },
    {
      ch: "方正隶书简体",
      en: "FZLiShu-S01S"
    },
    {
      ch: "方正美黑简体",
      en: "FZMeiHei-M07S"
    },
    {
      ch: "方正书宋简体",
      en: "FZShuSong-Z01S"
    },
    {
      ch: "方正舒体简体",
      en: "FZShuTi-S05S"
    },
    {
      ch: "方正水柱简体",
      en: "FZShuiZhu-M08S"
    },
    {
      ch: "方正宋黑简体",
      en: "FZSongHei-B07S"
    },
    {
      ch: "方正宋三简体",
      en: "FZSong"
    },
    {
      ch: "方正魏碑简体",
      en: "FZWeiBei-S03S"
    },
    {
      ch: "方正细等线简体",
      en: "FZXiDengXian-Z06S"
    },
    {
      ch: "方正细黑一简体",
      en: "FZXiHei I-Z08S"
    },
    {
      ch: "方正细圆简体",
      en: "FZXiYuan-M01S"
    },
    {
      ch: "方正小标宋简体",
      en: "FZXiaoBiaoSong-B05S"
    },
    {
      ch: "方正行楷简体",
      en: "FZXingKai-S04S"
    },
    {
      ch: "方正姚体简体",
      en: "FZYaoTi-M06S"
    },
    {
      ch: "方正中等线简体",
      en: "FZZhongDengXian-Z07S"
    },
    {
      ch: "方正准圆简体",
      en: "FZZhunYuan-M02S"
    },
    {
      ch: "方正综艺简体",
      en: "FZZongYi-M05S"
    },
    {
      ch: "方正彩云简体",
      en: "FZCaiYun-M09S"
    },
    {
      ch: "方正隶二简体",
      en: "FZLiShu II-S06S"
    },
    {
      ch: "方正康体简体",
      en: "FZKangTi-S07S"
    },
    {
      ch: "方正超粗黑简体",
      en: "FZChaoCuHei-M10S"
    },
    {
      ch: "方正新报宋简体",
      en: "FZNew BaoSong-Z12S"
    },
    {
      ch: "方正新舒体简体",
      en: "FZNew ShuTi-S08S"
    },
    {
      ch: "方正黄草简体",
      en: "FZHuangCao-S09S"
    },
    {
      ch: "方正少儿简体",
      en: "FZShaoEr-M11S"
    },
    {
      ch: "方正稚艺简体",
      en: "FZZhiYi-M12S"
    },
    {
      ch: "方正细珊瑚简体",
      en: "FZXiShanHu-M13S"
    },
    {
      ch: "方正粗宋简体",
      en: "FZCuSong-B09S"
    },
    {
      ch: "方正平和简体",
      en: "FZPingHe-S11S"
    },
    {
      ch: "方正华隶简体",
      en: "FZHuaLi-M14S"
    },
    {
      ch: "方正瘦金书简体",
      en: "FZShouJinShu-S10S"
    },
    {
      ch: "方正细倩简体",
      en: "FZXiQian-M15S"
    },
    {
      ch: "方正中倩简体",
      en: "FZZhongQian-M16S"
    },
    {
      ch: "方正粗倩简体",
      en: "FZCuQian-M17S"
    },
    {
      ch: "方正胖娃简体",
      en: "FZPangWa-M18S"
    },
    {
      ch: "方正宋一简体",
      en: "FZSongYi-Z13S"
    },
    {
      ch: "方正剪纸简体",
      en: "FZJianZhi-M23S"
    },
    {
      ch: "方正流行体简体",
      en: "FZLiuXingTi-M26S"
    },
    {
      ch: "方正祥隶简体",
      en: "FZXiangLi-S17S"
    },
    {
      ch: "方正粗活意简体",
      en: "FZCuHuoYi-M25S"
    },
    {
      ch: "方正胖头鱼简体",
      en: "FZPangTouYu-M24S"
    },
    /*{"ch":"方正铁筋隶书简体","en":"FZTieJinLiShu-Z14S"},{"ch":"方正北魏楷书简体","en":"FZBeiWeiKaiShu-Z15S"},*/ {
      ch: "方正卡通简体",
      en: "FZKaTong-M19S"
    },
    {
      ch: "方正艺黑简体",
      en: "FZYiHei-M20S"
    },
    {
      ch: "方正水黑简体",
      en: "FZShuiHei-M21S"
    },
    {
      ch: "方正古隶简体",
      en: "FZGuLi-S12S"
    },
    {
      ch: "方正幼线简体",
      en: "FZYouXian-Z09S"
    },
    {
      ch: "方正启体简体",
      en: "FZQiTi-S14S"
    },
    {
      ch: "方正小篆体",
      en: "FZXiaoZhuanTi-S13T"
    },
    {
      ch: "方正硬笔楷书简体",
      en: "FZYingBiKaiShu-S15S"
    },
    {
      ch: "方正毡笔黑简体",
      en: "FZZhanBiHei-M22S"
    },
    {
      ch: "方正硬笔行书简体",
      en: "FZYingBiXingShu-S16S"
    }
  ]
};

//用法:
//1.因為js並不能獲取系統中所有字體,因為沒有權限.只有IE可以
//2.因此創建一個字體列表根據像素差逐一匹配也算是一個解決辦法了
let fontFamilyList = [];
for (var i in yxmDataFont) {
  yxmDataFont[i].forEach(data => {
    if (yxmDetector(data.en)) {
      fontFamilyList.push(data);
    }
  });
}

// 去重复
const enlist = fontFamilyList.map(item => item.en);
const fonts = fontFamilyList.filter(
  (item, index) => index === enlist.indexOf(item.en)
);

// 添加自定义的字体
const webfonts = [
  {
    ch: "阿里巴巴-普惠体-Heavy",
    en: "阿里巴巴-普惠体-Heavy"
  },
  {
    ch: "阿里巴巴-普惠体-Bold",
    en: "阿里巴巴-普惠体-Bold"
  },
  {
    ch: "杨任东竹石体-Bold",
    en: "杨任东竹石体-Bold"
  },
  {
    ch: "站酷小薇体",
    en: "站酷小薇体"
  },
  {
    ch: "阿里汉仪智能黑体",
    en: "阿里汉仪智能黑体"
  },
  {
    ch: "站酷高端黑",
    en: "站酷高端黑"
  },
  {
    ch: "庞门正道标题体2",
    en: "庞门正道标题体2"
  }
];

//此電腦字體列表
export default {
  all: fonts,
  en: webfonts
};

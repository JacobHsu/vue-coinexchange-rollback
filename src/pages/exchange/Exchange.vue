<template>
  <div class="container exchange" :class="skin">
    <div class="main">
      <div class="center">
        <div class="symbol">
          <div class="item">
            <!-- <Icon v-if="currentCoinIsFavor" type="ios-star" color="#f0a70a" size="24" />
            <Icon v-else type="ios-star-outline" color="#f0a70a" size="24" /> -->
          </div>
          <div class="item" style="margin-left: -40px;">
              <span class="coin">{{currentCoin.coin}}
                <small>/{{currentCoin.base}}</small>
              </span>
            <Poptip trigger="hover" :title="coinInfo.name" content="content"  placement="bottom-start" word-wrap width="300">
              <Icon type="md-information-circle" style="color:#546886;margin-left:5px;"/>
              <div class="api" slot="content">
                  <div class="coin-info">{{coinInfo.information}}</div>
                  <p style="text-align:right;margin-top: -10px;"><a :href="coinInfo.infolink" target="_blank">{{$t("exchange.moredetail")}}</a></p>
              </div>
            </Poptip>
          </div>
          <div class="item">
            <span class="text">{{$t('service.NewPrice')}}</span>
            <span class="num" :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}">{{currentCoin.close | toFixed(baseCoinScale)}}</span>
            <span class="price-cny">≈ ￥{{currentCoin.usdRate*CNYRate | toFixed(2)}}</span>
          </div>
          <div class="item">
            <span class="text">{{$t('service.Change')}}</span>
            <span class="num" :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}">{{currentCoin.rose}}</span>
          </div>
          <div class="item">
            <span class="text">{{$t('service.high')}}</span>
            <span class="num ">{{currentCoin.high | toFixed(baseCoinScale)}}</span>
          </div>
          <div class="item">
            <span class="text">{{$t('service.low')}}</span>
            <span class="num ">{{currentCoin.low | toFixed(baseCoinScale)}}</span>
          </div>
          <div class="item">
            <span class="text">{{$t('service.ExchangeNum')}}</span>
            <span class="num ">{{currentCoin.volume}} {{currentCoin.coin}}</span>
          </div>
          <div class="item">
          </div>
        </div>
        <div class="imgtable">
          <div class="handler">
            <span @click="changeImgTable('k')" :class="{active:currentImgTable==='k'}">{{$t("exchange.kline")}}</span>
            <span @click="changeImgTable('s')" :class="{active:currentImgTable==='s'}">{{$t("exchange.depth")}}</span>
          </div>
          <div id="kline_container" :class="{hidden:currentImgTable==='s'}">
          </div>
          <DepthGraph :class="{hidden:currentImgTable==='k'}" ref="depthGraph"></DepthGraph>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url(../../assets/css/exchange.css);
$night-bg: #0b1520;
$night-headerbg: #27313e;
$night-contentbg: #192330;
$night-color: #fff;

.exchange {
  color: #fff;
  background-color: #0b1520;
  .main {
    width:99%;
    margin-left: 0.5%;
    display: flex;
    margin-top: 5px;
    .left {
      flex: 0 0 20%;
      border-radius: 0px;
      margin-right: 10px;
      .handlers {
        font-size: 0;
        padding: 10px 20px;
        background-color: #192330;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        .handler {
          display: inline-block;
          margin-right: 10px;
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          cursor: pointer;
          &.handler-all {
            background-image: url("../../assets/images/exchange/plate_all.png");
            &.active {
              background-image: url("../../assets/images/exchange/plate_all_active.png");
            }
          }
          &.handler-green {
            background-image: url("../../assets/images/exchange/plate_green.png");
            &.active {
              background-image: url("../../assets/images/exchange/plate_green_active.png");
            }
          }
          &.handler-red {
            background-image: url("../../assets/images/exchange/plate_red.png");
            &.active {
              background-image: url("../../assets/images/exchange/plate_red_active.png");
            }
          }
        }
      }
      .plate-nowprice {
        text-align: center;
        background-color: #27313e;
        line-height: 1;
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        .price {
          font-size: 18px;
          margin-right: 10px;
        }
        .price-cny {
          font-size: 12px;
          margin-left: 10px;
          font-weight: 400;
          color: rgba(219, 222, 246, 0.3);
        }
      }
    }
    .center {
      flex: 0 0 60%;
      margin-right: 5px;
      .imgtable {
        height: 350px;
        position: relative;
        overflow: hidden;
        margin-bottom: 5px;
        .handler {
          position: absolute;
          top: 10px;
          right: 40px;
          z-index: 1000;
          > span {
            background-color: #2c3b59;
            color: #c7cce6;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 13px;
            opacity: 0.5;
            &.active {
              opacity: 1;
            }
          }
        }
      }
      .trade_wrap {
        .trade_menu {
          position: relative;
          background-color: #192330;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          border-bottom: 1px solid #27313e;
          font-size: 0;
          height: 40px;
          line-height: 40px;
          > span {
            font-size: 16px;
            padding: 11px 20px;
            cursor: pointer;
            &.active {
              color: #FFF;
              border-bottom: 2px solid #f0a70a;
            }
            &:first-child {
              border-top-left-radius: 0px;
            }
          }
          .fee-wrap {
            position: absolute;
            top: 0;
            right: 20px;
            font-size: 12px;
            > span {
              margin-right: 10px;
              color: #7c7f82;
            }
            > a {
              vertical-align: middle;
            }
          }
        }
        .trade_panel {
          position: relative;
          .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            background-color: rgba(0, 52, 77, 0.8);
            justify-content: center;
            align-items: center;
            z-index: 100;
            font-size: 24px;
            border-radius: 0px;
            // color: #bcd7e6;
          }
          .publish-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 37, 64, 0.93);
            justify-content: center;
            align-items: center;
            z-index: 101;
            font-size: 24px;
            border-radius: 0px;
            // color: #bcd7e6;
          }
        }
        .trade_panel .panel .hd {
          border-bottom: none;
          b {
            color: #fff;
          }
          a {
            color: #f0a70a;
          }
        }
      }
    }
    .right {
      flex: 0 0 19%;
      margin-right: 5px;
      .coin-menu {
        height: 785px;
        background-color: #192330;
        margin-bottom: 10px;
        border-radius: 0px;
      }
    }
  }
  .symbol {
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;
    margin-bottom: 5px;
    align-items: center;
    background-color: #192330;
    line-height: 1;
    border-radius: 0px;
    .item {
      .price-cny {
        font-size: 12px;
        color: #546886;
      }
      .coin {
        font-size: 20px;
      }
      .text {
        width: 100%;
        display: block;
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
      }
      .num {
        font-size: 12px;
        color: #fff;
      }
      > img {
        display: block;
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
  }
  .order {
    width: 98.6%;
    margin-left: 0.5%;
    min-height: 227px;
    margin-bottom: 10px;
    .order-handler {
      // background-color: #192330;
      background-color: #192330;
      font-size: 0;
      border-radius: 6px;
      // line-height: 38px;
      > span {
        padding: 0 20px;
        font-size: 14px;
        display: inline-block;
        color: #fff;
        cursor: pointer;
        line-height: 40px;
        background-color: #192330;
        &.active {
          color: #f0a70a;
          background-color: #27313e;
        }
        &:first-child {
          border-top-left-radius: 0px;
        }
        &:last-child {
          border-top-right-radius: 0px;
        }
      }
    }
  }
}

#kline_container{
    background: #192330;
}

.coin-info{
  color: #8f9ca5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  padding-top: 15px;
}
</style>
<script>

import Datafeeds from "@js/charting_library/datafeed/bitrade.js";
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var moment = require("moment");
import DepthGraph from "@components/exchange/DepthGraph.vue";
import $ from "@js/jquery.min.js";


export default {
  components: { DepthGraph},
  data() {
    let self = this;
    return {
      collecRequesting: false,
      currentCoinIsFavor: false,
      isUseBHB: false,
      skin: "night", //皮肤样式day&night
      currentImgTable: "k",
      selectedOrder: "current", //当前显示的委托记录
      selectedPlate: "all", //当前显示的买卖盘
      CNYRate: null,
      datafeed: null,
      defaultPath: "btc_usdt",
      basecion: "usdt",
      coinScale: 6,
      baseCoinScale: 6,
      symbolFee: 0.001,
      dataIndex: [],
      dataIndex2: [],
      searchKey: "",
      coinInfo:{

      },
      currentCoin: {
        base: "",
        coin: "",
        symbol: ""
      },
      publishType: "NONE",
      currentTime: 0,
      publishAmount: 0,
      publishPrice: 0,
      startTime: "2000-01-01 00:00:00",
      endTime: "2000-01-01 00:00:00",
      clearTime: "2000-01-01 00:00:00",
      showPublish: false,
      showCountDown: false,
      countDownBgColor: "#003478",
      publishState: 0,
      //当前市场上的交易币种，按交易对分
      coins: {
        _map: [],
        USDT: [],
      },
      form: {
        buy: {
          limitPrice: 0.0,
          limitAmount: 0.0,
          marketAmount: 0.0,
          limitTurnover: 0.0
        },
        sell: {
          limitPrice: 0.0,
          limitAmount: 0.0,
          marketAmount: 0.0,
          limitTurnover: 0.0
        }
      }
    };
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    lang: function() {
      return this.$store.state.lang;
    }
  },
  watch: {
    lang: function() {
      this.updateLangData();
    },
    $route(to, from) {
      this.init();
    }
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      var params = this.$route.params.pair;
      if (params == undefined) {
        this.$router.push("/exchange/" + this.defaultPath);
        params = this.defaultPath;
      }
      const basecion = params.split("_")[1];
      if (basecion) {
        this.basecion = basecion;
      }
      var coin = params.toUpperCase().split("_")[0];
      var base = params.toUpperCase().split("_")[1];
      this.currentCoin.symbol = coin + "/" + base;

      this.getSymbol(); //包含 K线图、getFavor、startWebsock等

    },
    changeImgTable(str) {
      this.currentImgTable = str;
    },
    updateLangData() {
      this.favorColumns[0].title = this.$t("exchange.coin");
      this.favorColumns[1].title = this.$t("exchange.lastprice");
      this.favorColumns[2].title = this.$t("exchange.daychange");

      this.coins.columns[0].title = this.$t("exchange.coin");
      this.coins.columns[1].title = this.$t("exchange.lastprice");
      this.coins.columns[2].title = this.$t("exchange.daychange");
     // this.coins.columns[3].title = this.$t("exchange.favorite");

      this.trade.columns[0].title = this.$t("exchange.num");
      this.trade.columns[1].title = this.$t("exchange.price");
      this.trade.columns[2].title = this.$t("exchange.time");

      this.plate.columns[0].title = this.$t("exchange.stall");
      this.plate.columns[1].title = this.$t("exchange.price");
      this.plate.columns[2].title = this.$t("exchange.num");
      this.plate.columns[3].title = this.$t("exchange.total");

      this.currentOrder.columns[1].title = this.$t("exchange.time");
      this.currentOrder.columns[2].title = this.$t("exchange.symbol");
      this.currentOrder.columns[3].title = this.$t("exchange.type");
      this.currentOrder.columns[4].title = this.$t("exchange.direction");
      this.currentOrder.columns[5].title = this.$t("exchange.price");
      this.currentOrder.columns[6].title = this.$t("exchange.num");
      this.currentOrder.columns[7].title = this.$t("exchange.traded");
      this.currentOrder.columns[8].title = this.$t("exchange.dealamount");
      this.currentOrder.columns[9].title = this.$t("exchange.action");

      this.historyOrder.columns[1].title = this.$t("exchange.time");
      this.historyOrder.columns[2].title = this.$t("exchange.symbol");
      this.historyOrder.columns[3].title = this.$t("exchange.type");
      this.historyOrder.columns[4].title = this.$t("exchange.direction");
      this.historyOrder.columns[5].title = this.$t("exchange.price");
      this.historyOrder.columns[6].title = this.$t("exchange.num");
      this.historyOrder.columns[7].title = this.$t("exchange.done");
      this.historyOrder.columns[8].title = this.$t("exchange.dealamount");
      this.historyOrder.columns[9].title = this.$t("exchange.status");

      // window.tvWidget.options.time_frames[0].title = this.$t("exchange.realtime");
    },
    getCoin(symbol) {
      return this.coins._map[symbol];
    },
    getKline() {
      var that = this;
      let config = {
        autosize: true,
        height: 320,
        fullscreen: true,
        symbol: that.symbol,
        interval: "60", // 默认K线周期
        timezone: "Asia/Shanghai",
        toolbar_bg: "#18202a",
        container_id: "kline_container",
        datafeed: that.datafeed,
        library_path:
          process.env.NODE_ENV === "production"
            ? "/assets/charting_library/"
            : "/src/assets/js/charting_library/",
        locale: "zh",
        debug: false,
        drawings_access: {
          type: "black",
          tools: [{ name: "Regression Trend" }]
        },
        disabled_features: [
          "header_resolutions",
          "timeframes_toolbar",
          "header_symbol_search",
          "header_chart_type",
          "header_compare",
          "header_undo_redo",
          "header_screenshot",
          "header_saveload",
          "use_localstorage_for_settings",
          "left_toolbar",
          "volume_force_overlay"
        ],
        enabled_features: [
          "hide_last_na_study_output",
          "move_logo_to_main_pane"
        ],
        custom_css_url: "bundles/common.css",
        supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
        charts_storage_url: "http://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        overrides: {
          "paneProperties.background": "#1B1E2E",
          "paneProperties.vertGridProperties.color": "rgba(0,0,0,.1)",
          "paneProperties.horzGridProperties.color": "rgba(0,0,0,.1)",
          //"scalesProperties.textColor" : "#AAA",
          "scalesProperties.textColor": "#61688A",
          "mainSeriesProperties.candleStyle.upColor": "#00b275",
          "mainSeriesProperties.candleStyle.downColor": "#f15057",
          "mainSeriesProperties.candleStyle.drawBorder": false,
          "mainSeriesProperties.candleStyle.wickUpColor": "#589065",
          "mainSeriesProperties.candleStyle.wickDownColor": "#AE4E54",
          "paneProperties.legendProperties.showLegend": false,

          "mainSeriesProperties.areaStyle.color1": "rgba(71, 78, 112, 0.5)",
          "mainSeriesProperties.areaStyle.color2": "rgba(71, 78, 112, 0.5)",
          "mainSeriesProperties.areaStyle.linecolor": "#9194a4",
          "volumePaneSize": "small"
        },
        time_frames: [
          {
            text: "1min",
            resolution: "1",
            description: "realtime",
            title: that.$t("exchange.realtime")
          },
          { text: "1min", resolution: "1", description: "1min" },
          { text: "5min", resolution: "5", description: "5min" },
          { text: "15min", resolution: "15", description: "15min" },
          { text: "30min", resolution: "30", description: "30min" },
          {
            text: "1hour",
            resolution: "60",
            description: "1hour",
            title: "1hour"
          },
          /*{ text: "4hour", resolution: "240", description: "4hour",title: "4hour" },*/
          {
            text: "1day",
            resolution: "1D",
            description: "1day",
            title: "1day"
          },
          {
            text: "1week",
            resolution: "1W",
            description: "1week",
            title: "1week"
          },
          { text: "1mon", resolution: "1M", description: "1mon" }
        ]
      };
      if (that.skin === "day") {
        config.toolbar_bg = "#fff";
        config.custom_css_url = "bundles/common_day.css";
        config.overrides["paneProperties.background"] = "#fff";
        config.overrides["mainSeriesProperties.candleStyle.upColor"] =
          "#a6d3a5";
        config.overrides["mainSeriesProperties.candleStyle.downColor"] =
          "#ffa5a6";
      }
      require(["@js/charting_library/charting_library.min.js"], function(tv) {
        var widget = (window.tvWidget = new TradingView.widget(config));
        widget.onChartReady(function() {
          widget.chart().executeActionById("drawingToolbarAction");
          widget
            .chart()
            .createStudy("Moving Average", false, false, [5], null, {
              "plot.color": "#EDEDED"
            });
          widget
            .chart()
            .createStudy("Moving Average", false, false, [10], null, {
              "plot.color": "#ffe000"
            });
          widget
            .chart()
            .createStudy("Moving Average", false, false, [30], null, {
              "plot.color": "#ce00ff"
            });
          widget
            .chart()
            .createStudy("Moving Average", false, false, [60], null, {
              "plot.color": "#00adff"
            });
          widget
            .createButton()
            .attr("title", "realtime")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(3);
              widget.setSymbol("", "1");
            })
            .append("<span>分时</span>");

          widget
            .createButton()
            .attr("title", "M1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1");
            })
            .append("<span>M1</span>");

          widget
            .createButton()
            .attr("title", "M5")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "5");
            })
            .append("<span>M5</span>");

          widget
            .createButton()
            .attr("title", "M15")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "15");
            })
            .append("<span>M15</span>");

          widget
            .createButton()
            .attr("title", "M30")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "30");
            })
            .append("<span>M30</span>");

          widget
            .createButton()
            .attr("title", "H1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "60");
            })
            .append("<span>H1</span>")
            .addClass("selected");

          widget
            .createButton()
            .attr("title", "D1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1D");
            })
            .append("<span>D1</span>");

          widget
            .createButton()
            .attr("title", "W1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1W");
            })
            .append("<span>W1</span>");

          widget
            .createButton()
            .attr("title", "M1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1M");
            })
            .append("<span>M1</span>");
        });
      });
    },
    getSymbol() {
      this.$http.post(this.host + this.api.market.thumb, {}).then(response => {
        var resp = response.body;
        //先清空已有数据
        for (var i = 0; i < resp.length; i++) {
          var coin = resp[i];
          coin.base = resp[i].symbol.split("/")[1];
          this.coins[coin.base] = [];
          this.coins[coin.base + "2"] = [];
          this.coins._map = [];
          this.coins.favor = [];
        }
        for (var i = 0; i < resp.length; i++) {
          var coin = resp[i];
          coin.price = resp[i].close = resp[i].close.toFixed(
            this.baseCoinScale
          );
          coin.rose =
            resp[i].chg > 0
              ? "+" + (resp[i].chg * 100).toFixed(2) + "%"
              : (resp[i].chg * 100).toFixed(2) + "%";
          coin.coin = resp[i].symbol.split("/")[0];
          coin.base = resp[i].symbol.split("/")[1];
          coin.href = (coin.coin + "_" + coin.base).toLowerCase();
          coin.isFavor = false;
          this.coins._map[coin.symbol] = coin;
          if(coin.zone == 0){
            this.coins[coin.base].push(coin);
          }else{
            this.coins[coin.base + "2"].push(coin);
          }
          if (coin.symbol == this.currentCoin.symbol) {
            this.currentCoin = coin;
            this.form.buy.limitPrice = this.form.sell.limitPrice = coin.price;
          }
        }

        require(["../../assets/js/exchange.js"], function(e) {
          e.clickScTab();
        });
        this.startWebsock();
        // this.changeBaseCion(this.basecion);
      });
    },
    startWebsock() {
      if (this.stompClient) {
        this.stompClient.ws.close();
      }
      var stompClient = null;
      var that = this;
      var socket = new SockJS(that.host + that.api.market.ws);
      stompClient = Stomp.over(socket);
      this.stompClient = stompClient;
      stompClient.debug = false;
      // this.datafeed = new Datafeeds.WebsockFeed(that.host+'/market',this.currentCoin,stompClient);
      // this.getKline();
      stompClient.connect({}, function(frame) {
        that.datafeed = new Datafeeds.WebsockFeed(
          that.host + "/market",
          that.currentCoin,
          stompClient,
          that.baseCoinScale
        );
        that.getKline();
        //订阅价格变化消息
        stompClient.subscribe("/topic/market/thumb", function(msg) {
          var resp = JSON.parse(msg.body);
          var coin = that.getCoin(resp.symbol);
          if (coin != null) {
            // coin.price = resp.close.toFixed(2);
            coin.price = resp.close;
            coin.rose =
              resp.chg > 0
                ? "+" + (resp.chg * 100).toFixed(2) + "%"
                : (resp.chg * 100).toFixed(2) + "%";
            // coin.close = resp.close.toFixed(2);
            // coin.high = resp.high.toFixed(2);
            // coin.low = resp.low.toFixed(2);
            coin.close = resp.close;
            coin.high = resp.high;
            coin.low = resp.low;
            coin.turnover = parseInt(resp.volume);
            coin.volume = resp.volume;
            coin.usdRate = resp.usdRate;
          }
        });
        
      });
    },
    /**
     * 
     */
  }
};
</script>


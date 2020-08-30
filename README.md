# vue-coinexchange-rollback

[CoinExchange](https://gitee.com/cexchange/CoinExchange) Web_Front

## charting_library

pages\exchange\Exchange.vue

```js
getKline() {
      ...
        library_path:
          process.env.NODE_ENV === "production"
            ? "/assets/charting_library/"
            : "/src/assets/js/charting_library/",
```

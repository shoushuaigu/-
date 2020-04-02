/**
 * 工具类
 */
/**
 * 格式化时间
 * @param date 日期
 * @param format 需要转出的格式
 * @returns {*}
 */
export function dateTimeFormatter (date, format) {
    // 时间格式化辅助函数 date:日期 format:'yyyy-MM-dd hh:mm:ss'
      if (!date || date === '') {
        return ''
      }
    
      if (typeof date === 'string') {
        let mts = date.match(/(\/Date\((\d+)\)\/)/)
        if (mts && mts.length >= 3) {
          date = parseInt(mts[2])
        }
      }
      if (!new Date(date) || new Date(date).toUTCString() === 'Invalid Date') {
        if (date.indexOf('-') === -1) {
          return ''
        }
        date = date.replace(/-/g, '/')
      }
      date = new Date(date)
    
      let map = {
        'M': date.getMonth() + 1, // 月份
        'd': date.getDate(), // 日
        'h': date.getHours(), // 小时
        'm': date.getMinutes(), // 分
        's': date.getSeconds(), // 秒
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
    
      format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        let v = map[t]
        if (v !== undefined) {
          if (all.length > 1) {
            v = '0' + v
            v = v.substr(v.length - 2)
          }
          return v
        } else if (t === 'y') {
          return (date.getFullYear() + '').substr(4 - all.length)
        }
        return all
      })
      return format
    }
    /*
    * 选中的日期和数据中的比较
    *
    * */
    export function isEqualDateStr (dateStr1, dateStr2) {
      let dateArr1 = dateStr1.split('/')
      let dateArr2 = dateStr2.split('/')
      if (parseInt(dateArr1[0], 10) !== parseInt(dateArr2[0], 10)) {
        return false
      }
      if (parseInt(dateArr1[1], 10) !== parseInt(dateArr2[1], 10)) {
        return false
      }
      if (parseInt(dateArr1[2], 10) !== parseInt(dateArr2[2], 10)) {
        return false
      }
      return true
    }
    
    /**
    
     * 判断是否是今天之前的日期
    
     * @method isBeforeDateStr
    
     * @param {String} dateStr1  今天的日期字符串 格式为'2018/04/10'
     *
     * @param {String} dateStr2   要比较的日期字符串 格式为'2017/04/11'
    
     * @return {Boolean}
    
     */
    
    export function isBeforeDateStr (dateStr1, dateStr2) {
      let dateArr1 = dateStr1.split('/')
      let dateArr2 = dateStr2.split('/')
      if (parseInt(dateArr1[0], 10) > parseInt(dateArr2[0], 10)) {
        return true
      } else if (parseInt(dateArr1[1], 10) > parseInt(dateArr2[1], 10)) {
        return true
      } else if (parseInt(dateArr1[2], 10) > parseInt(dateArr2[2], 10)) {
        return true
      }
      return false
    }
    
    /**
     * 获取当前是星期几
     * @param date
     * @returns {string}
     */
    export function dayFormat (date) {
      switch (new Date(date).getDay()) {
        case 0:
          return '星期日'
        case 1:
          return '星期一'
        case 2:
          return '星期二'
        case 3:
          return '星期三'
        case 4:
          return '星期四'
        case 5:
          return '星期五'
        case 6:
          return '星期六'
      }
    }
    
    export function getDateInBetween (beginTime, endTime) {
      let begin = new Date(beginTime).getTime()
      let end = new Date(endTime).getTime()
      let resultArr = []
      const dayMilliSeconds = 1000 * 60 * 60 * 24
      if (begin === end) {
        return [dateTimeFormatter(Date.parse(new Date(begin)), 'yyyy/MM/dd')]
      }
      for (begin; begin <= end; begin += dayMilliSeconds) {
        let day = dateTimeFormatter(Date.parse(new Date(begin)), 'yyyy/MM/dd')
        resultArr.push(day)
      }
      return resultArr
    }
    
    /**
     * 计算两个日期相差几天(用/连接，否则不支持ios)
     * @param sDate1
     * @param sDate2
     * @returns {number | *}
     * @constructor
     */
    export function DateDiff (sDate1, sDate2) { // sDate1和sDate2是2017-9-25格式
      var aDate, oDate1, oDate2, iDays
      aDate = sDate1.split('-')
      oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]) // 转换为9-25-2017格式
      aDate = sDate2.split('-')
      oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) // 把相差的毫秒数转换为天数
      return iDays
    }
    
    export function minStartDate (today, day) {
      let dayDiff = day * 24 * 60 * 60 * 1000
      // let today = new Date().getTime()
      let minStartTime = today - dayDiff
      return dateTimeFormatter(minStartTime, 'yyyy-MM-dd')
    }
    /**
     * 计算近几天,近几年,近几月的开始时间
     * @param num
     * @param {type: 'd'|'m'|'y'}
     * @param baseDate [String | '2019-11-11']
     * @returns '2019/11/11'
     * @constructor
     */
    export function latelyDate (num, type, baseDate) {
      const now = (baseDate ? new Date(baseDate) : new Date())
      let lateyDate = ''
      switch (type) {
        case 'd':
          let date = now.getDate()
          let perDate = now.setDate(date - num)
          lateyDate = perDate
          break
        case 'm':
          let mth = now.getMonth()
          let perMth = now.setMonth(mth - num)
          lateyDate = perMth
          break
        case 'y':
          let year = now.getFullYear()
          let perYear = now.setFullYear(year - num)
          lateyDate = perYear
          break
        default:
          let dateDef = now.getDate()
          let perDateDef = now.setDate(dateDef - num)
          lateyDate = perDateDef
          break
      }
      return lateyDate
    }
    
    // 深拷贝
    export function deepCopy (target, obj) {
      if (!obj) {
        return target
      }
      for (let item in target) {
        if (obj[item] !== undefined) {
          if (Object.prototype.toString.call(target[item]) === '[object Object]') {
            if (JSON.stringify(target[item]) === '{}' || !target[item]) {
              target[item] = obj[item]
            } else {
              deepCopy(target[item], obj[item])
            }
          } else {
            target[item] = obj[item]
          }
        }
      }
      return target
    }
    
    /**
     * 指定数组某一项移除到数组顶部
     * @param arr 操作数组
     * @param index 数组索引
     * @returns {*}
     */
    export function itemToArrayTop (arr, index) {
      let temp = arr[index]
      if (index === 0) {
        return arr
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[index]) {
          // 从第i个元素开始移除，1是长度，只移除一个元素。
          arr.splice(i, 1)
          break
        }
      }
      // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
      arr.unshift(temp)
      return arr
    }
    /**
     * @description 格式化金额
     * @param number：要格式化的数字
     * @param decimals：保留几位小数 默认0位
     * @param decPoint：小数点符号 默认.
     * @param thousandsSep：千分位符号 默认为,
     */
    export const formatMoney = (number, decimals = 0, decPoint = '.', thousandsSep = ',') => {
      number = (number + '').replace(/[^0-9+-Ee.]/g, '')
      let n = !isFinite(+number) ? 0 : +number
      let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
      let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
      let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
      let s = ''
      let toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
      }
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
      let re = /(-?\d+)(\d{3})/
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
      }
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
      }
      return s.join(dec)
    }
    
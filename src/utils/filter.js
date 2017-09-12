import Vue from 'vue'

Vue.filter('s_toStr',function(val){
    if(!val){return '暂无';}
    return String(val);
});

Vue.filter('s_isFun',function(val){
    if(!val){
      var isFun = function(){
        console.log('这个方法没定义!');
      }
      return isFun;
    }
    return val;
});

Vue.filter('s_toNum',function(val){
    if(typeof(val) == 'number'){
      return val;
    }else{
      return Number(val);
    }
});

Vue.filter('s_toQty',function(val){
    if(!val){return '';}
    return val.toFixed(2);
});

Vue.filter('s_arrLength',function(val){
    if(!val){return 0;}
    if(JSON.stringify(val)=='[]'){return 0;}
    if(JSON.stringify(val)=='{}'){return 0;}
    return val.length;
});

Vue.filter('s_dateStr', function (val) {

    if (!val) { return '暂无'; }
    var vals = val;
    val = val.split('T').join(' ')
    val = val.split('-').join('/')

    if (Date.parse(vals) <= Date.parse("2001/1/1")) {
        return "";
    }

    return val;

});

Vue.filter('s_toDate', function (val) {

    if (!val) { return '暂无'; }
    var vals = val;
    val = val.split('T').join(' ')
    val = val.split('-').join('/')

    if (Date.parse(val) <= Date.parse("2001/1/1")) {
        return "";
    }

    return val.split('/').join('-');

});



Vue.component('no-data',{
    template:'<div v-if="item.length==0||JSON.stringify(item)==\'{}\'||JSON.stringify(item)==\'[]\'" :style="style" @click="say"><div @click="loadFun" :style="refresh"><img :src="imgSrc" :style="imgStyle"/>刷新</div></div>',
    props:['item','load'],
    data: function(){
        return {
            sayIn:function(){
              console.log('come in!');
            },
            style:{
                background: 'url("http://wx-cityrisk.subei88.com/Upload/no-data.png") 50% 28% no-repeat',
                backgroundSize: '35%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
                fontFamily: "Microsoft YaHei",
                lineHeight: '45px',
                width:'100%',
                height:screen.availHeight * 0.65 + 'px',
            },
            imgSrc:'http://wx-cityrisk.subei88.com/Upload/refresh-icon.png',
            imgStyle:{width:'28px',height:'28px'},
            refresh:{
              width:'100%',
              color:'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '0',
              boxSizing: 'border-box',
              color:'#33CC99'
            }
        }
    },
    created:function(){
    //   console.log(typeof(this.load));
    },
    methods:{
        say:function(){
            // console.log(typeof(this.load));
            // this.load();
        },
        loadFun:function(){
          if(typeof(this.load) == 'function'){
            this.load();
          }
        }
    }
});

/**
 * svg 图标
 */
Vue.component('Icon',{
//   template: `<object :width='widths' :height='heights' :data="name" type="image/svg+xml"></object>`,
  template: `<svg :width='widths' :height='heights' ><use v-bind:xlink:href="'#'+name" /></svg>`,
  props:['name','width','height'],
  data(){
    return {
      names:'',
      widths:'',
      heights:'',
    }
  },
  created(){
    this.widths = (this.width?this.width:'24');
    this.heights = (this.height?this.height:'24');
  }
})
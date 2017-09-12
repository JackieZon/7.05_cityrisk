<template>
    <div class="knowList">
        <div class="knowListItem">
            <div class="knowImgs">
                <img :src="getImgs(item.KnowLedgeIntro)" alt="暂无图片">
            </div>
            <div class="knowInfo">
                <div class="knowTitle">
                    <div class="title-up">
                        {{item.KnowLedgeName | s_toStr}}
                    </div>
                    <div class="title-down">
                        知识库类型：{{item.KnowLedgeTypeName | s_toStr}}
                    </div>
                </div>
                <div class="knowDesc" v-html="item.KnowLedgeIntro"></div>
                <div class="knowDate">
                    {{item.KnowLedgeAddDate | s_toDate}}
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import { param_baseUrls } from './../../utils/subei_config.js'
    export default{
        components:{
        },
        props:['item'],
        watch:{
            item(val){
                console.log(val);
            },
        },
        methods:{
            getImgs(content){

                console.log(`是否有图片${content.indexOf('<img')}`);

                if(content.indexOf('<img')){
                    var url = [];
                    content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
                        capture = (capture.indexOf('http://')==-1?`${param_baseUrls}${capture}`:capture);
                        url.push(capture);
                    });
                }
                return (JSON.stringify(url)=="[]"?'http://wx-cityrisk.subei88.com/Upload/no-data.png':url[0])
            }
        }
    }
</script>
<style lang="less">
    .knowList{
        color: #333;
        .knowListItem{
            display: flex;
            flex-direction: inherit;
            box-sizing: border-box;
            padding: 10px;
            background: #fff;
            .knowImgs{
                width: 6rem;
                height: 6rem;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                text-align: center;
                img{
                    width: 100%;
                }
            }
        }
        
        .knowInfo{
            box-sizing: border-box;
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex-grow:1;
            flex-shrink:1;
            flex-basis:0;
            .knowTitle{
                font-size: 14px;
            }
            .knowDesc{
                color: #999999;
                font-size: 13px;
                line-height: 1.2;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                img{
                    display: none;
                }
            }
            .knowDate{
                text-align: right;
                font-size: 14px;
            }
        }
    }
</style>
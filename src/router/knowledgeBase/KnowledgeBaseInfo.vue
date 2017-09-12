<template>
    <div id="knowledgeInfo">
        <Heads :title="'知识详情'"></Heads>
        <div class="info">
            <h3>{{ knowledgeInfo.KnowLedgeName }}</h3>
            <h5>{{ knowledgeInfo.KnowLedgeTypeName }}</h5>
            <div v-html="knowledgeInfo.KnowLedgeIntro"></div>
            <div class="author_date">
                <p>发布人:{{ knowledgeInfo.KnowLedgeAddManName }}</p>
                <p>{{ knowledgeInfo.KnowLedgeAddDate | s_toDate }}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { mapState, mapActions, mapMutations } from 'vuex'
    export default {
        components: {
            Heads
        },
        mounted() {
            this.creanKnowledgeInfo();

            console.log(this.$route.params);

            this.getKnowledgeInfo(this.$route.params.knowId);

            setTimeout(() => {
                this.getImgUrl()
            }, 350)
        },
        computed: {
            ...mapState({
                knowledgeInfo: (state) => {
                    return state.knowledgeBase.knowledgeInfo
                }
            })
        },
        methods: {
            ...mapActions([
                'getKnowledgeInfo'
            ]),
            ...mapMutations([
                'saveInfoId',
                'creanKnowledgeInfo'
            ]),
            getImgUrl() {
                let baseUrl = 'http://wx-cityrisk.subei88.com';
                let imgs = document.getElementsByTagName('img');
                // imgs[0].src = 'http://wx-cityrisk.subei88.com/Uploads/KnowLedgeIntro/201708121045343814.jpg';

                for (let i = 0; i < imgs.length; i++) {

                    if (imgs[i].src.indexOf('/Uploads') == 21) {

                        imgs[i].src = baseUrl + imgs[i].src.slice(21)

                    }

                    if (imgs[i].src.indexOf('/Uploads') == 0) {

                        imgs[i].src = baseUrl + imgs[i].src

                    }

                }

            }
        }
    }

</script>
<style lang="less">
    #knowledgeInfo {
        .info {
            padding: 10px 15px;
            text-align: center; 
            h3,
            h5 {
                box-sizing: border-box;
                padding: 6px;
            }
            img {
                width: 100%;
            }

            p {
                line-height: 35px;
            }
        }

        .author_date {
            padding:20px 0; 
            display: flex;
            justify-content:space-between;
        }
    }
</style>
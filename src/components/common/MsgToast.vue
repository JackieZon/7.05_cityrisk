<template>
    <span class="msgInfo" @click.native="goPage">
        <Icon class="icon" :name="'msg-icon'" :width="25" :height="25" :style="{'color':color[this.notice?this.notice.RiskWarnStatus:0]}"/>
        <marquee direction="left">
            <div class="content"><p v-for="(item,index) in notice">{{ index+1+'、' }}{{ item.RiskWarnContent }}</p></div>
        </marquee>
    </span>
</template>
<script>
    import { Marquee, MarqueeItem } from 'vux'
    export default {
        props: ['notice'],
        components: {
        },
        data() {
            return {
                riskWarnContent: '',
                color: ['#FF0000', '#FF8C00', '#1E90FF', '#33CC99'],
            }
        },
        created() {
        },
        methods: {
            goPage() {
                this.$router.push({ name: 'warningList' });
            },
            changeWarning() {
                console.log(1);
            }
        },
        watch: {

        }
    }
</script>
<style lang="less" scoped>
    .msgInfo {
        width: 75%;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .msgs {
            padding:0px 50px;
        }

        .icon {
            max-width: 80px;
            min-width: 25px;
        }

        .marquee {
            // display: flex;
            // justify-content: center;
            // align-items: center;
            // flex-direction: column-reverse
        }

        .content {
            float: left;
            width: 1500%;
            p{
                display: inline-block;
                white-space: nowrap;
                margin-right:200px;
            }
        }
        
    }
</style>
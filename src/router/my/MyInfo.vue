<template>
    <div class="myInfo">

        <div class="opper">
            <Heads :title="'我的资料'" :isRightTitle="true"></Heads>
            <HeadImg :item="memberInfo"></HeadImg>
            <div class="info">
                <group>
                    <x-input title="手机(登录账号)" :disabled="true" :value="memberInfo.UserPhone" placeholder="暂无账号"></x-input>
                    <x-input title="所属机构" :disabled="true" :value="memberInfo.detail_Agency.AgencyName" placeholder="暂无所属机构" v-if="memberInfo.detail_Agency"></x-input>
                    <x-input title="姓名" :value="memberInfo.UserNickName" v-model="userNickName" placeholder="暂无姓名"></x-input>
                </group>
            </div>
        </div>
        
        <div class="lower">
            <div class="next">
                <x-button @click.native="postMemberInfo" >保存</x-button>
                <x-button @click.native="esc" type="warn">退出登录</x-button>
            </div>
        </div>

    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import HeadImg from './../../components/common/HeadImg.vue'
    import {XInput,Group,XButton} from 'vux'
    import {mapState, mapMutations, mapActions, } from 'vuex'
    import {delCookie, setCookie} from './../../utils/weixin.js'
    export default {
        components:{
            Heads,
            HeadImg,
            XInput,
            Group,
            XButton
        },
        data(){
            return{
                userNickName:'',
            }
        },
        watch:{
        },
        computed:{
            ...mapState({
                memberInfo: (state)=>{
                    this.userNickName = state.memberInfo.UserNickName
                    return state.memberInfo;
                },
            })
        },
        mounted(){
            this.userNickName = this.memberInfo.UserNickName;
            console.log(this.memberInfo.UserNickName);
        },
        methods:{
            ...mapMutations([
                'changeMemberInfo',
                'openConfirm',
            ]),
            ...mapActions([
                'showToast',
                'editMemberInfo',
                'postMemberAccountOff',
            ]),

            esc(){
                this.openConfirm({state:true,msg:'确定要退出吗？',control: ()=>{
                    
                    let t_data = this;

                    this.$vux.toast.show({
                        text: '退出成功',
                        type: 'success',
                        onHide(){

                            setCookie('.ASPXAUTH','',-1);
                            window.localStorage.setItem('userName','');
                            window.localStorage.setItem('userPwd','');
                            t_data.postMemberAccountOff({router: t_data.$router});

                        }
                    });
                    
                }});

            },

            postMemberInfo(){
                if(!this.userNickName){
                    this.showToast({toastState:true,toastValue:'请填写姓名！'});
                    return;
                }

                this.openConfirm({state:true,msg:'确定要保存吗？',control: ()=>{
                    this.changeMemberInfo({UserNickName: this.userNickName});
                    
                    this.editMemberInfo().then((res)=>{

                        console.log(JSON.stringify(res));
                        let t_data = this;
                        this.$vux.toast.show({
                            text: '保存成功',
                            type: 'success',
                            onHide(){
                                t_data.$router.back();
                            }
                        });

                    });
                }});

            },
        },
    }
</script>
<style lang="less">
    .myInfo{

        height: 100%;
        background: #fbf9fe;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .weui-label{
            width: 7em!important;
        }
        .next{
            box-sizing: border-box;
            padding: 2rem 15px;
        }
    }
</style>
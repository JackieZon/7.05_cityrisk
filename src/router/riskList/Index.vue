<template>
	<div id="riskListPage">
		<Heads :back="false" :title="'风险列表'" :isMap="true"></Heads>
		<div class="search-box">
			<search :autoFixed="false"></search>
			<div class="msg">
				<MsgToast @click.native="goPage('warningList')"></MsgToast>
				<div class="riskBtn" @click="goRiskAdd">
					<x-button mini plain>新增风险源</x-button>
				</div>
			</div>
		</div>
		<RiskList v-for="(item,index) in riskList" :key="index" class="riskList" @click.native="goPage('riskInfo')"></RiskList>
		
		<scroller 
			lock-x 
			scrollbar-y 
			use-pullup 
			use-pulldown 
			height="200px" 
			@on-pullup-loading="loadMore" 
			@on-pulldown-loading="refresh" 
			v-model="status" 
			ref="scroller"
		>
			
			<div class="box2">
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
				<p>我只有一条</p>
			</div>

			<!--pulldown slot-->

			<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
				<div class="loadingBox">
					<spinner style="display:flex;justify-content: center;align-items: center;margin-right:10px;" v-show="status.pulldownStatus === 'loading'" type="crescent"></spinner>
					<span class="pulldown-arrow" style="margin-right:10px;" v-show="status.pulldownStatus === 'down' || status.pulldownStatus === 'up'" :class="{'rotate': status.pulldownStatus === 'up'}">↓</span>
					<span>{{status.pulldownStatus=='up'?'释放刷新':(status.pulldownStatus=='loading'?'正在刷新':(status.pulldownStatus=='down'?'下拉刷新':'刷新成功'))}}</span>
				</div>
			</div>

			<!--pullup slot
			<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
				<span v-show="status.pullupStatus === 'default'"> 我是default</span>
				<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
				<span v-show="status.pullupStatus === 'loading'">我是loading<spinner type="ios-small"></spinner></span>
			</div>-->

		</scroller>


	</div>
</template>
<script>
	import {Search, Group, Cell, XButton,Scroller, Divider, XSwitch, Spinner} from 'vux'
	import {mapMutations, mapState, mapActions} from 'vuex'
	
	import Heads from './../../components/Heads.vue'
	import RiskList from './../../components/common/RiskList.vue'
    import MsgToast from './../../components/common/MsgToast.vue'


	export default {
		components:{
			RiskList,
			Heads,
			Search,
			Group,
			Cell,
			XButton,
			MsgToast,
			Scroller,
			Divider,
			XSwitch,
			Spinner,
		},
		data(){
			return {
				riskList:[{name:'jack'}],
				status: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				}
			}
		},
		mounted(){
			this.getRisk();
		},
		computed: {
            ...mapState({

			})
		},
		watch:{
			status(){
				console.log(`${this.status.pullupStatus}||${this.status.pulldownStatus}`);
			}
		},
		methods:{
			...mapMutations([
            ]),
			...mapActions([
				'getRisk'
            ]),
			goRiskAdd(){
                this.$router.push({name:'riskAdd'});
            },
			goPage(name){
				this.$router.push({name:name,params:{id:123}})
			},
			loadMore () {

				setTimeout(() => {
					setTimeout(() => {
					this.$refs.scroller.donePullup()
					}, 10)
				}, 2000)

			},
			refresh() {
				setTimeout(() => {
					this.$refs.scroller.donePulldown()
				}, 2000)
			},
			load3 () {
			}
		}
	}
</script>
<style lang="less" scoped>
	.rotate {
		transform: rotate(-180deg);
	}
	#riskListPage{
		// margin-bottom:20px;
		background: #fbf9fe;
		.weui-cells{margin-top:0px!important;}
		.loadingBox{display:flex;justify-content: center;align-items: center;}
	}
	.riskList{
		margin-top:10px;
	}
	.msg{
		border-bottom: 1px solid #eee;
		background:#fff;
		display: flex;
		align-items: center;
		
		justify-content: space-between;
		padding: 8px;
		.msgInfo{
			width: 70%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.msgs{
				overflow:hidden;
				word-break:keep-all;
				white-space:nowrap;
				text-overflow:ellipsis;
				font-size: 16px;
				line-height: 100%;
				box-sizing: border-box;
				padding-left:5px;
			}
		}
		.riskBtn{
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.map-heads{
		height: 132px;
	}
	.search-box{width: 100%;}
</style>
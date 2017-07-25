<template>
	<div id="riskListPage">
		<div class="search-box">
			<Heads :back="false" :title="'风险列表'" :isMap="true"></Heads>
			<search :autoFixed="false"></search>
			<div class="msg">
				<MsgToast @click.native="goPage('warningList')"></MsgToast>
				<div class="riskBtn" @click="goRiskAdd">
					<x-button mini plain>新增风险源</x-button>
				</div>
			</div>
		</div>
		<scroller
			lock-x
			scrollbar-y
			use-pullup
			use-pulldown
			height="100%"
			@on-pullup-loading="loadMore"
			@on-pulldown-loading="refresh"
			v-model="statusDown" 
			ref="scrollerRef"
		>
			<div class="listItem" style="height:100%;">
				<div>
					<RiskList v-for="(item,index) in riskList" :key="index" class="riskList" @click.native="goPage('riskInfo')"></RiskList>
				</div>
			</div>

			<!--pulldown slot-->

			<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
				<div class="loadingBox">
					<spinner style="display:flex;justify-content: center;align-items: center;margin-right:10px;" v-show="statusDown.pulldownStatus === 'loading'" type="crescent"></spinner>
					<span class="pulldown-arrow" style="margin-right:10px;" v-show="statusDown.pulldownStatus === 'down' || statusDown.pulldownStatus === 'up'" :class="{'rotate': statusDown.pulldownStatus === 'up'}">↓</span>
					<span>{{statusDown.pulldownStatus=='up'?'释放刷新':(statusDown.pulldownStatus=='loading'?'正在刷新':(statusDown.pulldownStatus=='down'?'下拉刷新':'刷新成功'))}}</span>
				</div>
			</div>

			<div slot="pullup" v-show="statusDown.pullupStatus == 'down' || statusDown.pullupStatus == 'loading'" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
				<div class="loadingBox">
					<span class="pullup-arrow" style="margin-right:10px;" v-show="statusDown.pullupStatus === 'down'" :class="{'rotate': statusDown.pullupStatus === 'down'}">↑</span>
					<spinner style="display:flex;justify-content: center;align-items: center;margin-right:10px;" v-show="statusDown.pullupStatus === 'loading'" type="crescent"></spinner>
					<span>{{statusDown.pullupStatus=='down'?'加载更多':(statusDown.pullupStatus=='loading'?'加载中':'成功')}}</span>
				</div>		
			</div>
		

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
				riskList:[{name:'jack'},{name:'jack'},{name:'jack'},{name:'jack'}],
				statusDown: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
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
			statusDown(){
				console.log(`1+${this.statusDown.pullupStatus}||${this.statusDown.pulldownStatus}`);
			},
			statusUp(){
				console.log(`2+${this.statusUp.pullupStatus}||${this.statusUp.pulldownStatus}`);
			},
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

				console.log('我是pull up');

				setTimeout(() => {
					this.$refs.scrollerRef.donePullup()
					setTimeout(()=>{
						this.riskList.push({name:'小燕'},{name:'小燕'});
					},1000)
				}, 2000);

			},
			refresh() {
				// console.log('我是pull down');
				setTimeout(() => {
					this.$refs.scrollerRef.donePulldown()
				}, 2000)
			},
		}
	}
</script>
<style lang="less">
	.rotate {
		transform: rotate(-180deg);
	}
	#riskListPage{
		height:100%;
		background: #fbf9fe;
		display: flex;
    	flex-direction: column;
		.main{
			flex:1;
			.listItem{
				height:100%;
			}
		}
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
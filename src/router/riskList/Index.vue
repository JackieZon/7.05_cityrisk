<template>
	<div id="riskListPage">
		<div class="search-box">
			<Heads :back="true" :noBack="true" :goBack="'homeMap'" :title="'风险列表'" :isMap="true"></Heads>
			<search :autoFixed="false" v-model="searchValue" @on-change="search"></search>
			<div class="msg">
				<MsgToast :notice="shufflingRiskWarn"></MsgToast>
				<div class="riskBtn" @click="goRiskAdd">
					<x-button mini plain>新增风险源</x-button>
				</div>
			</div>
		</div>

		<PullUpRefresh
            :pullDown="pullDown"
            :pullUp="pullUp"
            :item="riskList"
            :default="defaultData"
        >
		<!-- <scroller lock-x scrollbar-y use-pulldown height="100%" @on-pulldown-loading="refresh" @on-scroll-bottom="onScrollBottom"
		 v-model="statusDown" ref="scrollerRef"> -->
			<div class="listItem" style="height:100%;">
				<RiskList v-for="(item,index) in riskList" :key="item.ID" :dataId="item.ID" class="riskList" :item="item" @click.native="goPage('riskInfo',item,1)"></RiskList>
				<div v-show="false" style="display:flex;justify-content: center;align-items: center;margin:10px 0;">
					<spinner type="crescent" style="margin-right:10px;"></spinner>加载中...</div>
			</div>
			<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
				<div class="loadingBox">
					<spinner style="display:flex;justify-content: center;align-items: center;margin-right:10px;" v-show="statusDown.pulldownStatus === 'loading'"
					 type="crescent"></spinner>
					<span class="pulldown-arrow" style="margin-right:10px;" v-show="statusDown.pulldownStatus === 'down' || statusDown.pulldownStatus === 'up'"
					 :class="{'rotate': statusDown.pulldownStatus === 'up'}">↓</span>
					<span>{{statusDown.pulldownStatus=='up'?'释放刷新':(statusDown.pulldownStatus=='loading'?'正在刷新':(statusDown.pulldownStatus=='down'?'下拉刷新':'刷新成功'))}}</span>
				</div>
			</div>
		<!-- </scroller> -->
		</PullUpRefresh>
	</div>
</template>
<script>
	import { Search, Group, Cell, XButton, Scroller, Divider, XSwitch, Spinner, LoadMore } from 'vux'
	import { mapMutations, mapState, mapActions } from 'vuex'

	import Heads from './../../components/Heads.vue'
	import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
	import RiskList from './../../components/common/RiskList.vue'
	import MsgToast from './../../components/common/MsgToast.vue'


	export default {
		components: {
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
			LoadMore,
			PullUpRefresh
		},
		data() {
			return {
				onFetching: false,
				searchValue: '',
				statusDown: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
			}
		},
		mounted() {
			this.deleteRiskList();

			this.saveDefaultData({ pageIndex: 1, pageSize: 1000, RiskStatus: 3 });
			
            this.getRisk();
			
			// this.getRiskWarn();
            this.getShufflingRiskWarn();
		},
		computed: {
			...mapState({
				defaultData(state){
                    return state.riskList.defaultData
                },
				riskList(state) {
					return state.riskList.riskList
				},
				warnList(state) {
					return state.warnAndAccident.warnList;
				},                
				shufflingRiskWarn(state) {
                    return state.warnAndAccident.shufflingRiskWarn;
                },
			})
		},
		watch: {
			// riskList() {
			// 	setTimeout(() => {
			// 		this.$refs.scrollerRef.reset();
			// 	}, 600)
			// }
		},
		methods: {
			...mapMutations([
				'saveDefaultData',
				'deleteRiskList'
			]),
			...mapActions([
				'getRisk',
				'getRiskWarn',
                'getShufflingRiskWarn',
			]),
			onScrollBottom() {

				if (this.onFetching) {
					// do nothing
				} else {
					this.onFetching = true
					setTimeout(() => {
						this.$nextTick(() => { this.$refs.scrollerRef.reset() })
						this.onFetching = false
					}, 2000)
				}

			},
			pullDown(){
                this.deleteRiskList();
                this.saveDefaultData({pageIndex:1,pageSize:10,RiskStatus:3});
                this.getRisk();
            },
            pullUp(){
                this.saveDefaultData({pageIndex:this.defaultData.pageIndex+=1,pageSize:10});
                this.getRisk();
            },
			goRiskAdd() {
				this.$router.push({ name: 'riskAdd' });
			},
			openWaning(name) {
                this.$router.push({ name: name, params: { id: 0 } })
            },
			goPage(name, item, addOperation) {
				console.log(`进入**${name}**${item.ID}`);
				this.$router.push({ name: name, params: { riskId: item.ID, add: addOperation, editStatus: 0 } });
			},
			refresh() {
				console.log('我是往下拉');
				setTimeout(() => {
					this.$refs.scrollerRef.donePulldown()
				}, 2000)
			},
			search(value) {
				// console.log(value)
				this.deleteRiskList();

				this.saveDefaultData({ 
					RiskName: value,
					// userID: this.$route.params.userId,
					pageIndex: 1, 
					pageSize: 10, 
					RiskStatus: 3 
				});

            	this.getRisk();
			}
		}
	}

</script>
<style lang="less" scoped>
	.rotate {
		transform: rotate(-180deg);
	}

	#riskListPage {
		height: 100%;
		background: #fbf9fe;
		display: flex;
		flex-direction: column;
		.main {
			flex: 1;
			.listItem {
				height: 100%;
				box-sizing: border-box;
			}
		}
		.weui-cells {
			margin-top: 0px!important;
		}
		.loadingBox {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.riskList {
			margin-bottom: 10px;
		}
		.msg {
			border-bottom: 1px solid #eee;
			background: #fff;
			display: flex;
			align-items: center;

			justify-content: space-between;
			padding: 8px;
			.msgInfo {
				width: 70%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				.msgs {
                    overflow: hidden;
                    word-break: keep-all;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 16px;
                    line-height: 100%;
                    box-sizing: border-box;
                    padding-left: 5px;
				}
			}
			.riskBtn {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.weui-btn_mini {
        line-height: 1.8!important;
        padding: 0 0.5em!important;
    }
</style>
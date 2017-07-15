<template>
	<div class="riskListPage">
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
	</div>
</template>
<script>
	import { Search, Group, Cell, XButton } from 'vux'
	
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
			MsgToast
		},
		data(){
			return {
				riskList:[{name:'jack'},{name:'小燕'},{name:'小燕'},{name:'小燕'},{name:'小燕'},{name:'小燕'}]
			}
		},
		methods:{
			goRiskAdd(){
                this.$router.push({name:'riskAdd'});
            },
			goPage(name){
				this.$router.push({name:name,params:{id:123}})
			},
            goPage(name){
                this.$router.push({name:name})
            }
		}
	}
</script>
<style lang="less">
	.riskListPage{
		// margin-bottom:20px;
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
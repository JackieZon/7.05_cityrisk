<template>
    <div id="PullUpRefresh">
		<scroller
			lock-x
			scrollbar-y
			use-pulldown
			height="100%"
			@on-pulldown-loading="refresh"
			@on-scroll-bottom="onScrollBottom"
			v-model="statusDown"
			ref="scrollerRef"
		>
			<div class="listItem" style="height:100%;">
                <slot>
					<no-data :item='item' :load="pullDown"></no-data>
                </slot>
				<!--<RiskList v-for="(item,index) in riskList" :key="index" class="riskList" :item="item" @click.native="goPage('riskInfo',item)"></RiskList>-->
				<div v-show="false" style="display:flex;justify-content: center;align-items: center;margin:10px 0;"><spinner type="crescent" style="margin-right:10px;"></spinner>加载中...</div>
			</div>
			<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
				<div class="loadingBox">
					<spinner style="display:flex;justify-content: center;align-items: center;margin-right:10px;" v-show="statusDown.pulldownStatus === 'loading'" type="crescent"></spinner>
					<span class="pulldown-arrow" style="margin-right:10px;" v-show="statusDown.pulldownStatus === 'down' || statusDown.pulldownStatus === 'up'" :class="{'rotate': statusDown.pulldownStatus === 'up'}">↓</span>
					<span>{{statusDown.pulldownStatus=='up'?'释放刷新':(statusDown.pulldownStatus=='loading'?'正在刷新':(statusDown.pulldownStatus=='down'?'下拉刷新':'刷新成功'))}}</span>
				</div>
			</div>
		</scroller>

    </div>
</template>
<script>
	import {Search, Group, Cell, XButton,Scroller, Divider, XSwitch, Spinner,LoadMore} from 'vux'
    export default {
        components:{
            Search,
            Group,
            Cell,
            XButton,
            Scroller,
            Divider,
            XSwitch,
            Spinner,
            LoadMore,
        },
		props:['pullDown','pullUp','item'],
        data(){
            return {
                count:10,
				onFetching:false,
                statusDown: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
            }
        },
		watch:{
			statusDown(){
				// console.log(`${this.statusDown.pullupStatus}||${this.statusDown.pulldownStatus}`);
			},
			item(){
				this.$nextTick(() => {this.$refs.scrollerRef.reset()})
			}
		},
        methods:{
            refresh() {
				console.log('重新刷新');
				setTimeout(() => {
					if( typeof(this.pullDown) == 'function'){
						this.pullDown();
					}
					this.$refs.scrollerRef.donePulldown()
				}, 1500)
			},
            onScrollBottom () {
				if (this.onFetching) {
					// do nothing
				} else {
					// console.log('下一页');
					this.onFetching = true
					setTimeout(() => {
						if(typeof(this.pullUp) == 'function'){
							this.pullUp();
						}
						this.$nextTick(() => {this.$refs.scrollerRef.reset()})
						this.onFetching = false
					}, 800)
				}

			},
        }
    }

</script>
<style lang="less" scoped>
    #PullUpRefresh{
		display: flex;
    	flex-direction: column;
        background:#fbf9fe;
        height:100%;
        .listItem{
            height:100%;
            box-sizing: border-box;
        }
        .riskList{
			margin-bottom:10px;
		}
		.loadingBox{display:flex;justify-content: center;align-items: center;}
    }
</style>
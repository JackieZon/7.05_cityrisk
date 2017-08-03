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
                </slot>
				<no-data :item='item' :load="isPullDown"></no-data>
				<div v-if="defaults.total!==item.length&&defaults.total>item.length&&item.length!==0" style="display:flex;justify-content: center;align-items: center;margin:10px 0;"><spinner type="crescent" style="margin-right:10px;"></spinner>加载中...</div>
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
	import {mapMutations, mapState, mapActions} from 'vuex'

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
		props:['pullDown','pullUp','item','default'],
        data(){
            return {
                count:10,
				onFetching:false,
				defaults:{},
                statusDown: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
            }
        },
		mounted(){
			this.defaults = (this.default?this.default:{total:0})
		},
		watch:{
			statusDown(){
				if(this.statusDown.pulldownStatus=='loading'){
					this.updateLoadingStatus({isLoading:true});
				}else{
					this.updateLoadingStatus({isLoading:false});
				}
			},
			item(val,vals){
				console.log(val.length);
				
				if(val.length<vals.length){
					this.$nextTick(() => {
						this.$refs.scrollerRef.reset({
							top: 0
						})
					})
				}else{
					this.$nextTick(() => {this.$refs.scrollerRef.reset()});
				}
				
			},
			default(){
				// console.log(`我是默认数据${JSON.stringify(this.default)}`);
				this.defaults = (this.default?this.default:{total:0})
				this.$nextTick(() => {this.$refs.scrollerRef.reset()});
			}
		},
        methods:{
			...mapMutations([
				'updateLoadingStatus'
			]),
			...mapActions([
				'showToast'
			]),
            refresh() {
				setTimeout(() => {
					if( typeof(this.pullDown) == 'function'){
						this.pullDown();
					}
					this.$refs.scrollerRef.donePulldown()
				}, 1500);
			},
            onScrollBottom () {
				if (this.onFetching) {
					// do nothing
				} else {
					console.log(`下一页${this.default.total}***${this.item.length}`);
					if(this.default.total>this.item.length){
						this.updateLoadingStatus({isLoading:true});
					}
					this.onFetching = true
					setTimeout(() => {
						
						if(this.default.total==this.item.length){
							this.showToast({toastState:true,toastValue:`亲，已经到底了`});
						}
						if(typeof(this.pullUp) == 'function'){
							this.pullUp();
						}
						this.updateLoadingStatus({isLoading:false});
						this.$nextTick(() => {this.$refs.scrollerRef.reset()})
						this.onFetching = false
					}, 800)
				}

			},
			isPullDown(){
				this.updateLoadingStatus({isLoading:true});
				if(typeof(this.pullDown)=='function'){
					this.pullDown();
				}
				setTimeout(()=>{
					this.updateLoadingStatus({isLoading:false});
				},1000)
			}
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
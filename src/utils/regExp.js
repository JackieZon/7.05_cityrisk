export default
{
    typePhone:(val) => {
        return {
            valid: (!/^0{0,1}(13|15|18|14|17)[0-9]{9}$/.test(val)?false:true),
            msg: '请输入正确的手机号'
        }
    }
}

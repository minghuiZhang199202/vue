var vm = new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAll:false
    },
    filters:{
        formatMoney:function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })

    }
    ,
    methods:{
        cartView:function () {
            var _this = this;
            this.$http.get("static/data/cartData.json",{"id":123}).then(function (res) {
                _this.totalMoney = res.body.result.totalMoney;
                _this.productList = res.body.result.list;

            });
        },
        changeMoney:function (product,type) {
            if (type > 0 ){
                product.productQuantity ++;
            }else{
                product.productQuantity == 1 ? product.productQuantity:product.productQuantity --;
            }
        },
        selectedProduct:function (product) {
            if (typeof product.checked === "undefined"){
                Vue.set(product,"checked",true);
                /*this.$set(product,"checked",true) 局部注册*/
            }else{
                product.checked = !product.checked;
            }
        },
        selectedAll:function(){
            this.checkAll = ! this.checkAll;
            if (this.checkAll){
                this.productList.forEach(function (value,index) {
                    this.selectedProduct(value);
                    value.checked = true;
                })
            }
        }
    }
});
Vue.filter("money",function (value,type) {
    return "￥" + value.toFixed(2) + type;
})


/*
*
*
* */


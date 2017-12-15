var vm = new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAll:false,
        totalPrice:0,
        delFlag:false,
        currentProduct:{}
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
            this.calulateTotalMoneys();
        },
        selectedProduct:function (product) {
            if (typeof product.checked === "undefined"){
                Vue.set(product,"checked",true);
                /*this.$set(product,"checked",true) 局部注册*/
            }else{
                product.checked = !product.checked;
            }
            this.calulateTotalMoneys();
        },
        selectedAll:function(flag){
            this.checkAll = flag;
            var _this = this;
            this.productList.forEach(function (product,index) {
                if (typeof product.checked === "undefined"){
                    Vue.set(product,"checked",_this.checkAll);
                }else{
                    product.checked = _this.checkAll;
                }
            })
            this.calulateTotalMoneys();
        },
        calulateTotalMoneys:function () {
            this.totalPrice = 0;
            var _this = this;
            this.productList.forEach(function (product,index) {
                if (product.checked)
                _this.totalPrice += product.productPrice * product.productQuantity;
            })
        },
        delProduct:function(product){
            this.delFlag = true;
            this.currentProduct = product;
        },
        delConfirm:function () {
           var index = this.productList.indexOf(this.currentProduct);
           this.productList.splice(index,1);
            this.delFlag = false;
        }


    }

});
Vue.filter("money",function (value,type) {
    return "￥" + value.toFixed(2) + type;
})



new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNumber:3,
        currentIndex:0,
        shippingMethod:1,
        delFlag:false,
        addFlag:false,
        currentAddress:{}
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    computed:{
        filterAddress:function () {
          return this.addressList.slice(0,this.limitNumber);
      }
    },
    methods:{
        getAddressList:function () {
            this.$http('static/data/address.json').then(function (address) {
                var result = address.data;
                if (result.status == '0'){
                    this.addressList =  result.result;
                }
            })
        },
        showAll:function () {
          this.limitNumber = this.addressList.length;
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if (address.addressId == addressId){
                    address.isDefault = true
                }else{
                    address.isDefault = false;
                }
            })
        },
        delAddress:function(address){
            this.delFlag = true;
            this.currentAddress = address;
        },
        delConfirm:function () {
            var index = this.addressList.indexOf(this.currentAddress);
            this.addressList.splice(index,1);
            this.delFlag = false;
        },
        addAddress:function(address){
            this.addFlag = true;
        },
        addConfirm:function () {

            this.addFlag = false;
        }
    }
})
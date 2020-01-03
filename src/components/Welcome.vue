<template>
    
</template>

<script>
    export default {
        name: "Welcome",
      created(){

      },
      mounted(){
        if(this.is_PC()){
          this.$router.replace("/pIndex");
        }else{
          this.$router.replace("/mIndex");
        }
      },
      methods:{
        is_PC :function () {
          if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return false;
          } else {
            return true;
          }
        }
      }

    }
</script>

<style scoped>

</style>

<style scoped lang="stylus">
header{
    height :50px;
    line-height :50px;
    background-color :#eee;
        ul{
            display :flex;
            li{
                text-align :center;
                flex:1;
            }
            .cur{
                background-color: #90939999;
                color: #3b5f2f;
                font-weight:bold;
            }
        }
}
</style>
<template>

  <div id="app">
    <header>
        <ul class="ovh">
            <li>菜单1</li>
            <li class="fl" v-for="item in tabNav" :class="[item.addClass,{cur:$route.name==item.title}]" @click="routeName(item.url)">
                {{item.title}}
            </li>
            <li>我的</li>
        </ul>
      </header>
      <div class="content">
            <router-view></router-view>
        </div>
    
  </div>

</template>
<script>
    export default{
        data(){
            return {
                tabNav:[{
                    addClass:"",
                    url:"/indexmusic",
                    title:"Calendar"
                },
                {
                    addClass:"",
                    url:"/mymusic",
                    title:"我的音乐"
                },{
                    addClass:"",
                    url:"/radiomusic",
                    title:"我的电台"
                }]
            }
        },
        methods:{
            routeName(url){
                return this.$router.push({path:url})
            }
        }
    }
</script>


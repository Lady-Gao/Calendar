<style scoped lang="stylus">
.calendar{
    position :relative;
    width:100%;
    padding:30px 150px 0 150px;
    text-align:center;
    background-color: #fdf6ec;
    color:#383636;
    table,td,th{
        border:1px solid  #f796038a;
       border-collapse: collapse;
    }
    table{
                position:relative;
                left:0;
                margin-left:-80px;
                width:1200px;
    }
    th{
        height:26px;
        line-height :26px;
        text-align:center;
        
    }
    
    td{
        font-size:12px;
        height:80px;
        vertical-align :top;
        text-align:right;
        padding:5px 5px 0 0 ;
    }
    .cur{
        color:#b3b5aa;
    }
    .header{
       margin-bottom :30px;
        .el-button {
            width:20%;
        }
        div{
            width:60%;
           text-align:center;
        }
    }
    .schedule{
        position: absolute;
        top:150px;
        left:150px;
        .box{
            margin-bottom:26px;
            table{
                        border:0px;
                tr{
                    td{
                        border:0px;
                        height:18px;
                        padding:0 3px;
                        margin:3px;
                        text-align:left;
                        }
                    }
            }
        }
       
    }
    .life{
        background-color:yellow;
    }
    .work{
        background-color:yellowgreen;
    }
    .fixedBox{
        position:absolute;
        top:20px;
        left:0px;
        width:30px;
        .el-button--warning{
            margin: 20px 0;
        }
    }
  
}
</style>
<template>
<div class="calendar" v-height="50">
    <div class="fixedBox">
        <el-button type="warning" plain  size="mini" @click="show('ADD')">添加</el-button>
        <el-button type="warning" plain  size="mini" @click="show('ADD')">生活{{this.$store.getters.life}}</el-button>
        <el-button type="warning" plain  size="mini" @click="show('ADD')">工作{{this.$store.getters.work}}</el-button>

    </div>
    <div class="header ovh">
        <el-button type="success" plain class="fl" @click="goprev">上一頁</el-button>
        <div class="fl"><b>{{this.year}}</b>年<b>{{this.month}}</b>月</div>
        <el-button type="success" plain class="fr" @click="gonext">下一頁</el-button>
    </div>
    <table>
        <thead>
            <tr>
                <th>周日</th>
                <th>周一</th>
                <th>周二</th>
                <th>周三</th>
                <th>周四</th>
                <th>周五</th>
                <th>周六</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in calendar.length/7">
                <td v-for="child in 7" :class="{cur:calendar[7*index+(child-1)].cur}" >
                    {{calendar[7*index+(child-1)].fullday}}
                </td>
            </tr>
        </tbody>
    </table>
     <div class="schedule">
         <div class="box" v-for="item in schedule">
        		<table>
        			<tr v-for="tr in item" >
                    <td v-for="td in tr" :class="[td.type]"  :colspan="td.colspan" :style="{width:1200 / 7 + 'px'}" @click="show('ADD',td)" >{{td.title}}</td>
        			</tr>
        		</table>
        	</div>
           
     </div>
     <vui-fixed  v-if="this.$store.state.showType!=null" ></vui-fixed>
</div>
</template>
<script>
import VuiFixed from '../../components/fixedBox.vue'
    export default{
        data(){
            return {
                month:new Date().getMonth()+1,
                year:new Date().getFullYear(),
                //持久化数据
                morenshuju:this.$store.state.morenshuju
            }
        },
        computed:{
            calendar(){
                console.log(this.month)
                // 3个必备条件 本月一共多少天 上个月一共多少天 本月第一天星期几
                var benyueAllday=new Date(this.year,this.month,0).getDate()
                var prevLastday=new Date(this.year,this.month-1,0).getDate()
                var benyueFirstweek=new Date(this.year,this.month-1,0).getDay()

                var prevYear= this.month == 1 ? this.year -1: this.year;
                var nextYear=this.month == 12 ? this.year +1 : this.year;
                var prevMonth=this.month == 1 ? 12 : this.month-1;
                var nexMonth=this.month == 12 ? 1 : this.month+1;
                //补零
                function buling(n){
                   return n.toString().length<2?'0'+n.toString():n.toString()
                }
                var arr=[]; var a=1;
                //本月进数组
                while(benyueAllday--){
                    arr.push({
                        day:a,
                        fullday:`${this.year}${buling(this.month)}${buling(a)}`,
                        cur:false
                    })
                    a++
                }
                //上月进数组
               while(benyueFirstweek--){
                    arr.unshift({
                        day:prevLastday,
                        fullday:`${prevYear}${buling(prevMonth)}${buling(prevLastday)}`,
                        cur:true
                    })
                    prevLastday--
                }
                //下月进数组
                var c=1
                var nextMonth=arr.length>35?42-arr.length:35-arr.length
                while(nextMonth--){
                    arr.push({
                        day:c,
                        fullday:`${nextYear}${buling(nexMonth)}${buling(c)}`,
                        cur:true
                    })
                    c++
                }
                return arr
            },
            schedule(){
                //工作数据
                var arr=[]
                for(var i=0;i<this.calendar.length/7;i++){
                    arr.push([])
                    for(var j=0;j<3;j++){
                        arr[i].push([])
                        for (var k =0;k < 7;k++) {
                            arr[i][j].push({
            				colspan:1,
            				// 给每一个事件的td添加一个fullday 用来跟日历里的fullday 进行匹配
            				fullday : this.calendar[i * 7 + k].fullday,
            				xingqi : k
            			    })
                        }
                    }
                }
                //工作数据个持久化数据转换
                this.morenshuju.forEach((item=>{
                    //计算持续时间几天
                    var star=new Date(item.start.toString().substr(0,4),item.start.toString().substr(4,2),item.start.toString().substr(6,2))
                    var en=new Date(item.end.toString().substr(0,4),item.end.toString().substr(4,2),item.end.toString().substr(6,2),)
                    
                     var during = (en - star) / 86400000 + 1; 
                   // 打一个标记 是为了防止 事件多出来的项
                    var falg=true
                    //arr一共几周
                   arr.forEach((week,weekIdx)=>{
                       for (var i = 0; i < 3; i++) {
                           for (var j = 0; j < 7; j++) {
                              if(week[i][j]){
                                  //找到事件开始时间所对应的td 给td添加title
                               if(week[i][j].fullday==item.start&&falg&&!week[i][j].title){
                                   //跨周 一共几天
                                   var nowWeekDuring = during + week[i][j].xingqi<=7?during:7-week[i][j].xingqi
                                   week[i][j].title=item.title
                                   week[i][j].type=item.type
                                   week[i][j].id=item.id
                                   week[i][j].colspan=nowWeekDuring
                                    //起始位置包括本身,减几位 
                                   week[i].splice(j+1,nowWeekDuring-1)
                                   falg=false
                                   //剩余的天数
                                   var res=during-nowWeekDuring
                                   //count记录跨了多少周
                                   var count = 0;
                                   while (res > 0) {
                                       count++
                                        var nextWeekDruing=res>=7?7:res
                                       //超过这个个月 return
                                       if(arr.legnth<=count+weekIdx) return 
                                       for (let ii = 0; ii < 3; ii++) {
                                          if(arr[count+weekIdx][ii][0].title){
                                              continue;
                                          }
                                          arr[count+weekIdx][ii][0].title=item.title
                                          arr[count+weekIdx][ii][0].type=item.type
                                          arr[count+weekIdx][ii][0].id=item.id
                                          arr[count+weekIdx][ii][0].colspan=nextWeekDruing
                                          arr[count+weekIdx][ii].splice(1,nextWeekDruing-1)
                                          break;
                                       }
                                        res-=7
                                   }
                               }
                               
                              }
                           }
                            
                        }
                    })
                }))
                return arr
            }
        },
        watch:{
        // monthmonth 是 data中的数据 
        // 可以被watch 监控 watch 有两个参数 一个新值 一个是旧值
        month(newVal,oldVal){ 
            if(newVal > 12){
                this.month = 1
                this.year++
            }else if(newVal < 1){
                this.month = 12
                this.year--
            }
        }
    },
     methods:{
            gonext(){
               this.month++
            },
            goprev(){
                 this.month--
                 console.log(this.month)
            },
            //添加
            show(type,td){
                //如果有title就发修改请求
                if(td){
                    if(td.title){
                         this.$store.commit('PATCH',{showType:'DEL',td})
                    }else{
                    this.$store.commit('SHOW',{showType:type,td})
                    }
                }else{
                    this.$store.commit('SHOW',{showType:type})
                } 
            }
        },
        components:{
            VuiFixed
        }
    }
</script>

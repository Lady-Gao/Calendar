<style scoped lang='stylus'>
  .showAdd{
        position fixed;
        top:60px;
        left:25%;
        width:50%;
        height:400px;
        background: #fdf6ec;
        border:1px solid #f5dab1;
        color:#f5dab1;
        font-weight :bold;
        border-radius:20px;
        z-index:2;
        padding:20px;
        line-height:40px;
        span{
            position:absolute;
            top:10px;
            right:15px;
            width:25px;
            height:25px;
            font-size:14px;
            border:2px solid #f5dab1;
            border-radius:50%;
            line-height:23px;
        }
        
        .el-select{
            width:100%;
        }
        .el-row{
            margin-top:20px;
            .subtn{
                position:relative;
                bottom:-50px;
            }
        }
    }
</style>
<template>
	<div class="showAdd">
        <span @click="close">X</span>
       <h3>{{tit}}</h3>
       <el-row>
           <el-col :span="8">事件名称</el-col>
           <el-col :span="10">
               <el-input v-model="title" placeholder="请输入内容" size="small"></el-input>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="8">事件类型</el-col>
           <el-col :span="10">
                 <el-select v-model="type" placeholder="请选择类型" size="small">
                         <el-option label="life" value="life"></el-option>
                         <el-option label="work" value="work"></el-option>
                </el-select>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="8">选择日期</el-col>
           <el-col :span="10">
              <el-date-picker
                v-model="time"
                size="small"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyyMMdd">
            </el-date-picker>
           </el-col>
       </el-row>
       
           <el-row>
                <el-button v-if="this.showType=='ADD'" class="subtn" type="success" plain @click="submit" size="mini">提交</el-button>
                <el-button v-if="this.showType=='DEL'" class="subtn" type="success" plain  size="mini" @click="change">修改</el-button>
           </el-row>
      
    </div>
</template>
<script>
	export default{
		data(){
			return{
                showType:this.$store.state.showType,
                type:"life",
                time:this.$store.state.day,
                title:""
			}
        },
        computed:{
            tit(){
                console.log(this.showType,this.$store.state.showType)
                return this.showType=="ADD"?"增加事件":"更改事件"
            }
        },
        methods:{
            submit(){
                var newThing={
                    start:this.time[0],
                    end:this.time[1],
                    type:this.type,
                    title:this.title
                }
            if(this.title!=""){
                 this.$store.commit("ADD",newThing)
            }
            },
            close(){
                this.$store.commit('ADD')
            },
            change(){
                this.$store.state.morenshuju.forEach(item => {
                    console.log(this.$store.state,55555)
                if (item.id ==  this.$store.state.changeId){
                    
                }
            });
            }
        }
	}
</script>
<template>
  <div class="cate-content">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
            <p class="cate-title">漫画分类</p>
            <div class="cate-btn">
                <el-button  type="text"  @click="showInput(1)">添加</el-button>
                <el-button  type="text"  @click="showClose(1)" v-text="cateCloseable?'取消删除':'删除'"></el-button>
            </div>
            
        </div>
        <div class="add-cate" v-if="inputShow">
            <el-input v-model="cateVal" placeholder="请输入分类名称"></el-input>
            <el-button @click="addCate(1)" class="comfirm-btn">确认</el-button>
            <el-button @click="cancelAdd(1)" class="comfirm-btn">取消</el-button>
        </div>
        <el-tag
            class="cate-tag"
            v-for="(item,index) in categoryList1"
            :key="index"
            :closable="cateCloseable"
            @close="handleDel(item)"
            type="info">
            {{item.name}}
        </el-tag>
    </el-card>
    <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
            <p class="cate-title">小说分类</p>
            <div class="cate-btn">
                <el-button  type="text"  @click="showInput(2)">添加</el-button>
                <el-button  type="text"  @click="showClose(2)" v-text="cateCloseable1?'取消删除':'删除'"></el-button>
            </div>
            
        </div>
        <div class="add-cate" v-if="inputShow1">
            <el-input v-model="cateVal1" placeholder="请输入分类名称"></el-input>
            <el-button @click="addCate(2)" class="comfirm-btn">确认</el-button>
            <el-button @click="cancelAdd(2)" class="comfirm-btn">取消</el-button>
        </div>
        <el-tag
            class="cate-tag"
            v-for="(item,index) in categoryList2"
            :key="index"
            :closable="cateCloseable1"
            @close="handleDel(item)"
            type="info">
            {{item.name}}
        </el-tag>
    </el-card>
  </div>
</template>

<script>
import {categories} from '../../api/api'
export default {
    data(){
        return{
            inputShow:false,
            inputShow1:false,
            cateVal:'',
            cateVal1:'',
            type:1,
            categoryList1:[],
            categoryList2:[],
            cateCloseable:false,
            cateCloseable1:false
        }
    },
    mounted(){
        this.getAllCate(1)
        this.getAllCate(2)
    },
    methods:{
        showInput(type){
            if(type==1){
                this.inputShow = true;
            }else{
                this.inputShow1 = true;
            }
            
        },
        showClose(type){
            if(type==1){
                this.cateCloseable = !this.cateCloseable
            }else{
                this.cateCloseable1 = !this.cateCloseable1
            }
            
        },
        addCate(type){
            let value = ''
            if(type==1){
                value = this.cateVal
            }else{
                value = this.cateVal1
            }
            if(!value){
                this.$message({message:'分类名称不能为空',type:'warning'})
            }else{
                this.postRequest(categories.add,{name:value,type:type}).then(res => {
                    this.$message({message:'添加成功！',type:'success'});
                    this.cateVal = '';
                    this.cateVal1 = '';
                    this.getAllCate(type)
                })
            }
        },
        cancelAdd(type){
             if(type==1){
                this.inputShow = false;
            }else{
                this.inputShow1 = false;
            }
        },
        getAllCate(type){
            this.getRequest(categories.get,{type:type}).then(res =>{
                if(type==1){
                    this.categoryList1 = res
                }else{
                    this.categoryList2 = res
                }
            })
        },
        handleDel(val){
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.getRequest(categories.del,{id:val.id}).then(res => {
                    this.$message({message:'删除成功！',type:'success'});
                    this.getAllCate(1)
                    this.getAllCate(2)
                })
            }).catch(() => {});
            
        }
    }
}

</script>
<style lang="scss" scoped>
.cate-content{
    padding: 30px;
    .clearfix{
        font-size: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .cate-title{
            font-weight: bold;
        }
    }
    .box-card{
        margin-bottom: 50px;
    }
    .box-card /deep/ .el-card__header{
        padding: 0px 20px;
    }
    .add-cate{
        display: flex;
        margin: 10px 0 30px;
        .comfirm-btn{
            margin-left: 20px;
        }
    }
    .cate-tag{
        margin-right: 20px;
        font-size: 18px;
        margin-bottom: 15px;
    }
}

</style>
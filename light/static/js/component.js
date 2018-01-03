var Table=Vue.component("Table",{
    props:["tableHead"],
    template:`
    <table class="sizetable">
        <tr>
            <th v-for="item in tableHead" class="sizeth">{{item}}</th>
            <th class="sizeth">操作</th>
        </tr>
        <tr v-for="item in datas">
            <td class="sizetd">{{item.name}}</td>
            <td class="sizetd">{{item.age}}</td>
            <td class="sizetd">{{item.sex}}</td>
            <td class="sizetd"><a href="#/" @click="del(item.id)">删除</a> 
            <a :href="'#/edit/'+item.id">编辑</a></td>
        </tr>
    </table>
    `,
    data(){
        return{
            datas:[
                {name:"张三",age:12,sex:"女",id:1},
                {name:"李四",age:18,sex:"女",id:2},
                {name:"王五",age:20,sex:"男",id:3},
                {name:"赵六",age:12,sex:"男",id:4},

            ]
        }
    },
    methods:{
        del(id){
            this.datas=this.datas.filter(function(a){
                return a.id !=id;
            })
            var xml=new XMLHttpRequest();
            xml.onload=function () {
                if(xml.response == "ok"){
                    alert("删除成功");
                }
            }
            xml.open("get","/del/"+id);
            xml.send();

           /* fetch("/del/"+id).then( (res)=> {
                return res.json();
            }).then(function (data) {
                if(data == "ok"){
                    alert("删除成功");
                }
            })*/
        }
    },
    mounted(){
        var that=this;
        that.datas=[];
        var xml=new XMLHttpRequest();
        xml.onload=function(){
            that.datas=JSON.parse(xml.response);
        }
        xml.open("get","/fetch");
        xml.send();

        /*fetch("#/fetch").then(function (res) {
            return  res;
        }).then(function (data) {
            console.log(data)
            that.datas=data;
        })*/
    }
})
var Index=Vue.component("Index",{
    template:`
        <div>
            <Table :tableHead="['姓名','年龄','性别']">
                
            </Table>
        </div>
    `
})

var Add=Vue.component("Add",{
    template:`
        <form>
  <div class="form-group">
    <label for="name">姓名</label>
    <input type="text" class="form-control" id="name" placeholder="name" name="name" v-model="name">
  </div>
  
  <div class="form-group">
    <label for="age">年龄</label>
    <input type="text" class="form-control" id="age" placeholder="age" name="age" v-model="age">
  </div>
   <div class="form-group">
    <label for="sex">性别</label>
    <input type="text" class="form-control" id="sex" placeholder="sex" name="sex" v-model="sex">
  </div>
 
  <button type="submit" class="btn btn-default" @click="submit()">Submit</button>
</form>
    `,
    data(){
        return {
            name:"",
            age:"",
            sex:""
        }
    },
    methods:{
        submit(){
            var datastring="name="+this.name+"&age="+this.age+"&sex="+this.sex;
            fetch("/addCon?"+datastring).then((res)=>{
                return res.text();
            }).then(function(e){
                if(e=="ok"){
                    alert("添加成功");
                    this.name="";
                    this.age="";
                    this.sex="";
                }

            })
        }
    }
})

var edit=Vue.component("edit",{
    template:`
        <form>
  <div class="form-group">
    <label for="name">姓名</label>
    <input type="text" class="form-control" id="name" placeholder="name" name="name" v-model="name">
  </div>
  
  <div class="form-group">
    <label for="age">年龄</label>
    <input type="text" class="form-control" id="age" placeholder="age" name="age" v-model="age">
  </div>
   <div class="form-group">
    <label for="sex">性别</label>
    <input type="text" class="form-control" id="sex" placeholder="sex" name="sex" v-model="sex">
  </div>
 
  <button type="submit" class="btn btn-default" @click="submit()">Submit</button>
</form>
    `,
    data(){
        return{
            name:"",
            age:"",
            sex:""
        }
    },
    methods:{
        submit(){
            var datastring="name="+this.name+"&age="+this.age+"&sex="+this.sex+"&id="+this.$route.params.id;
            fetch("/editCon?"+datastring).then((res)=>{
                return res.text();
            }).then((e)=>{
                if(e=="ok"){
                    alert("修改成功");
                }
            })
        }
    },
    mounted(){
        fetch("/edit/"+this.$route.params.id).then((res)=>{
            return res.json();
        }).then((data)=>{
            this.name=data[0].name;
            this.age=data[0].age;
            this.sex=data[0].sex;
        })
    }
})

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4049"],{"0354":function(e,t,r){"use strict";var n=r("973d"),i=r.n(n);i.a},"0feb":function(e,t,r){"use strict";r.d(t,"g",function(){return i}),r.d(t,"b",function(){return a}),r.d(t,"i",function(){return o}),r.d(t,"a",function(){return u}),r.d(t,"j",function(){return s}),r.d(t,"f",function(){return d}),r.d(t,"h",function(){return l}),r.d(t,"e",function(){return m}),r.d(t,"k",function(){return c}),r.d(t,"d",function(){return p}),r.d(t,"c",function(){return f});var n=r("66df"),i=function(e){return n["a"].request({url:"/api/EmployeeGroup/index",params:e,method:"get"})},a=function(e){var t=e;return n["a"].request({url:"/api/Employee/add",data:t,method:"post"})},o=function(){return n["a"].request({url:"/api/EmployeeGroup/getModules",method:"get"})},u=function(e){return n["a"].request({url:"/api/EmployeeGroup/add",data:e,method:"post"})},s=function(e){var t={id:e};return n["a"].request({url:"/api/Employee/show",data:t,method:"post"})},d=function(e){return n["a"].request({url:"/api/Employee/edit",data:e,method:"post"})},l=function(e){var t={id:e};return n["a"].request({url:"/api/EmployeeGroup/show",data:t,method:"post"})},m=function(e){return n["a"].request({url:"/api/EmployeeGroup/edit",data:e,method:"post"})},c=function(e){var t={};return e&&(t.page=e),n["a"].request({url:"/api/Employee/index",params:t,method:"get"})},p=function(e){var t={id:e};return n["a"].request({url:"/api/Employee/delete",data:t,method:"post"})},f=function(e){var t={id:e};return n["a"].request({url:"/api/EmployeeGroup/delete",data:t,method:"post"})}},"2ce3":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Card",{attrs:{title:"权限操作",shadow:""}},[r("Form",{ref:"formItem",attrs:{model:e.formItem,"label-width":80,rules:e.ruleValidate}},[r("Row",{attrs:{type:"flex",justify:"start",align:"middle",gutter:20}},[r("i-col",{attrs:{span:"10"}},[r("FormItem",{attrs:{label:"角色名称",prop:"group_name"}},[r("Input",{attrs:{placeholder:"输入姓名"},model:{value:e.formItem.group_name,callback:function(t){e.$set(e.formItem,"group_name",t)},expression:"formItem.group_name"}})],1)],1)],1),r("Row",{attrs:{type:"flex",justify:"start",align:"middle",gutter:20}},[r("i-col",{attrs:{span:"22"}},[r("FormItem",{attrs:{label:"角色描述"}},[r("Input",{attrs:{type:"textarea",autosize:{minRows:5,maxRows:5},placeholder:"请输入意见"},model:{value:e.formItem.describe,callback:function(t){e.$set(e.formItem,"describe",t)},expression:"formItem.describe"}})],1)],1)],1),r("Row",{attrs:{type:"flex",justify:"start",align:"middle",gutter:20}},[r("i-col",{attrs:{span:"22"}},[r("FormItem",{attrs:{label:"角色授权"}},[r("Tree",{ref:"tree",attrs:{"show-checkbox":"",data:e.employeeModulesList,"show-checkbox":""}})],1)],1)],1),r("Row",{attrs:{type:"flex",justify:"start",align:"middle",gutter:20}},[r("FormItem",[r("Button",{attrs:{type:"primary"},on:{click:function(t){e.handleSubmit("formItem")}}},[e._v("提交")])],1)],1)],1)],1)],1)},i=[],a=r("0feb"),o={name:"edit_permisson",data:function(){return{formItem:{group_name:"",describe:""},edit_id:"",ruleValidate:{group_name:[{required:!0,message:"姓名不能为空",trigger:"blur"},{type:"string",max:50,message:"标题不能超过50个字",trigger:"blur"}]},employeeModulesList:[],old_rules:[]}},methods:{submitValidateField:function(e){return e.group_name=e.group_name.trim(),e.group_name?!(!e.rules||e.rules.length<=0)||(this.$Notice.warning({title:"权限不能为空！"}),!1):(this.$Notice.warning({title:"角色名不能为空！"}),!1)},handleSubmit:function(e){var t=this,r=this.$refs.tree.getCheckedNodes(),n=[],i=this.formItem,o=this;r.forEach(function(e){n=n.concat(e.parentStr.split(",")),n.push(e.id+"")}),n=this.uniqueArr(n),i.rules=this.removeByValue(n,0),i.id=this.edit_id,this.submitValidateField(i)&&Object(a["e"])(i).then(function(e){var r=e.data;0==r.code?(t.$Notice.warning({title:"信息提交完成！"}),setTimeout(function(){o.$router.go(-1)},1500)):t.$Notice.warning({title:r.msg})})},uniqueArr:function(e){for(var t=[],r=0,n=e.length;r<n;r++)-1==t.indexOf(e[r])&&t.push(e[r]);return t},removeByValue:function(e,t){for(var r=0;r<e.length;r++)e[r]==t&&e.splice(r,1);return e},ishasRule:function(e){for(var t=0;t<this.old_rules.length;t++)if(this.old_rules[t]==e)return!0},recursiveArr:function(e,t){var r=this;e.forEach(function(e){r.ishasRule(e.id)&&(e.checked=!0),e.parentStr=t+""?t+","+e.parent_id:e.parent_id+"",e.children.length>0&&r.recursiveArr(e.children,e.parentStr)})},getEmployeeModulesList:function(){var e=this;Object(a["i"])().then(function(t){var r=t.data;0==r.code?(e.recursiveArr(r.data,""),e.employeeModulesList=r.data):e.$Notice.warning({title:r.msg})})}},created:function(){var e=this;this.edit_id=this.$route.query.id,Object(a["h"])(this.edit_id).then(function(t){var r=t.data;0==r.code?(e.formItem.describe=r.data.describe,e.formItem.group_name=r.data.group_name,e.old_rules=r.data.rules,e.getEmployeeModulesList()):e.$Notice.warning({title:r.msg})})}},u=o,s=(r("0354"),r("2877")),d=Object(s["a"])(u,n,i,!1,null,null,null);d.options.__file="main.vue";t["default"]=d.exports},"973d":function(e,t,r){}}]);
#VUE中常用知识点

####在循环中将数据加到某属性中
```html
<tr v-for="item in Strategys" class="ng-scope">
    <td>
    　　<a class="ng-binding ng-scope" v-bind:href="['xxx/detail/'+item.Id]" >{{item.Name}}</a>
    </td>
</tr>
```

# 避免使用 eval(),因为每次调用 eval()时都要创建一个新的解释器/编译器实例

# 创建对象和数组时，用直接量会运行的更快

<script>
var myArr = new Array(); myArr[0]=0;myArr[1]=1;
//使用直接量
var myArr=[0,1]
</script>

# 避免重复的工作（像有些if不需要判断；当需要检测浏览器时，可使用延迟加载或条件预加载）

# 在进行数学计算时，考虑使用直接操作数字的二进制形式的位运算

# 尽量使用js的原生方法 （比如数学计算时用Math.XXX，DOM操作用querySelector等）


import {Map, List, fromJS, is} from 'immutable';

// let obj1 = {name: "xuxuan", age: 293};
// let obj2 = {name: "xuxuan", age: 23};

// console.log(is(fromJS(obj2), fromJS(obj1)))


// const a = fromJS({
//   data: {
//     person: {
//       name: 'xx', 
//       age: 12
//     },
//     arr: ['aa', 'bb', 'cc']
//   },
//   success: true,
//   message: 'success'
// });

// const aS = fromJS({
//   name: 'xx', 
//   age: 11, 
//   arr: {
//     num:[12, 11, 22]
//   }
// });
// const bS = fromJS({name: 'coder', arr: {num:['sz', 'sh']}})



// console.log(b == d)



// function returnOk() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({status: 'ok'})
//     },2000)
//   })
// }
// console.log('__starting...')
// returnOk().then((res) => {
//   console.log(res.status)
// })

// 普通对象
// var p1 = Promise.resolve('param');
// p1.then(res => {console.log(res)})

// thenable 对象
let arr = [
            {
              id:1, 
              children:[
                {id:12, parentid:1}, 
                {id: 13, parentid:1}, 
                {id: 14, parentid:1}
                ]
            }, 
            {
              id:2
            }
          ];
let arrList = fromJS(arr);
// let xx = arrList.updateIn([1,'children'], v=>v?v.push({id:'xuxuan'}):fromJS([{id:'xuxuan'}]));
// console.log(xx.toJS())
console.log(addNodes_Reducer([{parentid: 4}]).toJS())
function addNodes_Reducer(resNodes) {
      let state;
      resNodes.forEach((resNode, index)=>{

          // 不是根节点 
          let treeNodes = arrList;
          let aim, path = [];
          let nodes = treeNodes;
          // start 
          function recursion(treeNodes, level) {
            if (!treeNodes || !treeNodes.size || aim) return;
            treeNodes.find((node, index) => {
              if (aim) return true;
              // [1, 2, 3, 4] path[2] 第2层的地3（path[2]）个节点
              // [2,4]
              console.log(path)
              path[level] = index;
              console.log('asdf', path)
              if (path.length > level + 1) {
                // 暂不明白（如果递归完成没有找到？）
                path.length = level +1;
              }
              let id = node.get('id');
              if (id === resNode.parentid) {
                // 父节点选中， 添加的子节点全部选中
                if(node.get('isChecked')) {
                  checkAllNodes(resNode);
                }
                aim = id;
                return true;
              }
              recursion(node.get('children'), level + 1);
            })
          }
          // end

          recursion(nodes, 0);

          if (path.length > 0) {
            let keyPath = [];
            for (let i = 0; i < path.length; i++) {
              keyPath.push(path[i]);
              keyPath.push('children');
            }
            // if (!isArrayLike) keyPath.splice(0, 1);
            state = treeNodes.updateIn(keyPath, v=>v?v.push(fromJS(resNode)):fromJS([resNode]));
          }
        
      }) 


  return state;
}

// function updateNode_Reducer(nodes, topNode) {
//       let aim, path = [];
//       function recursion(treeNodes, level) {
//         if (!treeNodes || !(treeNodes.size || treeNodes.length) || aim) return;
//         treeNodes.find((node, index) => {
//           if (aim) return true;
//           path[level] = index;
//           if (path.length > level + 1) {
//             path.length = level +1;
//           }
//           let id = node.get('id');
//           if (id === topNode.id) {
//             aim = id;
//             return true;
//           }
//           recursion(node.get('children'), level + 1);
//         })
//       }
//       recursion(nodes, 0);
//       if (path.length > 0) {
//         let keyPath = [];
//         for (let i = 0; i < path.length; i++) {
//           keyPath.push(path[i]);
//           keyPath.push('children');
//         }
//         keyPath.splice(keyPath.length - 1, 1);
//       }     
//   return nodes.toJS();
// }

// let arr = [{id:1, children:[{id:12, parentid:1,children:[{id:121, parentid:12}]}, {id: 13, parentid:1, isChecked:true}, {id: 14, parentid:1, isChecked:true}]}, {id:2}];
// let arr2 = [
//   {id:'A', label: 'A', checked: true},
//   {id:'B',label: 'B'},
//   {id:'C',label: 'C',
//     children: [
//         {id:'C-A',label: 'C-A', parentid: 'C'},
//         {id:'C-B',label: 'C-B', checked: true, parentid: 'C'},
//         {id:'C-C',label: 'C-C', parentid: 'C',
//           children: [
//               {id:'C-C-A',label: 'C-C-A', parentid: 'C-C'},
//               {id:'C-C-B',label: 'C-C-B', parentid: 'C-C'},
//               {id:'C-C-C',label: 'C-C-C', checked: true, parentid: 'C-C'}
//           ]
//         }
//     ]
//   },
//   {id:'D',label: 'D',
//     children:[{
//       id:'D-A', 
//       parentid: 'D', 
//       label: 'D-A', 
//       children: [
//         {id:'D-A-A',label: 'D-A-A', parentid: 'D-A'},
//       ]
//     }]
//   }
// ];

// //广度
// function traversalDepth(node) {
//   let tree = node;
//   while(tree.length > 0) {
//     // console.log(tree.length)
//     let curNode = tree.shift();
//     console.log('>>>>>>>>...', curNode.label);
//     if(curNode.children&&curNode.children.length) {
//       tree.concat(curNode.children)
//     }
//   }
// }
// traversalDepth(arr2)
/**
 * 基本遍历方法
 * 广度
 * 深度
 */
// let traversal = {
//   tree:[
//       {id:'A', label: 'A', checked: true},
//       {id:'B',label: 'B'},
//       {id:'C',label: 'C',
//         children: [
//             {id:'C-A',label: 'C-A', parentid: 'C'},
//             {id:'C-B',label: 'C-B', checked: true, parentid: 'C'},
//             {id:'C-C',label: 'C-C', parentid: 'C',
//               children: [
//                   {id:'C-C-A',label: 'C-C-A', parentid: 'C-C'},
//                   {id:'C-C-B',label: 'C-C-B', parentid: 'C-C'},
//                   {id:'C-C-C',label: 'C-C-C', checked: true, parentid: 'C-C'}
//               ]
//             }
//         ]
//       },
//       {id:'D',label: 'D',
//         children:[{
//           id:'D-A', 
//           parentid: 'D', 
//           label: 'D-A', 
//           children: [
//             {id:'D-A-A',label: 'D-A-A', parentid: 'D-A'},
//           ]
//         }]
//       }
//   ], 
//   breadth: tree => {
//     let _tree = tree;
//     while(_tree.length > 0) {
//       let node = _tree.shift();
//       console.log(node.label);
//       if(node.children&&node.children.length) {
//         _tree = _tree.concat(node.children)
//       }
//     }
//   }, 
//   depth: tree => {
//     let _tree = tree;
//     _tree.forEach(node=>{
//       console.log(node.label)
//       if(node.children&&node.children.length) {
//         this.depth(node.children)
//       }
//     });
//   }
// }
// let tree = traversal.tree;
// traversal.breadth(tree)
// console.log(updateNode_Reducer(fromJS(arr), {id:121, text: 'asdf'}))

// function isSiblingAllChecked(siblings) {
//   return siblings.every((item, index) => item.isChecked == true)
// }

    /*递归*/  
      // let checkAllNodes = function (node) {
      //   node.isChecked = true;
      //   if (node.children) { node.children.forEach(checkAllNodes); }
      // };

      /**
       * [recursion description]
       * @param  {[type]} treeNodes [description] 节点数据
       * @param  {[type]} id        [description] 节点唯一标识
       * @param  {[type]} downFind  [description] 判断是否需要更改子节点状态， 否则只向上冒泡改变父节点状态
       * @return {[type]}           [description]
       */
      // function doRecursion(treeNodes, id, downFind) {
      //   let initialData = treeNodes;
      //   (function recursion(treeNodes,id, downFind) {

      //     for(let i=0; i<treeNodes.length; i++) {
      //       if(treeNodes[i].id == id) {
      //         treeNodes[i].isChecked = true;
      //         // 更新子节点状态
      //         if(downFind&&treeNodes[i].children) {
      //           treeNodes[i].children.forEach(checkAllNodes);
      //         }
      //         // 判断所有子节点是否选中更新父节点选中状态
      //         console.log('更新父节点状态', isSiblingAllChecked(treeNodes))
      //         if(isSiblingAllChecked(treeNodes)&&treeNodes[i].parentid) {console.log('更新父节点执行', treeNodes[i].parentid)
      //           //传入最初对象arr
      //           recursion(initialData, treeNodes[i].parentid)
      //         }
      //       }
      //       if(treeNodes[i].children) {
      //         recursion(treeNodes[i].children, id, true);
      //       }
      //     }
      //   })(treeNodes,id, downFind)
      // }






      // function recursion(treeNodes,id) {
      //   if (!treeNodes || !treeNodes.length) return;

      //   for(let i=0;i<treeNodes.length;i++) {
      //     if(treeNodes[i].id == id) {
      //       treeNodes[i].isChecked = true;
      //       // 判断所有子节点是否选中更新父节点选中状态
      //       if(isSiblingAllChecked(treeNodes)&&treeNodes[i].parentid) {console.log(treeNodes[i].parentid)
      //         //传入最初对象arr
      //         recursion(arr, treeNodes[i].parentid)
      //       }
      //       break;
      //     }
      //     if(treeNodes[i].children && treeNodes[i].children.length) {
      //       recursion(treeNodes[i].children, id);
      //     }
      //   }
      // }



// ['D-A'].forEach((id, idx)=>{console.log('需要checkedID', id)
//   doRecursion(arr2, id, true)
// });
// console.log(arr2)


// console.log(arr instanceof List)
// let listArr = fromJS(arr);

//       function recursion(treeNodes,item) {console.log('itme', item)
//         if (!treeNodes || !treeNodes.length) return;
//         for(let i=0;i<treeNodes.length;i++) {
//           if(treeNodes[i].id == item) {console.log('xxxxxxxxxxxxxxxxxxxwilldelete', treeNodes[i])
//             treeNodes.splice(i, 1);
//             break;
//           }
//           if(treeNodes[i].children && treeNodes[i].children.length) {
//             recursion(treeNodes[i].children, item);
//           }
//         }
//       }

//       [2].forEach((item, idx) => {
//         recursion(arr, item);
//       });
//       console.log(arr)


// let a = listArr.find((node,idx)=>{
//   return node.get('id')==2;
//   console.log(node.toJS())
//   console.log(idx)
// });
// console.log(a.toJS())
// 
/**
 * Map & Set
 */
// let arr = [12, 1, 12, 14, 15, 15, 23];
// let s = new Set();
// arr.forEach(item=>s.add(item));
// console.log([...s])

/**********************
 * 设计模式
 * 1.单例模式
 * 1.1 单一指责原则
 */

// let CreateDiv = function(html) {
//   this.html = html;
//   this.init();
// }

// CreateDiv.prototype.init = function() {
//   let div = document.createElement('div');
//   div.innerHTML = this.html;
//   document.body.appendChild(div);
// }

// let ProxyCreateDiv = (()=>{
//   let instance;
//   return html => instance || (instance = new CreateDiv(html))
// })();


// let single1 = new ProxyCreateDiv('asdfasdf');
// let single2 = new ProxyCreateDiv('asdfasdf');
// console.log(single1 === single2)


//
/***********************************************/
/*
 * 设计模式
 * 1.策略模式
 * 
 */
// let strategy = {
//   A: salary => salary*4, 
//   B: salary => salary*3,
//   C: salary => salary*2,
//   D: salary => salary
// }

// let getBonus = function(level, salary) {
//   return strategy[level](salary);
// }
// console.log(getBonus('A', 5000))

/*传统面向对象的方式*/
// let performanceA = function() {};
// performanceA.prototype.calcBonus = salary => salary*4;

// let performanceB = function() {};
// performanceB.prototype.calcBonus = salary => salary*3;

// let performanceC = function() {};
// performanceC.prototype.calcBonus = salary => salary*2;

// let performanceD = function() {};
// performanceD.prototype.calcBonus = salary => salary;

// let Bonus = function() {
//   this.salary = null;
//   this.strategy = null;
// }

// Bonus.prototype = {
//   setSalary: function(salary) {
//     this.salary = salary;
//   },
//   setStrategy: function(strategy) {
//     this.strategy = strategy
//   },
//   getBonus: function() {
//     return this.strategy.calcBonus(this.salary)
//   }
// }

// let shawn = new Bonus();
// shawn.setSalary(5000);
// shawn.setStrategy(new performanceB());
// let a = shawn.getBonus();
// console.log(shawn.getBonus())


/*表单验证的策略模式*/

/**
 * 代理模式
 *
 */

// let Flower = function(){};
// let B = {
//   sendFlower: function(target) {
//     let f = new Flower();
//     target.receieveFlower(f)
//   }
// }
// let A = {
//   receieveFlower: function(flower) {
//     console.log('receieved' + flower)
//   }
// }

// B.sendFlower(A)

/** 
 * 迭代器模式
 *
 **/

//  let Iterator = function(obj) {
//   let cur = 0;
//   function next() {
//     cur += 1;
//   }
//   function isOver() {
//     return cur >=obj.length;
//   }
//   function getItem() {
//     return obj[cur];
//   }
//   function getNext() {
//     cur++;
//     return getItem();
//   }
//   return {
//     next,
//     isOver,
//     getItem,
//     getNext,
//     obj: obj
//   }
//  }

// window._Iterator = Iterator([12, 12, 13, 45])


/**
 * 命令模式
 */

// let btn1 = document.createElement('button');
// btn1.innerHTML = 'btn1';
// document.body.appendChild(btn1);

// let menuBar = {
//   refresh: function() {
//     console.log('menu refresh...')
//   }
// }

// let subMenu = {
//   add: function() {
//     console.log('add some menu ....')
//   }, 
//   del: function() {
//     console.log('del some menu>>>>')
//   }
// }

// let RefreshMenubar = function(receiver) {
//   this.receiver = receiver;
// };
// RefreshMenubar.prototype.excute = function() {
//   this.receiver.refresh();
// }
// function setCommand(btn, command) {
//   btn.onclick = function(e) {
//     command.excute();
//   }
// }

// let cmd1 = new RefreshMenubar(menuBar);
// setCommand(btn1, cmd1);

/* 命令模式 */
// let action = {
//   up: function() {console.log('⬆️')},
//   down: function() {console.log('⬇️')},
//   front: function() {console.log('➡️')},
//   back: function() {console.log('⬅️')}
// }
// let keyAction = {
//   119: 'up',
//   115: 'down',
//   97: 'back',
//   100: 'front'
// }

// function makeCommand(receiver, cmd) {
//   if(receiver[cmd]) {
//     return function() {
//       receiver[cmd]();
//     } 
//   }
// }
// let commandStack = [];

// document.onkeypress = function(e) {
//   // 119 115 97 100
//   let keyCode = e.keyCode,
//       command = makeCommand(action, keyAction[keyCode]);
//   if(command) {
//     command();
//     commandStack.push(command);
//   }
// }

// btn1.onclick = function() {
//   let lastCommand = commandStack.pop();
//   lastCommand&&lastCommand();
// }

/* 装饰者模式 */
// let plane = function() {};
// plane.prototype.fire = function() {
//   console.log('发射子弹');

// }

// let missileDecorator = function(plane) {
//   this.plane = plane;
// };
// missileDecorator.prototype.fire = function() {
//   this.plane.fire();
//   console.log('发射导弹');
// }

// let atomDecorator = function(plane) {
//   this.plane = plane;
// };
// atomDecorator.prototype.fire = function() {
//   this.plane.fire();
//   console.log('发射原子弹');
// }

// let myPlane = new plane();
// myPlane.fire();let myPlanePlus = new missileDecorator(myPlane);
// myPlanePlus.fire();let myPlanePP = new atomDecorator(myPlanePlus);
// myPlanePP.fire();

/*修改Function 原型的方式， 重点理解this*/

// Function.prototype.before = function(fn) {
//   let _this = this;
//   return function() {
//     fn.apply(this, arguments);
//     return _this.apply(this, arguments);
//   }
// };

// document.getElementById = document.getElementById.before(function() {
//   console.log('before geById....')

// })

// document.getElementById('title')

// let before = function(fn ,beforeFn) {
//   return function() {
//     beforeFn.apply(this, arguments);
//     fn.apply(this, arguments)  
//   }

// }

// let a = function() {
//   console.log('before text')
// }

// let b = function() {
//   console.log('initial text')
// }
// b = before(b, a)();

/* 状态模式 */
// 反面例子
// let Light = function() {
//   this.state = 'on';
//   this.button = null;
// }
// Light.prototype.init = function() {
//   let btn = document.createElement('button'),
//       _this = this;
//   btn.innerHTML = 'button';
//   document.body.appendChild(btn);

//   this.button = btn;
//   this.button.onclick = function() {
//     _this.press();
//   }
//   console.log('电灯初始化')
// };
// Light.prototype.press = function() {
//   if(this.state === 'on') {
//     this.state = 'off';
//     console.log('关闭')
//   }else if(this.state === 'off') {
//     this.state = 'on';
//     console.log('打开')
//   }
// };

// new Light().init()

// 正面例子
/* A */
// let StateA = function(light) {
//   this.light = light;
// }
// StateA.prototype.Pressed = function() {
//   console.log('AAA');
//   this.light.setState(this.light.stateB);
// };
// /* B */
// let StateB = function(light) {
//   this.light = light;
// }
// StateB.prototype.Pressed = function() {
//   console.log('BBB');
//   this.light.setState(this.light.stateC);
// };
// /* C */
// let StateC = function(light) {
//   this.light = light;
// }
// StateC.prototype.Pressed = function() {
//   console.log('CCC');
//   this.light.setState(this.light.stateD);
// };
// /* D */
// let StateD = function(light) {
//   this.light = light;
// }
// StateD.prototype.Pressed = function() {
//   console.log('DDD');
//   this.light.setState(this.light.stateA);
// };
// let Light = function() {
//   this.stateA = new StateA(this);
//   this.stateB = new StateB(this);
//   this.stateC = new StateC(this);
//   this.stateD = new StateD(this)
//   this.curState = this.stateA;
//   this.button = null;
// }

// Light.prototype.init = function() {
//   let btn = document.createElement('button'),
//       _this = this;
//   btn.innerHTML = 'button';
//   document.body.appendChild(btn);

//   this.button = btn;
//   this.button.onclick = function() {
//     _this.curState.Pressed();
//   }
//   console.log('电灯初始化')
// };

// Light.prototype.setState = function(newState) {
//   this.curState = newState
// };

// new Light().init();


// var a = fromJS({country: {china: {sz:'nansaaaahan'}}});
// console.log(a.updateIn(['country', 'china', 'sh'], 'xuxu', v=>v+ 'shawn').toJS())
// console.log(a)

/**
 *
 * 移动端滚动 touchmove and scroll
 *
 */

// var fnCreateList = function () {
//     var html = '';
//     for (var index = 0; index < 1000; index += 1) {
//         html = html + '<li class="dingwei"><div class="leve1"><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div>列表内容'+ (Math.random() + '').slice(-1 * Math.ceil(10 * Math.random())) +' <div class="l1"><div class="ll1"><div class="img"><div><img src=""></div></div><div><div>123123</div><div>2222222</div></div></div><div class="ll2"><div>asdfdsaf</div> <div>llllll</div></div><div>jjjjjjj</div></div><img class="zxx" width="100" height="100" alt="下拉阅读上一章的交互截图" class="alignnone" src="http://image.zhangxinxu.com/image/blog/201701/2017-01-25_120359.png"></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></li>'
//     }
//     $('.list').html(html);
// };
// fnCreateList();
// $('body').on('touchmove', function(e) {

// })


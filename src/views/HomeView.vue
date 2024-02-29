<script>
export default {
  data() {
    return {
      selectTab: '',
      newTodoText: '',
      todoList: [],
      last:0,
      del:'',
    };
  },
  //載入localStorage
  mounted() {
    if (localStorage.todoList26) {
      this.todoList = JSON.parse(localStorage.todoList26);
    };
    //提醒存當前資料123
    //window.onbeforeunload = (e) => {return e};
  },
  methods: {
    //切換分類按鈕樣式
    clickTab(done) {
      this.last = 0;
      this.selectTab = done;
    },
    //增加todo事項
    todoAdd(newTodo) {
      if(this.newTodoText === ''){
        return;
      }
      const last = this.todoList.at(-1) ?? 0;
      const newId = last.id ?? 0;
      const addTodo = { id: newId + 1, todoText: newTodo, done: false };
      this.todoList.push(addTodo);
      this.newTodoText = '';
      //添加動畫
      this.last = newId + 1;
      
    },
    //更改勾選狀態
    checkTodo(id) {
      const target = this.todoList.findIndex((todo) => todo.id === id);
      this.todoList[target].done = !this.todoList[target].done;
    },
    //編輯todo
    editTodo(id){
      const target = this.todoList.findIndex((todo) => todo.id === id);
      const content = prompt('修改執行事項');
      if (content == '' || content == null) {
        return;
      }else{
        this.todoList[target].todoText = content;
      }
    },
    //刪除todo
    deleteTodo(id){
      if (confirm('是否要刪除?') == true){
        const target = this.todoList.findIndex((todo) => todo.id === id);
        this.del = id;
        setTimeout( () => {
          this.todoList.splice(target,1);
        }, 800)
        setTimeout( () => {
          this.del = '';
        }, 850)
      }
    },

  },
  computed:{
		//篩選todo資料
		filterTodoList(){
			if(this.selectTab === ''){
				return this.todoList;
			}else if(this.selectTab){
        return this.todoList.filter((todo) => todo.done == this.selectTab)
      }else{
        return this.todoList.filter((todo) => todo.done == this.selectTab)
      }
		},
    //存進localStorage
    persist(){
      if (this.todoList.length === 0) {
        localStorage.clear();
      } else {
        const todoData = JSON.stringify(this.todoList);
        localStorage.todoList26 = todoData;
      }
    },
	}
};
</script>

<template>
  <main class="main">
    <div class="container ">
      <div class="top">
        <input type="text" placeholder="新增待辦事項..." class="top-input" v-model="newTodoText">
        <div class="button hover:list-btn-hover" @click="todoAdd(newTodoText)">
          <span class="material-symbols-outlined">task</span>
        </div>
      </div>
      <div class="bottom">
        <div class="btns">
          <div class="btn" :class="{ 'active': selectTab === '' }" @click="clickTab('')">全部</div>
          <div class="btn" :class="{ 'active': selectTab === 1 }" @click="clickTab(1)">已執行</div>
          <div class="btn" :class="{ 'active': selectTab === 0 }" @click="clickTab(0)">未執行</div>
          <div class="btn loc ml-auto" data-search="loc" @click="persist">紀錄資料</div>
        </div>

        <div class="title">
          <span class="w-3/12">執行</span>
          <span class="w-5/12">事項</span>
          <span class="w-4/12">編輯/刪除</span>
        </div>

        <div class="list">
          <div class="list-item" v-for="todo in filterTodoList" :key="todo.id"
          :class="{'add':last == todo.id, 'del':del === todo.id,}">
            <div class="check">
              <input type="checkbox" @change='checkTodo(todo.id)' class="checkbox" :checked="todo.done">
            </div>
            <span class="todoText" :class="{'deleteline':todo.done}">{{ todo.todoText }}</span>

            <div class="list-btns">
              <div class="list-btn edit" @click='editTodo(todo.id)'>
                <span class="material-symbols-outlined">edit_square</span>
              </div>
              <div class="list-btn delete" @click='deleteTodo(todo.id)'>
                <span class="material-symbols-outlined">delete</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>



<style scoped>
/* 共用樣式 */
.btn {
  @apply bg-indigo-600 p-2 px-3 rounded-t-md cursor-pointer break-keep hover:bg-indigo-500
}
.list-btn {
  @apply shadow-sm rounded-md p-2 px-3 flex items-center justify-center cursor-pointer bg-gradient-to-t from-indigo-500 to-pink-200 w-2/4 text-white hover:list-btn-hover;
}
.material-symbols-outlined {
  @apply select-none
}
.deleteline{
  @apply line-through
}


/* 基礎樣式 */
.main {
  @apply bg-gradient-to-t from-indigo-900 to-pink-200 h-screen w-full flex flex-col items-center p-5 py-10 md:p-10 md:py-20 lg:p-20 font-NotoSans;
}

.container {
  @apply bg-white rounded-xl shadow-lg p-5 w-full flex flex-col gap-y-3 min-h-full lg:w-10/12 xl:w-9/12;
}

.top {
  @apply flex justify-between mb-2;
}

.top-input {
  @apply border border-gray-400 rounded-md w-10/12 md:w-11/12 focus:outline-gray-500 active:outline-gray-500 pl-[10px];
}

.button {
  @apply shadow-sm rounded-md p-2 px-3 flex cursor-pointer bg-gradient-to-t from-indigo-500 to-pink-200 text-white;
}

.btns {
  @apply w-full flex gap-x-2 text-white border-b border-gray-400;
}

.loc {
  @apply bg-slate-500 hover:bg-slate-400;
}

.title {
  @apply flex p-2 border-b border-gray-400;
}

.bottom{
  @apply h-full 
}

.list {
  @apply list-none w-full h-3/4 overflow-y-auto pr-2 overflow-x-hidden
}

.list-item {
  @apply flex items-center border-b border-gray-300 py-2 
}

.check {
  @apply w-3/12 h-5
}

.checkbox {
  @apply w-7 h-3
}

.todoText {
  @apply w-5/12
}

.list-btns {
  @apply flex w-4/12 gap-x-1 md:gap-x-2;
}


/* 指令樣式 */
.active {
  @apply bg-yellow-500 hover:bg-yellow-500
}

.hover\:list-btn-hover:hover {
  @apply opacity-90;
}

.add{
  @apply animate-fade-down animate-once
}
.del{
  @apply animate-jump-out animate-once animate-duration-[600ms]
}
</style>
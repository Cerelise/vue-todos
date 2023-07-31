<template>
	<main>
		<div class="mb-4 border-b-4 border-slate-400">
			<h1 class="px-2 text-xl font-base">Todos</h1>
		</div>
		<div class="p-4">
			<TodoCreator @create-todo="createTodo" />
			<ul
				class="flex flex-col gap-[20px] mt-6 list-none"
				v-if="todoList.length > 0"
			>
				<TodoItem
					v-for="(todo, index) in todoList"
					:todo="todo"
					:index="index"
					@toggle-complete="toggleTodoComplete"
					@edit-todo="toggleEditTodo"
					@update-todo="updateTodo"
					@delete-todo="deleteTodo"
				/>
			</ul>

			<p class="todos-msg" v-else>
				<Icon icon="twemoji:grinning-face-with-sweat" />
				<span>你没有待办事项需要完成！</span>
			</p>

			<p v-if="todosCompleted && todoList.length > 0" class="todos-msg">
				<Icon icon="noto-v1:party-popper" />
				<span>恭喜你已经完成所有待办！</span>
			</p>
		</div>
	</main>
</template>

<script setup>
import TodoCreator from '../components/TodosCreator.vue'
import TodoItem from '../components/TodoItem.vue'
import { ref, watch, computed } from 'vue'
import { uid } from 'uid'
import { Icon } from '@iconify/vue'

const todoList = ref([])

watch(
	todoList,
	() => {
		setTodoListLocalStorge()
	},
	{
		deep: true,
	}
)

// 检查所有待办事项是否已经完成
const todosCompleted = computed(() => {
	return todoList.value.every((todo) => todo.isCompleted)
})

const fetchTodoList = () => {
	const saveTodoList = JSON.parse(localStorage.getItem('todoList'))
	if (saveTodoList) {
		todoList.value = saveTodoList
	}
}

// Fetch Todo's on page load
fetchTodoList()

const setTodoListLocalStorge = () => {
	localStorage.setItem('todoList', JSON.stringify(todoList.value))
}

// 创建待办事项
const createTodo = (todo) => {
	todoList.value.push({
		id: uid(),
		todo,
		// 是否已完成
		isCompleted: null,
		// 编辑状态
		isEditing: null,
	})
}

// 处理待办事项
const toggleTodoComplete = (todoPosition) => {
	// 通过数组的index改变数组元素的isCompleted状态
	todoList.value[todoPosition].isCompleted =
		!todoList.value[todoPosition].isCompleted
}

// 编辑待办事项
const toggleEditTodo = (todoPosition) => {
	todoList.value[todoPosition].isEditing =
		!todoList.value[todoPosition].isEditing
}

// 更新待办事项
const updateTodo = (todoVal, todoPos) => {
	/**
	 * 传递两个参数：
	 * todoVal todo的内容
	 * todoPos todo所在的数组元素的index
	 */
	todoList.value[todoPos].todo = todoVal
}

// 删除待办事项
const deleteTodo = (todoId) => {
	/**
	 * todoId 数组元素的id(uid)
	 * filter
	 * 将符合条件(todo.id !== todoId)的元素排除保留
	 * 不符合条件(遍历的数组元素的id等于作为参数的id)将其删除
	 */
	todoList.value = todoList.value.filter((todo) => todo.id !== todoId)
}
</script>

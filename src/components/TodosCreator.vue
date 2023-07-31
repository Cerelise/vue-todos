<template>
	<div
		class="input-wrap flex border-2 border-slate-400 transition ease duration-300"
		:class="{ 'input-err': todoState.invalid }"
	>
		<input
			class="w-5/6 py-2 px-1 border-none focus:outline-none"
			type="text"
			v-model="todoState.todo"
		/>
		<TodoButton @click="createTodo()">
			<template v-slot>
				<div>添加</div>
			</template>
		</TodoButton>
	</div>
	<p v-if="todoState.invalid" class="err-msg">{{ todoState.errMsg }}</p>
</template>

<script setup>
import { reactive } from 'vue'
import TodoButton from '../components/TodoButton.vue'

const emit = defineEmits(['create-todo'])

const todoState = reactive({
	todo: '',
	invalid: null,
	errMsg: '',
})

const createTodo = () => {
	if (todoState.todo !== '') {
		emit('create-todo', todoState.todo)
		todoState.todo = ''
		return
	}
	// 表单验证
	todoState.invalid = true
	todoState.errMsg = 'todo内容不能为空'
}
</script>

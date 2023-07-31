<template>
	<li
		class="todo-item flex items-center gap-2 px-2 py-4 bg-slate-100 shadow-md"
	>
		<input
			type="checkbox"
			class="appearance-none w-[20px] h-[20px] bg-white rounded-full shadow-md checked:bg-emerald-500"
			:checked="todo.isCompleted"
			@input="$emit('toggle-complete', index)"
		/>
		<div class="todo flex-1">
			<input
				type="text"
				v-if="todo.isEditing"
				:value="todo.todo"
				@input="$emit('update-todo', $event.target.value, index)"
			/>

			<span v-else :class="{ 'completed-todo': todo.isCompleted }">{{
				todo.todo
			}}</span>
		</div>

		<div class="todo-actions flex gap-2 transition ease-in-out duration-150">
			<Icon
				v-if="todo.isEditing"
				icon="ph:check-circle"
				class="icon check-icon"
				color="#41b080"
				width="22"
				@click="$emit('edit-todo', index)"
			/>
			<Icon
				v-else
				icon="ph:pencil-fill"
				class="icon edit-icon"
				color="#41b080"
				width="22"
				@click="$emit('edit-todo', index)"
			/>
			<Icon
				icon="ph:trash"
				class="icon trash-icon"
				color="#f95e5e"
				width="22"
				@click="$emit('delete-todo', todo.id)"
			/>
		</div>
	</li>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
	todo: {
		type: Object,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
})

/**
 * toggle-complete 是否完成
 * edit-todo 编辑状态
 * update-todo 更新todo
 * delete-todo 删除todo
 */
defineEmits(['toggle-complete', 'edit-todo', 'update-todo', 'delete-todo'])
</script>

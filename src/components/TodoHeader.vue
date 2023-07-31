<template>
	<header class="bg-[#f1f1f1]">
		<nav class="container flex items-center px-8 py-6">
			<div class="flex items-center gap-3">
				<img src="../assets/Vue_Logo_Black.png" alt="" class="max-w-[50px]" />
				<h1 class="text-2xl font-semibold">Todos</h1>
			</div>

			<ul class="flex flex-1 justify-end list-none gap-4">
				<router-link to="/">首页</router-link>
				<router-link to="/about">关于</router-link>
			</ul>
		</nav>
	</header>
</template>

<script setup></script>

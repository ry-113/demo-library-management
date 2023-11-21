<template>
  <div class="navbar fixed top-0 z-10 bg-slate-300 px-6 py-4 justify-between">
    <div class="flex-1">
      <a class="btn btn-ghost text-3xl">Logo</a>
    </div>
    <div class="gap-2">
     <input
        type="text"
        placeholder="本をキーワードで検索"
        class="input input-bordered w-[600px] absolute right-[50%] translate-x-[50%]"
      />
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="flex items-center gap-5 cursor-pointer">
          <p>ユーザーネーム</p>
          <div class="w-10">
            <img
              alt=""
              src=""
              class="rounded-full"
            />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a>プロフィール</a>
          </li>
          <li><a>設定</a></li>
          <li><a>ログアウト</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="drawer sm:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content absolute top-[80px] w-full h-[calc(100vh - 80px)] p-10">
      <!-- Page content here -->
     <slot/>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-xl">
        <!-- Sidebar content here -->
        <li class="p-4 mt-28"><a>貸出記録</a></li>
        <li class="p-4"><a>本棚</a></li>
        <li class="p-4"><a>データベース</a></li>
        <li class="p-4"><a>ユーザー管理</a></li>
      </ul>
    </div>
  </div>
  
</template>

<script setup lang="ts">

</script>

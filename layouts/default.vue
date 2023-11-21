<template>
  <div class="navbar fixed top-0 z-10 bg-slate-300 py-6 justify-between">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <input
          type="text"
          placeholder="本をキーワードで検索"
          class="input input-bordered w-[600px]"
        />
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
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

  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <slot/>

      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
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

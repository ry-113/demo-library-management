<template>
  <div class="w-0 h-5 bg-primary absolute top-0 progress--bar"></div>
  <div class="hero min-h-[70vh] bg-[#d4f2fd] relative">
    <div class="absolute top-0 w-full">
      <img src="/img/wavesOpacityBlue.svg" alt="" class="w-full h-20" />
    </div>
    <div class="hero-content flex-row mx-auto justify-between px-20">
      <div>
        <h1 class="text-2xl font-bold mb-10 leading-10">今の自分に必要な本がきっと見つかる</h1>
        <div>
          <p class="text-lg">
            このアプリで教室の本棚をオンラインに！<br />
            検索・貸出・レビューまでをこれ１つでサポートします。
          </p>
          <div>
            <button
              class="btn w-[100px] btn-primary my-10"
              type="button"
              role="button"
              @click="logIn"
            >
              はじめる
            </button>
          </div>
        </div>
      </div>
      <div class="w-[60%]">
        <img src="/img/hero.jpg" alt="" />
      </div>
    </div>

    <div class="absolute w-full bottom-0 scale-y-[-1]">
      <img src="/img/wavesOpacityWhite.svg" alt="" class="w-full h-20" />
    </div>
  </div>
  <main class="max-w-[80rem] mx-auto px-20">
    <section class="bg-base-100" id="concept">
        <h2 class="text-center text-2xl font-semibold py-10">Concept</h2>
        <p class="text-center">学生の勉強効率の向上、指導員の書籍管理、貸出管理などの業務効率化を目指しています。</p>
        <div class="card--container flex justify-center gap-10">
          <div class="card card-compact border">
            <p>本のデータベース登録・管理</p>
          </div>
          <div class="card card-compact border">
            <p>本の貸出・返却システム</p>
          </div>
          <div class="card card-compact border">
            <p>検索・レビューで必要な本を探す</p>
          </div>
        </div>
    </section>
    <section class="bg-base-100" id="features">
        <h2 class="text-center text-2xl font-semibold pt-10">Features</h2>
        
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom',
});
const logIn = () => {
  const { logIn } = useAuth();
  logIn();
};
</script>

<style scoped>
.progress--bar {
  view-transition-name: progress-bar;
}
</style>

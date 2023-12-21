<template>
  <div class="w-0 h-5 bg-primary absolute top-0 progress--bar"></div>
  <div class="hero min-h-[80vh] bg-[#d4f2fd] relative">
    <div class="absolute top-0 w-full">
      <img src="/img/wavesOpacityBlue.svg" alt="" class="w-full h-20" />
    </div>
    <div class="hero-content flex-row mx-auto justify-between px-10">
      <div>
        <h1 class="text-2xl font-bold mb-10 leading-10">
          今の自分に必要な本がきっと見つかる
        </h1>
        <div>
          <p class="text-lg">
            このアプリで教室の本棚をオンラインに！<br />
            検索・貸出・レビューのサイクルで学習を効率化
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
  <main>
    <section class="bg-base-100 pb-32 relative" id="concept">
      <div class="max-w-[80rem] mx-auto px-10">
        <h2 class="text-center text-2xl font-semibold py-10">Concept</h2>
        <div class="flex">
          <div class="w-[50%] py-10 px-5">
            <h3 class="font-semibold mb-5 text-primary">
              知識や学びを共有し、つながる新しい学習の場
            </h3>
            <p>
              このアプリは、学習コミュニティの活性化ツールです。本のデータベース登録、様々な切り口による検索、有益なレビュー、そして本の貸出まで、学びを支えるすべての機能をひとつに統合しました。学習コミュニティのために設計され、知識の共有を重視し、つながりを育む新しい学習の場を提供します。
            </p>
          </div>
          <div class="w-[50%]">
            <img src="/img/undraw_Educator.png" alt="" />
          </div>
        </div>

        <div class="card--container flex justify-center gap-10 mt-10">
          <div class="card card-compact border border-primary w-[23%]">
            <Icon
              name="fluent:book-database-20-regular"
              size="2rem"
              class="mx-auto mt-8 mb-6"
            />
            <div class="card-body">
              <p class="font-semibold text-primary">本を登録する</p>
              <p>
                本のデータは簡単なフォームに入力して送信するだけで簡単に登録できます。ラベルやジャンルをつけて学生が目的に合った本を見つけやすくします。
              </p>
            </div>
          </div>
          <div class="card card-compact border border-primary w-[23%]">
            <Icon
              name="ant-design:search-outlined"
              size="2rem"
              class="mx-auto mt-8 mb-6"
            />
            <div class="card-body">
              <p class="font-semibold text-primary">検索で必要な本を探す</p>
              <p>
                外部の検索エンジンを搭載しており、高精度なキーワード検索、ジャンルやラベル、レビュースコアでの検索や出版年によるソートなどが可能です。
              </p>
            </div>
          </div>
          <div class="card card-compact border border-primary w-[23%]">
            <Icon
              name="material-symbols-light:contract-edit"
              size="2rem"
              class="mx-auto mt-8 mb-6"
            />
            <div class="card-body">
              <p class="font-semibold text-primary">本を借りる・返す</p>
              <p>
                本を借りるときはカレンダーから返却予定日を選択するだけで簡単に貸出リクエストを送信することができます。本の貸出状況は貸出記録から確認できます。
              </p>
            </div>
          </div>
          <div class="card card-compact border border-primary w-[23%]">
            <Icon name="bi:star" size="2rem" class="mx-auto mt-8 mb-6" />
            <div class="card-body">
              <p class="font-semibold text-primary">レビューを書く</p>
              <p>
                他者の書いたレビューが本選びをする上で重要な情報になります。もちろん、あなたのレビューも誰かの学習の手助けとなります。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 w-full">
        <img
          src="/img/wavesOpacityBlue.svg"
          alt=""
          class="w-full h-20 scale-y-[-1]"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "custom",
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

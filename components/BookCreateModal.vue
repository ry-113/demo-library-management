<template>
  <dialog id="newBook" class="modal">
    <div class="modal-box max-w-[900px] p-20 text-left">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form class="flex w-full gap-[4%]">
        <div class="left--box w-[48%]">
          <div class="mb-5">
            <label for="isbn">
              ISBN
              <input
                type="text"
                placeholder="ISBNを入力してください"
                class="input input-bordered w-full"
                id="isbn"
                v-model="reviewTitle"
                required
              />
            </label>
          </div>
          <div class="mb-5">
            <label for="title">
              タイトル
              <input
                type="text"
                placeholder="タイトルを入力してください"
                class="input input-bordered w-full"
                id="title"
                v-model="reviewTitle"
                required
              />
            </label>
          </div>
          <div class="mb-5">
            <label for="author">
              著者名
              <input
                type="text"
                placeholder="著者を入力してください"
                class="input input-bordered w-full"
                id="author"
                v-model="reviewTitle"
                required
              />
            </label>
          </div>
          <div class="mb-5 inline-block mr-3">
            <label for="year-select">
              <p>出版年</p>
              <select
                class="select select-bordered max-w-[130px] min-w-[130px] mb-3"
                v-model="selectedGenre"
                id="year-select"
              >
                <option selected disabled>選択</option>
                <option v-for="num in 41" :key="num" :value="num + 1989">
                  {{ num + 1989 }}
                </option>
              </select>
            </label>
          </div>
          <div class="mb-5 inline-block">
            <label for="genre-select">
              <p>ジャンル</p>
              <select
                class="select select-bordered max-w-[130px] min-w-[130px] mb-3"
                v-model="selectedGenre"
                id="genre-select"
              >
                <option selected disabled>選択</option>
                <option v-for="genre in genres" :key="genre" :value="genre">
                  {{ genre }}
                </option>
              </select>
            </label>
          </div>
          <label for="">
            <p>画像</p>
            <input
              type="file"
              class="file-input file-input-bordered w-full max-w-xs"
              @change="handleFileUpload"
            />
            <div v-if="imageURL" class="mt-5">
              <img :src="imageURL" alt="" class="w-[300px]" />
            </div>
            <div v-else>
              <img src="/img/noimage.png" class="w-[350px]" alt="" />
            </div>
          </label>
        </div>
        <div class="right--box w-[48%]">
          <p>ラベル</p>
          <label for="badge" class="flex items-center space-x-2">
            <input type="checkbox" class="hidden" id="badge" v-model="isChecked" />
            <div
              class="bg-red-400 rounded-md py-2 px-3 text-white"
              :class="{ 'opacity-50': !isChecked }"
            >
              初心者向け
            </div>
          </label>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const { booksByGenre } = useBookStore();
const genres = computed(() => Object.keys(booksByGenre.value));

const imageURL = ref(null);
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageURL.value = e.target?.result;
    };
    reader.readAsDataURL(file);
  } else {
    imageURL.value = null;
  }
};

const isChecked = ref(false);
</script>

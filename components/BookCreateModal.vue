<template>
  <dialog id="newBook" class="modal">
    <div class="modal-box max-w-[900px] p-20 text-left">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <form class="flex w-full gap-[4%]" @submit.prevent="createBook">
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
                <option
                  v-for="genre in genres"
                  :key="genre.name"
                  :value="genre.name"
                >
                  {{ genre.name }}
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
              <img :src="imageURL" alt="" class="w-[300px] rounded-lg" />
            </div>
            <div v-else class="mt-5">
              <img
                src="/img/noimage.png"
                class="w-[300px] h-[424px] bg-gray-100 object-contain rounded-lg"
                alt=""
              />
            </div>
          </label>
        </div>
        <div class="right--box w-[48%]">
          <p>ラベル</p>
          <div class="flex flex-wrap mb-5">
            <label
              v-for="(label, index) in labels"
              :key="label.name"
              :for="`label-${index}`"
              class="flex items-center space-x-2 space-y-1"
            >
              <input
                type="checkbox"
                class="hidden"
                :id="`label-${index}`"
                v-model="label.isChecked"
              />
              <div
                class="badge badge-lg rounded-md py-4 px-3 text-white"
                :class="[
                  getBgColor(label.color),
                  { 'bg-gray-400': !label.isChecked },
                ]"
              >
                {{ label.name }}
              </div>
            </label>
          </div>
          <div class="mb-5">
            <label for="content">
              説明
              <textarea
                class="textarea textarea-bordered w-full text-base h-[300px]"
                placeholder="500文字以内で入力してください"
                id="content"
                v-model="reviewContent"
                required
              ></textarea>
            </label>
          </div>
          <button class="btn block ml-auto">
            登録
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const { genres } = useGenreStore();
const { labels } = useLabelStore();
const getBgColor = (color: string) => {
  switch (color) {
    case "red":
      return "bg-red-400";
    case "blue":
      return "bg-blue-400";
    case "green":
      return "bg-green-400";
    case "yellow":
      return "bg-yellow-400";
    case "purple":
      return "bg-purple-400";
  }
};

const imageURL: Ref<any> = ref(null);//プレビュー用のデータ
const imageFile:Ref<File | null> = ref(null);//こっちがcloudstorage用
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      imageURL.value = e.target?.result;
    }
  } else {
    imageURL.value = null;
  }
  imageFile.value = file
};

const createBook = async () => {
  await uploadImage(imageFile.value);
};
const { uploadImage } = useBookStorage();
</script>

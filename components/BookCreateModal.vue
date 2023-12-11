<template>
  <dialog id="newBook" class="modal">
    <div class="modal-box max-w-[900px] p-20 text-left">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form class="flex w-full gap-[4%]" @submit.prevent="submitBookData">
        <div class="left--box w-[48%]">
          <div class="mb-5">
            <label for="isbn">
              ISBN
              <input
                type="text"
                placeholder="ISBNを入力してください"
                class="input input-bordered w-full"
                id="isbn"
                v-model="newBook.ISBN"
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
                v-model="newBook.title"
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
                v-model="newBook.author"
                required
              />
            </label>
          </div>
          <div class="mb-5 inline-block mr-3">
            <label for="year-select">
              <p>出版年</p>
              <select
                class="select select-bordered max-w-[130px] min-w-[130px] mb-3"
                v-model="newBook.year"
                id="year-select"
                required
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
                v-model="newBook.genre"
                id="genre-select"
                required
              >
                <option selected disabled>選択</option>
                <option v-for="genre in genres" :key="genre.name" :value="genre.name">
                  {{ genre.name }}
                </option>
              </select>
            </label>
          </div>
          <div class="mb-5 inline-block">
            <label for="stock-select">
              <p>在庫数</p>
              <select
                class="select select-bordered max-w-[130px] min-w-[130px] mb-3"
                v-model="newBook.stock"
                id="stock-select"
                required
              >
                <option selected disabled>選択</option>
                <option v-for="num in 30" :key="num" :value="num">
                  {{ num }}
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
                class="object-contain rounded-lg"
                alt=""
              />
            </div>
          </label>
        </div>
        <div class="right--box w-[48%]">
          <p>ラベル</p>
          <div class="flex flex-wrap mb-5 border rounded-lg py-2 border-gray-300">
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
                class="badge badge-lg rounded-md py-4 px-3 text-white cursor-pointer"
                :class="[getBgColor(label), { 'bg-gray-400': !label.isChecked }]"
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
                v-model="newBook.description"
                required
              ></textarea>
            </label>
          </div>
          <button class="btn block ml-auto">登録</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
interface Props {
  newBook: Book;
}
const { newBook } = defineProps<Props>();

interface Emits {
  (e: 'changeBookData', value: Book): void;
  (e: 'changeImageFile', value: File): void;
  (e: 'submitBookData'): void;
  (e: "checkLabel", value: Label[]): void;
}
const emit = defineEmits<Emits>();
const { genres } = useGenreStore();
const { labels } = useLabelStore();
const getBgColor = (label: Label) => {
  if (!label.isChecked) {
    return false;
  }
  const str = `bg-${label.color}-400`;
  return str;
};

const imageURL: Ref<any> = ref(null); //プレビュー用のデータ
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  const maxFileSize = 1024 * 200;//200KB
  if (file && file.size > maxFileSize) {
    alert("ファイルサイズが大きすぎます。200KB以下のファイルを選択してください。");
    e.target.value = null;
  }else if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      imageURL.value = e.target?.result;
    };
  } else {
    imageURL.value = null;
    alert("無効なファイルです。画像ファイルを指定してください。");
    e.target.value = null;
  }
  emit('changeImageFile', file);
};

//フォームの入力をリアルタイムに監視
watch(newBook, (newValue) => {
  emit("changeBookData", newValue);
}, { immediate: true, deep: true });

watch(labels, (newValue) => {
  emit("checkLabel", newValue);
}, {immediate: true, deep: true});

const submitBookData = () => {
  emit("submitBookData");
};
</script>

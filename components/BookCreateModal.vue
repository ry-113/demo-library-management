<template>
  <dialog id="newBook" class="modal">
    <div class="modal-box max-w-[900px] p-20 text-left">
      <form method="dialog">
        <button class="btn btn-md btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form class="addForm flex w-full gap-[4%]" @submit.prevent="submitBookData">
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
          <div class="flex items-center">
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
            <div class="mb-5 flex items-center">
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
              <div class="dropdown dropdown-bottom">
                <div tabindex="0" role="button" class="btn ml-1 -mb-[10px]">
                  <Icon
                    name="fluent:edit-24-regular"
                    size="1.5rem"
                    class="inline-block text-gray-500"
                  />
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-60 border shadow-md"
                >
                  <p class="mb-2">
                    新規<Icon name="fluent:add-square-multiple-20-regular" size="1.5rem" />
                  </p>
                  <form class="flex justify-end flex-wrap" @submit.prevent="addGenreReq">
                    <input
                      class="input input-sm border border-gray-400 rounded-md mb-4 w-full py-4"
                      placeholder="新しいジャンルを入力してください。"
                      type="text"
                      v-model="newGenre.name"
                      required
                    />
                    <button class="btn btn-sm">追加</button>
                  </form>

                  <p class="pt-3 mt-3 border-t border-t-gray-300">
                    削除<Icon name="fluent:delete-20-regular" size="1.3rem" class="mb-1" />
                  </p>
                  <p v-if="genres.length === 0" class="text-gray-400 pl-2">ジャンルがありません。</p>
                  <ul>
                    <li v-for="genre in genres" :key="genre.name" @click="deleteGenreReq(genre)">
                      <div>
                        <Icon
                          name="ic:twotone-remove-circle-outline"
                          size="1.25rem"
                          class="text-red-400"
                        />
                        <p>{{ genre.name }}</p>
                      </div>
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
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
              ref="inputFile"
              @change="handleFileUpload"
            />
            <div v-if="imageURL" class="mt-5">
              <img :src="imageURL" alt="" class="w-[300px] rounded-lg" />
            </div>
            <div v-else class="mt-5">
              <img src="/img/noimage.png" class="object-contain rounded-lg" alt="" />
            </div>
          </label>
        </div>
        <div class="right--box w-[48%]">
          <p>ラベル</p>
          <div class="flex flex-wrap mb-2 border rounded-lg py-2 border-gray-300">
            <p v-if="newBook.labels.length === 0" class="text-gray-400 pl-2">
              下からラベルを選択してください。
            </p>
            <label
              v-for="(label, index) in newBook.labels"
              :key="label.name"
              :for="`${label.name}-${label.labelid}`"
              class="flex items-center space-x-2 space-y-1"
            >
              <input
                type="checkbox"
                class="hidden"
                :id="`${label.name}-${label.labelid}`"
                v-model="label.isChecked"
                @change="moveLabel(label, newBook.labels, labels)"
              />
              <div
                class="badge badge-lg rounded-md py-4 px-3 text-white cursor-pointer"
                :class="[getBgColor(label), { 'bg-gray-400': !label.isChecked }]"
              >
                {{ label.name }}
              </div>
            </label>
          </div>
          <div class="flex flex-wrap mb-1 border rounded-lg py-2 border-gray-300">
            <p v-if="labels.length === 0" class="text-gray-400 pl-2">ラベルがありません。</p>
            <label
              v-for="(label, index) in labels"
              :key="label.name"
              :for="`${label.name}-${label.labelid}`"
              class="flex items-center space-x-2 space-y-1"
            >
              <input
                type="checkbox"
                class="hidden"
                :id="`${label.name}-${label.labelid}`"
                v-model="label.isChecked"
                @change="moveLabel(label, labels, newBook.labels)"
              />
              <div
                class="badge badge-lg rounded-md py-4 px-3 text-white cursor-pointer"
                :class="[getBgColor(label), { 'bg-gray-400': !label.isChecked }]"
              >
                {{ label.name }}
              </div>
            </label>
          </div>
          <div class="dropdown dropdown-bottom flex justify-end mb-5">
            <div tabindex="0" role="button" class="btn">
              <Icon
                name="fluent:edit-24-regular"
                size="1.5rem"
                class="inline-block text-gray-500"
              />
            </div>

            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-60 border shadow-md"
            >
              <p class="mb-2">
                新規<Icon name="fluent:add-square-multiple-20-regular" size="1.5rem" />
              </p>
              <form @submit.prevent="addLabelReq">
                <input
                  class="input input-sm border border-gray-400 rounded-md mb-4 w-full py-4"
                  placeholder="新しいラベルを入力してください。"
                  type="text"
                  v-model="newLabel.name"
                  required
                />
                <select
                  class="select select-sm select-bordered max-w-[130px] min-w-[130px] mb-3"
                  v-model="newLabel.color"
                  required
                >
                  <option selected disabled>選択</option>
                  <option v-for="color in colorList" :key="color" :value="color">
                    {{ color }}
                  </option>
                </select>
                <div
                  v-if="newLabel.name && newLabel.color"
                  class="badge badge-lg rounded-md py-4 px-3 text-white cursor-pointer flex"
                  :class="[getBgColor(newLabel, 'preview')]"
                >
                  {{ newLabel.name }}
                </div>
                <button class="btn btn-sm block ml-auto mt-3">追加</button>
              </form>
              <p class="pt-3 mt-3 border-t border-t-gray-300">
                削除<Icon name="fluent:delete-20-regular" size="1.3rem" class="mb-1" />
              </p>
              <p v-if="labels.length === 0" class="text-gray-400 pl-2">ラベルがありません。</p>
              <ul>
                <li v-for="label in labels" :key="label.name" @click="deleteLabelReq(label)">
                  <div>
                    <Icon
                      name="ic:twotone-remove-circle-outline"
                      size="1.25rem"
                      class="text-red-400"
                    />

                    <p class="text-left">{{ label.name }}</p>
                    <span
                      class="inline-block w-4 h-4 rounded-sm"
                      :class="getBgColor(label, 'preview')"
                    ></span>
                  </div>
                </li>
              </ul>
            </ul>
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
          <button class="btn btn-primary text-white block w-[100px] ml-auto">登録</button>
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
  (e: 'changeImageFile', value: File): void;
  (e: 'submitBookData'): void;
  (e: 'checkLabel', value: Label[]): void;
}
const emit = defineEmits<Emits>();
const { genres, getGenres, addGenre, deleteGenre } = useGenreStore();
const { labels, getLabels, addLabel, deleteLabel } = useLabelStore();
const getBgColor = (label: Label, preview?: string) => {
  if (!label.isChecked && !preview) {
    return;
  }
  const str = `bg-${label.color}-400`;
  return str;
};

const moveLabel = (label: Label, sourceArray: Label[], destinationArray: Label[]) => {
  const index = sourceArray.indexOf(label);
  if (index !== -1) {
    sourceArray.splice(index, 1);
    destinationArray.push(label);
  }
};
const inputFile = ref(null);

const imageURL: Ref<any> = ref(null); //プレビュー用のデータ
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  const maxFileSize = 1024 * 200; //200KB
  if (file && file.size > maxFileSize) {
    alert('ファイルサイズが大きすぎます。200KB以下のファイルを選択してください。');
    e.target.value = null;
  } else if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      imageURL.value = e.target?.result;
    };
  } else {
    imageURL.value = null;
    alert('無効なファイルです。画像ファイルを指定してください。');
    e.target.value = null;
  }
  emit('changeImageFile', file);
};

const newGenre: Ref<Genre> = ref({
  name: '',
  genreid: '',
});
const addGenreReq = async () => {
  await addGenre(newGenre.value);
  await getGenres();
  newGenre.value.name = '';
};
const deleteGenreReq = async (genre: Genre) => {
  const answer = confirm(`${genre.name}を削除します。よろしいですか？`);
  if (answer) {
    await deleteGenre(genre);
    await getGenres();
  }
};
const colorList = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];
const newLabel: Ref<Label> = ref({
  name: '',
  color: '',
  isChecked: false,
  labelid: '',
});
const addLabelReq = async () => {
  await addLabel(newLabel.value);
  await getLabels();
  newLabel.value.name = '';
  newLabel.value.color = '';
};
const deleteLabelReq = async (label: Label) => {
  const answer = confirm(`${label.name}を削除します。よろしいですか？`);
  if (answer) {
    await deleteLabel(label);
    await getLabels();
  }
};


const submitBookData = () => {
  emit('submitBookData');
  if (inputFile.value) {
    inputFile.value.value = null;
    imageURL.value = null;
  }
};
</script>

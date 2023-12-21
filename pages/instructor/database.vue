<template>
  <div>
    <NuxtLayout name="default">
      <template #table-header>
        <div class="flex justify-between items-center">
          <label for="genre-filter">
            <div class="inline-block mr-2">
              フィルタ<Icon name="fluent:filter-12-regular" class="ml-2" />
            </div>
            <select
              class="select select-bordered max-w-[130px] min-w-[130px] mb-3"
              v-model="selectedGenre"
              id="genre-filter"
            >
              <option selected>すべて</option>
              <option v-for="genre in genres" :key="genre" :value="genre">
                {{ genre }}
              </option>
            </select>
          </label>
          <button class="btn btn-primary text-white" @click.stop="showCreateModal()">
            追加
            <Icon name="ant-design:plus-outlined" size="1.35rem" />
          </button>
          <BookCreateModal
            :newBook="newBook"
            :imageFile="imageFile"
            @change-image-file="changeImageFile"
            @change-book-data="changeBookData"
            @check-label="checkLabel"
            @submit-book-data="submitBookData"
          />
        </div>
      </template>
      <template #default>
        <div v-if="isLoading" class="w-full h-[85vh] flex justify-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <table v-else class="table table-pin-rows">
          <thead class="text-sm">
            <tr>
              <td></td>
              <td>タイトル</td>
              <td>著者名</td>
              <td>出版年</td>
              <td>ジャンル</td>
            </tr>
          </thead>
          <tbody>
            <template v-if="filteredBooks.length === 0">
              <td colspan="5">
                <p class="flex justify-center py-40 text-gray-500">
                  本がありません。右上の追加ボタンから追加してください。
                </p>
              </td>
            </template>
          </tbody>
          <tbody>
            <template v-for="(book, index) in filteredBooks" :key="book.bookid">
              <tr class="hover cursor-pointer" @click="showUpdateModal(book)">
                <th>{{ index + 1 }}</th>
                <td>
                  {{ book.title }}
                </td>
                <td>
                  {{ book.author }}
                </td>
                <td>
                  {{ book.year }}
                </td>
                <td>
                  {{ book.genre }}
                </td>
              </tr>
            </template>
            <BookUpdateModal
              :book="selectedBook"
              :imageFile="imageFile"
              @change-image-file="changeImageFile"
              @update-book-data="updateBookData"
              @delete-book-data="deleteBookData"
            />
          </tbody>
        </table>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth'],
});

const { allBooks, isLoading, booksByGenre, getAllBooks, deleteBook, addBook, updateBook } =
  useBookStore();

const selectedGenre = ref('すべて');
const genres = computed(() => Object.keys(booksByGenre.value));
const filteredBooks = computed(() => {
  if (selectedGenre.value === 'すべて') {
    return allBooks.value;
  } else {
    const filteredBooks = allBooks.value.filter((book) => book.genre === selectedGenre.value);
    return filteredBooks;
  }
});
const newBookInit: Book = {
  ISBN: '',
  author: '',
  bookid: '',
  description: '',
  genre: '',
  imageURL: '',
  labels: [],
  stock: 1,
  title: '',
  year: new Date().getFullYear(),
};

const selectedBook = ref(newBookInit);
const showCreateModal = () => {
  document.getElementById('newBook')?.showModal();
};
const showUpdateModal = (book: Book) => {
  selectedBook.value = book;
  document.getElementById('book-update')?.showModal();
};

//本の新規登録

const newBook = ref(newBookInit);
const imageFile: Ref<File | null> = ref(null);
const changeImageFile = (file: File) => {
  imageFile.value = file;
};
const changeBookData = (newValue: Book) => {
  newBook.value = newValue;
};
const checkLabel = (newValue: Label[]) => {
  newBook.value.labels = newValue;
};
const submitBookData = async () => {
  try {
    await addBook(newBook.value, imageFile.value);
    await getAllBooks();
    document.getElementById('newBook')?.close();
  } catch (error) {
    console.error(error);
  } finally {
    newBook.value = {
      ISBN: '',
      author: '',
      bookid: '',
      description: '',
      genre: '',
      imageURL: '',
      labels: [],
      stock: 1,
      title: '',
      year: new Date().getFullYear(),
    };
  }
};

const updateBookData = async () => {
  try {
    console.log(selectedBook.value);
    await updateBook(selectedBook.value, imageFile.value);
    await getAllBooks();
    document.getElementById('book-update')?.close();
  } catch (error) {
    console.error(error);
  }
};

const deleteBookData = async (book: Book) => {
  const answer = confirm(`${book.title}を削除します。よろしいですか？`);
  if (answer) {
    try {
      await deleteBook(book);
      await getAllBooks();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

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
          <button class="btn" @click.stop="showBookFormModal(null)">
            追加
            <Icon name="ant-design:plus-outlined" />
            <BookCreateModal/>
          </button>
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
            <template v-for="(book, index) in filteredBooks" :key="book.bookid">
              <tr class="hover cursor-pointer" @click="showBookFormModal(book)">
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
                <BookUpdateModal :book="book" />
              </tr>
            </template>
          </tbody>
        </table>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { allBooks, isLoading, booksByGenre, getAllBooks, deleteBook } = useBookStore();
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

const deleteBookReq = async (bookid: string) => {
  await deleteBook(bookid);
  await getAllBooks();
};

const selectedBook: Ref<Book | null> = ref(null);
const showBookFormModal = (book: Book | null) => {
  selectedBook.value = book;
  const modal = book ? document.getElementById(`book-${book.bookid}`) : document.getElementById("newBook");
  modal?.showModal();
};
</script>

<template>
    <h2 class="text-lg">貸出期間</h2>
  <VueDatePicker v-model="date" range multi-calendars inline auto-apply locale="ja" format="yyyy/MM/dd" :enable-time-picker="false" week-start="0"  :month-change-on-scroll="false"/>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date: Ref<Date[] | null> = ref(null);

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    date.value = [startDate, endDate];
});

//modelValueの変更はemitで知らせる
//modelValueの表示の仕方を調べる
//バリデーションとしてstartDateは今日に固定、期間は30日に制限
</script>

<style>
:root {
    --dp-cell-size: 30px;
    --dp-cellpadding: 5px;
    --dp-cell-border-radius: 50%;
}
.dp__theme_light {
    --dp-range-between-dates-background-color: var(--dp-primary-color, #1976d2);
    --dp-range-between-dates-text-color: var(--dp-hover-color, #f3f3f3);
    --dp-range-between-border-color: var(--dp-primary-colorr, #1976d2);
}
</style>

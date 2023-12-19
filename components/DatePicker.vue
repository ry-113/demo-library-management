<template>
  <h2 class="text-lg">貸出期間</h2>
  <p class="mb-3">
    {{ $dayjs(props.datePeriod[0]).format('YYYY/MM/DD') }} ～
    {{ $dayjs(props.datePeriod[1]).format('YYYY/MM/DD') }}
  </p>
  <VueDatePicker
    :model-value="props.datePeriod"
    required
    range
    max-range="30"
    fixed-start
    multi-calendars
    inline
    auto-apply
    locale="ja"
    :enable-time-picker="false"
    week-start="0"
    :month-change-on-scroll="false"
    @update:model-value="setDatePeriod"
  />
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

interface Props {
  datePeriod: Date[];
}
const props = defineProps<Props>();

interface Emits {
  (e: 'update:modelValue', modelValue: Date[]): void;
}
const emit = defineEmits<Emits>();

const setDatePeriod = (modelValue: Date[]) => {
  emit('update:modelValue', modelValue);
};

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
  --dp-range-between-dates-background-color: var(--dp-primary-color, #0069ff);
  --dp-range-between-dates-text-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-border-color: var(--dp-primary-color, #0069ff);
}
</style>

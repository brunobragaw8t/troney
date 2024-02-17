<script setup lang="ts">
const route = useRoute()

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)

if (
  typeof route.query.month === 'string' &&
  /^\d{4}-\d{2}$/.test(route.query.month)
) {
  const [yearStr, monthStr] = route.query.month.split('-')
  year.value = parseInt(yearStr)
  month.value = parseInt(monthStr)
}

const daysInMonth = computed(() => {
  return new Date(year.value, month.value, 0).getDate()
})

const monthName = computed(() => {
  return new Date(year.value, month.value - 1)
    .toLocaleString('en-GB', { month: 'long' })
})

function previousMonth () {
  if (month.value === 1) {
    year.value--
    month.value = 12
  } else {
    month.value--
  }
}

function nextMonth () {
  if (month.value === 12) {
    year.value++
    month.value = 1
  } else {
    month.value++
  }
}
</script>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h2>{{ monthName }} {{ year }}</h2>

      <div class="d-flex gap-1">
        <AppButton
          v-keymap="'H'"
          label="Previous"
          size="sm"
          variant="secondary"
          @click="previousMonth"
        />

        <AppButton
          v-keymap="'L'"
          label="Next"
          size="sm"
          variant="secondary"
          @click="nextMonth"
        />
      </div>
    </div>

    <p>{{ route.query }}</p>
    <p>{{ year }}</p>
    <p>{{ month }}</p>
    <p>{{ daysInMonth }}</p>
    <p>{{ monthName }}</p>
  </div>
</template>

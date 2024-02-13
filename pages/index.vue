<script setup lang="ts">
const route = useRoute()

let year: number
let month: number

if (
  typeof route.query.month === 'string' &&
  /^\d{4}-\d{2}$/.test(route.query.month)
) {
  const [yearStr, monthStr] = route.query.month.split('-')
  year = parseInt(yearStr)
  month = parseInt(monthStr)
} else {
  year = new Date().getFullYear()
  month = new Date().getMonth() + 1
}

const daysInMonth = new Date(year, month, 0).getDate()
const monthName = new Date(year, month - 1).toLocaleString('en-GB', { month: 'long' })
</script>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h2>{{ monthName }} {{ year }}</h2>

      <div class="d-flex gap-1">
        <AppButton label="Previous" size="sm" variant="secondary" />
        <AppButton label="Next" size="sm" variant="secondary" />
      </div>
    </div>

    <p>{{ route.query }}</p>
    <p>{{ year }}</p>
    <p>{{ month }}</p>
    <p>{{ daysInMonth }}</p>
    <p>{{ monthName }}</p>
  </div>
</template>

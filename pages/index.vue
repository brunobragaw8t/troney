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

const wallets = useWallets().items

const earnings = useEarnings().items

const buckets = computed(() => {
  return useBuckets().items.value.map((b) => {
    return {
      id: b.id,
      name: b.name,
      value: earnings.value
        .filter((e) => {
          const date = new Date(e.created_at).getTime()
          const max = new Date(year.value, month.value, 0).getTime()
          return date <= max
        })
        .reduce((acc, e) => acc + e.value * b.percentage / 100, 0)
    }
  })
})
</script>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2>{{ monthName }} {{ year }}</h2>

      <div class="d-flex gap-1">
        <AppButton
          v-keymap="'H'"
          icon="fa6-solid:angle-left"
          size="sm"
          variant="secondary"
          @click="previousMonth"
        />

        <AppButton
          v-keymap="'L'"
          icon="fa6-solid:angle-right"
          icon-position="right"
          size="sm"
          variant="secondary"
          @click="nextMonth"
        />
      </div>
    </div>

    <div class="d-flex gap-2 mb-3">
      <WalletCard
        v-for="w in wallets"
        :key="w.id"
        :name="w.name"
        :balance="w.initial_balance"
        class="flex-fill"
      />
    </div>

    <div class="d-flex gap-2">
      <BucketCard
        v-for="b in buckets"
        :key="b.id"
        class="flex-fill"
        :name="b.name"
        :value="b.value"
      />
    </div>

    <p>{{ route.query }}</p>
    <p>{{ year }}</p>
    <p>{{ month }}</p>
    <p>{{ daysInMonth }}</p>
    <p>{{ monthName }}</p>
  </div>
</template>

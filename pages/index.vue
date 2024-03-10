<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { getRandomColor } from '~/helpers/get-random-color'

useHead({ title: 'Dashboard - Troney' })

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
const categories = useCategories().items

const earnings = useEarnings().items
const expenses = useExpenses().items

const buckets = computed(() => {
  return useBuckets().items.value.map((b) => {
    let value = 0

    value += earnings.value
      .filter((e) => {
        const date = new Date(e.date).getTime()
        const max = new Date(year.value, month.value, 0).getTime()
        return date <= max
      })
      .reduce((acc, e) => acc + e.value * b.percentage / 100, 0)

    value -= expenses.value
      .filter(e => e.bucket_id === b.id)
      .filter((e) => {
        const date = new Date(e.date).getTime()
        const max = new Date(year.value, month.value, 0).getTime()
        return date <= max
      })
      .reduce((acc, e) => acc + e.value * e.quantity, 0)

    return {
      id: b.id,
      name: b.name,
      value
    }
  })
})

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
)

const expensesThisMonth = computed(() => {
  return expenses.value
    .filter((e) => {
      const date = new Date(e.date).getTime()
      const min = new Date(year.value, month.value - 1, 1).getTime()
      const max = new Date(year.value, month.value, 0).getTime()
      return date >= min && date <= max
    })
})

// TODO: Create a switch between pie and bar chart

const chartData = computed(() => ({
  labels: categories.value.map(c => c.name),
  datasets: [
    {
      data: categories.value.map((c) => {
        return expensesThisMonth.value
          .filter(e => e.category_id === c.id)
          .reduce((acc, e) => acc + e.value * e.quantity, 0)
      }),
      backgroundColor: categories.value.map(c => c.color || getRandomColor()),
      borderWidth: 0
    }
  ]
}))

const chartOptions = ref({
  responsive: true
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

    <div class="d-flex gap-2 mb-5">
      <BucketCard
        v-for="b in buckets"
        :key="b.id"
        class="flex-fill"
        :name="b.name"
        :value="b.value"
      />
    </div>

    <div>
      <h4 class="mb-4 text-center">
        Expenses per category
      </h4>

      <div class="mx-auto" style="max-width: 20rem">
        <Pie
          id="expenses-per-category-chart"
          :options="chartOptions"
          :data="chartData"
        />
      </div>
    </div>
  </div>
</template>

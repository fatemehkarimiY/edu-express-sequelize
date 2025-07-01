<template>
  <div class="card">
    <div class="flex justify-center mb-6">
      <SelectButton
        v-model="size"
        :options="sizeOptions"
        optionLabel="label"
        dataKey="label"
      />
    </div>
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Column, DataTable, SelectButton } from "primevue";
// import { DataTable, SelectButton } from "primevue";

onMounted(() => {
  axios({
    headers: {
      Accept: "*/*",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6bnVsbCwiaWF0IjoxNzUwODUwMDc5LCJleHAiOjE3NTEzNjg0Nzl9.MKS7FwyAEDhigaxZd_fDu-3CzUbkzhadF3AdlqCBAxs",
    },
  })
    .get("course")
    .then((res) => {
      console.log(res);
    });
  //   ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();
const size = ref({ label: "Normal", value: "null" });
const sizeOptions = ref([
  { label: "Small", value: "small" },
  { label: "Normal", value: "null" },
  { label: "Large", value: "large" },
]);
</script>

<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="floating-container">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-input
            outlined
            v-model="fn"
            placeholder="First Name"
            :dense="dense"
            class="q-mb-md"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="mn"
            placeholder="Middle Name"
            :dense="dense"
            class="q-mb-md"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="ln"
            placeholder="Last Name"
            :dense="dense"
            class="q-mb-md"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="ea"
            placeholder="Email Address"
            :dense="dense"
            class="q-mb-md"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="add"
            placeholder="Address"
            :dense="dense"
            class="q-mb-md"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="con"
            placeholder="Contact"
            :dense="dense"
            class="q-mb-md"
          />
        </div>
      </div>
      <div class="btn-container">
        <q-btn class="btnSave" color="primary" label="Save" />
      </div>
    </div>
  </q-page>
</template>

<script>

import { onMounted } from "vue"; // Import onMounted/
import axios from "axios"; // Import axios

export default {
  data() {
    return {
      fn: '',
      mn: '',
      ln: '',
      ea: '',
      add: '',
      con: '',
      dense: true, // Optional: compact inputs
    };
  },
  mounted() {
    // Fetch data from route query
    const query = this.$route.query;

    this.fn = query.firstName || '';
    this.mn = query.middleName || '';
    this.ln = query.lastName || '';
    this.ea = query.email || '';
    this.add = query.address || '';
    this.con = query.contact || '';
  }
};
</script>

<style lang="scss">
.floating-container {
  background-color: rgb(255, 255, 255);
  padding: 5rem;
  border-radius: 10px;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.1);
  max-width: 1500px;
  width: 100%;
  height: 500px;
  justify-content: center;
}
.btnSave{
  position: sticky;
  margin-top: 10vh;
  left: 118vh;
}
</style>
<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="floating-container">
      <div class="row q-col-gutter-lg">
        <!-- Input Fields -->
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
      <!-- Button -->
      <div class="btn-container">
        <q-btn
          class="btnSave"
          color="primary"
          :label="isUpdate ? 'Update' : 'Save'"
          :loading="btnLoadingState"
          @click="saveUser"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      rows: [], // User list
      fn: "", // First Name
      mn: "", // Middle Name
      ln: "", // Last Name
      ea: "", // Email Address
      add: "", // Address
      con: "", // Contact
      dense: true, // Compact input
      btnLoadingState: false, // Loading state for the button
      isUpdate: false, // Tracks if this is an update
      selectedId: null, // ID of the user being edited
    };
  },
  mounted() {
    const query = this.$route.query;

    // Populate fields if editing
    this.fn = query.firstName || "";
    this.mn = query.middleName || "";
    this.ln = query.lastName || "";
    this.ea = query.email || "";
    this.add = query.address || "";
    this.con = query.contact || "";

    // Determine if the operation is an update
    this.selectedId = this.$route.params.id || null;
    this.isUpdate = !!this.selectedId;
  },
  methods: {
    saveUser() {
      const userData = {
        firstName: this.fn,
        middleName: this.mn,
        lastName: this.ln,
        email: this.ea,
        address: this.add,
        contact: this.con,
      };

      this.btnLoadingState = true;

      if (this.isUpdate) {
        // Update logic
        axios
          .put(`https://jsonplaceholder.typicode.com/users/${this.selectedId}`, userData)
          .then((response) => {
            if (response.status === 200) {
              console.log("User updated successfully:", response.data);

              // Update the local table row
              const index = this.rows.findIndex((row) => row.id === this.selectedId);
              if (index !== -1) {
                this.$set(this.rows, index, { ...this.rows[index], ...response.data });
              }

              this.resetForm();
            }
          })
          .catch((error) => console.error("Failed to update user:", error))
          .finally(() => {
            this.btnLoadingState = false;
          });
      } else {
        // Add logic
        axios
          .post("https://jsonplaceholder.typicode.com/users", userData)
          .then((response) => {
            if (response.status === 201) {
              console.log("User added successfully:", response.data);

              // Add the user to the table
              this.rows.unshift(response.data);

              this.resetForm();
            }
          })
          .catch((error) => console.error("Failed to add user:", error))
          .finally(() => {
            this.btnLoadingState = false;
          });
      }
    },
    resetForm() {
      // Reset form and state
      this.fn = "";
      this.mn = "";
      this.ln = "";
      this.ea = "";
      this.add = "";
      this.con = "";
      this.isUpdate = false;
      this.selectedId = null;

      // Navigate back to the user list
      this.$router.push({ name: "User" });
    },
  },
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
.btnSave {
  margin-top: 10vh;
  left: 67vh;
}
</style>

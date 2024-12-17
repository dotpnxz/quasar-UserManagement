<template>
  <q-page class="q-pa-md">
    <div class="user-container">
      <!-- Header with Search and Add User -->
      <div class="header q-mb-md row justify-between items-center">
        <div class="search-container">
          <q-input
            v-model="searchQuery"
            placeholder="Search users"
            outlined
            @input="filterUsers"
          />
        </div>
        <div class="action-container">
          <q-btn
            flat
            round
            dense
            color="primary"
            label="Add User"
            icon="add"
            @click="addUser"
          />
        </div>
      </div>

      <!-- Users Table -->
      <q-table
        :rows="filteredUsers"
        :columns="columns"
        row-key="id"
        flat
        dense
      >
        <!-- Actions Column -->
        <template v-slot:body-cell-actions="props">
          <div class="row justify-end items-center">
            <!-- Edit Button -->
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="edit"
              @click="editUser(props.row)"
            />
            <!-- Delete Button -->
            <q-btn
              flat
              round
              dense
              color="negative"
              icon="delete"
              @click="deleteUser(props.row.id)"
            />
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>


<script>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const users = ref([]);
    const filteredUsers = ref([]);
    const searchQuery = ref('');

    const columns = ref([
      { name: 'firstName', label: 'First Name', field: 'firstName', align: 'left' },
      { name: 'middleName', label: 'Middle Name', field: 'middleName', align: 'left' },
      { name: 'lastName', label: 'Last Name', field: 'lastName', align: 'left' },
      { name: 'email', label: 'Email Address', field: 'email', align: 'left' },
      { name: 'address', label: 'Address', field: 'address', align: 'left' },
      { name: 'contact', label: 'Contact', field: 'contact', align: 'left' },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
    ]);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        users.value = response.data.map(user => ({
          id: user.id,
          firstName: user.name.split(' ')[0] || '',
          middleName: '',
          lastName: user.name.split(' ')[1] || '',
          email: user.email,
          address: `${user.address?.street || ''}, ${user.address?.suite || ''}, ${user.address?.city || ''} - ${user.address?.zipcode || ''}`,
          contact: user.phone
        }));
        filteredUsers.value = users.value;
      } catch (error) {
        console.error('Failed to fetch users:', error);
        users.value = [];
      }
    };

    const addUser = () => {
      router.push({ name: 'CreateUser' });
    };

    const editUser = async (row) => {
      router.push({
        name: 'CreateUser',
        params: { id: row.id },
        query: {
          firstName: row.firstName,
          lastName: row.lastName,
          middleName: row.middleName,
          email: row.email,
          address: row.address,
          contact: row.contact
        }
      });
      try {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${row.id}`, userData);

  if (response.status === 200) {
    console.log('User updated successfully');

    const index = users.value.findIndex(user => user.id === row.id);
    if (index !== -1) {
      users.value[index] = { ...updatedUserData, id: row.id };
      filteredUsers.value = users.value;
    }
  }
} catch (err) {
  console.error('Update failed:', err);
}
    };

    const deleteUser = async (userId) => {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (response.status === 200) {
          users.value = users.value.filter(user => user.id !== userId);
          filteredUsers.value = filteredUsers.value.filter(user => user.id !== userId);
          console.log('User deleted successfully');
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    };

    watch(searchQuery, (newQuery) => {
      const query = newQuery.toLowerCase();
      filteredUsers.value = users.value.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(query)) ||
        (user.middleName && user.middleName.toLowerCase().includes(query)) ||
        (user.lastName && user.lastName.toLowerCase().includes(query)) ||
        (user.address && user.address.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query))
      );
    });

    fetchUsers();

    return {
      searchQuery,
      users,
      filteredUsers,
      columns,
      addUser,
      editUser,
      deleteUser
    };
  }
};
</script>


<style scoped>
.user-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.q-table {
  margin-top: 1rem;
}

.q-btn {
  margin-right: 5px;
}

.q-input {
  max-width: 300px; 
}
</style>

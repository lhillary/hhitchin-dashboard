<template>
  <div>
    <v-card class="mx-auto" flat>
        <v-card-title>Invited Guests Table</v-card-title>
        <v-card-subtitle>View the total status of all invitees</v-card-subtitle>
        <v-card-text>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-text>
        <template>
            <v-data-table
                :headers="allGuestHeaders"
                :items="allGuests"
                :items-per-page="25"
                class="elevation-1"
                :search="search"
            ></v-data-table>
        </template>
    </v-card>
  </div>
</template>

<script>
  import { getGuests } from '../services/WeddingService';

  export default {
    name: 'Table',
    data() {
      return {
        allGuestHeaders: [
            {
                text: 'ID',
                align: 'start',
                sortable: true,
                value: 'id'
            },
            {text: 'Name', value: 'name'},
            {text: 'Phone', value: 'phone'},
            {text: 'Responded', value: 'responded'},
            {text: 'Attending', value: 'attending'},
            {text: 'Number Attending', value: 'number'}
        ],
        allGuests: [],
        search: ''
      }
    },
    created() {
        this.getAllGuests();
    },
    methods: {
        async getAllGuests() {
            const accessToken = await this.$auth.getTokenSilently();
        
            getGuests(accessToken).then(res => {
                this.allGuests = res;
            });
        }
    }
  }
</script>

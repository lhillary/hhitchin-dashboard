<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          lg="6"
          sm="12"
        >
          <v-card height="300px">
            <v-card-title>Guest Attendance</v-card-title>
            <v-card-text>
              <GChart
                v-if="loading1 && loading3"
                :settings="{ packages: ['corechart'] }"
                type="BarChart"
                :data="attendingData"
                :options="attendingOptions"
              />
              <div v-else>
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          lg="6"
          sm="12"
        >
          <v-card height="300px">
            <v-card-title>Guest Response</v-card-title>
            <v-card-text>
              <GChart
                v-if="loading2 && loading3"
                :settings="{ packages: ['corechart'] }"
                type="BarChart"
                :data="respondedData"
                :options="respondedOptions"
              />
              <div v-else>
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          lg="6"
          sm="12"
        >
          <v-card height="300px">
            <v-card-title>Total Attending</v-card-title>
            <v-card-text>
              <div
                v-if="loading4"
                v-text="totalAttending"
                class="text-h1 mb--1 font-weight-black"
              ></div>
              <div v-else>
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          lg="6"
          sm="12"
        >
          <v-card height="300px">
            <v-card-title>Total Declined/Error</v-card-title>
            <v-card-text>
              <div
                v-if="loading4"
                v-text="totalDeclined"
                class="text-h1 mb--1 font-weight-black"
              ></div>
              <div v-else>
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { getGuests, getChaseGuests, getAttendingGuests, getDeclinedGuests } from '../services/WeddingService';
  import { GChart } from 'vue-google-charts';

  export default {
    name: 'Dashboard',
    data() {
      return {
        allGuests: [],
        chaseGuests: [],
        attendingGuests: [],
        declinedGuests: [],
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false,
        attendingData: [],
        attending: 0,
        notAttending: 0,
        responded: 0,
        notResponded: 0,
        attendingOptions: {
          chart: {
            title: 'Guest Attendance'
          }
        },
        respondedOptions: {
          chart: {
            title: 'Guest Response'
          }
        },
        respondedData: [],
        totalAttending: 0,
        totalDeclined: 0
      }
    },
    created() {
      this.getAllGuests();
      this.getAllChaseGuests();
      this.getAllAttendingGuests();
      this.getAllDeclinedGuests();
    },
    beforeUpdate() {
      this.createAttendingChartData();
      this.createRespondedChartData();
      this.calculateTotalAttendingNumber();
      this.calculateTotalDeclinedNumber();
    },
    components: {
      GChart
    },
    methods: {
      async getAllGuests() {
        const accessToken = await this.$auth.getTokenSilently();

        getGuests(accessToken).then(res => {
          this.allGuests = res;
          this.loading1 = true;
        });
      },
      async getAllChaseGuests() {
        const accessToken = await this.$auth.getTokenSilently();

        getChaseGuests(accessToken).then(res => {
          this.chaseGuests = res;
          this.loading2 = true;
        });
      },
      async getAllAttendingGuests() {
        const accessToken = await this.$auth.getTokenSilently();

        getAttendingGuests(accessToken).then(res => {
          this.attendingGuests = res;
          this.loading3 = true;
        });
      },
      async getAllDeclinedGuests() {
        const accessToken = await this.$auth.getTokenSilently();

        getDeclinedGuests(accessToken).then(res => {
          this.declinedGuests = res;
          this.loading4 = true;
        });
      },
      calculateAttendingNumber() {
        let count = 0;
        for (var i =0; i < this.attendingGuests.length; i++) {
          count += 1;
        }
        this.attending = count;
        return this.attending;
      },

      calculateNotAttendingNumber() {
        let total = 0;
        for (var i = 0; i < this.allGuests.length; i++) {
          total += 1;
        }
        this.notAttending = total - this.attending;
      },
      calculateNotRespondedNumber() {
        let count = 0;
        for (var i =0; i < this.chaseGuests.length; i++) {
          count += 1;
        }
        this.notResponded = count;
      },
      calculateRespondedNumber() {
        let total = 0;
        for (var i = 0; i < this.allGuests.length; i++) {
          total += 1;
        }
        this.responded = total - this.notResponded;
      },
      createAttendingChartData() {

        this.calculateAttendingNumber();
        this.calculateNotAttendingNumber();

        let yes = this.attending;
        let no = this.notAttending;
        this.attendingData = [
          ['Status', 'Number', {role: 'style'}],
          ['Attending', yes, 'color: #76A7FA'],
          ['Not Attending', no, 'opacity: 0.4']
        ];
      },
      createRespondedChartData() {
        
        this.calculateNotRespondedNumber();
        this.calculateRespondedNumber();

        let yes = this.responded;
        let no = this.notResponded;

        this.respondedData = [
          ['Status', 'Number', {role: 'style'}],
          ['Responded', yes, 'color: #76A7FA'],
          ['No Response', no, 'opacity: 0.4']
        ];
      },
      calculateTotalAttendingNumber() {
        let total = 0;

        for (var i = 0; i < this.attendingGuests.length; i++) {
          total = total + Number(this.attendingGuests[i].number);
        }

        this.totalAttending = total;
      },
      calculateTotalDeclinedNumber() {
        let total = 0;

        for (var i = 0; i < this.declinedGuests.length; i++) {
          total += 1;
        }

        this.totalDeclined = total;
      }
    }
  }
</script>

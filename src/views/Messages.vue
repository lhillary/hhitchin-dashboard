<template>
  <div>
  <template>
    <v-tabs v-model="tab">
      <v-tab>Send SMS</v-tab>
      <v-tab>Send Status</v-tab>
      <v-tab>Logs</v-tab>
    </v-tabs>
    <v-container fluid>
      <v-row>
        <v-col cols="12" justify="start">
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card class="mx-auto" flat>
                  <v-card-title>Send Message</v-card-title>
                  <v-card-subtitle>Make sure to select the appropriate audience</v-card-subtitle>
                  <v-form v-model="valid" ref="form">
                    <v-select
                      v-model="guestType"
                      :items="guestTypes"
                      :rules="guestRules"
                      label="Who are you sending this to?"
                      dense
                      solo
                      required
                    ></v-select>
                    <v-textarea
                      v-model="message"
                      :rules="messageRules"
                      solo
                      name="message"
                      label="Message"
                      required
                    ></v-textarea>
                    <v-btn color="primary" @click="onSubmit()">Send</v-btn>
                </v-form>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="mx-auto" flat>
                <v-card-title>Send Status</v-card-title>
                <v-card-subtitle>Shows status of most recently sent messages. Will clear on refresh.</v-card-subtitle>
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
                    :headers="statusHeaders"
                    :items="status"
                    :items-per-page="25"
                    class="elevation-1"
                    :search="search"
                  ></v-data-table>
                </template>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="mx-auto" flat>
                <v-card-title>Message Logs</v-card-title>
                <v-card-subtitle>Shows log of all incoming and outgoing messages.</v-card-subtitle>
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
                    :headers="logHeaders"
                    :items="logData"
                    :items-per-page="25"
                    class="elevation-1"
                    :search="search"
                  ></v-data-table>
                </template>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </template>
  </div>
</template>

<script>
  import { getGuests, getChaseGuests, getAttendingGuests, sendMessage, fetchLogs, getKlayo } from '../services/WeddingService';
  import * as moment from "moment/moment";

  export default {
    name: 'Dashboard',
    data() {
      return {
        tab: null,
        valid: false,
        guestRules: [
          v => !!v || 'Selection is required',
        ],
        messageRules: [
          v => !!v || 'Message is required',
        ],
        guestTypes: ['All Guests', 'No Response', 'Attending Guests', 'Klayo'],
        guestType: '',
        message: '',
        allGuests: [],
        chaseGuests: [],
        attendingGuests: [],
        klayoGuests: [],
        status: [],
        testMessage: {
          number: "+13137275279",
          message: "Testing 123"
        },
        statusHeaders: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name'
          },
          {text: 'Number', value: 'number'},
          {text: 'Status', value: 'status'},
          {text: 'Message', value: 'message'},
          {text: 'Timestamp', value: 'timestamp'}
        ],
        search: '',
        logData: [],
        logHeaders: [
          {
            text: 'To',
            align: 'start',
            sortable: true,
            value: 'to'
          },
          {text: 'From', value: 'from'},
          {text: 'Direction', value: 'direction'},
          {text: 'Message', value: 'body'},
          {text: 'Status', value: 'status'},
          {text: 'Date Sent', value: 'dateSent'}
        ]
      }
    },
    created() {
      this.getAllGuests();
      this.getAllChaseGuests();
      this.getAllAttendingGuests();
      this.getKlayoGuests();
      this.getAllLogs();
    },
    components: {
    },
    methods: {
      async getAllGuests() {
        const accessToken = await this.$auth.getTokenSilently();

        getGuests(accessToken).then(res => {
          this.allGuests = res;
        });
      },
      async getAllChaseGuests() {
        const accessToken = await this.$auth.getTokenSilently();

        getChaseGuests(accessToken).then(res => {
          this.chaseGuests = res;
        });
      },
      async getKlayoGuests() {
        const accessToken = await this.$auth.getTokenSilently();

        getKlayo(accessToken).then(res => {
          this.klayoGuests = res;
        });
      },
      async getAllAttendingGuests() {
        const accessToken = await this.$auth.getTokenSilently();

        getAttendingGuests(accessToken).then(res => {
          this.attendingGuests = res;
        });
      },
      async getAllLogs() {
        const accessToken = await this.$auth.getTokenSilently();

        fetchLogs(accessToken).then(res => {
          this.logData = res;
        });
      },
      onSubmit() {
        let valid = this.validateForm();

        if (!valid) {
          console.log('Form is not valid. Please fill out all fields.')
        } else if (valid) {
          this.sendMessages(this.guestType, this.message);
        }
      },
      validateForm() {
        return this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      sendMessages(guestType, messageBody) {
        let packet = {};
        if (guestType === 'All Guests') {
          for (var i = 0; i < this.allGuests.length; i++) {
            packet = {
              number: this.allGuests[i].phone,
              message: messageBody
            }
            this.sendFullMessage(packet, this.allGuests[i].name);
            this.reset();
            this.resetValidation();
          }
        } else if (guestType === 'No Response') {
          for (var j = 0; j < this.allGuests.length; j++) {
            packet = {
              number: this.chaseGuests[j].phone,
              message: messageBody
            }
            this.sendFullMessage(packet, this.chaseGuests[j].name);
            this.reset();
            this.resetValidation();
          }
        } else if (guestType === 'Klayo') {
          for (var l = 0; l < this.klayoGuests.length; l++) {
            packet = {
              number: this.klayoGuests[l].phone,
              message: messageBody
            }
            this.sendFullMessage(packet, this.klayoGuests[l].name);
            this.reset();
            this.resetValidation();
          }
        } else if (guestType === 'Attending Guests') {
          for (var k = 0; k < this.allGuests.length; k++) {
            packet = {
              number: this.attendingGuests[k].phone,
              message: messageBody
            }
            this.sendFullMessage(packet, this.attendingGuests[k].name);
            this.reset();
            this.resetValidation();
          }
        } else {
          this.reset();
          this.resetValidation();
          return;
        }
      },
      async sendFullMessage(message, name) {
        const accessToken = await this.$auth.getTokenSilently();
        
        sendMessage(message, accessToken).then(res => {
          let status = '';
          let stats = {};
          let date = moment().format();

          if (res.status === 400) {
            status = "Failed: " + res.code;
          } else {
            status = res.status;
          }

          stats = {
            name: name,
            message: message.message,
            number: res.to,
            timestamp: date,
            status: status
          }

          this.status.push(stats);
        });
      }
    }
  }
</script>

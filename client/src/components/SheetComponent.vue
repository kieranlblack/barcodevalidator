<template>
    <div class="container">
        <v-card flat class="mx-auto mt-6">
            <v-card class="mx-auto mt-6">
                <v-toolbar flat extended extension-height="4" color="white">
                    <v-toolbar-title>Files</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" dark class="mb-2" @click="refreshSheets">Refresh</v-btn>
                    <v-progress-linear
                        :active="isLoading"
                        :height="4"
                        :indeterminate="true"
                        slot="extension"
                        color="blue"
                    ></v-progress-linear>
                </v-toolbar>
            </v-card>
            <v-data-table :headers="sheetHeaders" :items="sheets" class="elevation-1">
                <template v-slot:items="props">
                    <tr @click="getSheetData(props.item.name)">
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-right">modified</td>
                        <td class="justify-center layout px-0">
                            <v-icon small @click="deleteSheet(props.item.name)">delete</v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <br />
        <v-card flat class="mx-auto mt-6" v-if="showData">
            <v-card class="mx-auto mt-6">
                <v-toolbar flat extended extension-height="4" color="white">
                    <v-toolbar-title>{{ selectedSheet }}</v-toolbar-title>
                </v-toolbar>
            </v-card>
            <v-data-table
                :headers="dataHeaders"
                :items="sheetData"
                class="elevation-1"
            >
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item["device name"] }}</td>
                    <td class="text-xs-left">{{ props.item.barcode }}</td>
                    <td class="text-xs-left">{{ props.item.quantity }}</td>
                    <td class="text-xs-left">{{ props.item.location }}</td>
                    <td class="text-xs-left">{{ props.item.time }} on {{ props.item.date }}</td>
                    <td class="text-xs-left">{{ props.item.rownum }}</td>
                </template>
            </v-data-table>
        </v-card>
        <br />
        <p class="error text-xs-center" v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import SheetService from "../SheetService";

export default {
    name: "SheetComponent",
    data() {
        return {
            sheetHeaders: [
                {
                    text: "Name",
                    align: "left",
                    sortable: false,
                    value: "name"
                },
                {
                    text: "Last Modified",
                    align: "right",
                    sortable: false,
                    value: "lastModified"
                }
            ],
            dataHeaders: [
                {
                    text: "Device Name",
                    align: "left",
                    sortable: false,
                    value: "name"
                },
                {
                    text: "Barcode",
                    align: "left",
                    sortable: false,
                    value: "barcode"
                },
                {
                    text: "Quantity",
                    align: "left",
                    sortable: false,
                    value: "quantity"
                },
                {
                    text: "Location",
                    align: "left",
                    sortable: false,
                    value: "location"
                },
                {
                    text: "Date/Time",
                    align: "left",
                    sortable: false,
                    value: "date"
                },
                {
                    text: "Row",
                    align: "left",
                    sortable: false,
                    value: "rowNum"
                }
            ],
            sheets: [],
            error: "",
            sheetData: [],
            showData: false,
            selectedSheet: "",
            isLoading: true
        };
    },
    async created() {
        this.refreshSheets();
    },
    methods: {
        async deleteSheet(name) {
            await SheetService.deleteSheet(name);
            this.sheets = await SheetService.getSheets();
        },
        async getSheetData(name) {
            this.isLoading = true;
            this.selectedSheet = name;
            this.sheetData = await SheetService.getSheetData(name);
            this.showData = true;
            this.isLoading = false;
        },
        async refreshSheets() {
            this.isLoading = true;
            this.error = "";
            this.sheets = [];

            try {
                this.sheets = await SheetService.getSheets();
                this.isLoading = false;
            } catch (err) {
                this.error = err.message;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

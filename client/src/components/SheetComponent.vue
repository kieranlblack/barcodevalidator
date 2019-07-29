<template>
    <v-content>
        <v-container fluid>
            <!-- <v-alert color="error" class="text-xs-center mt-0 mb-3" v-show="error">{{ error }}</v-alert> -->
            <v-card flat class="mx-auto mt-0">
                <v-card class="mx-auto mt-0">
                    <v-toolbar flat color="white">
                        <v-flex xs4>
                            <v-toolbar-title>Files</v-toolbar-title>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                v-model="fileSearch"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout justify-end>
                                <v-btn
                                    color="blue"
                                    dark
                                    class="mb-2"
                                    @click="refreshSheets(); refreshSheetData()"
                                >Refresh</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-toolbar>
                </v-card>
                <v-data-table
                    :headers="sheetHeaders"
                    :items="sheets"
                    :search="fileSearch"
                    :loading="isSheetsLoading"
                    no-data-text="No files found"
                    class="elevation-1"
                >
                    <template v-slot:items="props">
                        <tr @click="getSheetData(props.item.fullName)">
                            <td class="text-xs-left">{{ props.item.name }}</td>
                            <td class="justify-center layout px-4">
                                <v-layout justify-end>
                                    <v-btn
                                        class="mx-0"
                                        icon
                                        @click.stop="confirmDelete = true; toDelete = props.item.fullName"
                                    >
                                        <v-icon small>delete</v-icon>
                                    </v-btn>
                                </v-layout>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
                <v-dialog v-model="confirmDelete" max-width="500">
                    <v-card>
                        <v-card-title class="headline grey" primary-title>
                            <strong>Delete</strong>
                            &nbsp;{{ toDelete }}?
                        </v-card-title>
                        <v-card-text>This file will no longer be accesible through the web app unless imported.</v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" text @click="deleteSheet(toDelete)">Delete</v-btn>
                            <v-btn color="grey" text @click="confirmDelete = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
            <v-card flat class="mx-auto mt-5" v-show="showData">
                <v-card class="mx-auto mt-0">
                    <v-toolbar flat color="white">
                        <v-flex xs4>
                            <v-toolbar-title>{{ selectedSheet }}</v-toolbar-title>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                v-model="dataSearch"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout justify-end>
                                <v-btn
                                    color="green"
                                    :dark="!isDataLoading && sheetData.length !== 0"
                                    class="mb-2"
                                    :disabled="isDataLoading || sheetData.length === 0"
                                    @click="exportData"
                                >Export</v-btn>
                                <v-btn color="red" dark class="mb-2" @click="showData = false">Close</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-toolbar>
                </v-card>
                <v-data-table
                    :headers="dataHeaders"
                    :items="sheetData"
                    :search="dataSearch"
                    :loading="isDataLoading"
                    no-data-text="No invalid scans found"
                    :rows-per-page-items="[10, 15, 30, { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }]"
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
        </v-container>
    </v-content>
</template>

<script>
import SheetService from "../SheetService";

export default {
    name: "SheetComponent",
    data() {
        return {
            confirmDelete: false,
            toDelete: "",
            fileSearch: "",
            dataSearch: "",
            sheetHeaders: [
                {
                    text: "Name",
                    align: "left",
                    sortable: false,
                    value: "name"
                },
                {
                    text: "Actions",
                    align: "right",
                    sortable: false,
                    value: "action"
                }
            ],
            dataHeaders: [
                {
                    text: "Device Name",
                    align: "left",
                    sortable: false,
                    value: "device name"
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
                    text: "Time / Date",
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
            isSheetsLoading: true,
            isDataLoading: true
        };
    },
    async created() {
        this.refreshSheets();
    },
    methods: {
        async deleteSheet(name) {
            this.error = "";
            this.confirmDelete = false;

            if (this.selectedSheet === name) {
                this.selectedSheet = "";
                this.showData = false;
                this.sheetData = [];
            }

            await SheetService.deleteSheet(name);
            this.sheets = await SheetService.getSheets();
            this.toDelete = "";
        },
        async getSheetData(name) {
            this.isDataLoading = true;
            this.error = "";
            this.selectedSheet = name;
            this.showData = true;
            this.sheetData = [];

            try {
                this.sheetData = await SheetService.getSheetData(name);
                this.isDataLoading = false;
            } catch (err) {
                this.error = err.message;
            }
        },
        async refreshSheets() {
            this.isSheetsLoading = true;
            this.error = "";
            this.sheets = [];

            try {
                this.sheets = await SheetService.getSheets();
                this.isSheetsLoading = false;
            } catch (err) {
                this.error = err.message;
            }
        },
        async refreshSheetData() {
            if (!this.selectedSheet) return;

            this.isDataLoading = true;
            this.error = "";
            this.sheetData = [];

            try {
                this.sheetData = await SheetService.getSheetData(
                    this.selectedSheet
                );
                this.isDataLoading = false;
            } catch (err) {
                this.error = err.message;
            }
        },
        async exportData() {
            if (this.sheetData.length === 0) return;

            const ele = document.createElement("a");
            const headers = Object.keys(this.sheetData[0]);
            let csv = this.sheetData.map(row =>
                headers
                    .map(fieldName =>
                        JSON.stringify(row[fieldName], (key, value) =>
                            null ? "" : value
                        )
                    )
                    .join(",")
            );

            csv.unshift(
                headers
                    .map(fieldName =>
                        fieldName
                            .split(" ")
                            .map(
                                s => s.charAt(0).toUpperCase() + s.substring(1)
                            )
                            .join(" ")
                    )
                    .join(",")
            );
            csv = csv.join("\r\n");

            ele.style.display = "none";
            ele.setAttribute("href", `data:text/csv;charset=utf-8,${csv}`);
            ele.setAttribute(
                "download",
                `${this.selectedSheet} - Invalid Scans.csv`
            );
            document.body.appendChild(ele);

            ele.click();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

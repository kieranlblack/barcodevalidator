<template>
    <div class="containter">
        <h1>Sheets</h1>
        <p class="error" v-if="error">{{ error }}</p>
        <v-data-table :items="sheets" class="elevation-1">
            <template v-slot:items="props">
                <td>{{ props.item }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import SheetService from "../SheetService";

export default {
    name: "SheetComponent",
    data() {
        return {
            sheets: [],
            error: "",
            sheetData: [],
        };
    },
    async created() {
        try {
            this.sheets = await SheetService.getSheets();
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async deleteSheet(name) {
            await SheetService.deleteSheet(name);
            this.sheets = await SheetService.getSheets();
        },
        async getSheetData(name) {
            this.sheetData = await SheetService.getSheetData(name);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

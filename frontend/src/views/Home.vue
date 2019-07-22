<template>
    <div id="app" class="row">
        <div class="col-xs-6">
            <b-list-group style="width: 20rem;" class="text-center">
                <b-list-group-item
                    href="#"
                    v-for="file in Files"
                    :key="file"
                    @click="getSheetCheck(file)"
                >{{ file }}</b-list-group-item>
            </b-list-group>
        </div>
        <div class="col-xs-6" id="oogabooga" v-for="(row, index) in sheetCheck" :key="index">
            {{ row }}
        </div>
    </div>
</template>
 
<script>
import axios from "axios";

export default {
    name: "home",
    data: () => {
        return {
            Files: {},
            sheetCheck: {},
        };
    },
    mounted() {
        axios
            .get("http://localhost:3000/sheet/list")
            .then((response) => {
                this.Files = response.data;
            })
            .catch(err => console.log);
    },
    methods: {
        getSheetCheck: (sheetName) => {
            axios.get('http://localhost:3000/sheet/check',  { params: { name: sheetName } })
                .then((response) => {
                    this.sheetCheck = response.data;
                })
                .catch(err => console.log);
        },
    },
};
</script>

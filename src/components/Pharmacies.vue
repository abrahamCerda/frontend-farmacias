<template>
  <div>
    <div v-if="!loading">
      <el-form ref="form" v-model="form" label-width="120px" class="p-b-2-5">
        <el-form-item label="Comuna">
          <el-select class="w-100" v-model="form.commune" placeholder="Selecciona una comuna">
            <el-option v-for="commune in communes" :label="commune"
                       :value="commune"
                       :key="commune">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Nombre de local">
          <el-input v-model="form.localName"></el-input>
        </el-form-item>
        <el-button type="primary" class="w-100" @click="getPharmacies">Buscar</el-button>
      </el-form>
      <div>

      </div>
      <el-row class="clearfix">
        <el-col :xs="24" :sm="12"  v-for="(pharmacie, index) in pharmacies"
                :key="`${pharmacie.lat},${pharmacie.lng}`">
          <el-card :body-style="{ padding: '10px' }" class="h-100 p-b-5" :class="{
          'p-r-2-5': index % 2 === 0,
          'p-l-2-5': index % 2 !== 0
        }">
            <div class="map w-100" :id="`map_${pharmacie.lat},${pharmacie.lng}`">
            </div>
            <div class="p-14px">
              <el-row>
                <el-col :xs="24" :sm="12">
                  Nombre del Local:
                </el-col>
                <el-col :xs="24" :sm="12">
                  {{pharmacie.local_name}}
                </el-col>
                <el-col :xs="24" :sm="12">
                  Dirección:
                </el-col>
                <el-col :xs="24" :sm="12">
                  {{pharmacie.address}}
                </el-col>
                <el-col :xs="24" :sm="12">
                  Teléfono:
                </el-col>
                <el-col :xs="24" :sm="12">
                  {{pharmacie.telephone}}
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-progress type="circle" :percentage="100" :format="format"></el-progress>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {config} from '@/config';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
  version: process.env.VUE_APP_GOOGLE_MAPS_API_VERSION,
});

export default {
  name: 'Pharmacies',
  data: () => {
    return {
      form: {
        commune: '',
        localName: '',
      },
      communes: [],
      pharmacies: [],
      loading: false,
    }
  },
  mounted() {
    this.loading = true;
    axios.get(config.endpoints.getCommunes)
    .then(response => {
      this.communes = response.data.communes;
      this.form.commune = this.communes[0];
    })
    .catch(error => {
      console.error(error);
      this.$message.error('Ha ocurrido un error inesperado. Vuelve a intentar más tarde')
    })
    .finally(() => {
      this.loading = false;
    });
  },
  methods: {
    format(){
      return 'Cargando...';
    },
    getPharmacies(){
      this.loading = true;
      const params = new URLSearchParams();
      params.append('names', this.form.localName);
      params.append('communes', this.form.commune);
      const requestConfig = {
        params,
      };
      axios.get(config.endpoints.getOnDutyPharmacies, requestConfig)
      .then(response => {
        this.pharmacies = response.data.pharmacies;
        loader.load()
            .then(() => {
              this.pharmacies.forEach(pharmacy => {
                const mapId = `map_${pharmacy.lat},${pharmacy.lng}`;
                const mapDiv = document.getElementById(mapId);
                const latLng = {
                  lat: pharmacy.lat,
                  lng: pharmacy.lng,
                };
                // eslint-disable-next-line no-undef
                const map = new google.maps.Map(mapDiv, {
                  center: latLng,
                  zoom: 8,
                });
                // eslint-disable-next-line no-undef
                new google.maps.Marker({
                  position: latLng,
                  map,
                });
              });
            })
      })
      .catch(error => {
        console.error(error);
        this.$message.error('Ha ocurrido un error inesperado. Vuelve a intentar más tarde')
      })
      .finally(() => {
        this.loading = false;
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-100{
  width: 100%;
}
.p-r-2-5 {
  margin-right: 2.5%;
}
.p-l-2-5 {
  margin-left: 2.5%;
}
.p-b-5 {
  margin-bottom: 5%;
}
.p-b-2-5 {
  margin-bottom: 2.5%;
}
.h-100{
  height: 100%;
}
.map{
  height: 300px;
}
.p-14px{
  padding: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>

<template>
  <div class="container">
    <h1>Notas</h1>
    <download-excel
      class="btn btn-default"
      :data="json_data"
      :fields="json_fields"
      worksheet="My Worksheet"
      name="filename.xls"
    >
        <img src="@/assets/cloud-computing.png" width="40px"/>
    </download-excel>
    <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Extra</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in data" :key="item.id">
            <th scope="row">
                {{
                    item.id_Nota
                }}
            </th>
            <td>
                {{
                    item.Fecha
                }}
            </td>
            <td>
                {{
                    item.Extra
                }}
            </td>
            </tr>
        </tbody>
    </table>
    <form @submit="PostApi">
      <div class="mb-3">
        <label for="RazonSocial" class="form-label">Fecha</label>
        <input type="date" v-model="post.Fecha" class="form-control" id="Fecha">
      </div>

      <div class="mb-3">
        <label for="Agente" class="form-label">Extra</label>
        <input type="text"  v-model="post.Extra" class="form-control" id="Extra">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
   <h2 class="mt-5">Consultas avanzadas</h2>
   <select class="form-select" v-model="Obra" aria-label="Selecciona una Nota Obra">
        <option :value="item.id_Obra" v-for="item in Obras" :key="item.id">{{item.Nombre_Obra}}</option>
    </select>
    <button type="button" class="btn btn-primary mt-2" @click="GetNotas">Buscar Notas por Id Obra</button>
    <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Extra</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in Notas" :key="item.id">
            <td>
                {{
                    item.Fecha
                }}
            </td>
            <td>
                {{
                    item.Extra
                }}
            </td>
            </tr>
        </tbody>
    </table>
    <h3 class="mt-5">Consulta rango de fechas</h3>
    <select class="form-select" v-model="Obra2" aria-label="Selecciona una Fecha">
        <option :value="item.id_Obra" v-for="item in Obras" :key="item.id">{{item.Nombre_Obra}}</option>
    </select>
    <input type="date" v-model="fecha_Inicio" class="form-control" id="FechaInicio">
    <input type="date" v-model="fecha_Fin" class="form-control" id="FechaFinal">
    <button type="button" class="btn btn-primary mt-2" @click="GetNotasFecha">Buscar Notas Rango de fechas</button>
    <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Extra</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in Notas2" :key="item.id">
            <td>
                {{
                    item.Fecha
                }}
            </td>
            <td>
                {{
                    item.Extra
                }}
            </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
data: () => ({
    data: null,

    Obras:[],
    Obra: 1,
    Obra2: 1,
    Notas:[],
    Notas2:[],

    fecha_Inicio : '',
    fecha_Fin : '',
    
    post: {
        Fecha: '',
        Extra: ''
    },
    json_fields: {
      "Fecha": "Fecha",
      "Extra": "Extra"
    },
    json_data: [],
    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
    ],
}),
mounted() {
    this.GetApi();
    this.GetObras();
},
methods: {
        GetApi(){
        this.axios.get('http://20.247.89.187/yulio64neos/api/Nota/Get')
        .then((res) => {
            this.data = res.data
            this.json_data = res.data
            console.log("data",this.data);
        })
        },
        GetObras(){
            this.axios.get('http://20.247.89.187/yulio64neos/api/Obra/Get')
                .then((res) => {
                    this.Obras = res.data
                    console.log("Obras",this.Obras);
                })
        },
        GetNotas(){
            this.axios.get('http://20.247.89.187/yulio64neos/api/Nota/GetNotaObra/ ' + this.Obra)
                .then((res) => {
                    this.Notas = res.data
                    console.log("Notas",this.Notas);
                })
        },
        GetNotasFecha(){
            this.axios.get('http://20.247.89.187/yulio64neos/api/Nota/GetFecha/ ' + this.Obra2 + '/' + this.fecha_Inicio + '/' + this.fecha_Fin)
                .then((res) => {
                    this.Notas2 = res.data
                    console.log("Fechas",this.Notas2);
                })
        },
        PostApi(e){
        e.preventDefault()
        const bandera =  this.Validar()

        if(bandera){
            this.axios.post('http://20.247.89.187/yulio64neos/api/Nota/Post', this.post)
            .then(res => this.GetApi())
        }
        },
        Validar(){
        if(this.post.Fecha == ''){
            alert('Coloca la fecha')
            return false
        }
        if(this.post.Extra == ''){
            alert('Coloca el contenido extra')
            return false
        }
        return true
        }
    }
}
</script>

<style>

</style>
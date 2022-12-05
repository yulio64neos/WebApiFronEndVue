<template>
  <div class="container">
    <h1>Detalle Nota</h1>
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
                <th scope="col">Obra</th>
                <th scope="col">Prove</th>
                <th scope="col">Material</th>
                <th scope="col">Nota</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Extra</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in data" :key="item.id">
            <th scope="row">
                {{
                    item.id_Detalle
                }}
            </th>
            <td>
                {{
                    item.obra.Nombre_Obra
                }}
            </td>
            <td>
                {{
                    item.prove.RazonSoc
                }}
            </td>
            <td>
                {{
                    item.Mate.Nombre_Mat
                }}
            </td>
            <td>
                {{
                    item.note.Fecha
                }}
            </td>
            <td>
                {{
                    item.Cantidad
                }}
            </td>
            <td>
                {{
                    item.PrecioUnitario
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
        <label for="Obra" class="form-label">Obra</label>
        <select class="form-select" v-model="Obra" aria-label="Selecciona una obra">
            <option :value="item.id_Obra" v-for="item in Obras" :key="item.id">{{item.Nombre_Obra}}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="Prove" class="form-label">Prove</label>
        <select class="form-select" v-model="Prove" aria-label="Selecciona un proveedor">
            <option :value="item.Id_Prove" v-for="item in Proves" :key="item.id">{{item.RazonSoc}}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="Material" class="form-label">Material</label>
        <select class="form-select" v-model="Mate" aria-label="Selecciona un Material">
            <option :value="item.Id_Mate" v-for="item in Mates" :key="item.id">{{item.Nombre_Mat}}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="Nota" class="form-label">Nota</label>
        <select class="form-select" v-model="Nota" aria-label="Selecciona un Material">
            <option :value="item.id_Nota" v-for="item in Notas" :key="item.id">{{item.Fecha}}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="Cantidad" class="form-label">Cantidad</label>
        <input type="text" v-model="post.Cantidad" class="form-control" id="Cantidad">
      </div>
      
      <div class="mb-3">
        <label for="PrecioUnitario" class="form-label">Precio Unitario</label>
        <input type="text" v-model="post.PrecioUnitario" class="form-control" id="PrecioUnitario">
      </div>

      <div class="mb-3">
        <label for="Extra" class="form-label">Extra</label>
        <input type="text" v-model="post.Extra" class="form-control" id="Extra">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
data: () => ({
    data: null,
    Obras:[
    ],
    Proves:[
    ],
    Mates:[
    ],
    Notas:[
    ],

    Obra: 1,
    Prove: 1,
    Mate: 1,
    Nota: 1,

    post: {
        Obra: 0,
        Prove: 0,
        Material: 0,
        Nota: 0,
        Cantidad: 0,
        PrecioUnitario: 0,
        Extra: ''
    },
        json_fields: {
           "Obra": "Obra",
           "Prove": "Prove",
            "Material": "Material",
            "Nota": "Nota",
            "Cantidad": "Cantidad",
            "Precio Unitario": "PrecioUnitario",
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
mounted(){
    this.GetApi()
    this.GetObra()
    this.GetProve()
    this.GetMate()
    this.GetNota()
  },

  methods: {
    GetApi(){
      this.axios.get('http://20.247.89.187/yulio64neos/api/DetalleNota/Get')
      .then((res) => {
        this.data = res.data
        this.json_data = res.data
        console.log("data",this.data);
      })
    },
    GetObra(){
      this.axios.get('http://20.247.89.187/yulio64neos/api/Obra/Get')
      .then((res) => {
        this.Obras = res.data
        console.log("data",this.Obras);
      })
    },
    GetProve(){
      this.axios.get('http://20.247.89.187/yulio64neos/api/proveedores/get')
      .then((res) => {
        this.Proves = res.data
        console.log("data",this.Proves);
      })
    },
    GetMate(){
      this.axios.get('http://20.247.89.187/yulio64neos/api/Material/Get')
      .then((res) => {
        this.Mates = res.data
        console.log("data",this.Mates);
      })
    },
    GetNota(){
      this.axios.get('http://20.247.89.187/yulio64neos/api/Nota/Get')
      .then((res) => {
        this.Notas = res.data
        console.log("data",this.Notas);
      })
    },
    PostApi(e){
      e.preventDefault()
      const bandera =  this.Validar()

      if(bandera){
        this.post.Obra = this.Obra
        this.post.Prove = this.Prove
        this.post.Material = this.Mate
        this.post.Nota = this.Nota
        this.axios.post('http://20.247.89.187/yulio64neos/api/DetalleNota/Post', this.post)
        .then(res => this.GetApi())
      }
    },
    Validar(){
      if(this.post.Cantidad == ''){
        alert('Coloca la Cantidad')
        return false
      }
      if(this.post.PrecioUnitario == ''){
        alert('Coloca el PrecioUnitario')
        return false
      }
      if(this.post.Extra == ''){
        alert('Coloca el Extra')
        return false
      }
      return true
    }
  }
}
</script>

<style>

</style>
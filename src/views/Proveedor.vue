<template>
  <div>
    <h1>Proveedores</h1>
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
              <th scope="col">Razon Social</th>
              <th scope="col">Agente</th>
              <th scope="col">Correo</th>
              <th scope="col">Direccion</th>
              <th scope="col">Teléfono</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in data" :key="item.id">
              <th scope="row">
              {{
                item.Id_Prove
              }}
              </th>
              <td>
                {{
                  item.RazonSoc
                }}
              </td>
              <td>
              {{
                item.Agente
              }}
              </td>
              <td>
              {{
                item.Correo
              }}
              </td>
              <td>
              {{
                item.Direccion
              }}
              </td>
              <td>
              {{
                item.Telefono
              }}
              </td>
            </tr>
        </tbody>
    </table>
    <form @submit="PostApi">
      <div class="mb-3">
        <label for="RazonSocial" class="form-label">Razon Social</label>
        <input type="text" v-model="post.RazonSoc" class="form-control" id="RazonSocial">
      </div>

      <div class="mb-3">
        <label for="Agente" class="form-label">Agente</label>
        <input type="text"  v-model="post.Agente" class="form-control" id="Agente">
      </div>

      <div class="mb-3">
        <label for="Direccion" class="form-label">Direccion</label>
        <input type="text" v-model="post.Direccion" class="form-control" id="Direccion">
      </div>

      <div class="mb-3">
        <label for="Telefono" class="form-label">Telefono</label>
        <input type="text" v-model="post.Telefono" class="form-control" id="Telefono">
      </div>

      <div class="mb-3">
        <label for="Correo" class="form-label">Correo</label>
        <input type="email" v-model="post.Correo" class="form-control" id="Correo">
      </div>
      
      <div class="mb-3">
        <label for="Tipo_Material" class="form-label">Tipo Material</label>
        <input type="text" v-model="post.Tipo_Material" class="form-control" id="Tipo_Material">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {

 data: () => ({
    data: null,
    post: {
      RazonSoc: '',
      Agente: '',
      Direccion: '',
      Telefono: '',
      Correo: '',
      Tipo_Material: ''
    },
    json_fields: {
      "Razon Social": "RazonSoc",
      "Agente": "Agente",
      "Direccion": "Direccion",
      "Telefono": "Telefono",
      "Correo": "Correo",
      "Tipo Material": "Tipo_Material"
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
  },

  methods: {
    GetApi(){
      this.axios.get('http://20.247.89.187/yulio64neos/api/proveedores/get')
      .then((res) => {
        this.data = res.data,
        this.json_data = res.data
        console.log("data",this.data);
      })
    },
    PostApi(e){
      e.preventDefault()
      const bandera =  this.Validar()

      if(bandera){
        this.axios.post('http://20.247.89.187/yulio64neos/api/Proveedores/Post', this.post)
        .then(res => this.GetApi())
      }
    },
    Validar(){
      if(this.post.RazonSoc == ''){
        alert('Coloca la Razon Social')
        return false
      }
      if(this.post.Agente == ''){
        alert('Coloca la Agente')
        return false
      }
      if(this.post.Correo == ''){
        alert('Coloca la Correo')
        return false
      }
      if(this.post.Direccion == ''){
        alert('Coloca la Dirección')
        return false
      }
      if(this.post.Telefono == ''){
        alert('Coloca la Telefono')
        return false
      }
      if(this.post.Tipo_Material == ''){
        alert('Coloca la Telefono')
        return false
      }
      return true
    }
  }
}
</script>

<style>

</style>
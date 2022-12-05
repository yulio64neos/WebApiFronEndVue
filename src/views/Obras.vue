<template>
  <div class="container">
    <h1>Obras</h1>
    <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Obra</th>
            <th scope="col">Direccion</th>
            <th scope="col">Fecha Inicio</th>
            <th scope="col">Fecha Fin</th>
            <th scope="col">Dueño</th>
            <th scope="col">Responsable</th>
            <th scope="col">Telefono Responsable</th>
            <th scope="col">Correo Responsable</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in data" :key="item.id">
            <th scope="row">
                {{
                    item.id_Obra
                }}
            </th>
            <td>
                {{
                    item.Nombre_Obra
                }}
            </td>
            <td>
                {{
                    item.Direccion
                }}
            </td>
            <td>
                {{
                    item.Fecha_ini
                }}
            </td>
            <td>
                {{
                    item.Fecha_fin
                }}
            </td>
            <td>
                {{
                    item.Dueño
                }}
            </td>
            <td>
                {{
                    item.Responsable
                }}
            </td>
            <td>
                {{
                    item.Tel_resp
                }}
            </td>
            <td>
                {{
                    item.Correo_resp
                }}
            </td>
            </tr>
        </tbody>
    </table>
    <form @submit="PostApi">
      <div class="mb-3">
        <label for="NombreObra" class="form-label">Nombre de la Obra</label>
        <input type="text" v-model="post.Nombre_Obra" class="form-control" id="Nombre_Obra">
      </div>

      <div class="mb-3">
        <label for="Direccion" class="form-label">Direccion</label>
        <input type="text"  v-model="post.Direccion" class="form-control" id="Direccion">
      </div>

      <div class="mb-3">
        <label for="FechaInicio" class="form-label">Fecha Inicio</label>
        <input type="date" v-model="post.Fecha_ini" class="form-control" id="Fecha_ini">
      </div>

      <div class="mb-3">
        <label for="FechaFin" class="form-label">Fecho Fin</label>
        <input type="date" v-model="post.Fecha_fin" class="form-control" id="Fecha_fin">
      </div>

      <div class="mb-3">
        <label for="Dueño" class="form-label">Dueño</label>
        <input type="text" v-model="post.Dueño" class="form-control" id="Dueño">
      </div>
      
      <div class="mb-3">
        <label for="Responsable" class="form-label">Responsable</label>
        <input type="text" v-model="post.Responsable" class="form-control" id="Responsable">
      </div>

      <div class="mb-3">
        <label for="TelResp" class="form-label">Telefono Responsable</label>
        <input type="text" v-model="post.Tel_resp" class="form-control" id="Tel_resp">
      </div>

      <div class="mb-3">
        <label for="CorreoResponsable" class="form-label">Correo responsable</label>
        <input type="email" v-model="post.Correo_resp" class="form-control" id="Correo_resp">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
data:() => ({
    data: null,
    post: {
        Nombre_Obra: '',
        Direccion: '',
        Fecha_ini: '',
        Fecha_fin: '',
        Dueño: '',
        Responsable: '',
        Tel_resp: '',
        Correo_resp: ''
    }
}),
mounted(){
    this.GetApi()
},

methods:{
    GetApi(){
      this.axios.get('http://20.247.89.187/yulio64neos/api/Obra/Get')
      .then(res => this.data = res.data)
    },
    PostApi(e){
      e.preventDefault()
      const bandera =  this.Validar()

      if(bandera){
        this.axios.post('http://20.247.89.187/yulio64neos/api/Obra/Post', this.post)
        .then(res => this.GetApi())
      }
    },
    Validar(){
      if(this.post.Nombre_Obra == ''){
        alert('Coloca la Nombre de la Obra')
        return false
      }
      if(this.post.Direccion == ''){
        alert('Coloca la Direccion')
        return false
      }
      if(this.post.Fecha_ini == ''){
        alert('Coloca la Fecha de Inicio')
        return false
      }
      if(this.post.Fecha_fin == ''){
        alert('Coloca la Fecha de Fin')
        return false
      }
      if(this.post.Dueño == ''){
        alert('Coloca la Dueño')
        return false
      }
      if(this.post.Responsable == ''){
        alert('Coloca la Responsable')
        return false
      }
      if(this.post.Tel_resp == ''){
        alert('Coloca la Telefono Responsable')
        return false
      }
      if(this.post.Correo_resp == ''){
        alert('Coloca la Correo Responsable')
        return false
      }
      return true
    }
}
}
</script>

<style>

</style>
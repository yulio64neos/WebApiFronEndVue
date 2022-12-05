<template>
  <div class="container">
    <h1>Detalle Nota</h1>
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
                    item.Obra
                }}
            </td>
            <td>
                {{
                    item.Prove
                }}
            </td>
            <td>
                {{
                    item.Material
                }}
            </td>
            <td>
                {{
                    item.Nota
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
        <input type="text" v-model="post.Obra" class="form-control" id="Obra">
      </div>

      <div class="mb-3">
        <label for="Prove" class="form-label">Prove</label>
        <input type="text"  v-model="post.Prove" class="form-control" id="Prove">
      </div>

      <div class="mb-3">
        <label for="Material" class="form-label">Material</label>
        <input type="text" v-model="post.Material" class="form-control" id="Material">
      </div>

      <div class="mb-3">
        <label for="Nota" class="form-label">Nota</label>
        <input type="text" v-model="post.Nota" class="form-control" id="Nota">
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
    post: {
        Obra: '',
        Prove: '',
        Material: '',
        Nota: '',
        Cantidad: '',
        PrecioUnitario: '',
        Extra: ''
    }
}),
mounted(){
    this.GetApi()
  },

  methods: {
    GetApi(){
      this.axios.get('http://20.247.89.187/yulio64neos/api/DetalleNota/Get')
      .then(res => this.data = res.data)
    },
    PostApi(e){
      e.preventDefault()
      const bandera =  this.Validar()

      if(bandera){
        this.axios.post('http://20.247.89.187/yulio64neos/api/DetalleNota/Post', this.post)
        .then(res => this.GetApi())
      }
    },
    Validar(){
      if(this.post.Obra == ''){
        alert('Coloca la Obra')
        return false
      }
      if(this.post.Prove == ''){
        alert('Coloca el proveedor')
        return false
      }
      if(this.post.Material == ''){
        alert('Coloca el Material')
        return false
      }
      if(this.post.Nota == ''){
        alert('Coloca la Nota')
        return false
      }
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
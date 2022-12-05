<template>
  <div class="container">
    <h1>Notas</h1>
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
  </div>
</template>

<script>
export default {
data: () => ({
    data: null,
    post: {
        Fecha: '',
        Extra: ''
    }
}),
mounted() {
    this.GetApi();
},
methods: {
        GetApi(){
        this.axios.get('http://20.247.89.187/yulio64neos/api/Nota/Get')
        .then(res => this.data = res.data)
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
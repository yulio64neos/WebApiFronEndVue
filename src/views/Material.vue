<template>
  <div class="container">
    <h1>Material</h1>
    <download-excel
      class="btn btn-default"
      :data="json_data"
      :fields="json_fields"
      worksheet="My Worksheet"
      name="filename.xls"
    >
        <img src="@/assets/cloud-computing.png" width="40px"/>
    </download-excel>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Material</th>
            <th scope="col">Marca</th>
            <th scope="col">Categoria</th>
            <th scope="col">Precio Unitario</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in data" :key="item.id">
                <th scope="row">
                    {{
                        item.Id_Mate
                    }}
                </th>
                <td>
                    {{
                        item.Nombre_Mat
                    }}
                </td>
                <td>
                    {{
                        item.Marca
                    }}
                </td>
                <td>
                    {{
                        item.Categoria
                    }}
                </td>
                <td>
                    {{
                        item.UnidadMedida
                    }}
                </td>
            </tr>
        </tbody>
    </table>
    <form @submit="PostApi">
      <div class="mb-3">
        <label for="Nombre_Mat" class="form-label">Nombre Material</label>
        <input type="text" v-model="post.Nombre_Mat" class="form-control" id="Nombre_Mat">
      </div>

      <div class="mb-3">
        <label for="Marca" class="form-label">Marca</label>
        <input type="text"  v-model="post.Marca" class="form-control" id="Marca">
      </div>

      <div class="mb-3">
        <label for="Categoria" class="form-label">Categoria</label>
        <input type="text" v-model="post.Categoria" class="form-control" id="Categoria">
      </div>

      <div class="mb-3">
        <label for="UnidadMedida" class="form-label">Unidad Medida</label>
        <input type="text" v-model="post.UnidadMedida" class="form-control" id="UnidadMedida">
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
            Nombre_Mat: '',
            Marca: '',
            Categoria: '',
            UnidadMedida: ''
        },
        json_fields: {
            "Nombre Material" : "Nombre_Mat",
            "Marca" : "Marca",
            "Categoria" : "Categoria",
            "Unidad Medida" : "UnidadMedida"
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
            this.axios.get('http://20.247.89.187/yulio64neos/api/Material/Get')
            .then((res) => {
                this.data = res.data
                this.json_data = res.data
                console.log("data",this.data);
            })
            },
            PostApi(e){
            e.preventDefault()
            const bandera =  this.Validar()

            if(bandera){
                this.axios.post('http://20.247.89.187/yulio64neos/api/Material/Post', this.post)
                .then(res => this.GetApi())
            }
            },
            Validar(){
            if(this.post.Nombre_Mat == ''){
                alert('Coloca la Nombre Material')
                return false
            }
            if(this.post.Marca == ''){
                alert('Coloca la Marca')
                return false
            }
            if(this.post.Categoria == ''){
                alert('Coloca la Categoria')
                return false
            }
            if(this.post.UnidadMedida == ''){
                alert('Coloca la Unidad Medida')
                return false
            }
        return true
        }
    }
}
</script>

<style>

</style>
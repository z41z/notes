<template>
  <div>
    <el-input type="file" ref="files" @change="getFiles"></el-input>
    <el-button @click="upload">上传</el-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      currentFile: {}
    };
  },
  methods: {
    upload() {
      let formData = new FormData()
      formData.append('filename', this.currentFile)
      axios.post('/api/upload.php', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      ).then(res => {
        console.log(res)
      })
    },
    getFiles() {
      this.currentFile = event.currentTarget.files[0]
    }
  }
}
</script>
<style>
</style>

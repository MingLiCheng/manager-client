<template>
  <div class="food-dialog-wrap">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="40%" center:true>
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="100px"
          style="margin:10px auto;width:460px;"
        >
          <el-form-item prop="name" label="名字:">
            <el-input type="name" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="类型:">
            <el-select v-model="form.type" placeholder="所属类型">
              <el-option label="001" value="001"></el-option>
              <el-option label="002" value="002"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="describe" label="描述:">
            <el-input type="describe" v-model="form.describe"></el-input>
          </el-form-item>

          <el-form-item prop="price" label="价格:">
            <el-input type="price" v-model="form.price"></el-input>
          </el-form-item>

          <el-form-item label="缩略图:">
            <el-upload
              ref="upload"
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :file-list="fileList2"
              list-type="picture"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-button size="small" type="primary" @click="submitUpload">上传</el-button>
            <el-input class="imgpath" type="imgpath" v-model="form.imgpath" disabled></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogsection",
  props: {
    dialog: Object,
    form: Object,
    getProfiles: Function
  },
  data() {
    return {
      fileList2: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      form_rules: {
        password: [
          { required: true, message: "这是一个必须项", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      let fd = new FormData();
      fd.append('file', file);//传文件
      this.$axios.post('/api/upload', fd).then(res => {
        // alert('成功 ');
        console.log(res)
        this.form.imgpath='\\'+res.data.img_path

      })
    },
    onSuccess(response, file, fileList){
      console.log('1')
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url = this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$http.post(`/api/foods/${url}`, this.form).then(result => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            })
            this.dialog.show = false
            this.getProfiles()
          })
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style lang="scss" scoped>
.food-dialog-wrap {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .imgpath{
    // font-size: 18px;
    color: black;
  }
}
</style>


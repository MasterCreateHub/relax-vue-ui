<template>
  <div class="form-view">
    <re-searcher
      :default-expand="false"
      label-position="justify"
      :factors="seacherFactors"
      @search="handleSearch"
    />

  </div>
</template>

<script>

export default {
  name: "FormView",
  components: {},
  data() {
    return {
      

    };
  },
  computed: {
    
  },
  methods: {
    
  }
};
</script>
<style lang="scss" scoped>

</style>

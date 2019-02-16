<template>

</template>
<script>
  var exec;
  if(process.server){
    const util = require('util');
    exec = util.promisify(require('child_process').exec);
  }
  export default{
    async asyncData(){
      if(process.client && !process.isDev){
        return;
      }
      let cnsl = "";
      cnsl += await exec('git fetch');
      cnsl += await exec('git stash');
      cnsl += await exec('git pull origin master');
      console.log(cnsl);
      return;
    }
  }
</script>

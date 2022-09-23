<demo>常规使用</demo>
<template>
    <div>
        <Row gutter="20">
            <Col span="12">aaaaaaaaa</Col>
            <Col span="12">bbbbbbbbbbb</Col>
        </Row>
    </div>
</template>
<script lang="ts">
    
import  Row  from "../libs/grid/row.vue";
import  Col from "../libs/grid/col.vue";

export default {
  components: {
    Row,
    Col
  },
};
</script>
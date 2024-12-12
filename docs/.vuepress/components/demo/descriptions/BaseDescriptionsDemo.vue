<template>
    <div style="width: 700px">
        <el-descriptions title="用户信息">
            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
            <el-descriptions-item label="备注">
                <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [
                { label: "姓名", prop: "name", span: 1 },
                { label: "年龄", prop: "age", span: 1 },
                { label: "性别", prop: "sex", span: 1 },
                { label: "生日", prop: "birthday", span: 1 },
                { label: "手机号", prop: "phone", span: 1 },
                { label: "邮箱", prop: "email", span: 1 },
                { label: "公司", prop: "company", span: 1 },
                { label: "地址", prop: "address", span: 2 },
            ],
            personData: {
                name: "王小明",
                age: 18,
                sex: "男",
                birthday: "1999-01-01",
                phone: "12345678901",
                email: "12345678901@qq.com",
                company: "腾讯",
                address: "北京市海淀区",
            },
        };
    },
};
</script>

<template>
    <div class="third-auth-page">
        <!-- <Row v-if="!needThirdUser" :gutter="16">
            <Col span="11">
                <Card style="width: 320px">
                    <div slot="title">
                        <Avatar :src="require('@/assets/images/icplogo32.png')" />
                        云门户
                    </div>
                    <List v-if="thirdUserinfo">
                        <ListItem style="text-align:center">
                            {{ `账号: ${thirdUserinfo.userName}` }}
                        </ListItem>
                         <ListItem style="text-align:center">
                            {{ `名称: ${thirdUserinfo.name}` }}
                        </ListItem>
                    </List>
                </Card>
            </Col>
            <Col span="2">
                <Spin size="large">
                    <Icon type="md-sync" size=24 class="demo-spin-icon-load"></Icon>
                </Spin>
            </Col>
            <Col span="11">
                <Card style="width: 320px">
                    <div slot="title">
                        <Avatar :src="require('@/assets/images/icplogo32.png')" />
                        小付通行证
                    </div>
                    <List v-if="smtUserInfo">
                        <ListItem style="text-align:center">
                            {{ `账号: ${smtUserInfo.username}` }}
                        </ListItem>
                         <ListItem style="text-align:center">
                            {{ `名称: ${smtUserInfo.name}` }}
                        </ListItem>
                    </List>
                    <Form ref="smtLoginForm"></Form>
                </Card>
            </Col>
        </Row> -->
        <Spin v-if="!smtUserInfo" size="large">
            <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
            <div>{{ processText }}</div>
        </Spin>
        <Card  v-else style="width: 480px">
            <div slot="title">
                <Avatar :src="require('@/assets/images/icplogo32.png')" />
                小付通行证
            </div>
            <List>
                <ListItem style="text-align:center">
                    {{ `账号: ${smtUserInfo.reg_username}` }}
                </ListItem>
                <ListItem style="text-align:center">
                    {{ `名称: ${smtUserInfo.nickname}` }}
                </ListItem>
                <ListItem>
                    {{ `钱包状态:` }}
                    <Tag v-if="hasWallet" color="success">已开通</Tag>
                    <div v-else>
                    <Tag color="error">未开通</Tag>
                    请您选择<router-link :to="{ name: 'RegComplete', params: { step: 'open_wallet' } }">立即开通</router-link>
                    {{`                  或者                  `}}
                    <router-link to="/">暂时跳过</router-link>
                    </div>
                </ListItem>
            </List>
        </Card>
    </div>
</template>
<script>
    import { mapActions, mapState, mapGetters } from 'vuex';

    export default {
        name: 'ThirdLoginModal',
        data() {
            return {
                processText: '第三方授权登录中......'
            }
        },
        computed: {
            ...mapState({
                thirdToken: state => state.auth.icpAccessToken,
                smtUserInfo: state => state.user.userInfo
            }),
            ...mapGetters(['hasWallet']),
            thirdCode() {
                return this.$route.query.code
            }
        },
        methods: {
            ...mapActions(['fetchIcpAccessToken', 'icpAuthLogin'])
        },
        mounted () {
            this.fetchIcpAccessToken(
                {
                    grant_type: 'authorization_code',
                    code: this.thirdCode
                }
            ).then(() => {
                this.processText = '第三方已授权，用户登录中......';
                this.icpAuthLogin({ access_token: this.thirdToken }).then(() => {
                    this.processText = '第三方用户登录成功';
                }).catch(err => {
                    this.processText = '第三方用户登录成功失败';
                    this.$Message.error(err);
                    });
            }).catch(err => {
                this.processText = '第三方授权失败';
                this.$Message.error(err);
            });
        },
    }
</script>

<style lang="less" scoped>
.third-auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .ivu-row {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>

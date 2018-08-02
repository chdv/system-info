import React, { Component } from 'react';
import {Route,Switch, Link, withRouter} from 'react-router-dom';
import logo from './Settings-icon.png';
// import './App.css';
import SysData from "./SysData";
import Memory from "./Memory";
import Main from "./Main";
import ruRU from 'antd/lib/locale-provider/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { Layout, Menu, LocaleProvider, Icon } from 'antd';
import { notification } from 'antd';
import { ACCESS_TOKEN } from './Constants';
import {loadCurrentUser} from './RestApi';
import PrivateRoute from './PrivateRoute';
const { Header, Sider, Content } = Layout;


moment.locale('ru');

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            isLogin: false,
            isLoading: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        this.loadUser();
    }

    loadUser() {
        this.setState({
            isLoading: true
        });
        loadCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isLogin: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    handleLogin() {
        notification.success({
            message: 'Сообщение',
            description: "Вы успешно вошли в систему",
        });
        this.loadUser();
    }

    handleLogout(redirectTo="/", notificationType="success", description="Вы вышли из системы") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isLogin: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Сообщение',
            description: description,
        });
    }

    render() {

        let menuItems;

        if(this.state.isLogin) {
            menuItems = [
                <Menu.Item key="/sys" >
                    <Link to="/sys">
                        <Icon type="setting" /><span>Системные переменые</span>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/mem" >
                    <Link to="/mem">
                        <Icon type="pie-chart" /><span>Память</span>
                    </Link>
                </Menu.Item>
            ]
        }

        return (
            <LocaleProvider locale={ruRU}>
                <Layout style={{ height: '100vh'}}>
                    <Header style={{color: '#fff', padding:'0 15px'}}>
                        <img src={logo} width='50' alt='' /> <span style={{fontSize: '150%', padding:'0 10px'}}>Системная информация</span>
                    </Header>
                    <Layout>
                        <Sider width={220} >
                            <Menu inlineIndent={10} theme="dark" defaultSelectedKeys={[this.props.location.pathname]} selectedKeys={[this.props.location.pathname]} mode="inline">
                                <Menu.Item key="/" >
                                    <Link to="/">
                                        <Icon type="laptop" /><span>Начало</span>
                                    </Link>
                                </Menu.Item>
                                {menuItems}
                            </Menu>
                        </Sider>
                        <Content style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <Switch>
                                <Route exact path='/'
                                       render={(props) =>
                                           <Main
                                               onLogin={this.handleLogin}
                                               isLogin={this.state.isLogin}
                                               currentUser={this.state.currentUser}
                                               onLogout={this.handleLogout}
                                           />} />
                                <PrivateRoute authenticated={this.state.isLogin} path="/sys" component={SysData} />
                                <PrivateRoute authenticated={this.state.isLogin} path="/mem" component={Memory} />
                            </Switch>
                        </Content>
                    </Layout>

                </Layout>
            </LocaleProvider>
        )
    }
}

export default withRouter(App);

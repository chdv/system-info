import React from 'react';
import RestApi, { ACCESS_TOKEN } from './RestApi'
import {
    StyleSheet, Text, View, Button, Alert,
    TextInput, AsyncStorage, BackHandler,
    Platform, FlatList} from 'react-native';

import HorBar from './HorBar'

const WINDOW_LOGIN = 0
const WINDOW_MENU = 1
const WINDOW_MEM = 2
const WINDOW_SYS = 3

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login_server: 'http://192.168.0.153:5000',
            login_userName: 'admin',
            login_password: 'admin',
            user: null,
            isLogin: false,
            window: WINDOW_LOGIN,
            data: null
        }
        this.restApi = null
    }

    onSubmit() {
        this.login().then(res => {
            AsyncStorage.setItem(ACCESS_TOKEN, res.accessToken)
            this.loadUser()
        }).catch(error => {
            if(error.status === 401 || error.status === 403) {
                Alert.alert("Ошибка: логин или пароль неверные!")
            } else {
                Alert.alert("Ошибка входа в систему: " + error.message)
            }
        })
    }

    loadUser() {
        if (this.restApi) {
            this.restApi.loadUser().then(res => {
                this.setState({
                    isLogin: true,
                    user: res.userName,
                    window: WINDOW_MENU
                })
            }).catch(err => {
                this.setState({
                    isLogin: false,
                    user: null,
                    window: WINDOW_LOGIN
                })
            })
        }
    }

    login() {
        this.restApi =
            new RestApi(
                this.state.login_server,
                this.state.login_userName,
                this.state.login_password)
        return this.restApi.login()
    }

    async componentWillMount() {
        this.loadUser()
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                if(this.state.window === WINDOW_LOGIN ) {
                    return false;
                } else {
                    this.goBack();
                    return true;
                }
            });
        }
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    async goBack() {
        if(this.state.window == WINDOW_MEM || this.state.window == WINDOW_SYS) {
            this.setState({
                window: WINDOW_MENU
            })
        } else if(this.state.window == WINDOW_MENU ) {
            this.handleLogout()
        }
    }

    async handleLogout() {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            user: null,
            isLogin: false,
            window: WINDOW_LOGIN
        });
    }

    async handleSys() {
        try {
            const sys = await this.restApi.getSysInfo()
            this.setState({
                window: WINDOW_SYS,
                data: sys
            })
        } catch (err) {
            Alert.alert("Ошибка: " + err.message)
        }
    }

    async handleMem() {
        try {
            const mem = await this.restApi.getMemoryInfo()
            this.setState({
                window: WINDOW_MEM,
                data: mem
            })
        } catch (err) {
            Alert.alert("Ошибка: " + err.message)
        }
    }

    handleBack2Menu() {
        this.setState({
            window: WINDOW_MENU
        })
    }

    render() {
        switch(this.state.window) {
            case WINDOW_LOGIN:
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>Вход в приложение</Text>
                        <Text style={styles.label}>Адрес сервера</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.login_server}
                            onChangeText={value => this.setState({login_server: value.trim()})}
                        />
                        <Text style={styles.label}>Логин</Text>
                        <TextInput
                            value={this.state.login_userName}
                            onChangeText={value => this.setState({login_userName: value.trim()})}
                            style={styles.input}/>
                        <Text style={styles.label}>Пароль</Text>
                        <TextInput
                            value={this.state.login_password}
                            onChangeText={value => this.setState({login_password: value.trim()})}
                            secureTextEntry={true}
                            style={styles.input}/>
                        <Text style={styles.label}></Text>
                        <Button title="Войти" onPress={() => this.onSubmit()}/>
                    </View>
                )
            case WINDOW_MENU:
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>Системная информация</Text>
                        <Text style={styles.label}>Вы вошли в систему как {this.state.user}. </Text>
                        <Text style={styles.label}>В программе вы можете получить системную информацию об окружении
                            java. </Text>
                        <Text style={styles.label}></Text>
                        <Button onPress={() => this.handleSys()} title="Системные переменные"/>
                        <Text style={styles.label}></Text>
                        <Button onPress={() => this.handleMem()} title="Память"/>
                        <Text style={styles.label}></Text>
                        <Button onPress={() => this.handleLogout()} title="Выйти из системы"/>
                    </View>
                )
            case WINDOW_MEM:
                let all = Number(this.state.data.used) + Number(this.state.data.free)
                let left = Number(this.state.data.used)/all
                left = Math.ceil(left * 100)/100
                let right = 1 - left
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>Память</Text>
                        <Text style={styles.label}>Используемая память: {this.state.data.used}Мб</Text>
                        <Text style={styles.label}>Свободная память: {this.state.data.free}Мб</Text>
                        <Text style={styles.label}></Text>
                        <HorBar left={left} right={right} />
                        <Text style={styles.label}></Text>
                        <Button onPress={() => this.handleBack2Menu()} title="Вернуться назад"/>
                    </View>
                )
            case WINDOW_SYS:
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>Системные переменные</Text>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index)=>item.id.toString()}
                            renderItem={({item}) => (
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={styles.label_bold}>{item.name}: </Text><Text style={styles.label}>{item.value}</Text>
                                </View>
                            )}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                        <Button onPress={() => this.handleBack2Menu()} title="Вернуться назад"/>
                    </View>
                )
        }
    }

    renderSeparator(){
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE"

                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    input: {
        backgroundColor: '#FFF',
        paddingLeft: 5,
        paddingRight: 5,
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 18
    },
    label: {
        paddingTop: 5,
        fontSize: 18,
        color: 'black'
    },
    label_bold: {
        fontWeight: 'bold',
        paddingTop: 5,
        fontSize: 18,
        color: 'black'
    },
    title: {
        paddingTop: 0,
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black'
    },
});

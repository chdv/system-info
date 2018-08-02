import React, { Component } from 'react';
import { ACCESS_TOKEN } from './Constants';
import {login} from './RestApi';
import './LoginForm.css';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginFormInner)
        return (
            <div>
                Для работы с приложением необходимо войти в систему:
                <div className="login-container">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginFormInner extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    }).catch(error => {
                    if(error.status === 401 || error.status === 403) {
                        notification.error({
                            message: 'Ошибка',
                            description: 'Логин или пароль неверные!'
                        });
                    } else  {
                        notification.error({
                            message: 'Ошибка',
                            description: 'Ошибка:' + error.message
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Введите логин!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" />}
                            size="large"
                            name="userName"
                            placeholder="Логин" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Введите пароль!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Пароль"  />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Войти</Button>
                </FormItem>
            </Form>
        );
    }
}


export default LoginForm;
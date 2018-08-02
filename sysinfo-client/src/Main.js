import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import { Button } from 'antd';

class Main extends Component {

    componentDidMount() {
    }

    render() {
        let body = <LoginForm onLogin={this.props.onLogin}/>
        if(this.props.isLogin) {
            body = <span>
                Вы вошли в систему как {this.props.currentUser.userName}. <br/>
                В программе вы можете получить системную информацию из java-окружения. <br/> <br/>
                <Button onClick={this.props.onLogout} type="primary">Выйти из системы</Button>
            </span>
        }

        return (
            <div>
                <h1>Добро пожаловать!</h1>
                {body}
            </div>
        )
    }
}

export default Main;
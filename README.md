# Системная информация
Приложение отображает системную информацию из окружения Java runtime.

Разработано с использованием следующих библиотек:
<ul>	
	<li>сервер: spring-boot, spring-web, spring-security, tomcat (embeded)</li>
	<li>клиент: react, eslint, babel, webpack, antd, primereact</li>
</ul>

В папке sysinfo-client находятся исходные коды клиентской части, в папке sysinfo-server - серверной.<br/>
Клиент реализован в виде single page application, работающего без перезагрузки страницы. Реализован роутинг, позволяющий использовать историю броузера.<br/>
Собранный дистрибутив в видео jar-файла находится в папке "Dist".<br/>
Команда для запуска приложения: <p>java -jar sysinfo-0.0.1-SNAPSHOT.jar</p>
Также запустить можно двойным кликом по jar-файлу и последующим открытием с помощью установленной JDK. Но для завершения работы программы придется самостоятельно останавливать процесс java.<br/>
После запуска автоматически откроется броузер. Приложением используется порт 5000, если он занят, система не запустится.

Работоспособность протестирована на ОС Ubuntu 18.04 (OpenJdk 11) и ОС Windows 10 (OracleJdk 10).<br/>
Логин и пароль для входа: admin/admin	

Скриншоты:

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/01.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/02.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/03.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/04.png)

# Приложение "Системная информация"
Приложение отображает системную информацию из окружения Java runtime.

Разработано с использованием следующих библиотек:
<ul>	
	<li>сервер: spring-boot, spring-web, spring-security, tomcat (embeded)</li>
	<li>клиент: react, antd, primereact</li>
</ul>
Средства разработки и сборки: 
<ul>	
	<li>сервер: IntelliJ Idea, maven</li>
	<li>клиент: IntelliJ WebStorm, npm, webpack, babel, eslint</li>
</ul>
Команды для сборки и запуска: 
<ul>	
	<li>сервер: <ul><li>mvn spring-boot:run (запуск)</li><li>mvn clean package (сборка)</li></ul>
	<li>клиент: <ul><li>npm install (инициализация)</li><li>npm start (запуск)</li><li>npm run-script build (сборка)</li></ul></li>
</ul>

Разработки велась в операционной системе Linux Ubuntu 18.04.

В папке sysinfo-client находятся исходные коды клиентской части, в папке sysinfo-server - серверной.<br/>
Клиент реализован в виде single page application, работающего без перезагрузки страницы. Реализован роутинг, позволяющий использовать историю броузера.<br/>
Собранный дистрибутив в виде jar-файла находится в папке "Dist".<br/>
# Запуск из командной строки
Команда для запуска приложения: <p>java -jar sysinfo-0.0.1-SNAPSHOT.jar</p>

Также запустить можно двойным кликом по jar-файлу и последующим открытием с помощью установленной JDK. Но для завершения работы программы придется самостоятельно останавливать процесс java.<br/>
После запуска автоматически откроется броузер. Приложением используется порт 5000, если он занят, система не запустится. Значение порта можно изменить в файле sysinfo-server/src/main/resources/application.properties, после чего приложение необходимо пересобрать. Работоспособность протестирована на операционных системах Linux Ubuntu 18.04 (OpenJdk 11) и Windows 10 (OracleJdk 10).
# Запуск в контейнере
В директории Docker находится Dockerfile и соответствующая сборка, в которой отключен запуск броузера. Для запуска приложения в контейнере необходимо выполнить следующие команды:<br/>
docker build -t sysinfo .<br/>
docker run -p 5000:5000 --name sys sysinfo<br/>
Приложение будет доступно по адресу http://localhost:5000/<br/>
Удаление контейнера:<br/>
docker rm  sys<br/>
docker rmi sysinfo:latest <br/>

Логин и пароль для входа: admin/admin	

# Скриншоты

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/01.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/02.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/03.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/04.png)

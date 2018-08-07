# Приложение "Системная информация"
Приложение отображает системную информацию из окружения Java runtime.

Разработано с использованием следующих библиотек:
<ul>	
	<li>сервер: spring-boot, spring-web, spring-security, jwt, tomcat (embeded)</li>
	<li>web-клиент: react, antd, primereact</li>
	<li>android-клиент: react-native</li>
</ul>
Средства разработки и сборки: 
<ul>	
	<li>сервер: IntelliJ Idea, maven</li>
	<li>web-клиент: IntelliJ WebStorm, npm, webpack, babel, eslint</li>
	<li>android-клиент: Android Studio, IntelliJ WebStorm</li>
</ul>
Команды для сборки и запуска: 
<ul>	
	<li>сервер: <ul><li>mvn spring-boot:run (запуск)</li><li>mvn clean package (сборка)</li></ul>
	<li>web-клиент: <ul><li>npm install (инициализация)</li><li>npm start (запуск)</li><li>npm run-script build (сборка)</li></ul></li>
	<li>android-клиент: сборка и запуск с помощью react-native и gradle (см. инструкцию в официальной документации)</li>
</ul>

Разработка велась в операционной системе Linux.

В папке sysinfo-client находятся исходные коды web-клиента, в папке sysinfo-native - android-клиента, в папке sysinfo-server исходный код серверной части.<br/>
Web-клиент реализован в виде single page application, работающего без перезагрузки страницы. Реализован роутинг, позволяющий использовать историю браузера.<br/>
Собранный дистрибутив в виде jar-файла находится в папке "dist/server-jar".<br/>
# Запуск из командной строки
Команда для запуска приложения: <p>java -jar sysinfo-0.0.1-SNAPSHOT.jar</p>

Логин и пароль для входа: admin/admin	

Также запустить можно двойным кликом по jar-файлу и последующим открытием с помощью установленной JDK. В этом случае для завершения работы программы придется самостоятельно останавливать процесс java.<br/>
После запуска автоматически откроется браузер. Приложением используется порт 5000, он должен быть не занят для запуска. Значение порта можно изменить в файле sysinfo-server/src/main/resources/application.properties, после чего приложение необходимо пересобрать. Работоспособность протестирована на операционных системах Linux Ubuntu, Manjaro (OpenJdk 11) и Windows 10 (OracleJdk 10).
# Запуск в контейнере
В директории Docker находится Dockerfile и соответствующая сборка, в которой отключен запуск браузера. Для запуска приложения в контейнере необходимо выполнить следующие команды:<br/>
docker build -t sysinfo .<br/>
docker run -p 5000:5000 --name sys sysinfo<br/>
Приложение будет доступно по адресу http://localhost:5000/

Удаление контейнера:<br/>
docker rm  sys<br/>
docker rmi sysinfo:latest <br/>
# Установка и запуск android-версии
Необходимо скопировать файл app-release.apk из директории dist/client-android на смартфон, установить и запустить.

# Скриншоты web-версии

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/01.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/02.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/03.png)

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/04.png)

# Скриншоты android-версии

![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/native_01.png) ![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/native_02.png)
![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/native_03.png) ![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/native_04.png)

# Программа в списке приложений смартфона
![ScreenShot](https://github.com/chdv/system-info/blob/master/about/screenshots/native_05.png)


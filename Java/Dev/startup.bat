@echo off
set PRO_HOME=YourProjectHome
set REDIS_HOME=YourRedisHome
set NGINX_HOME=YourNginxHome
set TOMCAT_HOME=YourTomcatHome

taskkill /f /t /im "nginx.exe" >nul 2>&1
taskkill /f /t /im "redis-server.exe" >nul 2>&1
call catalina stop
start  /b "Redis" cmd /k "echo 'Starting Redis'&&cd /d %REDIS_HOME%&&redis-server&&exit"
start  /b "Nginx" cmd /k "cd /d %NGINX_HOME%&&nginx"
start  /b "Tomcat" cmd /k "echo 'Starting Tomcat'&&cd /d %TOMCAT_HOME%\bin&&startup&&exit"
start  /b "ProjectHome" cmd /k "cd /d %PRO_HOME%"
browser-sync start --config bs-config.js
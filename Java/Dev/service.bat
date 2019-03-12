@echo Build Service
taskkill /FI "WINDOWTITLE eq π‹¿Ì‘±:  PRO_SERVICE"
title PRO_SERVICE
set SERVICE_HOME=YourSeviceHome
set TOMCAT_HOME=YourTomcatHome
cd service
rd /s/Q target
call catalina stop
call mvn clean install
cd %SERVICE_HOME%/target
rename oldName.war ROOT.war
cd %TOMCAT_HOME%
rd /s/Q webapps
md webapps
copy /y %SERVICE_HOME%\target\ROOT.war %TOMCAT_HOME%\webapps
call catalina start

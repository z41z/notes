@echo Build Service
set SERVICE_HOME=YourProjectHome
set TOMCAT_HOME=YourTomcatHome
cd service
call catalina stop
call mvn clean install
cd %SERVICE_HOME%/target
del ROOT.war
rename BUILD_RESULT.war ROOT.war
cd %TOMCAT_HOME%
rd /s/Q webapps
md webapps
copy /y %SERVICE_HOME%\target\ROOT.war %TOMCAT_HOME%\webapps
call catalina start

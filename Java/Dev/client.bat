@echo Build Client
taskkill /f /t /FI "WINDOWTITLE eq π‹¿Ì‘±:  PRO_CLIENT"
title PRO_CLIENT
cd client
call mvn clean install
exit

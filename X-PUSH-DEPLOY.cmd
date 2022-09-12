@echo off

# sudo pm2 start node -- app.js

set /p msg="Deploy notes - Commit message: "
git add -A
git commit -a -m "%msg%"
git push

set ecssh=ssh -i ".ssh\TechBinge-EC2-key.pem" ec2-user@ec2-65-0-106-156.ap-south-1.compute.amazonaws.com
%ecssh% "cd apps/mosooklimo  && git pull && npm i && sudo pm2 restart all && echo Application deployed Bro! "


timeout 10
@echo off

# sudo pm2 start node -- app.js

set /p msg="Deploy notes - Commit message: "
call `BUILD.cmd
git add -A
git commit -a -m "%msg%"
git push

set ecssh=ssh -i "%USERPROFILE%\.ssh\TechBinge-EC2-key.pem" ec2-user@ec2-65-0-106-156.ap-south-1.compute.amazonaws.com
%ecssh% "cd techbinge/mosooklimo && sudo git pull && sudo pm2 restart 0 && echo Application deployed Bro! "


timeout 20
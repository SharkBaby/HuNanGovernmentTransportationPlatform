:@回到上级目录
cd ..
:启动nodejs服务器
forever start --append -o out.log -e err.log --uid "restart_forever" -COMMAND "npm start" ./
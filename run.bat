@echo off
title 教材之窗 - VuePress 快捷工具箱
:: 不用强制改编码，兼容所有Windows版本中文显示

:menu
cls
echo.
echo ========================================
echo       教材之窗 VuePress 工具箱
echo ========================================
echo   1. 快速启动开发服务器
echo   2. 清理缓存并启动（改配置/报错用）
echo   3. 构建生产上线版本
echo   4. 安装/修复项目依赖
echo   0. 退出工具箱
echo ========================================
echo.
set /p num=请输入选项数字：

if "%num%"=="1" goto quick_start
if "%num%"=="2" goto clean_start
if "%num%"=="3" goto build
if "%num%"=="4" goto install_deps
if "%num%"=="0" exit
goto menu

:: 快速启动（仅改md内容用）
:quick_start
cls
echo.
echo [*] 正在快速启动开发服务器...
echo ----------------------------------------
echo 提示：启动后浏览器访问 http://localhost:8080
echo ----------------------------------------
npm run docs:dev
set exit_code=%errorlevel%
call :check_result "启动" %exit_code%
goto menu

:: 清缓存启动
:clean_start
cls
echo.
echo [1/2] 正在清理缓存文件...
set cache_cleared=0
if exist .vuepress\.cache (
    rmdir /s /q .vuepress\.cache
    echo       开发缓存已删除
    set cache_cleared=1
)
if exist .vuepress\dist (
    rmdir /s /q .vuepress\dist
    echo       旧构建产物已删除
    set cache_cleared=1
)
if %cache_cleared% equ 0 echo       缓存文件不存在，无需清理
echo.
echo [2/2] 正在启动开发服务器...
echo ----------------------------------------
echo 提示：启动后浏览器访问 http://localhost:8080
echo ----------------------------------------
npm run docs:dev
set exit_code=%errorlevel%
call :check_result "启动" %exit_code%
goto menu

:: 构建生产版本
:build
cls
echo.
echo [*] 正在构建生产上线版本...
echo ----------------------------------------
npm run docs:build
set exit_code=%errorlevel%
if %exit_code% equ 0 (
    echo.
    echo ======================================
    echo  构建成功！
    echo  静态文件输出到：.vuepress/dist 目录
    echo ======================================
) else (
    echo.
    echo ======================================
    echo  构建失败！
    echo ======================================
    echo  常见原因：Markdown语法错误、插件配置错误
    echo  请向上滚动查看红色报错信息定位问题
    echo ======================================
)
echo.
echo 按任意键返回主菜单...
pause >nul
goto menu

:: 安装依赖
:install_deps
cls
echo.
echo [*] 正在安装/修复项目依赖（兼容模式）...
echo ----------------------------------------
npm install --legacy-peer-deps
set exit_code=%errorlevel%
if %exit_code% equ 0 (
    echo.
    echo ======================================
    echo  依赖安装完成！
    echo ======================================
) else (
    echo.
    echo ======================================
    echo  依赖安装失败！
    echo ======================================
    echo  常见原因：网络问题、npm缓存损坏
    echo  建议切换手机热点后重试
    echo ======================================
)
echo.
echo 按任意键返回主菜单...
pause >nul
goto menu

:: 结果检测
:check_result
set action=%~1
set code=%~2
echo.
if %code% equ 0 (
    echo ======================================
    echo  服务已正常停止
    echo ======================================
) else (
    echo ======================================
    echo  检测到错误！%action%失败
    echo ======================================
    echo  常见原因：
    echo    1. 8080端口被其他程序占用
    echo    2. config.js 配置语法错误
    echo    3. 依赖包缺失或损坏
    echo  请向上滚动查看红色报错详情
    echo ======================================
)
echo.
echo 按任意键返回主菜单...
pause >nul
goto :eof


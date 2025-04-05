---
title: SourceTree 3.0.17跳过注册
category: Git
tags:
  - SourceTree
cover: https://cdn.pixabay.com/photo/2020/07/26/20/46/mountains-5440720_960_720.jpg
---

个人版本的跳过注册方式已经无效，需要下载企业版本下载地址：<https://www.sourcetreeapp.com/enterprise首次点击msi进行安装> （当前最新版 SourcetreeEnterpriseSetup_3.0.17.msi）
![SourceTree%20Setup](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/SourceTree%20Setup.png)
![Sourcetree%20Accept](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Sourcetree%20Accept.png)
![SourceTree%20Choose](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/SourceTree%20Choose.png)
![SourceTree%20Install](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/SourceTree%20Install.png)
![SourceTree%20Fnish](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/SourceTree%20Fnish.png)
然后找到在 `%programfiles(x86)%\Atlassian\Sourcetree` 目录下找到 SourceTree.exe 运行后会出现注册界面
![SourceTree%20Regis](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/SourceTree%20Regis.png)
关掉 sourcetree 打开`%LocalAppData%\Atlassian\SourceTree`新建文件：

## accounts.json

内容代码：

```json
[ {  
 "$id": "1",
   "$type": "SourceTree.Api.Host.Identity.Model.IdentityAccount, SourceTree.Api.Host.Identity",
   "Authenticate": true,
   "HostInstance": {   
  "$id": "2",
     "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountInstance, SourceTree.Host.AtlassianAccount",
     "Host": {    
   "$id": "3",
       "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountHost, SourceTree.Host.AtlassianAccount",
       "Id": "atlassian account"   
  },
     "BaseUrl": "https://id.atlassian.com/"  
 },
   "Credentials": {   
  "$id": "4",
     "$type": "SourceTree.Model.BasicAuthCredentials, SourceTree.Api.Account",
     "Username": "",
     "Email": null  
 },
   "IsDefault": false 
}]
```

如图：
![SourceTree%20Accounts](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/SourceTree%20Accounts.png)
然后在运行`%programfiles(x86)%\Atlassian\Sourcetree\SourceTree.exe`即可

Mac 使用 sourcetree 跳过注册
打开 sourcetree
关闭 sourcetree
命令终端输入
`defaults write com.torusknot.SourceTreeNotMAS completedWelcomeWizardVersion 3
`
打开 sourcetree 即可跳过登录

# 备份与恢复
在YOYOW账号体系下，主要包括私钥备份、钱包备份两种类型。为避免带来损失，强烈建议您仔细阅读本节内容，并做好私钥与钱包的备份。

## 私钥备份
- 当您注册成功时，系统会返回给一个账号私钥。该私钥为拥有您账号权限中的主控权限(owner)
- 该私钥仅出现一次，系统不会替您保存，且不会被存储在您的浏览器，所以务必手动另行备份

## 钱包备份
- 在"设置"--"备份"当中，系统可生成一个后缀名为.bin的备份文件，这个备份文件使用你的账号密码进行加密。通过它可以恢复账号，或者在不同浏览器或者计算机间进行账号迁移
- 该备份文件不包含账号主控权限私钥

## 私钥恢复账号
- 本方法原理为：使用主控权限的私钥，重新生成其他权限的密钥对
- 本方法需要您输入新的钱包密码，并用其对新的密钥对进行加密存储
- 所需参数： 账号owner权限的私钥，新的账号密码
- 本操作需要上链，需支付一定的手续费。

## 备份文件恢复账号
- 本方法原理为：提供所备份的钱包密码，对备份文件进行解密
- 所需参数： 账号的备份文件（.bin格式），账号的原密码
# gsp-bot
(C) 2019 - Gamer Source Pub Discord Bot

# Alat Perang
1. NodeJS v12 ke atas
2. Python v3.7
3. Apabila kamu pengguna Windows, kamu perlu menginstall windows-build-tools atau compiler C++ dari Visual Studio. Sedangkan apabila kamu pengguna Linux, kamu perlu menginstall CMake dan GCC.
4. Node-GYP telah terinstall dalam NPM kamu secara global.

# Cara Install
```
$ git clone https://github.com/skymunn/gsp-bot
$ cd gsp-bot
$ npm install

# Silahkan copy .env.example menjadi .env dan ubah isi TOKEN & TOKEN_DEV menjadi token bot discordmu dan PRODUCTION diubah menjadi DEV
# Dalam folder database, silahkan copy database-example.db kemudian paste di tempat yang sama dengan nama database.db

$ npm run migrate:down
$ npm run migrate:up
$ npm start
```

# Ada Pertanyaan?
Silahkan mampir ke #tech-corner, tanyakan pada user yang bernama Stellarz_Munn#4554 atau [ Ryuu ]#9611 untuk masalah bot ini.

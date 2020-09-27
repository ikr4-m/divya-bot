# Felice, Mommy GSP!
Bukan robot, tapi mommy kita yang bisa ngelakuin "semuanya" dan "semaunya"!

# Alat Perang
1. NodeJS v12 ke atas
2. Python v3.7 (set Pathnya ke npm config apabila perintah command di cmd kamu bukan python3 atau python)
3. Apabila kamu pengguna Windows, kamu perlu menginstall [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) atau compiler C++ dari Visual Studio. Sedangkan apabila kamu pengguna Linux, kamu perlu menginstall CMake/Ninja dan GCC Compiler.
4. [node-gyp](https://github.com/nodejs/node-gyp#installation) telah terinstall dalam NPM kamu secara global.

# Cara Install
1. Clone repository ini bagaimanapun cara ente.
2. Pastikan alat perang sudah terinstall dengan sempurna.
3. Install dependensi yang diperlukan dengan perintah:
```bash
$ npm install
```
4. Setelah itu, buka folder Database, kemudian copy paste database-sample.db menjadi database.db.
5. Keluar dari folder itu, kemudian kita impor data ke dalam database dengan perintah:
```bash
$ npm run migrate:down
$ npm run migrate:up
```
Alasan kenapa mesti di migrate down dikarenakan ada dummy table di dalam database-sample hasil fork dari [template ini](https://github.com/skymunn/Discord-Template/).

6. Kemudian, kamu build terlebih dahulu botnya dengan perintah:
```bash
$ npm run build
```
7. Kemudian, copy paste .env.example menjadi .env kemudian diisi dengan beberapa kriteria di bawah ini:
    Property | Default Value | Keterangan
    ---------|---------------|-----------
    PRODUCTION | DEV/SERVE | Isi DEV kalau masih dalam pengembangan, sebaliknya isi SERVE
    TOKEN | null | Isi dengan token bot kamu
    TOKEN_DEV | null | Isi dengan token bot untuk developing kamu
    SAWERIA_ID | null | Tidak usah diisi, untuk saweria
8. Jalankan botnya dengan perintah:
```bash
$ npm start
```

Ada beberapa perintah yang dapat membantu kamu dalam membuat bot ini, diantaranya adalah:
```bash
# Untuk build bot sambil ngoding
$ npm build:watch
# Sapa tau lu pake pm2
$ pm2 start executor.js --name "FeliceCore" -- npm start
# Untuk cek gaya nulisnya udah benar atau belum
$ npm run lint
# Kalau lu tau pake Jest, dah disediain kok
$ npm run test
```

# Ada Pertanyaan?
Silahkan mampir ke #tech-corner, tanyakan pada user yang bernama Stellarz_Munn#4554 atau [ Ryuu ]#9611 untuk masalah bot ini.

*(C) 2019 - Gamer Source Pub, All rights reserved.*

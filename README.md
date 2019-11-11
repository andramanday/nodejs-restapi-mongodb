# nodejs-restapi-mongodb
NodeJs RestAPI 0.1 with express

#Langkah-langkah membangun restFull API dengan Mongodb
1.  di asumsikan semua sudah menginsall nodejs pada pc masing-masing.
    silahkan kunjungi : https://nodejs.org/en/ untuk download dan install.

2.  pastikan disini saya menggunakan yarn kalian yang terbiasa dengan npm juga it's ok

3.  buat folder tempat project kita disimpan, example: "mkdir nodejs-restapi-mongodb" kemudian "cd nodejs-restapi-mongodb"
    kita buat file package.json nodejs kita dengan cara ketikan npm init atau yarn init pada commandline kalian. isi jika perlu.

4.  install dependency express untuk handle route api kita nantinya,   
    "yarn add express"

5.  buat file app.js dan buat pada folder project struktur seperti berikut
        src
            config
                database
                    index.js
            models
                modelUser.js
            routes
                routeUser.js
            middleware
                auth.js
            index.js
        app.js
        .babelrc
        .env

6.  install devDependency nodemon yang berfungsi sebagai reraoute / auto restart server
    yarn add nodemon -D

7.  install dependency babel yang gunanya untuk transfile dari ES6 ke ES5 karna masih ada browser yang tidak support ES6.
    yarn add babel-preset-env -D
    yarn add babel-cli
    yarn add babel-core

8.  buat file dengan nama ".babelrc" | lihat struktur no.5
    input :
        {
            "presets:" ["env"]
        }

9.  tambahkan pada file package.json
    "scripts": {
        "start": "nodemon --exec babel-node app.js"
    },

10. buat database mongodb di https://cloud.mongodb.com/ , register akun kamu dan dapatkan 500MB storage gratis,
    bangun cluster kamu sendiri dan copy settingan untuk nantinya digunakan sebagai penghubung ke database kamu.

11. install depedency mongoose untuk koneksi dan ORM kita ke database monggodb
    yarn add mongoose

12. install depedency dotenv untuk meletakan semua variable settingan kita 
    yarn add dotenv
    dan buat file .env | lihat struktur no.5

13. yarn add body-parser, ini berfungsi buat handle penerimaan request pada saat data diakses dengan mudah sebagai parameter.
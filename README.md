## CRX-Vue-Ts

- 先透過 vite-vue 建立專案，再經過配置，讓 npm run build 能夠生成可以掛載到 chrome 擴展的 dist 目錄





### 安裝

```shell
git clone https://github.com/ayii0111/crx-vue-ts.git

cd crx-vue-ts

npm install
```



### 使用

- 編寫擴展視圖代碼時，可以在 npm run dev 狀態下編寫
- 要掛載擴展時，需 npm run build 後再載入



### 目錄架構

- /manifest.json    為擴展的 json 配置檔
- /scripts               可純放擴展腳本的目錄 (build 時，會經過獨立的編譯)
- /public               靜態目錄，可存放 icon
- /src                     vue 代碼目錄

P.S. 似乎可以移除 chrome-types 套件而僅用 @types/chrome 即可，下次將該套件移除，並且添加一些可以驗證型別的代碼到這個 demo 中，好讓安裝完就能夠驗證
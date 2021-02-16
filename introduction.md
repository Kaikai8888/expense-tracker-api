#  用 Node.js、MongoDB 打造專屬記帳程式

這幾個月來，一路從網頁前端，學習到後端的Node.js、MongoDB，決定練習運用這些新技能，來打造幾乎每天都會使用的記帳程式。

程式請點[這裡](https://github.com/Kaikai8888/expense-tracker)，網站請點[這裡](https://frozen-taiga-94619.herokuapp.com/)
Demo帳號: user1@example.com | 密碼: 12345678

![](https://github.com/Kaikai8888/expense-tracker/raw/master/screenshot/expense-tracker-demo-4.gif)

以下透過問答的方式，簡單介紹這支專案及分享開發的心得:

### 為何會選擇這個專案？

記帳程式可以從最簡單的支出紀錄CRUD，延伸到更靈活的篩選、分類功能，甚至是更複雜的預算管理、統計圖表的繪製，可以給我很強的學習動力，讓我先從簡單的CRUD入門，先練習打造兼顧前後端的產品，對全端開發的流程更加熟悉，之後再依照自己的使用需求，持續學習、擴增功能。

### 使用了什麼技術？

* 採全端開發模式，前後端都使用javascript撰寫，後端在Node.js環境上運行，使用統一的語言可提升開發的效率。
* 在伺服器的部分，使用Express.js框架建立，搭配body-parser、method-override套件處理前端資料的request，並透過dotenv套件及.env檔管理環境變數，一方面隱藏機密資訊，另一方面可依照執行環境(如: 是否為production mode)切換環境變數。
* 在畫面的處理上，主要採用server-side rendering，使用express-handlebars樣板引擎處理，直接在後端就將資料透過樣板帶入畫面，生成HTML。在前端畫面上以Bootstrap為基礎組成畫面，簡化css及HTML架構，並運用grid系統達成RWD設計。
* 在資料庫的部分，使用非關聯性資料庫MongoDB儲存資料，並用mongoose直接透過javascript操作資料庫。
* 在驗證登入系統上，使用Passport.js搭配express-session建立，驗證策略上採用Local Strategy及 Facebook Strategy，密碼加密的部分則使用bycryptjs進行加密，降低密碼外洩的風險。另外透過connect-flash套件，將驗證的錯誤或成功訊息反饋給使用者。
* 在資料視覺化的部分，運用Axios在客戶端發API向客戶請求資料，再透過Chart.js生成圖表。
### 哪部分相對能掌握？哪裡花了最多時間？

主要在前端畫面處理、UX互動所需的DOM操作，以及後端基本的router設計、資料CRUD上掌握度較高，能較熟練的以MVC架構分析user story，拆解出在畫面、資料、路由及controller上需要完成的工作，逐一處理。花費較多時間的，主要是驗證登入系統、時差問題的處理及較進階的MongoDB查詢語法上。

### 過程中碰到什麼困難？又如何克服？

過程中較大的困難是「伺服器和客戶端的時差問題」和後續「年度月份篩選」的處理，這部分牽涉到前後端資料的傳輸和轉換，並且會用到較不熟悉的觀念和語法(像是Date物件的方法、MongoDB的時間篩選語法等等)，常會需要在尚不知道有什麼語法工具可用時，先拆解問題，了解整個流程的各階段大約需要做什麼? 有哪些是我目前會的? 那些需要去找尋新的工具?

我先從關鍵點「需要用不會受時區影響的timestamp形式傳輸、儲存資料」出發，將問題拆解成：

* 前端要先將使用者輸入的日期資料，轉換成timestamp後，才能傳給後端
* 後端資料庫要用timestamp的形式儲存資料
* 後端要用timestamp的形式將資料傳給前端，到前端才能轉換回當地時間，才不會被伺服器與資料庫所在的時區影響。


接著再各自做更細部的拆解，找尋資料

* 前端到後端：如何在表單中新增資料，同使用者輸入的資料一起傳回後端? ---> 用隱藏的input欄位解。
  過程中也有考量到直接運用Ajax直接透過API發送請求，但就無法使用express-handlebars生成HTML，而必須在前端取得資料後，用javascript操作DOM生成HTML，這在未來優化畫面時會較不方便，因此最後決定使用隱藏的input欄位處理。
* 後端儲存: 可用Date的資料類型儲存
* 後端到前端:  因為是採server-side rendering的形式，資料都已帶入樣板裡生成HTML檔案才傳到前端，因此前端需要從HTML中擷取日期資料，進行轉換與修改。 ---> 想到可將timestamp帶在自訂的data屬性裡，在透過前端的javascript擷取轉換後，修改資料

過程中，再不斷透過console.log確認資料傳遞到哪？有沒有被轉換成別的型別？(例如: 前後端傳輸過程中，通常會被轉換成字串，都需要記得再另外轉換成需要的型別)。而後續的月份篩選上，則是透過查詢文件、stack overflow上相關問題的範例程式碼，搭配反覆的測試確認自己的理解是否正確，找到解法。

### 過程中你有對哪個技術有特別深刻的學習？

主要是對Promise的語法更加熟練，並且了解到可以用Promise.all和then chain控制資料庫查找資料的流程，在需要取得多個collections的資料時特別好用。另外，也在處理時差的過程中對Date物件的操作、表單的DOM操作更加熟練。透過這次練習，也接觸了更多MongoDB的語法(例如: populate、aggregation)，發現許多先前會直覺使用JS在伺服器做的資料處理，其實都可以直接運用資料庫的語法處理，未來希望能再多加研究，達成更複雜的資料處理需求。

終於從無到有打造出一支簡單的全端產品了，接下來希望再加入更多功能讓它更加完整！
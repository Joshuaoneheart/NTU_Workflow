# NTU Workflow

[110-1] Web Programming Final

(Group 3) NTU Workflow

[組員]

資工三 B08902017 游一心

資工三 B08902093 石諾盟

醫工三 B08508010 王愛琳

[Demo 影片連結] ([網站功能] 參考Demo影片)

https://youtu.be/ohI_k-8wt_w

[服務介紹]

大家有跑公文流程的經驗嗎?

譬如停修單流程需要**任課教師、系主任、教務處註冊組**三方依序核准才能認可，

所以NTU Workflow線上公文系統就可以幫你解決實體跑公文流程的麻煩。

[Github link]
https://github.com/Joshuaoneheart/NTU_Workflow

[Deployed link]
(https://ntu-workflow.herokuapp.com/
)

[Deployed 使用/操作方式]

伺服器端: heroku 都幫你用好了喔

使用者端:

只可以”新增學生帳號”，提供 staff 帳號供測試

staff(老師)帳號，可以”新增公文的格式"，譬如停修單可能需要上傳一份文件、一段文字、需要哪些行政人員核可(譬如教務處的Teacher1)。

staff sign in account:

email: teacher1@ntu.edu.tw pasword:123456

email: teacher2@ntu.edu.tw password: 123456

email: teacher3@ntu.edu.tw password: 123456

email: teacher4@ntu.edu.tw password: 123456

學生帳號可以”提交公文申請”，停修單需要依序經過任課老師、系主任最後才被教務處註冊組核准，所以當學生提交公文後，就會通知第一位核准老師(譬如任課老師)，當第一位老師核准後就會通知學生和下一位老師(譬如系主任)。

還有聊天室可以即時聯絡文件相關問題。

[其他說明]
staff(老師)的帳號是當時由graphql playground創建的，因為密碼salt的方式跟 由前端創建學生帳號的方式不太一樣，所以code中會給寫好的staff帳號供測試。

[使用與參考之框架/模組/原始碼]
使用graphql uploads, apollo-server-express

[第三方套件、框架、程式碼]
antd

## Tech Stack
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

## Description
An auxiliary workflow system for facilitating the administrative work in National Taiwan University.
The users are able to create, edit and fill in administrative documents such as Scholarship applications or Club Activities applications directly from their devices.
We have 3 types of users:
*    Students:
		* Create and edit Workflows
* Staff(including teachers and other members of the curricular and extracurricular bodies):
	* Create and edit administrative documents
	* Approve the administrative documents
* Admin:
	* Create and delete staff user

## How to run

### Clone the repo
```
git clone git@github.com:Joshuaoneheart/NTU_Workflow.git
```

### Install all of the extensions
```
cd NTU_Workflow && yarn
```
### Build
```
yarn build //in /NTU_Workflow
```
### Start Server
Use the command below and the web service will be available on localhost:5000.
```
yarn start //in /NTU_Workflow
```

### NODE version
NodeJS 16.2.0

[專題製作心得]

資工三 B08902017 游一心: 

這次的專題我主要負責將前端和後端接起來並督促組員，有點像 PM 的角色，但也因此需要前端後端都很熟，有時候出現第一次遇到的功能，需要大量的查資料跟嘗試才能成功，也因此學到了很多。剛開始構思這個專案的時候很擔心會不會搞得太複雜，很感謝各位組員的團隊合作，各司其職，才讓我們最後能做出像樣的成品。

資工三 B08902093 石諾盟: 

From this final project, I was able to better understand the process behind designing a website especially on the frontend side. The whole process was very time consuming since any minor tweak may end up with unexpected twists, however with patience I was able to get through the whole process and do my best to fix all of the frontend related bugs. I also got very familiar with the frameworks AntD, styled-components and I also were able to deepen my knowledge and understanding of CSS design.

醫工三 B08508010 王愛琳:

從0開始學web progamming真的很辛苦但很有趣，從final project決定要用graphql做之後就開始定義schema.graphql和mongodb schema，但實際上每次都還在改schema，尤其隨著前端越寫越完整，對後端要求的資料型態越來越明確，到今天deadline還是有改schema，然後隨之而來的上層: 各級resolver就需要更改，一直改到query, mutation和subscription，前端的gql也要隨之改變。因為我們這組做到一半就deploy看看，所以吃掉graphql playground，都是在備份上修改和測試，不過deploy也不成功(因為nodemon的關係)，但很感謝神隊友們在最後一刻把前後端接起來+deploy成功。這次project很開心幾乎全後端都是自己挑戰(除了upload file的GridFSBucket那邊)，讓我學到很多data structure和error handling，但更多的是謝謝很辛苦的前端(前端爆炸多東西要寫)和deploy+連接前後端、願意一起debug的隊友們。

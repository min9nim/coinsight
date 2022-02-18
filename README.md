# Coinsight
업비트의 지난 거래내역을 시각화하여 보여주는 서비스

https://coinsight.vercel.app

<br/>
<br/>

# 시작하기 전에 필요한 것
coinsight 에 로그인하기 위해서는 업비트의 자산조회용 키가 필요합니다. 먼저 아래 안내에 따라 자산조회용 키를 발급받으시기 바랍니다.

https://upbit.com/service_center/open_api_guide

<br/>
<br/>


# 로그인
앞서 발급받은 accessKey 와 secretKey 를 입력합니다.
- 각 키를 복사한 후 입력창을 클릭하면 해당 키가 해당 입력란에 자동으로 입력됩니다.
  - 단, 이때 직접 타이핑은 허용되지 않습니다. (복사 & 붙여넣기만 가능)
- 입력하신 키값은
  - 서버에 저장되지 않습니다.
  - 하지만 한번 로그인 후에는 브라우져의 로컬스토리지에 저장되기 때문에 개인PC 환경에서만 이용 바랍니다.
  - 브라우져 캐시를 초기화할 경우 로컬에 저장되었 건 키값은 모두 초기화됩니다.


![image](https://user-images.githubusercontent.com/6068828/154770274-d69ad165-668a-4634-a73a-a2cb05b46eb1.png)

<br/>
<br/>

# 이용안내
코인 별 지난 거래내역을 시각적으로 확인할 수 있습니다.
- 원의 크기는 볼륨을 의미
- 단, 시장가 매수 건은 포함되지 않습니다.(지정가 매수 건만 표시됨)
- 점을 클릭하면 당시 거래내역 상세를 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/6068828/154771183-e48814b3-dbc4-49f8-80e2-7a8d49a91328.png)

![image](https://user-images.githubusercontent.com/6068828/154774310-a6a0e44a-6822-4350-914f-3c7c1bb8c852.png)



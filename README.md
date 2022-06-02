# SSF
더존 최종 프로젝트
20211109 ~ 20211217
1조 teamstance
스트리밍 서비스 플랫폼

# 실시간 방송
### 구현한 방식

[온라인 비디오 전송은 스트리밍 프로토콜과 HTTP 기반 프로토콜을 모두 사용합니다](https://www.streamingmedia.com/Articles/ReadArticle.aspx?ArticleID=84496) . [RTMP (Real-Time Messaging Protocol)](https://www.wowza.com/blog/rtmp-streaming-real-time-messaging-protocol) 와 같은 스트리밍 프로토콜은 전용 스트리밍 서버를 사용하여 비디오를 빠르게 전달할 수있는 반면, HTTP 기반 프로토콜은 일반 웹 서버를 사용하여 시청 환경을 최적화하고 빠르게 확장 할 수 있습니다.

##### RTMP

순수 TCP 기반의 RTMP 프로토콜은 접속을 지속적으로 유지하는 데 기여한다.또, 실시간 통신을 한다. 부가적으로 비디오 및 오디오 스트림을 부드럽게 전달하기 위해 비디오 및 데이터를 여러 조각들(fragments)로 나누기도 한다. 이 조각들의 크기는 클라이언트와 서버 간에 유동적으로 결정 우리는 60

##### Node-media-server

스트리밍 프로토콜인 RTMP를 node에서 사용할 수 있게 해준다.

##### flv.js

JavaScript로 작성된 HTML5 Flash Video(FLV) 플레이어

##### Server

node-media-server를 이용해서 스트리밍 프로토콜인 rtmp(리얼 타임 메시징 프로토콜)를 사용한다.
rtmp default 포트 번호인 1935로 설정, HTTPS를 사용 했기 때문에 포트번호 8443, key, cert값을 설정 후 
NodeMediaServer 객체를 생성 한다. 그 후 run()으로 실행

##### Client

flv.js를 이용해서 
url을 우리가 사용할 도메인:포트번호/{스트림키}.flv 로 조합한후 player 객체를 생성
player.attachMediaElement(video태그 정보: id나 useRef) 로 설정 후
load()로 실행 destroy()로 종료

# 채팅 구현한 방식

#### 1. Server.js

웹서버 객체를 만들고 socket io와 웹서버 객체를 연결합니다. 그 이름을 io로 선언하고

그후 cors, port번호등을 설정한다.

io를 connection 메서드로 연결한 후 socket사용할 준비를 해둔다.

#### 2. Client

client 에서는 socket- io- client 를 import 받아서 노드 서버와 연결 한다.

socketContext라는 이름으로 useContext를 이용했고 클라이언트의 socket정보, 메세지, 방 정보를  관리 했습니다.

**예를 들어 채팅을 구현한 방식은** 

먼저 

 1. 클라이언트에서 채팅 메세지를 받으면 emit으로 메세지 데이터를 보냅니다.

 2. server에 있는 socket에서  on으로 메세지 데이터를 받아주고  to로 받아온 메세지를 내가 원하는 방에만 보낼 수 있도록 emit을 사용 합니다.

1. socketContext안 에서는 useEffect의 deps 위치의 배열안에 socket정보를 넣어서 socket정보가 바뀔 때 마다 수행 할 수 있도록 합니다. 여기서 socket정보는 브라우저에 접속한 각각의 클라이언트 socket 입니다. 
2. 그러나 내가 보낸 채팅은 socket정보의 변화가 없기 때문에 스프레드 연산을 이용해  메세지 배열에 바로바로 저장 해야 합니다.

채팅 완료!!

**ROOM을 구현한 방식**

Room을 생성한 입장(스트리머)

1. 클라이언트에서 방 정보를 emit (방 이름, 방 설명, 방을 식별 할 수 있는 것)
2. 서버에서 방 정보를 토대로 room객체 생성 후 broadcast메서드로 연결되어 있는 모든 소켓에게 새로운 방이 생겼다는 사실을 알린다.
3. 방이 생성 된다. 
4. join으로 room 입장

Room을 들어가는 입장(시청자)

1. 클라이언트에서 생성된 방의 정보를 서버에 보낸다.
2. join을 이용해 방을 입장한다.

**시청자 수 구현한 방식**

**방 입장**

1. 클라이언트에서 방을 입장
2. 서버에서는 데이터 타입인 Map을 이용해 key값은 클라이언트의 socket 정보 value는 방 식별 정보 를 저장합니다.
3. 해당 맵을 대괄호[] 로 묶어 스프레드 연산자를 사용해 배열로 만든 다음 filter를 사용해서 방을 입장 할 때 가지고 온 방 식별 정보로  비교 하여 시청자 수 정보를 SocketContext에 보낸다.
4. socketContext안 에서는 useEffect의 deps 위치의 배열 안에 socket정보를 넣어서 socket정보가 바뀔 때 마다 수행 할 수 있도록 합니다.  
5. useContext를 이용해 시청자 수 값을 받아오면 실시간으로 시청자 수가 증가 됩니다.

**방 퇴장**

1. 클라이언트에서 방을 퇴장 할때 socket, 방 식별 정보에 대한 정보를 보낸다.
2. Map에 저장되어 있는 socket의 정보를 delete로 삭제한다.
3. 대괄호와 스프레드 연산으로 해당 맵을 배열로 사용 할 수 있게 한 후 filter 메서드를 사용하여 방 식별 정보로 비교하여 배열을 받은 후 크기를 다시 시청자 수로 SocketContext에 보낸다.
4. 사용할 Container에서 useContext를 이용해 시청자 수 값을 받아온다.

닫기 버튼을 누르거나 새로고침 같은 비정상종료는 server에서 socket io에 기존에 있는  disconnect함수를 이용해서 처리 

뒤로가기 버튼은 window.onpopstate를 사용하여 처리

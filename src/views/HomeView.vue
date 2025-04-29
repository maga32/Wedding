<template>
  <div>
    <div class="text-center">

      <div class="p-2">W e d d i n g D a y</div>
      <hr class="w-50 m-auto">
      <div>
        <div class="text-yellow pt-4 font-classic fs-1">07 / 12</div>
        <div class="text-yellow pb-4 fs-3">SAT. PM 3:00</div>
      </div>
      <hr class="w-50 m-auto">

      <!-- 이미지 -->
      <div ref="movingPhoto" id="frame" class="my-5" style="overflow: hidden">
        <img :src="photo.first.png" :onerror="`this.src='${photo.first.jpg}'`" style="width:120%; height:120%; margin:-50px -30px" data-depth="0.4"/>
      </div>

      <div class="mb-5">
        <span class="fs-5">{{ info.groom?.name }}</span>
        <i class="fa fa-heart mx-2 text-yellow"></i>
        <span class="fs-5">{{ info.bride?.name }}</span>
      </div>

      <!-- 인삿말 시작 -->
      <div>
        <img class="img-fluid" src="/image/border-top.png" />
        <div class="my-border" style="overflow: hidden">
          <div class="font-classic fs-2 text-yellow">Invitation</div>
          <div class="font-classic fs-3 text-yellow">초 대 합 니 다</div>

          <hr class="w-75 m-auto my-4">

          <div class="fs-4 my-5 fade-up" data-duration="1" >
            오랜시간 지켜봐주신 <br>
            마음을 받아 <br>
            앞으로 더 오랜시간 동안 <br>
            서로를 지켜주고자 합니다. <br>
            <br>
            저희 두 사람이 서로를 위한 <br>
            든든한 버팀목이 될 수 있도록 <br>
            응원해주시면 <br>
            더욱 감사한 마음으로 <br>
            살아가겠습니다.
          </div>

          <!-- 이미지2 -->
          <div class="px-2">
            <img class="img-fluid fade-up" data-duration="1" :src="photo.second.png" :onerror="`this.src='${photo.second.jpg}'`" />
          </div>

          <div class="fs-4 py-4">
            <div class="fade-right">
              <span class="text-yellow fw-bold">{{ info.groomDad?.nameSpace }} · {{ info.groomMom?.nameSpace }} </span>
              <span class="fs-5">의&nbsp; 장 남 &nbsp;</span>
              <span class="fw-bold">{{ info.groom?.nameSpace }}</span>
            </div>
            <div class="fade-left">
              <span class="text-yellow fw-bold">{{ info.brideDad?.nameSpace }} · {{ info.brideMom?.nameSpace }} </span>
              <span class="fs-5">의&nbsp; 차 녀 &nbsp;</span>
              <span class="fw-bold">{{ info.bride?.nameSpace }}</span>
            </div>
          </div>

        </div>
        <img class="img-fluid" src="/image/border-bottom.png" />
      </div>
      <!-- 인삿말 끝 -->

      <!-- 앨범 시작 -->
      <div class="mt-5 py-4">
        <i class="fa fa-camera-retro fs-4 mx-1"></i>
        <span class="fs-2 mx-1 text-yellow fw-bold">Wedding Photos</span>
        <i class="fa fa-leaf text-yellow"></i>
      </div>

      <div class="row">
        <!-- 가로 4개, 세로 4개 (세세가가/가가세세) -->
        <div class="col-6 px-1 flip-left">
          <img
            v-for="(li, i) in photoList.slice(0, 4)" :src="li"
            onerror="this.src=this.src.replace('.png','.jpg')"
            class="img-fluid py-1" @click="slideTo(i)"
            data-bs-toggle="modal" data-bs-target="#photoModal" role="button"
          />
        </div>
        <div class="col-6 px-1 flip-left">
          <img
            v-for="(li, i) in photoList.slice(4, 8)" :src="li"
            onerror="this.src=this.src.replace('.png','.jpg')"
            class="img-fluid py-1" @click="slideTo(i+4)"
            data-bs-toggle="modal" data-bs-target="#photoModal" role="button"
          />
        </div>
      </div>

      <div class="my-5 pb-5">
        <span class="btn rounded-pill bg-yellow fw-bold text-light px-3">
          <i class="fa fa-camera me-2"></i>
          <span class="fs-5" @click="slideTo(0)" data-bs-toggle="modal" data-bs-target="#photoModal">
            웨딩사진 보러가기
          </span>
        </span>
      </div>
      <!-- 앨범 끝 -->

      <!-- 위치 시작 -->
      <div class="mt-5 pt-5">
        <i class="fa fa-map-marker fs-4 mx-1"></i>
        <span class="fs-1 mx-1 text-yellow fw-bold">Location</span>
        <i class="fa fa-bus text-yellow mx-1"></i>
      </div>

      <div class="mt-3 pb-4 font-classic fade-up" data-duration="1">
        <div class="fs-4 py-3">2025. 07. 12. 토요일. 오후 3:00</div>
        <div class="fs-1 py-3 text-yellow">{{ location.name }}</div>
        <div class="fs-3 fw-bold text-yellow">{{ location.floor + ' ' + location.hall }}</div>
      </div>

      <div class="fs-1 zoom-in" data-duration="1" style="white-space: pre-line;">
        {{ ddayStr }}
      </div>

      <div class="my-5">
        <table class="w-75 m-auto">
          <tbody>
            <tr class="fs-2 fw-bold border-bottom">
              <td class="py-2" colspan="7">7월</td>
            </tr>
            <tr class="fw-bold">
              <td class="calendar py-2 text-danger">일</td>
              <td class="calendar py-2">월</td>
              <td class="calendar py-2">화</td>
              <td class="calendar py-2">수</td>
              <td class="calendar py-2">목</td>
              <td class="calendar py-2">금</td>
              <td class="calendar py-2 text-primary">토</td>
            </tr>
            <tr v-for="i in 5">
              <td v-for="j in 7" class="py-2">
                <span :class="(((7*(i-1))+j-2) === 12 ? 'dday fw-bold' : j===1 ? 'text-danger' : j===7 ? 'text-primary' :'') + (((7*(i-1))+j-2) === 12 ? ' dday' : '')">
                  {{ ((7*(i-1))+j-2) > 0 && ((7*(i-1))+j-2) <= 31 ? ((7*(i-1))+j-2) : '' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-3">
        <div ref="weddingMap" style="width: 100%; height: 300px"></div>

        <div class="fw-bold py-2 d-flex d-sm-block justify-content-between">
          <span class="pe-2">
            <a :href="`http://www.tmap.co.kr/tmap2/mobile/route.jsp?name=${location.nameNoSpace}&lat=${location.lat}&lon=${location.lng}`" target="_blank">
              <img class="rounded border" src="/image/tmap.svg" width="30px">
              <span class="ps-1 fs-6">티맵</span>
            </a>
          </span>
          <span class="px-sm-5" @click="kakaoNavi" role="button">
            <img class="rounded border" src="/image/kakaoNavi.svg" width="30px">
            <span class="ps-1 fs-6">카카오네비</span>
          </span>
          <span class="ps-2">
            <a href="https://naver.me/57VZ9lP7" target="_blank">
              <img class="rounded border" src="/image/naverMap.webp" width="30px">
              <span class="ps-1 fs-6">네이버</span>
            </a>
          </span>
        </div>
      </div>

      <div class="text-start px-3 pb-5">
        <table class="fs-5 fw-bold">
          <tbody class="fade-right" data-duration="1">
            <!-- 지하철 -->
            <tr>
              <td colspan="2" class="pt-3 pb-3 text-secondary">
                <span class="fa-stack fa-lg me-1">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-subway fa-stack-1x fa-inverse"></i>
                </span>
                <span class="fs-4">
                  지하철 이용시
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="ps-1">
                <span class="badge rounded-pill text-bg-info text-light fw-bold fs-5">
                  4 호선 회현역
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="ps-1">
                <span class="ps-1">
                  1번 출구, 명동 방향으로 200m 직진
                </span>
              </td>
            </tr>

            <!-- 버스 -->
            <tr>
              <td colspan="2" class="pt-5 pb-3 text-secondary">
                <span class="fa-stack fa-lg me-1">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-bus fa-stack-1x fa-inverse"></i>
                </span>
                <span class="fs-4">
                  버스 이용시
                </span>
              </td>
            </tr>
            <tr>
              <td class="px-1 text-nowrap align-top">
                <span class="fa-stack fa-lg fs-6">
                  <i class="fa fa-circle fa-stack-2x text-primary"></i>
                  <i class="fa-stack-1x fa-inverse">B</i>
                </span>
                <span class="text-primary pe-1">
                  간선버스
                </span>
              </td>
              <td>
                104, 105, 143, 263, 401, 406, 421, 503, 505, 507, 604
              </td>
            </tr>
            <tr>
              <td class="px-1 text-nowrap align-top align-top">
                <span class="fa-stack fa-lg fs-6">
                  <i class="fa fa-circle fa-stack-2x text-success"></i>
                  <i class="fa-stack-1x fa-inverse">G</i>
                </span>
                <span class="text-success pe-1">
                  지선버스
                </span>
              </td>
              <td>
                7011, 7013A, 7013B
              </td>
            </tr>
            <tr>
              <td class="px-1 text-nowrap align-top">
                <span class="fa-stack fa-lg fs-6">
                  <i class="fa fa-circle fa-stack-2x text-warning"></i>
                  <i class="fa-stack-1x fa-inverse">Y</i>
                </span>
                <span class="text-warning pe-1">
                  순환버스
                </span>
              </td>
              <td>
                03
              </td>
            </tr>

            <!-- 자동차 -->
            <tr>
              <td colspan="2" class="pt-5 pb-3 text-secondary">
                <span class="fa-stack fa-lg me-1">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-car fa-stack-1x fa-inverse fs-5"></i>
                </span>
                <span class="fs-4">
                  자동차 이용시
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="ps-2">
                - 우리은행 본점 지하주차장 이용
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 위치 끝 -->

      <!-- 연락처 시작 -->
      <div class="mt-5 py-5">
        <i class="fa fa-address-book fs-4 mx-1"></i>
        <span class="fs-1 mx-1 text-yellow fw-bold">Contact</span>
        <i class="fa fa-paper-plane text-yellow"></i>
      </div>

      <div class="row fw-bold fs-4">
        <div class="col-6 px-3 flip-left" data-duration="2">
          <img class="img-fluid rounded-circle" :src="photo.groom.png" :onerror="`this.src='${photo.groom.jpg}'`" />
          <div class="mt-3">
            <i class="fa fa-heart fs-6 text-yellow"></i><span class="text-yellow"> 신랑 </span>{{ info.groom?.nameSpace }}
          </div>
          <hr>
          <div class="fs-1 text-yellow">
            <a :href="'tel:' + info.groom?.phone"><i class="fa fa-phone me-4"></i></a>
            <a :href="'sms:' + info.groom?.phone"><i class="fa fa-envelope ms-5"></i></a>
          </div>
          <hr>
          <div class="fs-6 mb-4">신랑측 혼주 연락하기</div>
          <div>{{ info.groomDad?.nameSpace }} <span class="fs-6">아버님</span></div>
          <div class="fs-1 text-secondary">
            <a :href="'tel:' + info.groomDad?.phone"><i class="fa fa-phone me-4"></i></a>
            <a :href="'sms:' + info.groomDad?.phone"><i class="fa fa-envelope ms-5"></i></a>
          </div>
          <hr class="w-75 m-auto my-2">
          <div>{{ info.groomMom?.nameSpace }} <span class="fs-6">어머님</span></div>
          <div class="fs-1 text-secondary">
            <a :href="'tel:' + info.groomMom?.phone"><i class="fa fa-phone me-4"></i></a>
            <a :href="'sms:' + info.groomMom?.phone"><i class="fa fa-envelope ms-5"></i></a>
          </div>
        </div>

        <div class="col-6 px-3 flip-left" data-duration="2">
          <img class="img-fluid rounded-circle" :src="photo.bride.png" :onerror="`this.src='${photo.bride.jpg}'`" />
          <div class="mt-3">
            <i class="fa fa-heart fs-6 text-yellow"></i><span class="text-yellow"> 신부 </span>{{ info.bride?.nameSpace }}
          </div>
          <hr>
          <div class="fs-1 text-yellow">
            <a :href="'tel:' + info.bride?.phone"><i class="fa fa-phone me-4"></i></a>
            <a :href="'sms:' + info.bride?.phone"><i class="fa fa-envelope ms-5"></i></a>
          </div>
          <hr>
          <div class="fs-6 mb-4">신부측 혼주 연락하기</div>
          <div>{{ info.brideDad?.nameSpace }} <span class="fs-6">아버님</span></div>
          <div class="fs-1 text-secondary">
            <a :href="'tel:' + info.brideDad?.phone"><i class="fa fa-phone me-4"></i></a>
            <a :href="'sms:' + info.brideDad?.phone"><i class="fa fa-envelope ms-5"></i></a>
          </div>
          <hr class="w-75 m-auto my-2">
          <div>{{ info.brideMom?.nameSpace }} <span class="fs-6">어머님</span></div>
          <div class="fs-1 text-secondary">
            <a :href="'tel:' + info.brideMom?.phone"><i class="fa fa-phone me-4"></i></a>
            <a :href="'sms:' + info.brideMom?.phone"><i class="fa fa-envelope ms-5"></i></a>
          </div>
        </div>

        <div class="col-12 p-3"><hr></div>

        <!-- 계좌 -->
        <div class="my-5 fade-up" data-duration="1">
          <div class="text-yellow fs-2 mb-4">
            <span class="fa-stack fa-lg fs-6">
              <i class="fa fa-circle fa-stack-2x text-danger"></i>
              <i class="fa fa-heart fa-stack-1x fa-inverse"></i>
            </span>
            마음 전하실 곳
          </div>

          <div class="my-3 py-2">
            <div class="btn rounded-pill bg-yellow text-light fw-bold fs-4 px-4" data-bs-toggle="collapse" data-bs-target="#groomAccount" aria-expanded="false" aria-controls="groomAccount">
              신랑측 계좌번호
            </div>
            <div class="collapse text-start fs-5" id="groomAccount">
              <template v-for="li in banks">
                <div v-if="li.type === 'groom'" class="mt-3 mb-2 p-3 border rounded-3 border-warning">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <div>{{ li.bank + ' ' + li.account }}</div>
                    <div class="btn bg-yellow text-light fw-bold" @click="copyClipboard(li.account)">
                      <i class="fa fa-clone"></i>
                      복사
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div>{{li.name}}</div>
                    <div>
                      <div v-if="li.kakaoQr" class="btn btn-warning fw-bold" @click="openLink(li.kakaoQr)">
                        <i class="fa fa-comment me-1"></i>
                        pay
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="my-3 py-2">
            <div class="btn rounded-pill bg-yellow text-light fw-bold fs-4 px-4" data-bs-toggle="collapse" data-bs-target="#brideAccount" aria-expanded="false" aria-controls="brideAccount">
              신부측 계좌번호
            </div>
            <div class="collapse text-start fs-5" id="brideAccount">
              <template v-for="li in banks">
                <div v-if="li.type === 'bride'" class="mt-3 mb-2 p-3 border rounded-3 border-warning">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <div>{{ li.bank + ' ' + li.account }}</div>
                    <div class="btn bg-yellow text-light fw-bold" @click="copyClipboard(li.account)">
                      <i class="fa fa-clone"></i>
                      복사
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div>{{li.name}}</div>
                    <div>
                      <div v-if="li.kakaoQr" class="btn btn-warning fw-bold" @click="openLink(li.kakaoQr)">
                        <i class="fa fa-comment me-1"></i>
                        pay
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

      </div>
      <!-- 연락처 끝 -->

      <!-- 공유 시작 -->
      <div class="my-5">
        <div class="mt-5 pt-5">
          <i class="fa fa-share-alt fs-4 mx-1"></i>
          <span class="fs-1 mx-1 text-yellow fw-bold">Share</span>
          <i class="fa fa-share text-yellow fs-6"></i>
        </div>
        <hr>
        <div>
          <table class="w-100 fw-bold">
            <tbody>
              <tr>
                <td class="w-25 fade-right" data-duration="0.5" @click="share('kakaoTalk')" role="button">
                  <div class="d-flex justify-content-center my-1">
                    <div class="bg-yellow rounded-3 d-flex align-items-center justify-content-center" style="width:3.5rem; height:3.5rem">
                      <span class="fa-stack fa-lg mb-1">
                        <i class="fa fa-comment fa-inverse fa-stack-2x"></i>
                        <i class="fa fa-stack-1x fa-inverse text-yellow fs-6 font-default">TALK</i>
                      </span>
                    </div>
                  </div>
                  카카오톡
                </td>
                <td class="w-25 fade-right" data-duration="0.75" @click="share('naverBand')" role="button">
                  <img class="img-fluid rounded-3 my-1" src="/image/naverBand.png" style="width:3.5rem">
                  <br>
                  네이버밴드
                </td>
                <td class="w-25 fade-right" data-duration="1" @click="share('facebook')" role="button">
                  <i class="fa-4x fa fa-facebook-square text-yellow"></i><br>
                  페이스북
                </td>
              </tr>
              <tr>
                <td class="fade-right" data-duration="0.5" @click="share('kakaoStory')" role="button">
                  <div class="fs-3">
                    <span class="fa-stack fa-lg" style="overflow:hidden;">
                      <i class="fa fa-square fa-stack-2x text-yellow"></i>
                      <i class="fa fa-stack-1x fa-inverse font-classic" style="font-size:3em;margin-top:-1.9rem;">,</i>
                    </span>
                  </div>
                  카카오스토리
                </td>
                <td class="fade-right" data-duration="0.75" @click="share('sendSms')" role="button">
                  <div class="fs-3">
                    <span class="fa-stack fa-lg">
                      <i class="fa fa-square fa-stack-2x text-yellow"></i>
                      <i class="fa fa-stack-1x fa-commenting fa-inverse"></i>
                    </span>
                  </div>
                  문자 전송
                </td>
                <td class="fade-right" data-duration="1" @click="share('copyLink')" role="button">
                  <div class="fs-3">
                    <span class="fa-stack fa-lg">
                      <i class="fa fa-square fa-stack-2x text-yellow"></i>
                      <i class="fa fa-stack-1x fa-share-alt fa-inverse"></i>
                    </span>
                  </div>
                  링크 복사
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr>
      </div>
      <!-- 공유 끝 -->

      <!-- 방명록 시작 -->
      <div class="my-5">
        <div class="mt-5 pt-5">
          <i class="fa fa-address-book fs-4 mx-1"></i>
          <span class="fs-2 mx-1 text-yellow fw-bold">Guest Book</span>
          <i class="fa fa-pencil text-yellow fs-5"></i>
        </div>

        <div class="fade-up" data-duration="1">
          <div class="py-2 fw-bold">
            - 신랑신부에게 축하메시지를 남겨주세요 -
          </div>

          <div class="bg-secondary-subtle p-2 rounded-2">
            <div class="row">
              <div class="col-6 px-1 mt-2">
                <input type="text" class="form-control" :placeholder="message.name.ko" v-model="message.name.val">
              </div>
              <div class="col-6 px-1 mt-2">
                <input type="password" class="form-control" :placeholder="message.password.ko" v-model="message.password.val">
              </div>
              <div class="col-12 px-1 my-2">
                <textarea class="form-control" :placeholder="message.content.ko" v-model="message.content.val"></textarea>
              </div>
            </div>
            <div class="d-grid p-1">
              <button class="btn bg-yellow text-light fw-bold" type="button" @click="addMessage">메시지 남기기</button>
            </div>
          </div>
        </div>

        <div v-if="messageList.length" class="bg-secondary-subtle my-3 px-3 py-1 text-start rounded-1">
          <!-- 방명록리스트 -->
          <div v-for="(li, i) in messageList" class="fw-bold bg-light p-2 my-3 rounded-3">
            <div class="d-flex justify-content-between px-1">
              <div>{{ li.name }}</div>
              <div>
                <span class="text-secondary">{{ li.time }} </span>
                <i class="fa fa-times fw-light px-1" data-bs-toggle="collapse" :data-bs-target="'#delMessage_'+i" aria-expanded="false" :aria-controls="'delMessage_'+i" role="button"></i>
              </div>
            </div>
            <div class="my-2 px-1" style="white-space:pre-wrap;word-break: break-all;">
              {{ li.content }}
            </div>
            <div class="collapse text-start fs-5" :id="'delMessage_'+i">
              <div class="p-1">
                <input type="password" class="form-control" placeholder="비밀번호" v-model="messageList[i].delPassword">
              </div>
              <div class="d-grid p-1">
                <button class="btn bg-yellow text-light fw-bold" type="button" @click="deleteMessage(i)">확인</button>
              </div>
            </div>
          </div>

        </div>

      </div>
      <!-- 방명록 끝 -->

      <!-- 사진모달 시작 -->
      <div class="modal fade" id="photoModal" tabindex="-1" aria-labelledby="photoModalLabel">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content bg-dark text-light fs-5 fw-bold">

            <div class="modal-header border-dark d-flex justify-content-between">
              <div class="modal-title" id="photoModalLabel">{{ currentSlide+1 +'/'+ photoList.length }}</div>
              <div @click="autoPlayToggle" role="button">
                자동재생
                <i :class="['fa fa-refresh fa-fw ', {'fa-spin' : autoPlay}]"></i>
              </div>
              <i class="fa fa-times fs-2" data-bs-dismiss="modal" aria-label="Close" role="button"></i>
            </div>

            <div class="modal-body">
              <img :src="photoList[currentSlide]" onerror="this.src='/photo/icon.png'" style="width:100%;height:100%;object-fit: contain;" loading="lazy"/>
            </div>

            <div class="modal-footer border-dark">
              <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
                <Slide v-for="image in photoList" :key="image.id">
                  <template #default="{ currentIndex, isActive }">
                    <div :class="['thumbnail', { 'is-active': isActive }]" @click="slideTo(currentIndex)">
                      <img :src="image" onerror="this.src='/photo/icon.png'" class="thumbnail-image img-fluid" loading="lazy" />
                    </div>
                  </template>
                </Slide>
                <template #addons>
                  <Navigation />
                </template>
              </Carousel>
            </div>

          </div>
        </div>
      </div>
      <!-- 사진모달 끝 -->

      <div class="my-5 py-5"></div>
      <input class="d-none" ref="clipboard">
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, computed, ref, reactive, onBeforeMount} from "vue"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, addDoc, deleteDoc, getDocs, query, orderBy } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import bcrypt from "bcryptjs"

const MESSAGES = reactive({
  FILL_CONTENT: ' 항목을 입력해주세요.',
  FILL_PASSWORD: '비밀번호를 입력해주세요.',
  INCORRECT_PASSWORD: '비밀번호가 일치하지 않습니다.',
})

const location = reactive({
  name: '우리은행 본점',
  nameNoSpace: '우리은행본점',
  floor: '4층',
  hall: '비전홀',
  lat: 37.559432046203156,
  lng: 126.98174982415574,
})
const targetDate = ref(new Date('2025-07-12'))
const today = ref(new Date())
const weddingMap = ref(null)
const clipboard = ref(null)

const movingPhoto = ref(null)
const photo = reactive({
  first: {png:'/photo/first.png', jpg:'/photo/first.jpg'},
  second: {png:'/photo/second.png', jpg:'/photo/second.jpg'},
  groom: {png:'/photo/groom.png', jpg:'/photo/groom.jpg'},
  bride: {png:'/photo/bride.png', jpg:'/photo/bride.jpg'},
})

// firebase setting
const app = initializeApp({
  apiKey: "AIzaSyDEdZwh7N321b6lWT1R16Exp9S3KK7Hz1M",
  authDomain: "wedding-b0cd2.firebaseapp.com",
  projectId: "wedding-b0cd2",
  storageBucket: "wedding-b0cd2.firebasestorage.app",
  messagingSenderId: "869740619073",
  appId: "1:869740619073:web:31156bdad825d8e8fa2dc0"
})

// DB start ------------------------------------------------------------------
const db = getFirestore(app)

const info = ref({
  // groom : {name:'', nameSpace:'', phone:''},
})
const getInfo = async () => {
  const condition = query(collection(db, "info"))
  const lists = await getDocs(condition);

  info.value = {}

  lists.forEach((li)=>{
    const data = li.data()
    info.value[li.id] = {
      name: data.name,
      nameSpace: data.nameSpace,
      phone: data.phone,
    }
  })
}

const banks = ref([
    // {type:'groom/bride', name:'', bank: '', account: '', kakaoQr: '', },
])
const getBanks = async () => {
  const condition = query(collection(db, "bank"), orderBy("sort", "asc"))
  const lists = await getDocs(condition);

  banks.value = []

  lists.forEach((li)=>{
    const data = li.data()
    banks.value.push({
      id: li.id,
      type: data.type,
      name: data.name,
      bank: data.bank,
      account: data.account,
      kakaoQr: data.kakaoQr,
    })
  })
}

const message = reactive({
  name: {val:'', ko:'이름'},
  password: {val:'', ko:'비밀번호'},
  content: {val:'', ko:'축하메시지'}
})

const messageList = ref([
  // {id: '', name: '', content: '', time: '', password: '', delPassword: ''}
])

const getMessage = async () => {
  const condition = query(collection(db, "message"), orderBy("time", "desc"))
  const lists = await getDocs(condition);

  messageList.value = []

  lists.forEach((li)=>{
    const data = li.data()
    messageList.value.push({
      id: li.id,
      name: data.name,
      content: data.content,
      time: data.time,
      password: data.password,
      delPassword: ''
    })
  })
}

const addMessage = async () => {
  for(const key in message) {
    if(!message[key].val) {
      alert(message[key].ko + MESSAGES.FILL_CONTENT)
      return
    }
  }

  await addDoc(collection(db, 'message'), {
    name: message.name.val,
    password: await bcrypt.hash(message.password.val, 10),
    content: message.content.val,
    time: new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  })

  message.name.val = ''
  message.password.val = ''
  message.content.val = ''

  await getMessage()
}

const deleteMessage = async (num) => {
  const target = messageList.value[num]
  if(!target.delPassword) {
    alert(MESSAGES.FILL_PASSWORD)
    return
  }

  const isMatch = await bcrypt.compare(target.delPassword, target.password)
  if(!isMatch) {
    alert(MESSAGES.INCORRECT_PASSWORD)
    return
  }

  await deleteDoc(doc(db, "message", target.id));
  await getMessage()
}
// DB end ------------------------------------------------------------------

// 사진앨범 start ------------------------------------------------------------------
const photoList = ref([
  shareUrl+'/photo/01.png',
  shareUrl+'/photo/02.png',
  shareUrl+'/photo/03.png',
  shareUrl+'/photo/04.png',
  shareUrl+'/photo/05.png',
  shareUrl+'/photo/06.png',
  shareUrl+'/photo/07.png',
  shareUrl+'/photo/08.png'
])
const maxNumber = 99
const formats = import.meta.env.DEV ? ['jpg'] : ['png', 'jpg', 'jpeg']
const checkPhotos = async () => {
  console.log('loading...')
  let tmpPhotoList = []

  let i = 1
  while(i <= maxNumber) {
    let found = false

    for (const ext of formats) {
      const filePath = '/photo/' + (i+'').padStart(2, '0') + '.' + ext

      try {
        const response = await fetch(filePath, { method: 'HEAD' })

        if (response.ok) {
          tmpPhotoList.push(filePath)
          found = true
          break
        }
      } catch (error) {
        console.error(`${filePath} 확인 중 오류 발생:`, error)
      }
    }

    // 연속된 번호가 끊기면 반복 종료
    if (!found) break
    i++
  }

  photoList.value = tmpPhotoList
  console.log('loaded!!!!')

}

const currentSlide = ref(0)
const slideTo = (slide) => {currentSlide.value = slide}
const thumbnailsConfig = reactive({
  height: 80,
  itemsToShow: 6,
  wrapAround: true,
  touchDrag: true,
  autoplay: 4000,
  gap: 5,
})
const autoPlay = ref(true)
const autoPlayToggle = () => {
  autoPlay.value = !autoPlay.value
  thumbnailsConfig.autoplay = autoPlay.value ? 4000 : 0
}
// 사진앨범 end ------------------------------------------------------------------

let scrollObserver = null

onUnmounted(()=>{
  if(scrollObserver) scrollObserver.disconnect()
})

onBeforeMount(async ()=>{
  await signInWithEmailAndPassword(getAuth(), 'you@me.wedding', 'wedding')
  await getInfo()
  await getBanks()
  await getMessage()
})

onMounted(()=>{
  // 스크롤이펙트
  enableScrollEffect(scrollObserver)
  const movedPhoto = new Parallax(movingPhoto.value)

  // 카카오맵 start ------------------------------------------------------------------
  const mapOptions = {
    center: new kakao.maps.LatLng(location.lat, location.lng),
    level: 4
  }

  const map = new kakao.maps.Map(weddingMap.value, mapOptions)
  const markerPosition = new kakao.maps.LatLng(location.lat, location.lng)
  const marker = new kakao.maps.Marker({ position: markerPosition })
  marker.setMap(map)

  const infoContent = `
        <a class="text-primary" href="https://naver.me/57VZ9lP7" target="_blank">
          <div class="px-3 py-1 fw-bold" style="width:108%">
            ${location.name+' '+location.floor}
          </div>
        </a>
      `
  const infoPosition = new kakao.maps.LatLng(location.lat, location.lng)

  const infoWindow = new kakao.maps.InfoWindow({
    position : infoPosition,
    content : infoContent
  })

  infoWindow.open(map, marker)
  // 카카오맵 end ------------------------------------------------------------------

  checkPhotos()
})

// 스크롤이펙트
const enableScrollEffect = (observer) => {
  const target = document.querySelectorAll('.fade-up,.fade-down,.fade-left,.fade-right,.fade-up-left,.fade-up-right,.fade-down-left,.fade-down-right,.flip-up,.flip-down,.flip-left,.flip-right,.zoom-in,.zoom-in-up,.zoom-in-down,.zoom-in-left,.zoom-in-right,.zoom-out,.zoom-out-up,.zoom-out-down,.zoom-out-left,.zoom-out-right')
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('showEffects')
      } else if(entry.boundingClientRect.top > 0) {
        entry.target.classList.remove('showEffects')
      }
    });
  }, {threshold: 0, rootMargin: '0px 0px -130px 0px'})

  target.forEach(li => {
    const duration = li.getAttribute('data-duration')
    if (duration) li.style.setProperty('--animation-duration', `${duration}s`)
    observer.observe(li)
  })
}

// 카카오 네비
const kakaoNavi = () => {
  if(!Kakao.isInitialized()) Kakao.init('6e267742a8b286b71d6d6aaaa7a677b0')
  Kakao.Navi.start({
    name: location.nameNoSpace,
    x: location.lng,
    y: location.lat,
    coordType: 'wgs84',
  })
}

// D-day표기
const ddayStr = computed(() => {
  const timeDiff = targetDate.value - today.value
  const dday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  return dday > 0 ? `D - ${dday} 일 후` : dday === 0 ? '오늘입니다 !\n 식장에서 뵙겠습니다.' : ''
})

// 클립보드 복사
const copyClipboard = (content) => {
  clipboard.value.value = content
  clipboard.value.classList.remove("d-none")
  clipboard.value.select()
  document.execCommand("copy")
  clipboard.value.classList.add("d-none")
  alert("클립보드에 복사되었습니다.")
}

// 링크열기
const openLink = (link, target='_blank') => {
  window.open(link, target)
}

// 공유정보
const shareUrl = 'https://wedding.sung-a.duckdns.org'
const shareMesssage = () => `${info.value.groom?.name}＆${info.value.bride?.name} 결혼을 축하해주세요.`

// 공유
const share = (type) => {
  switch(type) {
    case 'kakaoTalk' :kakaoTalkShare(); break;
    case 'naverBand' :naverBandShare(); break;
    case 'facebook'  :facebookShare();  break;
    case 'kakaoStory':kakaoStoryShare();break;
    case 'sendSms'   :smsShare();       break;
    case 'copyLink'  :copyClipboard(shareUrl);
  }
}

// 카카오톡 공유
const kakaoTalkShare = () => {
  if(!Kakao.isInitialized()) Kakao.init('6e267742a8b286b71d6d6aaaa7a677b0')
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `${info.value.groom?.name} ♥ ${info.value.bride?.name}`,
      description: shareMesssage(),
      imageUrl: shareUrl+'/photo/icon.png',
      link: {mobileWebUrl: shareUrl, webUrl: shareUrl},
    },
    buttons: [{ title: '청첩장 바로가기', link: {mobileWebUrl: shareUrl, webUrl: shareUrl} }],
  })
}

// 카카오스토리 공유
const kakaoStoryShare = () => {
  if (!Kakao.isInitialized()) Kakao.init('6e267742a8b286b71d6d6aaaa7a677b0')
  window.open(`storylink://posting?post=${shareMesssage() + shareUrl}&appver=1.0&apiver=1.0&appid=wedding&appname=wedding`, '_self')
}

// 네이버밴드 공유
const naverBandShare = () => {
  window.open('bandapp://create/post?text=' + encodeURIComponent(shareMesssage()+'\n'+shareUrl), '_self')
}

// 페이스북 공유
const facebookShare = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)
}

// 문자 공유
const smsShare = () => {
  window.open('sms:?body=' + encodeURIComponent(shareMesssage()+'\n'+shareUrl), '_self')
}

</script>

<style>
@import "@/assets/scrollEffects.css";

a:link{text-decoration: none;}
a, a:visited,a:active{color: unset !important;}
textarea {resize:none !important; height: 100px;}

.text-yellow {color: rgb(229, 189, 110)}

.bg-yellow {background-color: rgb(229, 189, 110) !important}

.my-border {
  border-right: 1px rgb(123, 123, 117) solid;
  border-left: 1px rgb(123, 123, 117) solid;
}

#frame {
  border-image-source: url('/image/photoFrame.png');
  border-image-slice: 70 55;
  border-width: 3rem 2.5rem;
  border-style: solid;
}

.calendar {width: 14.44%;}

.dday {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 20px;
  padding: 5px;
  background-color: rgb(229, 189, 110);
  color: #fff;
  border-radius: 50%;
  animation: bounce-yellow 1.5s infinite;
}

@keyframes bounce-yellow {
  0% {
    transform: scale(.95);
    box-shadow: 0 0 0 0 rgba(229, 189, 110,.7)
  }

  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(229, 189, 110,0)
  }

  to {
    transform: scale(.95);
    box-shadow: 0 0 0 0 rgba(229, 189, 110,0)
  }
}

/* 캐러샐관련 */
.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}
#thumbnails {margin-top: 10px;}
#thumbnails .carousel__slide {
  border-radius: 8px;
  background-color: black;
  overflow: hidden;
}
.thumbnail {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}
.thumbnail.is-active, .thumbnail:hover {opacity: 1}
</style>
<template>
  <!-- 开屏内容 -->
  <section class="hero">
    <div class="hero__left">
      <!-- 开屏背景 -->
      <div class="os-bg-base"></div>
      <div class="os-bg-base os-bg1"></div>
      <div class="os-bg-base os-bg2"></div>

      <!-- 品牌标语 -->
      <h1 class="brand-slogan">“ For You，For Free，Forever ”</h1>

      <!-- 品牌描述 -->
      <h4 class="brand-desc">
        {{ $t('home.desc') }}
      </h4>

      <!-- entry -->
      <div class="entry-operation">
        <el-button
          type="primary"
          size="large"
          round
          @click="router.go('/doc/doc-use')"
        >
          马上使用
        </el-button>
        <el-button
          type="primary"
          size="large"
          round
          @click="open('https://github.com/felixyang007')"
        >
          GitHub
        </el-button>
      </div>

      </div>
    <div class="hero__right">
      <video width="800" controls :src="demo"/>
    </div>
  </section>

  <!-- 主体内容 -->
  <div class="container">
    <!--    <section-box title="最新动态">-->
    <!--      <div class="news">-->
    <!--        <el-carousel-->
    <!--          style="margin-top: 30px"-->
    <!--          height="400px"-->
    <!--          indicator-position="outside"-->
    <!--          :interval="3000"-->
    <!--        >-->
    <!--          <el-carousel-item v-for="item in news">-->
    <!--            <div-->
    <!--              :style="-->
    <!--                'background:linear-gradient(to bottom right, rgba(64,158,255, 0.3), rgba(0, 0, 0, 0.8)) ,url(' +-->
    <!--                item.pic +-->
    <!--                ');'-->
    <!--              "-->
    <!--              class="news-banner"-->
    <!--            >-->
    <!--              <span class="news-banner__title">-->
    <!--                {{ item.title }}-->
    <!--              </span>-->
    <!--              <h3 class="news-banner__time" v-if="item.time">-->
    <!--                {{ item.time }}-->
    <!--              </h3>-->
    <!--              <el-button v-if="item.url" type="primary" @click="open(item.url)">-->
    <!--                查看-->
    <!--              </el-button>-->
    <!--            </div>-->
    <!--          </el-carousel-item>-->
    <!--        </el-carousel>-->
    <!--      </div>-->
    <!--    </section-box>-->

    <section-box title="关于 Matrix">
      <div class="honor-card">
        <el-card class="honor-card-wrapper" shadow="hover">
          <div class="honor-card-content">
            <h4 class="honor-name">基于 Sonic v2.7.2 二次开发</h4>
            <p>Matrix 是 Plaud 团队在开源项目 <b>Sonic</b>（AGPL-3.0）基础上二次开发的云真机测试平台，延续「远程真机控制 + 0 编码 UI 自动化」的完整能力。</p>
          </div>
        </el-card>
        <el-card class="honor-card-wrapper" shadow="hover">
          <div class="honor-card-content">
            <h4 class="honor-name">我们的增强与改造</h4>
            <p>升级 Android uiautomator2 引擎至 v10.6.2、统一 adb 37.0.1、修复 Android 14+ 投屏黑屏、iOS WDA 升级 16.12.8 并支持模拟器、Web UI 换用 Matrix 品牌。</p>
          </div>
        </el-card>
      </div>
    </section-box>

    <section-box title="Matrix支持哪些设备？">
      <div class="devices">
        <el-card
          class="card-content"
          :body-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '180px'
          }"
          shadow="hover"
          v-for="item in devices"
        >
          <img width="50" :src="item.image"/>
          <p>{{ item.name }}</p>
        </el-card>
      </div>
    </section-box>
    <section-box title="为什么使用Matrix？">
      <div class="use-case">
        <el-card class="case-content" shadow="hover">
          <img :src="team4" width="40"/>
          <h3>0编码UI自动化</h3>
          <p>积木式创建步骤</p>
          <p>一键分发多设备任务</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <img :src="team" width="40"/>
          <h3>在线代理抓包</h3>
          <p>一键连接代理抓包</p>
          <p>团队协作轻松快捷</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <img :src="team2" width="40"/>
          <h3>设备分布式集群</h3>
          <p>支持跨网段多机房</p>
          <p>支持Windows、Mac、Linux平台</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <img :src="team3" width="40"/>
          <h3>优秀周边生态</h3>
          <p>安卓Apk、iOS调试工具</p>
          <p>Jenkins插件、在线抓包工具</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <img :src="team5" width="40"/>
          <h3>低成本维护</h3>
          <p>拖拽式排序交互</p>
          <p>使用简单便捷</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <img :src="team6" width="40"/>
          <h3>在线WebView</h3>
          <p>提供在线调试WebView</p>
          <p>一键便利连接devtools</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <img :src="team7" width="40"/>
          <h3>可视化报表</h3>
          <p>测试截图、日志、录像</p>
          <p>图表展示项目运行情况</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <img :src="team8" width="40"/>
          <h3>轻松部署维护</h3>
          <p>Docker一键去中心化分布式</p>
          <p>扩容缩容不再繁琐</p>
        </el-card>
      </div>
    </section-box>
    <section-box title="Matrix的价值与产出">
      <div class="capacity-wrapper">
        <img class="capacity-img" :src="msg"/>
        <el-timeline class="capacity-list" style="text-align: left">
          <el-timeline-item type="primary" :hollow="true">
            Matrix提供图像识别，支持获取poco控件，助力游戏公司测试效率。
          </el-timeline-item>
          <el-timeline-item type="primary" :hollow="true">
            使用Matrix进行跨网段部署，助力海外业务的公司进行专项检测。
          </el-timeline-item>
          <el-timeline-item type="primary" :hollow="true">
            提供定时任务充分利用无人值守时间回归UI测试，省时省力。
          </el-timeline-item>
          <el-timeline-item type="primary" :hollow="true">
            完全开源免费的平台，快速的更新迭代速度，创造了多个领域新技术。
          </el-timeline-item>
          <el-timeline-item type="primary" :hollow="true">
            支持打通Jenkins的DevOps流程，推进项目自动化流程。
          </el-timeline-item>
          <el-timeline-item type="primary" :hollow="true">
            支持无限扩容设备，一键使用Android、iOS设备调试，设备管理不再繁琐。
          </el-timeline-item>
          <el-timeline-item type="primary" :hollow="true">
            丰富图表展示，用户实时洞察用例执行情况，把控产品质量。
          </el-timeline-item>
        </el-timeline>
      </div>
    </section-box>

    <section-box title="Matrix 核心改动">
      <div class="use-case">
        <el-card class="case-content" shadow="hover">
          <h3>Android 引擎升级</h3>
          <p>uiautomator2-server 5.7.4 → 10.6.2</p>
          <p>移植 7 个 legacy touch 端点，远控拖拽可用</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <h3>adb 统一 37.0.1</h3>
          <p>统一平台工具版本，避免 adb 互杀</p>
          <p>减少设备反复掉线</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <h3>投屏黑屏修复</h3>
          <p>scrcpy 固化 Android 14+ 补丁</p>
          <p>老包一键 patch</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <h3>iOS 增强</h3>
          <p>WDA 升级 16.12.8，适配 Xcode 26 / iOS 26</p>
          <p>新增 iOS 模拟器支持</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <h3>Web UI 换新</h3>
          <p>Matrix 品牌 + 双主题</p>
          <p>设备中心 / 用例 / 报告逐步打磨</p>
        </el-card>
        <el-card class="case-content" shadow="hover">
          <h3>设备身份稳定</h3>
          <p>udId 改用 ro.serialno / adb over WiFi</p>
          <p>掉线重连仍是同一台设备</p>
        </el-card>
      </div>
    </section-box>

    <!--    <section-box title="贡献者们">-->
    <!--      <div style="text-align: center">-->
    <!--        <img-->
    <!--          style="display: inline-block"-->
    <!--          src="https://opencollective.com/soniccloudorg/contributors.svg?width=800&button=false"-->
    <!--          alt="contribute"-->
    <!--          width="950"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </section-box>-->
  </div>
</template>

<script setup lang="ts">
import SectionBox from '../components/SectionBox.vue'

// 图片资源
import demo from '../assets/video/demo.mp4'

// 支持设备
import a1 from '../assets/ANDROID.jpg'
import a2 from '../assets/APPLE.jpg'
import a3 from '../assets/CAR.png'
import a4 from '../assets/WATCH.png'
// 使用场景
import team from '../assets/team.png'
import team2 from '../assets/team2.png'
import team3 from '../assets/team3.png'
import team4 from '../assets/team4.png'
import team5 from '../assets/team5.png'
import team6 from '../assets/team6.png'
import team7 from '../assets/team7.png'
import team8 from '../assets/docker.png'
// 价值与产出
import msg from '../assets/msg.png'
import {useRouter} from 'vitepress'

// 支持设备
const devices = [
  {
    image: a1,
    name: '安卓设备'
  },
  {
    image: a2,
    name: 'iOS设备'
  },
  {
    image: a3,
    name: '车载设备'
  },
  {
    image: a4,
    name: '智能手表'
  }
]

// 页面跳转
const open = (url: string): void => {
  window.open(url, '_blank')
}

const router = useRouter()
</script>

<style scoped lang="scss">
/* 开屏内容*/
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  /* 减去顶部导航栏高度 */
  height: calc(100vh - 72px);
  padding: 120px 100px;
  overflow-x: hidden;

  &__left {
    flex: 1;
    min-width: 580px;
    margin-right: 50px;
    text-align: center;
  }

  &__right {
    width: 800px;
  }
}

/* 开屏背景样式 */
.os-bg-base {
  position: absolute;
  bottom: 0;
  left: -50%;
  right: -50%;
  top: 0;
  opacity: 0.5;
  animation: slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #d1e3f6 50%, #9bdcf7 50%);
  z-index: -1;
}

.os-bg1 {
  animation-direction: alternate-reverse;
  animation-duration: 4s;
}

.os-bg2 {
  animation-duration: 5s;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}

/* 品牌标语 */
.brand-slogan {
  margin-top: 0;
  margin-bottom: 20px;
  line-height: 64px;
  font-size: 2.2rem;
  font-weight: 700;
  white-space: pre-wrap;
}

/* 品牌描述 */
.brand-desc {
  margin: 24px 0;
  font-size: 20px;
  font-weight: bold;
}

/* 品牌静态数据统计 */
.statistics {
  height: 20px;
}

.statistics-link {
  display: inline-block;
  height: 20px;
  margin-left: 20px;
}

.statistics-link:first-child {
  margin-left: 0;
}

/* entry */
// .entry-operation {
// }

/* 脚标 */
.footmark {
  margin-top: 20px;
}

/* 主体内容 */
.container {
  width: 1200px;
  margin: 0 auto;
}

/* 最新动态 */
.news {
  padding: 0 140px;
}

.news-banner {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  color: aliceblue;
  overflow: hidden;

  &__title {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  &__time {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 0.83em;
  }
}

/* 荣誉墙 */
.honor-wall {
  text-align: center;
}

/* 贡献墙 */
.cons-wall {
  padding: 0 20%;
  text-align: center;
}

.more-user {
  margin-bottom: 15px;
  color: #909399;
  font-size: 14px;
}

/* 支持设备 */
.devices {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 190px;
}

.card-content {
  border-radius: 25px;

  img {
    display: block;
  }

  p {
    font-weight: bold;
    margin: 0;
  }
}

.honor-name {
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0;
}

.honor-img {
  height: 240px;
  object-fit: contain;
}

.honor-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.honor-card-wrapper {
  cursor: pointer;
  width: 260px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
}

.honor-card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 1200px;
  margin: 0 auto;
}

/* 使用场景 */
.use-case {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.case-content {
  width: 270px;
  margin-bottom: 20px;
  border-radius: 25px;
  text-align: center;

  img {
    display: inline-block;
  }

  h3 {
    margin: 18px 0;
    font-size: 1.17em;
    font-weight: bold;
  }

  p {
    margin: 16px 0;
    font-size: 15px;
  }
}

/* 价值与产出 */
.capacity-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.capacity-img {
  height: 300px;
}

/* 快速开始 */
.quick-start {
  display: flex;
  justify-content: center;
}

/* 赞助商 */
.sponsor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__list {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    display: inline-block;
  }
}

@media screen and (max-width: 820px) {
  .container {
    width: 100%;
    margin: 0 auto;
  }

  .news {
    padding: 0;
  }

  .news-title {
    font-size: 22px;
  }

  .news-time {
    font-size: 14px;
  }

  .sponsor img {
    width: 300px;
  }

  .devices {
    margin: 0;
  }

  .card-content {
    width: 165px;
    margin-bottom: 14px;
  }
  .case-content {
    width: 170px;
    margin-bottom: 10px;
  }

  .capacity-wrapper {
    position: relative;
    display: inline-block;
    margin-top: 10px;
  }

  .capacity-img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 300px;
    margin-bottom: 30px;
    transform: translate(-50%, -50%);
    opacity: 0.05;
    filter: blur(2px);
  }

  .capacity-list {
    padding-right: 40px;
  }
}
</style>
